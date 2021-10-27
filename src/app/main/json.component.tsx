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
        let statusEnabled = w.status.alarm.enabled || w.status.bluetooth.enabled || w.status.lock.enabled || w.status.dnd.enabled

        let dialFaceEnabled = timeDigitalEnabled || timeClockHandEnabled
        let dialFaceAodEnabled = timeDigitalAodEnabled || timeClockHandAodEnabled

        let timeDigits = getTimeDigital(watchface)
        let timeDigitsAod = getTimeDigital(watchface.aod)

        let dateDigits = getDate(watchface)
        let dateDigitsAod = getDate(watchface.aod)
        
        let activitys = getActivitys(watchface.activity)
        let activitysAod = getActivitys(watchface.aod.activitylist)

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
            System: dateEnabled || activitys.length > 0 || statusEnabled ? {
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

function getActivitys(alist: WatchActivity[]): Activity[] {
    let activitys: Activity[] = []
    if (!alist) return activitys
    alist.forEach(item => {
        let digits: WatchCommonDigit[] = []
        let enabled = false
        let imageProgress: WatchImageProgress = null
        let pointerProgress: WatchClockHand = null
        let icon: WatchImageCoords = null
        let progressBar: WatchProgressBar = null
        let shortcut: Shortcut = null

        if (item) {
            if (item.imageProgress.enabled) {
                enabled = true
                imageProgress = item.imageProgress
            }
            if (item.pointerProgress.enabled) {
                enabled = true
                pointerProgress = item.pointerProgress
            }
            if (item.progressBar.enabledLinear || item.progressBar.enabledCircle) {
                enabled = true
                progressBar = item.progressBar
            }
            if (item.icon.enabled) {
                enabled = true
                icon = item.icon
            }
            if (item.shortcut) {
                enabled = true
                shortcut = item.shortcut
            }
        }

        if (enabled) activitys.push({
            Type: item.type.json,
            PointerProgress: pointerProgress ? pointerProgress.json : null,
            ProgressBar: progressBar ? progressBar.jsonObj : null,
            ImageProgress: imageProgress?.enabled ? imageProgress.json : null,
            Digits: digits.length > 0 ? digits.map(d => d.json) : null,
            Shortcut: shortcut ? shortcut : null,
            Icon: icon?.enabled ? icon.json : null
        })

        })
    return activitys
}

function getTimeDigital(w: WatchFace | WatchAOD): DigitalDigit[] {
    let timeDigits: DigitalDigit[] = []

    if (w.dialFace.hoursDigital?.enabled) timeDigits.push(w.dialFace.hoursDigital.json)
    if (w.dialFace.minutesDigital?.enabled) timeDigits.push(w.dialFace.minutesDigital.json)
    if (w.dialFace.secondsDigital?.enabled) timeDigits.push(w.dialFace.secondsDigital.json)
    
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

