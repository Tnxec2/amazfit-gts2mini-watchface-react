import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import Color from "../../shared/color";
import { Constant } from "../model/constant";
import { Activity, ActivityType, AlignmentType, Coordinates, DateType, DigitalDateDigit, DigitalTimeDigit, DigitType, FollowType, ImageProgressDisplayType, LangCodeType, MultilangImageCoord, Shortcut, TimeType, WatchJson } from "../model/json.model";
import WatchFace, { Digit, WatchActivity, WatchAOD, WatchClockHand, WatchImageCoords, WatchImageProgress, WatchProgressBar } from "../model/watchFace.model";
import cl from './JsonComponent.module.css';

const langCode = 2

const JsonComponent = () => {

    const {watchface, jsonName } = useContext<IWatchContext>(WatchfaceContext);

    const [json, setJson] = useState<string>('')

    useEffect(() => {
        let json = generateJson(watchface)
        setJson(json)
        saveJson(json)
    }, [watchface])

    function generateJson(w: WatchFace): string {
        let timeDigitalEnabled = w.dialFace.hoursDigital.enabled || w.dialFace.minutesDigital.enabled || w.dialFace.secondsDigital.enabled || w.dialFace.amImageIndex || w.dialFace.pmImageIndex
        let timeDigitalAodEnabled = w.aod.dialFace.hoursDigital.enabled || w.aod.dialFace.minutesDigital.enabled || w.aod.dialFace.amImageIndex || w.aod.dialFace.pmImageIndex
        let timeClockHandEnabled = w.dialFace.hoursClockhand.enabled || w.dialFace.minutesClockhand.enabled || w.dialFace.secondsClockhand.enabled
        let timeClockHandAodEnabled = w.aod.dialFace.hoursClockhand.enabled || w.aod.dialFace.minutesClockhand.enabled

        let dateEnabled = w.date.day.enabled || w.date.month.enabled || w.date.monthAsWord.enabled || w.date.weekDay.enabled || w.date.year.enabled
        let dateAodEnabled = w.aod.date.day.enabled || w.aod.date.month.enabled || w.aod.date.monthAsWord.enabled || w.aod.date.weekDay.enabled || w.aod.date.year.enabled
        let activityEnabled = w.activity.battery.digit.enabled || w.activity.calories.digit.enabled || w.activity.distance.digit.enabled || w.activity.heartRate.digit.enabled || w.activity.pai.digit.enabled || w.activity.standUp.digit.enabled || w.activity.steps.digit.enabled || w.activity.weather.digit.enabled
        let statusEnabled = w.status.alarm.enabled || w.status.bluetooth.enabled || w.status.lock.enabled || w.status.dnd.enabled

        let dialFaceEnabled = timeDigitalEnabled || timeClockHandEnabled
        let dialFaceAodEnabled = timeDigitalAodEnabled || timeClockHandAodEnabled

        let timeDigits = getTimeDigital(watchface)
        let timeDigitsAod = getTimeDigital(watchface.aod)

        let dateDigits = getDate(watchface)
        let dateDigitsAod = getDate(watchface.aod)
        
        let activitys = getActivitys(watchface)
        let activitysAod = getActivitys(watchface.aod)

        let j: WatchJson = {
            Info: {
                DeviceId: Constant.deviceId
            },
            Background: w.background.imageIndex || w.background.color || w.background.previewIndex  ? {
                Preview: w.background.previewIndex ? [
                    {
                        LangCode: LangCodeType.toJson(langCode),
                        ImageSet: {
                            ImageIndex: w.background.previewIndex ,
                            ImagesCount: 1
                        }
                    }
                ] : null,
                BackgroundImageIndex: w.background.imageIndex ,
                Color: w.background.color && w.background.imageIndex === null ? Color.colorBackgroundWrite(w.background.color) : null
            } : null
            ,
            DialFace: dialFaceEnabled ? {
                DigitalDialFace:  timeDigitalEnabled ? {
                    Digits: timeDigits.length > 0 ? timeDigits : null,
                    AM: w.dialFace.amImageIndex ? getMultilangImageCoords(w.dialFace.amImageIndex, 1, w.dialFace.amX, w.dialFace.amY) : null,
                    PM: w.dialFace.pmImageIndex ? getMultilangImageCoords(w.dialFace.pmImageIndex, 1, w.dialFace.pmX, w.dialFace.pmY) : null,
                } : null,
                AnalogDialFace: timeClockHandEnabled ? {
                    Hours: w.dialFace.hoursClockhand.enabled ? getClockHand(w.dialFace.hoursClockhand) : null,
                    Minutes:  w.dialFace.minutesClockhand.enabled ? getClockHand(w.dialFace.minutesClockhand) : null,
                    Seconds:  w.dialFace.secondsClockhand.enabled ? getClockHand(w.dialFace.secondsClockhand) : null
                } : null,
                ProgressDialFace: null
            } : null,
            System: dateEnabled || activityEnabled || statusEnabled ? {
                Status: statusEnabled ? {
                    Bluetooth: w.status.bluetooth.enabled ? getImageCoord(w.status.bluetooth): null,
                    DoNotDisturb: w.status.dnd.enabled ? getImageCoord(w.status.dnd) : null,
                    Lock: w.status.lock.enabled ? getImageCoord(w.status.lock): null,
                    Alarm: w.status.alarm.enabled ? getImageCoord(w.status.alarm) : null
                }: null,
                Date: dateEnabled ? {
                    DateDigits: dateDigits.length > 0 ? dateDigits : null,
                    WeeksDigits: w.date.weekDay.enabled ? getCommonDigit(w.date.weekDay) : null,
                    DateProgressBar: null,
                    DateClockHand: null
                } : null,
                Activity: activitys.length > 0 ? activitys : null
            } : null,
            Widgets: w.widgets ? w.widgets.json : null,
            ScreenIdle: w.aod.backgroundImageIndex || dialFaceAodEnabled || dateAodEnabled || activitysAod.length > 0 ? {
                BackgroundImageIndex: w.aod.backgroundImageIndex ? w.aod.backgroundImageIndex : null,
                DialFace: dialFaceAodEnabled ? {
                    DigitalDialFace:  timeDigitalAodEnabled ? {
                        Digits: timeDigitsAod.length > 0 ? timeDigitsAod : null,
                        AM: w.aod.dialFace.amImageIndex ? getMultilangImageCoords(w.aod.dialFace.amImageIndex, 1, w.aod.dialFace.amX, w.aod.dialFace.amY) : null,
                        PM: w.aod.dialFace.pmImageIndex ? getMultilangImageCoords(w.aod.dialFace.pmImageIndex, 1, w.aod.dialFace.pmX, w.aod.dialFace.pmY) : null,
                    } : null,
                    AnalogDialFace: timeClockHandAodEnabled ? {
                        Hours: w.aod.dialFace.hoursClockhand.enabled ? getClockHand(w.aod.dialFace.hoursClockhand) : null,
                        Minutes:  w.aod.dialFace.minutesClockhand.enabled ? getClockHand(w.aod.dialFace.minutesClockhand) : null,
                        Seconds: null
                    } : null,
                    ProgressDialFace: null 
                } : null,
                Date: dateAodEnabled ? {
                    DateDigits: dateDigitsAod.length > 0 ? dateDigitsAod : null,
                    WeeksDigits: w.aod.date.weekDay.enabled ? getCommonDigit(w.aod.date.weekDay) : null,
                    DateProgressBar: null,
                    DateClockHand: null
                } : null,
                Activity: activitysAod.length > 0 ? activitysAod : null,
            } : null
        }
        return JSON.stringify(j, (key, value) => {
            if (value !== null) return value
          }, "  ")
    }
    
    function saveJson(json: string) {
        if (json.length > 0) {
            var a = document.getElementById("saveJson") as HTMLAnchorElement;
            if (a) {
                var file = new Blob([json], {type: 'text/plain'});
                let filename = jsonName ? jsonName : 'watchface.json'
                a.href = URL.createObjectURL(file);
                a.download = filename;
            }
        }
    }

    return (
        <>
        <Card className={cl.json}>
            <pre>
                {json}
            </pre>
        </Card>
        <br/>
        <a href="a" id="saveJson">download json file</a>
        </>
    )
    
};

export default JsonComponent;

function getTimeDigit(digit: Digit): import("../model/json.model").DigitalTimeDigit {
    return {
        TimeType: TimeType.toJson(digit.digitType),
        CombingMode: FollowType.toJson(digit.follow ? 0 : 1),
        Digit: {
            Image: {
                X: digit.x,
                Y: digit.y,
                NoDataImageIndex: null,
                MultilangImage: digit.imageIndex != null ? [{
                    LangCode: LangCodeType.toJson(langCode),
                    ImageSet: {
                        ImageIndex: digit.imageIndex ,
                        ImagesCount: digit.imageCount
                    }
                }] : null,
                DecimalPointImageIndex: null,
                MultilangImageUnit: digit.unitImageIndex != null ? [{
                    LangCode: LangCodeType.toJson(langCode),
                    ImageSet: {
                        ImageIndex: digit.unitImageIndex ,
                        ImagesCount: 1
                    }
                }] : null ,
                DelimiterImageIndex: null,
                MultilangImageUnitMile: null
            },
            SystemFont: null,
            Alignment: digit.displayFormAnalog ? null : AlignmentType.toJson(digit.alignment) ,
            Spacing: digit.spacing,
            PaddingZero: digit.paddingZero,
            DisplayFormAnalog: digit.displayFormAnalog
        },
        Separator: digit.separator?.imageIndex != null ? {
            Coordinates: {
                X: digit.separator.x,
                Y: digit.separator.y
            },
            ImageIndex: digit.separator.imageIndex ,
            ImageIndex2: null,
            ImageIndex3: null
        } : null,
    }
}

function getMultilangImageCoords(imageIndex: number, count: number, x: number, y: number): MultilangImageCoord {
    return {
        Coordinates: {
            X: x,
            Y: y
        },
        ImageSet: [
            {
                LangCode: LangCodeType.All.json,
                ImageSet: {
                    ImageIndex: imageIndex,
                    ImagesCount: count
                }
            }
        ]
    }
}

function getDateDigit(digit: Digit): import("../model/json.model").DigitalDateDigit {
    return {
        DateType: DateType.toJson(digit.digitType),
        CombingMode: FollowType.toJson(digit.follow ? 0 : 1),
        Digit: {
            Image: {
                X: digit.x,
                Y: digit.y,
                NoDataImageIndex: null,
                MultilangImage: digit.imageIndex != null ? [{
                    LangCode: LangCodeType.toJson(langCode),
                    ImageSet: {
                        ImageIndex: digit.imageIndex ,
                        ImagesCount: digit.imageCount
                    }
                }] : null,
                DecimalPointImageIndex: null,
                MultilangImageUnit: digit.unitImageIndex != null ? [{
                    LangCode: LangCodeType.toJson(langCode),
                    ImageSet: {
                        ImageIndex: digit.unitImageIndex ,
                        ImagesCount: 1
                    }
                }] : null ,
                DelimiterImageIndex: null,
                MultilangImageUnitMile: null
            },
            SystemFont: null,
            Alignment: digit.displayFormAnalog ? null : AlignmentType.toJson(digit.alignment) ,
            Spacing: digit.spacing,
            PaddingZero: digit.paddingZero,
            DisplayFormAnalog: digit.displayFormAnalog
        },
        Separator: digit.separator?.imageIndex != null ? {
            Coordinates: {
                X: digit.separator.x,
                Y: digit.separator.y
            },
            ImageIndex: digit.separator.imageIndex ,
            ImageIndex2: null,
            ImageIndex3: null
        } : null,
    }
}

function getCommonDigit(digit: Digit): import("../model/json.model").DigitalCommonDigit {
    return {
        Type: DigitType.toJson(digit.digitType),
        CombingMode: FollowType.toJson(digit.follow ? 0 : 1),
        Digit: {
            Image: {
                X: digit.x,
                Y: digit.y,
                NoDataImageIndex: null,
                MultilangImage: digit.imageIndex != null ? [{
                    LangCode: LangCodeType.toJson(langCode),
                    ImageSet: {
                        ImageIndex: digit.imageIndex ,
                        ImagesCount: digit.imageCount
                    }
                }] : null,
                DecimalPointImageIndex: null,
                MultilangImageUnit: digit.unitImageIndex != null ? [{
                    LangCode: LangCodeType.toJson(langCode),
                    ImageSet: {
                        ImageIndex: digit.unitImageIndex ,
                        ImagesCount: 1
                    }
                }] : null ,
                DelimiterImageIndex: null,
                MultilangImageUnitMile: null
            },
            SystemFont: null,
            Alignment: digit.displayFormAnalog ? null : AlignmentType.toJson(digit.alignment) ,
            Spacing: digit.spacing,
            PaddingZero: digit.paddingZero,
            DisplayFormAnalog: digit.displayFormAnalog
        },
        Separator: digit.separator?.imageIndex != null ? {
            Coordinates: {
                X: digit.separator.x,
                Y: digit.separator.y
            },
            ImageIndex: digit.separator.imageIndex ,
            ImageIndex2: null,
            ImageIndex3: null
        } : null,
    }
}

function getImageCoord(item: WatchImageCoords): import("../model/json.model").ImageCoord {
    return {
        Coordinates: item.imageIndex ? {
            X: item.x,
            Y: item.y,
        } : null,
        ImageIndex: item.imageIndex ,
        ImageIndex2: null,
        ImageIndex3: null
    }
}

function getImageProgress(item: WatchImageProgress): import("../model/json.model").ImageProgress {
    return {
        Coordinates: item.imageIndex ? item.coordinates.map((coors) => ( {
            X: coors.x,
            Y: coors.y,
        })) : null,
        ImageSet: {
            ImageIndex: item.imageIndex ,
            ImagesCount: item.imageCount
        },
        DisplayType: ImageProgressDisplayType.toJson(item.displayType)
    }
}

function getClockHand(item: WatchClockHand): import("../model/json.model").ClockHand {
    return {
        X: item.x ? item.x : null,
        Y: item.y ? item.y : null,
        Scale: item.scaleImageIndex >= 0 ? {
            Coordinates: null,
            ImageSet: null
        } : null,
        Pointer: item.pointerImageIndex >= 0 ? {
            Coordinates: item.pointerX >= 0 || item.pointerY >= 0? {
                X: item.pointerX,
                Y: item.pointerY,
            } : null,
            ImageIndex: item.pointerImageIndex ,
            ImageIndex2: null,
            ImageIndex3: null
        } : null,
        Cover: item.coverImageIndex >= 0 ? {
            Coordinates: item.coverX >= 0 && item.coverY >= 0 ? {
                X: item.coverX,
                Y: item.coverY,
            } : null,
            ImageIndex: item.coverImageIndex ,
            ImageIndex2: null,
            ImageIndex3: null
        } : null,
        StartAngle: item.startAngle ? item.startAngle : 0.0,
        EndAngle: item.endAngle ? item.endAngle : 360.0,
        Unknown16: null
    }
}

function getActivitys(w: WatchFace | WatchAOD): Activity[] {
    let activitys: Activity[] = []
        w.orderElements.orderElementsActivity.forEach(item => {
            let digits: Digit[] = []
            let enabled = false
            let _activity: WatchActivity = null
            let imageProgress: WatchImageProgress = null
            let pointerProgress: WatchClockHand = null
            let icon: WatchImageCoords = null
            let progressBar: WatchProgressBar = null
            let shortcut: Shortcut = null
            switch (item.type) {
                case ActivityType.Battery.index:
                    if (w.activity.battery.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.battery.digit)
                    }
                    _activity =w.activity.battery
                    break;
                case ActivityType.Steps.index:
                    if (w.activity.steps.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.steps.digit)
                    }
                    _activity =w.activity.steps
                    break;
                case ActivityType.Calories.index:
                    if (w.activity.calories.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.calories.digit)
                    }
                    _activity = w.activity.calories
                    break;
                case ActivityType.HeartRate.index:
                    if (w.activity.heartRate.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.heartRate.digit)
                    }
                    _activity = w.activity.heartRate
                    break;
                case ActivityType.Pai.index:
                    if (w.activity.pai.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.pai.digit)
                    }
                    _activity = w.activity.pai
                    break;
                case ActivityType.Distance.index:
                    if (w.activity.distance.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.distance.digit)
                    }
                    break;
                case ActivityType.StandUp.index:
                    if (w.activity.standUp.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.standUp.digit)
                    }
                    _activity = w.activity.standUp
                    break;
                case ActivityType.Weather.index:
                    if (w.activity.weather.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.weather.digit)
                    }
                    if (w.activity.weatherMin.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.weatherMin.digit)
                    }
                    if (w.activity.weatherMax.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.weatherMax.digit)
                    }
                    if (w.activity.weather.imageProgress.enabled) { enabled = true; imageProgress = w.activity.weather.imageProgress }
                    break;
                default:
                    break;
            }

            if (_activity) {
                if (_activity.imageProgress.enabled) {
                    enabled = true
                    imageProgress = _activity.imageProgress
                }
                if (_activity.pointerProgress.enabled) {
                    enabled = true
                    pointerProgress = _activity.pointerProgress
                }
                if (_activity.progressBar.enabledLinear || _activity.progressBar.enabledCircle) {
                    enabled = true
                    progressBar = _activity.progressBar
                }
                if (_activity.icon.enabled) {
                    enabled = true
                    icon = _activity.icon
                }
                if (_activity.shortcut) {
                    enabled = true
                    shortcut = _activity.shortcut
                }
            }

            if (enabled) activitys.push({
                Type: ActivityType.toJson(item.type),
                PointerProgress: pointerProgress ? getClockHand(pointerProgress) : null,
                ProgressBar: progressBar ? progressBar.jsonObj : null,
                ImageProgress: imageProgress ? getImageProgress(imageProgress) : null,
                Digits: digits.length > 0 ? digits.map(d => getCommonDigit(d)) : null,
                Shortcut: shortcut ? shortcut : null,
                Icon: icon ? getImageCoord(icon) : null
            }) 
        })
    return activitys
}

function getTimeDigital(w: WatchFace | WatchAOD): DigitalTimeDigit[] {
    let timeDigits: DigitalTimeDigit[] = []
    w.orderElements.orderElementsTime.forEach(item => {
        let digit: Digit = null
        let enabled = false
        if ( item.type === 0) {
            if (w.dialFace.hoursDigital.enabled) enabled = true
            digit = w.dialFace.hoursDigital
        } else if ( item.type === 1) {
            if (w.dialFace.minutesDigital.enabled) enabled = true
            digit = w.dialFace.minutesDigital
        } else  if ( item.type === 2) {
            if (w.dialFace.secondsDigital.enabled) enabled = true
            digit = w.dialFace.secondsDigital
        }
        if (enabled) timeDigits.push(getTimeDigit(digit))
    })
    return timeDigits
}
function getDate(w: WatchFace| WatchAOD): DigitalDateDigit[] {
    let dateDigits: DigitalDateDigit[] = []
    w.orderElements.orderElementsDate.forEach(item => {
        let digit: Digit = null
        let enabled = false
        if ( item.type === DateType.Year.index) {
            if (w.date.year.enabled) enabled = true
                digit = w.date.year
        } else if ( item.type === DateType.Month.index) {
            if (w.date.month.enabled ) { enabled = true;  digit = w.date.month}
            else if (w.date.monthAsWord.enabled ) { enabled = true;  digit = w.date.monthAsWord}
        } else  if ( item.type === DateType.Day.index) {
            if (w.date.day.enabled) enabled = true
            digit = w.date.day
        }
        if (enabled) dateDigits.push(getDateDigit(digit))
    })
    return dateDigits
}

