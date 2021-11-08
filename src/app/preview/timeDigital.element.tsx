import { IImage } from "../model/image.model";
import { WatchTime } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawDigitImage from "./digitImage.element";
import drawImage from "./image.element";
import { drawTwoDigits } from "./separateDigits.element";

export default function drawTimeDigital(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    time: WatchTime,
    watchState: WatchState,
    digitBorder: boolean
    ) {
    let followXY = null
   

    if (time.timeDigitalCommon.hours.enabled) {
        followXY = drawDigitImage(ctx, images, time.timeDigitalCommon.hours, watchState.hours, null, digitBorder,
            false, null, null, null, time.timeDigitalCommon.hours.delimiter)
        if (time.timeDigitalCommon.hours.dataType && time.timeDigitalCommon.hours.dataTypeCoords) {
            let img = findImageById(time.timeDigitalCommon.hours.dataType, images)
            if (img)
                ctx.drawImage(img, time.timeDigitalCommon.hours.dataTypeCoords.X, time.timeDigitalCommon.hours.dataTypeCoords.Y)
        }
    }
    if (time.timeDigitalCommon.minutes.enabled) {
        followXY = drawDigitImage(ctx, images, time.timeDigitalCommon.minutes, watchState.minutes, followXY, digitBorder,
            false, null, null, null, time.timeDigitalCommon.minutes.delimiter)
        if (time.timeDigitalCommon.minutes.dataType && time.timeDigitalCommon.minutes.dataTypeCoords) {
            let img = findImageById(time.timeDigitalCommon.minutes.dataType, images)
            if (img)
                ctx.drawImage(img, time.timeDigitalCommon.minutes.dataTypeCoords.X, time.timeDigitalCommon.minutes.dataTypeCoords.Y)
        }
    }
    if (time.timeDigitalCommon.seconds.enabled) {
        drawDigitImage(ctx, images, time.timeDigitalCommon.seconds, watchState.seconds, followXY, digitBorder,
            false, null, null, null, time.timeDigitalCommon.seconds.delimiter)
            if (time.timeDigitalCommon.seconds.dataType && time.timeDigitalCommon.seconds.dataTypeCoords) {
                let img = findImageById(time.timeDigitalCommon.seconds.dataType, images)
                if (img)
                    ctx.drawImage(img, time.timeDigitalCommon.seconds.dataTypeCoords.X, time.timeDigitalCommon.seconds.dataTypeCoords.Y)
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
        drawTwoDigits(ctx, images, time.timeDigitalSeparated.minutes.json, watchState.hours, 
          time.timeDigitalSeparated.paddingZeroMinutes)
        if ( time.timeDigitalSeparated.separatorMinutes?.enabled) {
            drawImage(ctx, images, time.timeDigitalSeparated.separatorMinutes.json)
        }

    }
    if (time.timeDigitalSeparated.seconds.enabled) {
        drawTwoDigits(ctx, images, time.timeDigitalSeparated.seconds.json, watchState.seconds, true)
    }
}



