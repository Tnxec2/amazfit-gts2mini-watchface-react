import { FC, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import { Activity, DigitalDigit, Shortcut, WatchJson, Widget, Widgets } from "../model/json.model";
import { WidgetElement } from "../model/json_gts2mini.model";
import { DateType, LangCodeType } from "../model/types.model";
import WatchFace, { WatchActivity, WatchAOD, WatchClockHand, WatchCommonDigit, WatchImageCoords, WatchImageProgress, WatchProgressBar, WatchWidget, WatchWidgetElement, WatchWidgets } from "../model/watchFace.model";
import Color from "../shared/color";
import { Constant } from "../shared/constant";
import cl from './JsonComponent.module.css';

const JsonComponent: FC = () => {

    const {watchface, jsonName } = useContext<IWatchContext>(WatchfaceContext);

    const [json, setJson] = useState<string>('')

    useEffect(() => {
        let json = generateJson(watchface)
        setJson(json)
        saveJson(json)
    }, [watchface]) // eslint-disable-line react-hooks/exhaustive-deps

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
        
        let activitys = activitysToJson(watchface.activity)
        let activitysAod = activitysToJson(watchface.aod.activitylist)

        let j: WatchJson = {
            Info: {
                DeviceId: Constant.deviceId
            },
            Background: w.background.imageIndex || w.background.color || w.background.previewIndex  ? {
                Preview: w.background.previewIndex ? [
                    {
                        LangCode: LangCodeType.All.json,
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
            Widgets: w.widgets ? getWidgets(w.widgets) : null,
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

export function activitysToJson(alist: WatchActivity[]): Activity[] {
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
            if (item.digit.enabled) {enabled = true; digits.push(item.digit)}
            if (item.digitMin.enabled) {enabled = true; digits.push(item.digitMin)}
            if (item.digitMax.enabled) {enabled = true; digits.push(item.digitMax)}
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

        if (enabled) {
            activitys.push({
                Type: item.type.json,
                PointerProgress: pointerProgress ? pointerProgress.json : null,
                ProgressBar: progressBar ? progressBar.jsonObj : null,
                ImageProgress: imageProgress?.enabled ? imageProgress.json : null,
                Digits: digits.length > 0 ? digits.map(d => d.json) : null,
                Shortcut: shortcut ? shortcut : null,
                Icon: icon?.enabled ? icon.json : null
            })
        }
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

function getWidgets(widgets: WatchWidgets): Widgets | null {
    let result: Widgets = null
    if (widgets) {
        result = {
            TopMaskImageIndex: widgets.topMaskImageIndex,
            UnderMaskImageIndex: widgets.underMaskImageIndex,
            Unknown4: widgets.showTimeOnEditScreen,
            Widget: widgets.widgets?.length > 0 ? widgets.widgets.map((item) => getWidget(item)) : null
        }
    }
    return result
}

function getWidget(widget: WatchWidget): Widget | null {
    return ({
        X: widget.x,
        Y: widget.y,
        Width: widget.width,
        Height: widget.height,
        BorderActivImageIndex: widget.borderActivImageIndex,
        BorderInactivImageIndex: widget.borderInactivImageIndex,
        DescriptionImageBackground: widget.descriptionImageBackground.json,
        DescriptionWidthCheck: widget.descriptionWidthCheck,
        WidgetElement: widget.widgetElements?.length ? widget.widgetElements.map( (we) => getWidgetElement(we)) : null
    })
}

function getWidgetElement(we: WatchWidgetElement): WidgetElement {
    let activitys = activitysToJson(we.activitys)
    return {
        Preview: [
            {
                LangCode: LangCodeType.All.json,
                ImageSet: {
                    ImageIndex: we.previewImageIndex,
                    ImagesCount: 1
                }
            }
        ],
        Date: null,
        Activity: activitys?.length > 0 ? activitys : null
    }
}
