import { IImage } from "../model/image.model";
import { WatchAlarm } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import drawDigitImage, { DigitValueItem, drawDigitsFollowedArray } from "./digitImage.element";
import {drawImage, drawImageByIndex} from "./image.element";
import drawShortcutElement from "./shortcut.element";

export default function drawAlarm(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    alarm: WatchAlarm,
    watchState: WatchState,
    digitBorder: boolean,
    shortcutBorder: boolean,
    ) {

    if (alarm.alarmTime.hours.enabled) {
        if (alarm.alarmTime.minutes.enabled && alarm.alarmTime.minutes.follow) {
            let ar: DigitValueItem[] = [ {
                snumber: alarm.alarmTime.hours.paddingZero ? watchState.alarmHours.toString().padStart(2, '0') : watchState.alarmHours.toString(),
                suffix: alarm.alarmTime.hours.delimiter,
                dataType: alarm.alarmTime.hours.dataType,
            },{
                snumber: alarm.alarmTime.minutes.paddingZero ? watchState.alarmMinutes.toString().padStart(2, '0') : watchState.alarmMinutes.toString(),
                suffix: alarm.alarmTime.minutes.delimiter,
                dataType: alarm.alarmTime.minutes.dataType,
            }]
            drawDigitsFollowedArray(ctx, images, alarm.alarmTime.hours, ar, digitBorder)
        } else {
            drawDigitImage(ctx, images, alarm.alarmTime.hours, watchState.alarmHours, null, digitBorder,
                            false, null, null, null, alarm.alarmTime.hours.delimiter)
            if (alarm.alarmTime.hours.dataType && alarm.alarmTime.hours.dataTypeCoords) {
                drawImageByIndex(ctx, images, alarm.alarmTime.hours.dataType, alarm.alarmTime.hours.dataTypeCoords.X, alarm.alarmTime.hours.dataTypeCoords.Y, digitBorder)
            }
        }
    }
    if (alarm.alarmTime.minutes.enabled && !alarm.alarmTime.minutes.follow) {
        drawDigitImage(ctx, images, alarm.alarmTime.minutes, watchState.alarmMinutes, null, digitBorder, false, null, null, null, alarm.alarmTime.minutes.delimiter)
        if (alarm.alarmTime.minutes.dataType && alarm.alarmTime.minutes.dataTypeCoords) {
            drawImageByIndex(ctx, images, alarm.alarmTime.minutes.dataType, alarm.alarmTime.minutes.dataTypeCoords.X, alarm.alarmTime.minutes.dataTypeCoords.Y, digitBorder)
        }
    }

    if (watchState.alarmEnabled) {
        if ( alarm.alarmImage.enabled) drawImage(ctx, images, alarm.alarmImage.json, digitBorder)
    } else {
        if (alarm.noAlarmImage.enabled) drawImage(ctx, images, alarm.noAlarmImage.json, digitBorder)
    }
    if (alarm.shortcut.enabled)
        drawShortcutElement(ctx, alarm.shortcut.json, shortcutBorder)
}



