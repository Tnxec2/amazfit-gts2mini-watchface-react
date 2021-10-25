import { FC, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import Color from "../shared/color";
import { Constant } from "../shared/constant";
import { Activity, DigitalDigit, Shortcut, WatchJson } from "../model/json.model";
import { ActivityType, DateType, LangCodeType } from "../model/types.model";
import WatchFace, { WatchActivity, WatchAOD, WatchClockHand, WatchCommonDigit, WatchImageCoords, WatchImageProgress, WatchProgressBar } from "../model/watchFace.model";
import cl from './JsonComponent.module.css';

const langCode = 2

const JsonComponent: FC = () => {

    const {watchface, jsonName } = useContext<IWatchContext>(WatchfaceContext);

    const [json, setJson] = useState<string>('')

    useEffect(() => {
        let json = generateJson(watchface)
        setJson(json)
        saveJson(json)
    }, [watchface])

    function generateJson(w: WatchFace): string {
        let timeDigitalEnabled = w.dialFace.hoursDigital.enabled || w.dialFace.minutesDigital.enabled || w.dialFace.secondsDigital.enabled || w.dialFace.am.enabled || w.dialFace.pm.enabled
        let timeDigitalAodEnabled = w.aod.dialFace.hoursDigital.enabled || w.aod.dialFace.minutesDigital.enabled || w.aod.dialFace.am.enabled || w.aod.dialFace.pm.enabled
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
                Color: w.background.color ? Color.colorBackgroundWrite(w.background.color) : null
            } : null
            ,
            DialFace: dialFaceEnabled ? {
                DigitalDialFace:  timeDigitalEnabled ? {
                    Digits: timeDigits.length > 0 ? timeDigits : null,
                    AM: w.dialFace.am.enabled ? w.dialFace.am.json : null,
                    PM: w.dialFace.pm.enabled ? w.dialFace.pm.json : null,
                } : null,
                AnalogDialFace: timeClockHandEnabled ? {
                    Hours: w.dialFace.hoursClockhand.enabled ? w.dialFace.hoursClockhand.json : null,
                    Minutes:  w.dialFace.minutesClockhand.enabled ? w.dialFace.minutesClockhand.json : null,
                    Seconds:  w.dialFace.secondsClockhand.enabled ? w.dialFace.secondsClockhand.json : null
                } : null,
                ProgressDialFace: null
            } : null,
            System: dateEnabled || activityEnabled || statusEnabled ? {
                Status: statusEnabled ? {
                    Bluetooth: w.status.bluetooth.enabled ? w.status.bluetooth.json: null,
                    DoNotDisturb: w.status.dnd.enabled ? w.status.dnd.json : null,
                    Lock: w.status.lock.enabled ? w.status.lock.json: null,
                    Alarm: w.status.alarm.enabled ? w.status.alarm.json : null
                }: null,
                Date: dateEnabled ? {
                    DateDigits: dateDigits.length > 0 ? dateDigits : null,
                    WeeksDigits: w.date.weekDay.enabled ? w.date.weekDay.json : null,
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
                        AM: w.aod.dialFace.am.enabled ? w.aod.dialFace.am.json : null,
                        PM: w.aod.dialFace.pm.enabled ? w.aod.dialFace.pm.json : null,
                    } : null,
                    AnalogDialFace: timeClockHandAodEnabled ? {
                        Hours: w.aod.dialFace.hoursClockhand.enabled ? w.aod.dialFace.hoursClockhand.json : null,
                        Minutes:  w.aod.dialFace.minutesClockhand.enabled ? w.aod.dialFace.minutesClockhand.json : null,
                        Seconds: null
                    } : null,
                    ProgressDialFace: null 
                } : null,
                Date: dateAodEnabled ? {
                    DateDigits: dateDigitsAod.length > 0 ? dateDigitsAod : null,
                    WeeksDigits: w.aod.date.weekDay.enabled ? w.aod.date.weekDay.json : null,
                    DateProgressBar: null,
                    DateClockHand: null
                } : null,
                Activity: activitysAod.length > 0 ? activitysAod : null,
            } : null
        }
        return JSON.stringify(j, (key, value) => {
            if (value !== null && value !== undefined) return value
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

function getActivitys(w: WatchFace | WatchAOD): Activity[] {
    let activitys: Activity[] = []
        w.orderElements.orderElementsActivity.forEach(item => {
            let digits: WatchCommonDigit[] = []
            let digits2: WatchCommonDigit[] = []
            let enabled = false
            let enabled2 = false
            let _activity: WatchActivity = null
            let imageProgress: WatchImageProgress = null
            let imageProgress2: WatchImageProgress = null
            let pointerProgress: WatchClockHand = null
            let pointerProgress2: WatchClockHand = null
            let icon: WatchImageCoords = null
            let icon2: WatchImageCoords = null
            let progressBar: WatchProgressBar = null
            let progressBar2: WatchProgressBar = null
            let shortcut: Shortcut = null
            let shortcut2: Shortcut = null
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
                    if (w.activity.weather.imageProgress.enabled) { 
                        enabled2 = true; 
                        imageProgress2 = w.activity.weather.imageProgress }
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
                PointerProgress: pointerProgress ? pointerProgress.json : null,
                ProgressBar: progressBar ? progressBar.jsonObj : null,
                ImageProgress: imageProgress?.enabled ? imageProgress.json : null,
                Digits: digits.length > 0 ? digits.map(d => d.json) : null,
                Shortcut: shortcut ? shortcut : null,
                Icon: icon?.enabled ? icon.json : null
            })
            if (enabled2) activitys.push({
                Type: ActivityType.toJson(item.type),
                PointerProgress: pointerProgress2 ? pointerProgress2.json : null,
                ProgressBar: progressBar2 ? progressBar2.jsonObj : null,
                ImageProgress: imageProgress2?.enabled ? imageProgress2.json : null,
                Digits: digits2.length > 0 ? digits2.map(d => d.json) : null,
                Shortcut: shortcut2 ? shortcut2 : null,
                Icon: icon2?.enabled ? icon2.json : null
            })
        })
    return activitys
}

function getTimeDigital(w: WatchFace | WatchAOD): DigitalDigit[] {
    let timeDigits: DigitalDigit[] = []
    w.orderElements.orderElementsTime.forEach(item => {
        let digit: WatchCommonDigit = null
        let enabled = false
        if ( item.type === 0) {
            if (w.dialFace.hoursDigital?.enabled) enabled = true
            digit = w.dialFace.hoursDigital
        } else if ( item.type === 1) {
            if (w.dialFace.minutesDigital?.enabled) enabled = true
            digit = w.dialFace.minutesDigital
        } else  if ( item.type === 2) {
            if (w.dialFace.secondsDigital?.enabled) enabled = true
            digit = w.dialFace.secondsDigital
        }
        if (enabled) timeDigits.push(digit.json)
    })
    return timeDigits
}

function getDate(w: WatchFace| WatchAOD): DigitalDigit[] {
    let dateDigits: DigitalDigit[] = []
    w.orderElements.orderElementsDate.forEach(item => {
        let digit: WatchCommonDigit = null
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
        if (enabled) dateDigits.push(digit.json)
    })
    return dateDigits
}

