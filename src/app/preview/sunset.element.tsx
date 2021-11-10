import { IImage } from "../model/image.model";
import { WatchSunset } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import { drawDigitsOneLine } from "./digitImage.element";
import drawImage from "./image.element";
import drawShortcutElement from "./shortcut.element";

export default function drawSunset(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    sunset: WatchSunset,
    watchState: WatchState,
    digitBorder: boolean,
    shortcutBorder: boolean,
    ) {

    if (sunset.sunsetOneLine.enabled) {
        let ar = [
            sunset.sunsetOneLine.paddingZero ? watchState.sunsetHours.toString().padStart(2, '0') : watchState.sunsetHours.toString(),
            sunset.sunsetOneLine.paddingZero ? watchState.sunsetMinutes.toString().padStart(2, '0') : watchState.sunsetMinutes.toString(),
        ]
        drawDigitsOneLine(ctx, images, sunset.sunsetOneLine, ar, sunset.sunsetOneLine.delimiter, digitBorder, null, sunset.sunsetOneLine.prefix, null)
    }
    if (sunset.sunriseOneLine.enabled) {
        let ar = [
            sunset.sunriseOneLine.paddingZero ? watchState.sunriseHours.toString().padStart(2, '0') : watchState.sunriseHours.toString(),
            sunset.sunriseOneLine.paddingZero ? watchState.sunriseMinutes.toString().padStart(2, '0') : watchState.sunriseMinutes.toString(),
        ]
        drawDigitsOneLine(ctx, images, sunset.sunriseOneLine, ar, sunset.sunriseOneLine.delimiter, digitBorder, null, sunset.sunriseOneLine.prefix, null)
    }
    
    if ( sunset.sunsetIcon.enabled) drawImage(ctx, images, sunset.sunsetIcon.json)
    if ( sunset.sunriseIcon.enabled) drawImage(ctx, images, sunset.sunriseIcon.json)
    if ( sunset.sunsetShortcut.enabled)
        drawShortcutElement(ctx, sunset.sunsetShortcut.json, shortcutBorder)
    if ( sunset.sunriseShortcut.enabled)
        drawShortcutElement(ctx, sunset.sunriseShortcut.json, shortcutBorder)
}



