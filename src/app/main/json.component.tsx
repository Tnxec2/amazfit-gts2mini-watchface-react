import React from "react";
import { Card } from "react-bootstrap";
import Color from "../../shared/color";
import { Constant } from "../model/constant";
import { Activity, ActivityType, AlignmentType, DateType, DigitalDateDigit, DigitalTimeDigit, DigitType, FollowType, ImageProgressDisplayType, LangCodeType, TimeType, WatchJson } from "../model/json.model";
import WatchFace, { Digit, WatchClockHand, WatchImageCoords, WatchImageProgress } from "../model/watchFace.model";
import './json.component.css'
interface IProps {
    watchface: WatchFace,
    jsonName: string
}

interface IState {
    json: string
}

const langCode = 2
export default class JsonComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            json: ''
        }

        this.generateJson = this.generateJson.bind(this)
    }

    generateJson(): string {
        let w = this.props.watchface
        

        let timeDigitalEnabled = w.dialFace.enableHoursDigital || w.dialFace.enableMinutesDigital || w.dialFace.enableSecondsDigital
        let timeClockHandEnabled = w.dialFace.enableHoursClockhand || w.dialFace.enableMinutesClockhand || w.dialFace.enableSecondsClockhand

        let dateEnabled = w.date.enableDay || w.date.enableMonth || w.date.enableMonthAsWord || w.date.enableWeekDay || w.date.enableYear
        let activityEnabled = w.activity.battery.digit.enabled || w.activity.calories.digit.enabled || w.activity.distance.digit.enabled || w.activity.heartRate.digit.enabled || w.activity.pai.digit.enabled || w.activity.standUp.digit.enabled || w.activity.steps.digit.enabled || w.activity.weather.digit.enabled
        let statusEnabled = w.status.enableAlarm || w.status.enableBluetooth || w.status.enableDnd || w.status.enableLock

        let timeDigits: DigitalTimeDigit[] = []
        w.orderElements.orderElementsTime.forEach(item => {
            let digit: Digit = null
            let enabled = false
            if ( item.type === 0) {
                if (w.dialFace.enableHoursDigital) enabled = true
                digit = w.dialFace.hoursDigital
            } else if ( item.type === 1) {
                if (w.dialFace.enableMinutesDigital) enabled = true
                digit = w.dialFace.minutesDigital
            } else  if ( item.type === 2) {
                if (w.dialFace.enableSecondsClockhand) enabled = true
                digit = w.dialFace.secondsDigital
            }
            if (enabled) timeDigits.push(getTimeDigit(digit))
        })
        let dateDigits: DigitalDateDigit[] = []
        w.orderElements.orderElementsDate.forEach(item => {
            let digit: Digit = null
            let enabled = false
            if ( item.type === 0) {
                if (w.date.enableYear) enabled = true
                digit = w.date.year
            } else if ( item.type === 1) {
                if (w.date.enableMonth ) { enabled = true;  digit = w.date.month}
                else if (w.date.enableMonthAsWord ) { enabled = true;  digit = w.date.monthAsWord}
            } else  if ( item.type === 2) {
                if (w.date.enableDay) enabled = true
                digit = w.date.day
            }
            if (enabled) dateDigits.push(getDateDigit(digit))
        })
        let activitys: Activity[] = []
        w.orderElements.orderElementsActivity.forEach(item => {
            let digits: Digit[] = []
            let enabled = false
            let imageProgress: WatchImageProgress = null
            switch (item.type) {
                case ActivityType.Battery.index:
                    if (w.activity.battery.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.battery.digit)
                    }
                    if (w.activity.battery.imageProgress.enabled) { enabled = true;imageProgress = w.activity.battery.imageProgress}
                    break;
                case ActivityType.Steps.index:
                    if (w.activity.steps.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.steps.digit)
                    }
                    if (w.activity.steps.imageProgress.enabled) { enabled = true;imageProgress = w.activity.steps.imageProgress}
                    break;
                case ActivityType.Calories.index:
                    if (w.activity.calories.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.calories.digit)
                    }
                    if (w.activity.calories.imageProgress.enabled) { enabled = true;imageProgress = w.activity.calories.imageProgress}
                    break;
                case ActivityType.HeartRate.index:
                    if (w.activity.heartRate.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.heartRate.digit)
                    }
                    if (w.activity.heartRate.imageProgress.enabled) { enabled = true;imageProgress = w.activity.heartRate.imageProgress}
                    break;
                case ActivityType.Pai.index:
                    if (w.activity.pai.digit.enabled) {
                        enabled = true
                        digits.push(w.activity.pai.digit)
                    }
                    if (w.activity.pai.imageProgress.enabled) { enabled = true;imageProgress = w.activity.pai.imageProgress}
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
                    if (w.activity.standUp.imageProgress.enabled) { enabled = true;imageProgress = w.activity.standUp.imageProgress}
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

            if (enabled) activitys.push({
                Type: ActivityType.toJson(item.type),
                PointerProgress: null,
                ProgressBar: null,
                ImageProgress: imageProgress?.enabled ? getImageProgress(imageProgress) : null,
                Digits: digits.length > 0 ? digits.map(d => getCommonDigit(d)) : null,
                Shortcut: null,
                Icon: null 
            }) 
        })
        let j: WatchJson = {
            Info: {
                DeviceId: 73
            },
            Background: w.background ? {
                Preview: [
                    {
                        LangCode: LangCodeType.toJson(langCode),
                        ImageSet: {
                            ImageIndex: w.background.previewIndex + Constant.startImageIndex,
                            ImagesCount: 1
                        }
                    }
                ],
                BackgroundImageIndex: w.background.imageIndex + Constant.startImageIndex,
                Color: w.background.color && w.background.imageIndex === null ? Color.colorBackgroundWrite(w.background.color) : null
            } : null
            ,
            DialFace: w.dialFace ? {
                DigitalDialFace:  timeDigitalEnabled ? {
                    Digits: timeDigits.length > 0 ? timeDigits : null,
                    AM: null,
                    PM: null
                } : null,
                AnalogDialFace: timeClockHandEnabled ? {
                    Hours: w.dialFace.enableHoursClockhand ? getClockHand(w.dialFace.hoursClockhand) : null,
                    Minutes:  w.dialFace.enableMinutesClockhand ? getClockHand(w.dialFace.minutesClockhand) : null,
                    Seconds:  w.dialFace.enableSecondsClockhand ? getClockHand(w.dialFace.secondsClockhand) : null
                } : null,
                ProgressDialFace: null
            } : null,
            System: dateEnabled || activityEnabled || statusEnabled ? {
                Status: statusEnabled ? {
                    Bluetooth: w.status.enableBluetooth ? getImageCoord(w.status.bluetooth): null,
                    DoNotDisturb: w.status.enableDnd ? getImageCoord(w.status.dnd) : null,
                    Lock: w.status.enableLock ? getImageCoord(w.status.lock): null,
                    Alarm: w.status.enableAlarm ? getImageCoord(w.status.alarm) : null
                }: null,
                Date: dateEnabled ? {
                    DateDigits: dateDigits.length > 0 ? dateDigits : null,
                    WeeksDigits: w.date.enableWeekDay ? getCommonDigit(w.date.weekDay) : null,
                    DateProgressBar: null,
                    DateClockHand: null
                } : null,
                Activity: activitys.length > 0 ? activitys : null
            } : null,
            Widgets: null,
            ScreenIdle: null
        }
        return JSON.stringify(j, (key, value) => {
            if (value !== null) return value
          }, "  ")
    }


    
    saveJson(json: string) {
        if (json.length > 0) {
            var a = document.getElementById("saveJson") as HTMLAnchorElement;
            if (a) {
                var file = new Blob([json], {type: 'text/plain'});
                let filename = this.props.jsonName ? this.props.jsonName : 'watchface.json'
                a.href = URL.createObjectURL(file);
                a.download = filename;
            }
        }
    }

    render() {
        let json = this.generateJson()
        this.saveJson(json)
        return (
            <>
            <Card className="json">
                <pre>
                    {json}
                </pre>
            </Card>
            <br/>
            <a href="a" id="saveJson">download json file</a>
            </>
        )
    }
}




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
                        ImageIndex: digit.imageIndex + Constant.startImageIndex,
                        ImagesCount: digit.imageCount
                    }
                }] : null,
                DecimalPointImageIndex: null,
                MultilangImageUnit: digit.unitImageIndex != null ? [{
                    LangCode: LangCodeType.toJson(langCode),
                    ImageSet: {
                        ImageIndex: digit.unitImageIndex + Constant.startImageIndex,
                        ImagesCount: 1
                    }
                }] : null ,
                DelimiterImageIndex: null,
                MultilangImageUnitMile: null
            },
            SystemFont: null,
            Alignment: AlignmentType.toJson(digit.alignment),
            Spacing: digit.spacing,
            PaddingZero: digit.paddingZero,
            DisplayFormAnalog: digit.displayFormAnalog
        },
        Separator: digit.separator?.imageIndex != null ? {
            Coordinates: {
                X: digit.separator.x,
                Y: digit.separator.y
            },
            ImageIndex: digit.separator.imageIndex + Constant.startImageIndex,
            ImageIndex2: null,
            ImageIndex3: null
        } : null,
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
                        ImageIndex: digit.imageIndex + Constant.startImageIndex,
                        ImagesCount: digit.imageCount
                    }
                }] : null,
                DecimalPointImageIndex: null,
                MultilangImageUnit: digit.unitImageIndex != null ? [{
                    LangCode: LangCodeType.toJson(langCode),
                    ImageSet: {
                        ImageIndex: digit.unitImageIndex + Constant.startImageIndex,
                        ImagesCount: 1
                    }
                }] : null ,
                DelimiterImageIndex: null,
                MultilangImageUnitMile: null
            },
            SystemFont: null,
            Alignment: AlignmentType.toJson(digit.alignment),
            Spacing: digit.spacing,
            PaddingZero: digit.paddingZero,
            DisplayFormAnalog: digit.displayFormAnalog
        },
        Separator: digit.separator?.imageIndex != null ? {
            Coordinates: {
                X: digit.separator.x,
                Y: digit.separator.y
            },
            ImageIndex: digit.separator.imageIndex + Constant.startImageIndex,
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
                        ImageIndex: digit.imageIndex + Constant.startImageIndex,
                        ImagesCount: digit.imageCount
                    }
                }] : null,
                DecimalPointImageIndex: null,
                MultilangImageUnit: digit.unitImageIndex != null ? [{
                    LangCode: LangCodeType.toJson(langCode),
                    ImageSet: {
                        ImageIndex: digit.unitImageIndex + Constant.startImageIndex,
                        ImagesCount: 1
                    }
                }] : null ,
                DelimiterImageIndex: null,
                MultilangImageUnitMile: null
            },
            SystemFont: null,
            Alignment: AlignmentType.toJson(digit.alignment),
            Spacing: digit.spacing,
            PaddingZero: digit.paddingZero,
            DisplayFormAnalog: digit.displayFormAnalog
        },
        Separator: digit.separator?.imageIndex != null ? {
            Coordinates: {
                X: digit.separator.x,
                Y: digit.separator.y
            },
            ImageIndex: digit.separator.imageIndex + Constant.startImageIndex,
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
        ImageIndex: item.imageIndex + Constant.startImageIndex,
        ImageIndex2: null,
        ImageIndex3: null
    }
}

function getImageProgress(item: WatchImageProgress): import("../model/json.model").ImageProgress {
    return {
        Coordinates: item.imageIndex ? [{
            X: item.coordinates[0].x,
            Y: item.coordinates[0].y,
        }] : null,
        ImageSet: {
            ImageIndex: item.imageIndex + Constant.startImageIndex,
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
            ImageIndex: item.pointerImageIndex + Constant.startImageIndex,
            ImageIndex2: null,
            ImageIndex3: null
        } : null,
        Cover: item.coverImageIndex >= 0 ? {
            Coordinates: item.coverX >= 0 && item.coverY >= 0 ? {
                X: item.coverX,
                Y: item.coverY,
            } : null,
            ImageIndex: item.coverImageIndex + Constant.startImageIndex,
            ImageIndex2: null,
            ImageIndex3: null
        } : null,
        StartAngle: item.startAngle ? item.startAngle : 0.0,
        EndAngle: item.endAngle ? item.endAngle : 360.0,
        Unknown16: null
    }
}

