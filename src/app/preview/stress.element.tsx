import { IImage } from "../model/image.model";
import {  WatchStressActivity } from "../model/watchFace.gts2mini.model";
import drawDigitImage from "./digitImage.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";

export function drawStress(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchStressActivity,
    value: number,
    total: number,
    drawBorder: boolean,
    drawShortcutBorder: boolean,
    ) {
    if (!activity) return;

    if (activity.aProgress.backgroundLayerImage.enabled) {
        drawImage(ctx, images, activity.aProgress.backgroundLayerImage.json);
    }
    if (activity.aProgress.imageProgress.enabled) {
        drawImageSet(ctx, images, activity.aProgress.imageProgress.json, value, total);
    }
    if (activity.aNumber.enabled) {
        drawDigitImage(ctx, images, activity.aNumber.imageNumber, value, 
        null, drawBorder, false, null, 
        activity.aNumber.prefix, 
        null, 
        null,
        null)
    }

}