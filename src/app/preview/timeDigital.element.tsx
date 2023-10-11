import { IImage } from "../model/image.model";
import { WatchTime } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import drawDigitImage, { DigitValueItem, drawDigitsFollowedArray } from "./digitImage.element";
import {drawImage, drawImageByIndex} from "./image.element";
import { drawTwoDigits } from "./separateDigits.element";

export default function drawTimeDigital(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    time: WatchTime,
    watchState: WatchState,
    digitBorder: boolean
    ) {

    if (time.timeDigitalCommon.hours.enabled) {
        if (time.timeDigitalCommon.minutes.enabled && time.timeDigitalCommon.minutes.follow) {
            let ar: DigitValueItem[] = [ {
                snumber: time.timeDigitalCommon.hours.paddingZero ? watchState.hours.toString().padStart(2, '0') : watchState.hours.toString(),
                suffix: time.timeDigitalCommon.hours.delimiter,
                dataType: time.timeDigitalCommon.hours.dataType,
            },{
                snumber: time.timeDigitalCommon.minutes.paddingZero ? watchState.minutes.toString().padStart(2, '0') : watchState.minutes.toString(),
                suffix: time.timeDigitalCommon.minutes.delimiter,
                dataType: time.timeDigitalCommon.minutes.dataType,
            }]
            if (time.timeDigitalCommon.seconds.enabled && time.timeDigitalCommon.seconds.follow) {
                ar.push({
                    snumber: time.timeDigitalCommon.seconds.paddingZero ? watchState.seconds.toString().padStart(2, '0') : watchState.seconds.toString(),
                    suffix: time.timeDigitalCommon.seconds.delimiter,
                    dataType: time.timeDigitalCommon.seconds.dataType,
                })
            }
            drawDigitsFollowedArray(ctx, images, time.timeDigitalCommon.hours, ar, digitBorder)
        } else {
            drawDigitImage(ctx, images, time.timeDigitalCommon.hours, watchState.hours, null, digitBorder,
                            false, null, null, null, time.timeDigitalCommon.hours.delimiter)
            if (time.timeDigitalCommon.hours.dataType && time.timeDigitalCommon.hours.dataTypeCoords) { 
                drawImageByIndex(ctx, images, time.timeDigitalCommon.hours.dataType, 
                    time.timeDigitalCommon.hours.dataTypeCoords.X, time.timeDigitalCommon.hours.dataTypeCoords.Y, digitBorder)
            }
        }
    }
    if (time.timeDigitalCommon.minutes.enabled && !time.timeDigitalCommon.minutes.follow) {
        if (time.timeDigitalCommon.seconds.enabled && time.timeDigitalCommon.seconds.follow) {
            let ar: DigitValueItem[] = [{
                snumber: time.timeDigitalCommon.minutes.paddingZero ? watchState.minutes.toString().padStart(2, '0') : watchState.minutes.toString(),
                suffix: time.timeDigitalCommon.minutes.delimiter,
                dataType: time.timeDigitalCommon.minutes.dataType,
            },{
                snumber: time.timeDigitalCommon.seconds.paddingZero ? watchState.seconds.toString().padStart(2, '0') : watchState.seconds.toString(),
                suffix: time.timeDigitalCommon.seconds.delimiter,
                dataType: time.timeDigitalCommon.seconds.dataType,
            }];
            drawDigitsFollowedArray(ctx, images, time.timeDigitalCommon.minutes, ar, digitBorder)
        } else {
            drawDigitImage(ctx, images, time.timeDigitalCommon.minutes, watchState.minutes, null, digitBorder, false, null, null, null, time.timeDigitalCommon.minutes.delimiter)
            if (time.timeDigitalCommon.minutes.dataType && time.timeDigitalCommon.minutes.dataTypeCoords) {
                drawImageByIndex(ctx, images, time.timeDigitalCommon.minutes.dataType, 
                    time.timeDigitalCommon.minutes.dataTypeCoords.X, time.timeDigitalCommon.minutes.dataTypeCoords.Y, digitBorder)
            }
        }
    }
    if (time.timeDigitalCommon.seconds.enabled && !time.timeDigitalCommon.seconds.follow) {
        drawDigitImage(ctx, images, time.timeDigitalCommon.seconds, watchState.seconds, null, digitBorder, false, null, null, null, time.timeDigitalCommon.seconds.delimiter)
        if (time.timeDigitalCommon.seconds.dataType && time.timeDigitalCommon.seconds.dataTypeCoords) {
            drawImageByIndex(ctx, images, time.timeDigitalCommon.seconds.dataType, 
                time.timeDigitalCommon.seconds.dataTypeCoords.X, time.timeDigitalCommon.seconds.dataTypeCoords.Y, digitBorder)
        }
    }
   
    if (time.timeDigitalSeparated.hours.enabled) {
        drawTwoDigits(ctx, images, time.timeDigitalSeparated.hours.json, watchState.hours, time.timeDigitalSeparated.paddingZeroMinutes, digitBorder)
        if ( time.timeDigitalSeparated.separatorHours?.enabled) {
            drawImage(ctx, images, time.timeDigitalSeparated.separatorHours.json, digitBorder)
        }
    }
    if (time.timeDigitalSeparated.minutes.enabled) {
        drawTwoDigits(ctx, images, time.timeDigitalSeparated.minutes.json, watchState.minutes, 
          time.timeDigitalSeparated.paddingZeroMinutes, digitBorder)
        if ( time.timeDigitalSeparated.separatorMinutes?.enabled) {
            drawImage(ctx, images, time.timeDigitalSeparated.separatorMinutes.json, digitBorder)
        }

    }
    if (time.timeDigitalSeparated.seconds.enabled) {
        drawTwoDigits(ctx, images, time.timeDigitalSeparated.seconds.json, watchState.seconds, true, digitBorder)
    }
}



