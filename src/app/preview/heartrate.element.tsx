import { IImage } from "../model/image.model";
import { WatchHeartRateActivity } from "../model/watchFace.gts2mini.model";
import drawDigitImage from "./digitImage.element";
import drawIconSet from "./iconSet.element";
import {drawImage} from "./image.element";
import drawImageSet from "./imageSet.element";
import drawScale from "./scale.element";
import drawShortcutElement from "./shortcut.element";

export function drawHeartRate(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchHeartRateActivity,
    value: number,
    total: number,
    drawBorder: boolean,
    drawShortcutBorder: boolean,
    noData: boolean
    ) {
    if (!activity) return;

    if (activity.aElement.icon.enabled) {
        drawImage(ctx, images, activity.aElement.icon.json, drawBorder)
    }
    if (activity.aProgress.imageProgress.enabled) {
        drawImageSet(ctx, images, activity.aProgress.imageProgress.json, value, total, drawBorder, false);
    }
    if (activity.aProgress.iconSetProgress.enabled) {
        drawIconSet(ctx, images, activity.aProgress.iconSetProgress.json, value, total, drawBorder);
    }

    if (activity.aProgress.scale.enabled) {
        drawScale(ctx, images, activity.aProgress.scale, value, total, drawBorder);
    }
    if (activity.aElement.shortcut.enabled) {
        drawShortcutElement(ctx, activity.aElement.shortcut.json, drawShortcutBorder)
    }

    if (activity.aElement.enabled) {
        drawDigitImage(ctx, images, activity.aElement.imageNumber, value, 
        null, drawBorder, false, null,
        activity.aElement.prefix, 
        null, 
        activity.aElement.suffix,
        null,
        noData ? activity.aElement.noData : null)
    }
}