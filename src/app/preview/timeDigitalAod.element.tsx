import { IImage } from "../model/image.model";
import { WatchAodTime } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import drawDigitImage, { DigitValueItem, drawDigitsFollowedArray } from "./digitImage.element";
import {drawImage, drawImageByIndex} from "./image.element";
import { drawTwoDigits } from "./separateDigits.element";

export default function drawTimeDigitalAod(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    time: WatchAodTime,
    watchState: WatchState,
    digitBorder: boolean
    ) {

    if (time.timeDigital.hours.enabled) {
        if (time.timeDigital.minutes.enabled && time.timeDigital.minutes.follow) {
            let ar: DigitValueItem[] = [ {
                snumber: time.timeDigital.hours.paddingZero ? watchState.hours.toString().padStart(2, '0') : watchState.hours.toString(),
                suffix: time.timeDigital.hours.delimiter,
                dataType: time.timeDigital.hours.dataType,
            },{
                snumber: time.timeDigital.minutes.paddingZero ? watchState.minutes.toString().padStart(2, '0') : watchState.minutes.toString(),
                suffix: time.timeDigital.minutes.delimiter,
                dataType: time.timeDigital.minutes.dataType,
            }]
            drawDigitsFollowedArray(ctx, images, time.timeDigital.hours, ar, digitBorder)
        } else {
            drawDigitImage(ctx, images, time.timeDigital.hours, watchState.hours, null, digitBorder,
                            false, null, null, null, time.timeDigital.hours.delimiter)
            if (time.timeDigital.hours.dataType && time.timeDigital.hours.dataTypeCoords) {
                drawImageByIndex(ctx, images, time.timeDigital.hours.dataType, 
                    time.timeDigital.hours.dataTypeCoords.X, time.timeDigital.hours.dataTypeCoords.Y, digitBorder)
            }
        }
    }
    if (time.timeDigital.minutes.enabled && !time.timeDigital.minutes.follow) {
        drawDigitImage(ctx, images, time.timeDigital.minutes, watchState.minutes, null, digitBorder, false, null, null, null, time.timeDigital.minutes.delimiter)
        if (time.timeDigital.minutes.dataType && time.timeDigital.minutes.dataTypeCoords) {
            drawImageByIndex(ctx, images, time.timeDigital.minutes.dataType,
                time.timeDigital.minutes.dataTypeCoords.X, time.timeDigital.minutes.dataTypeCoords.Y, digitBorder)
        }
    }

    if (time.timeSeparateDigits.hours.enabled) {
        drawTwoDigits(ctx, images, time.timeSeparateDigits.hours.json, watchState.hours, 
          time.timeSeparateDigits.paddingZero, digitBorder) 
        if ( time.timeSeparateDigits.separator?.enabled) {
            drawImage(ctx, images, time.timeSeparateDigits.separator.json, digitBorder)
        }
    }
    if (time.timeSeparateDigits.minutes.enabled) {
        drawTwoDigits(ctx, images, time.timeSeparateDigits.minutes.json, watchState.minutes, 
          time.timeSeparateDigits.paddingZero, digitBorder)
    }

    if (time.amPm.enabled) {
        if (watchState.hours < 12) {
            drawImageByIndex(ctx, images, time.amPm.json.AmImageIndexEN,
                time.amPm.json.CommonX ? time.amPm.json.CommonX : ( time.amPm.json.CoordinatesAM  ? time.amPm.json.CoordinatesAM.X : 0 ),
                time.amPm.json.CommonY ? time.amPm.json.CommonY : ( time.amPm.json.CoordinatesAM  ? time.amPm.json.CoordinatesAM.Y : 0 ),
                digitBorder)
        } else {
            drawImageByIndex(ctx, images, time.amPm.json.PmImageIndexEN,
                time.amPm.json.CommonX ? time.amPm.json.CommonX : ( time.amPm.json.CoordinatesPM  ? time.amPm.json.CoordinatesPM.X : 0 ),
                time.amPm.json.CommonY ? time.amPm.json.CommonY : ( time.amPm.json.CoordinatesPM  ? time.amPm.json.CoordinatesPM.Y : 0 ),
                digitBorder)
        }
    }
}
