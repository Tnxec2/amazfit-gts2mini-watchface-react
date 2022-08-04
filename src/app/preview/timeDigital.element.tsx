import { IImage } from "../model/image.model";
import { WatchTime } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawDigitImage, { DigitValueItem, drawDigitsFollowedArray } from "./digitImage.element";
import drawImage from "./image.element";
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
            if (time.timeDigitalCommon.hours.dataType && time.timeDigitalCommon.hours.delimiterCoords) {
                let img = findImageById(time.timeDigitalCommon.hours.dataType, images)
                if (img) ctx.drawImage(img, time.timeDigitalCommon.hours.delimiterCoords.X, time.timeDigitalCommon.hours.delimiterCoords.Y)
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
            if (time.timeDigitalCommon.minutes.dataType && time.timeDigitalCommon.minutes.delimiterCoords) {
                let img = findImageById(time.timeDigitalCommon.minutes.dataType, images)
                if (img) ctx.drawImage(img, time.timeDigitalCommon.minutes.delimiterCoords.X, time.timeDigitalCommon.minutes.delimiterCoords.Y)
            }
        }
    }
    if (time.timeDigitalCommon.seconds.enabled && !time.timeDigitalCommon.seconds.follow) {
        drawDigitImage(ctx, images, time.timeDigitalCommon.seconds, watchState.seconds, null, digitBorder, false, null, null, null, time.timeDigitalCommon.seconds.delimiter)
        if (time.timeDigitalCommon.seconds.dataType && time.timeDigitalCommon.seconds.delimiterCoords) {
            let img = findImageById(time.timeDigitalCommon.seconds.dataType, images)
            if (img) ctx.drawImage(img, time.timeDigitalCommon.seconds.delimiterCoords.X, time.timeDigitalCommon.seconds.delimiterCoords.Y)
        }
    }
   
    if (time.timeDigitalSeparated.hours.enabled) {
        drawTwoDigits(ctx, images, time.timeDigitalSeparated.hours.json, watchState.hours, 
          time.timeDigitalSeparated.paddingZeroHours)
        if ( time.timeDigitalSeparated.separatorHours?.enabled) {
            drawImage(ctx, images, time.timeDigitalSeparated.separatorHours.json)
        }
    }
    if (time.timeDigitalSeparated.minutes.enabled) {
        drawTwoDigits(ctx, images, time.timeDigitalSeparated.minutes.json, watchState.minutes, 
          time.timeDigitalSeparated.paddingZeroMinutes)
        if ( time.timeDigitalSeparated.separatorMinutes?.enabled) {
            drawImage(ctx, images, time.timeDigitalSeparated.separatorMinutes.json)
        }

    }
    if (time.timeDigitalSeparated.seconds.enabled) {
        drawTwoDigits(ctx, images, time.timeDigitalSeparated.seconds.json, watchState.seconds, true)
    }
}



