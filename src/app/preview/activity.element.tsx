import { IImage } from "../model/image.model";
import { WatchActivity } from "../model/watchFace.gts2mini.model";
import drawCircleProgress from "./circleProgress.element";
import drawDigitImage from "./digitImage.element";
import drawIconSet from "./iconSet.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";
import drawPointerProgress from "./pointerProgress.element";
import drawShortcutElement from "./shortcut.element";

export function drawActivity(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchActivity,
    value: number,
    total: number,
    drawBorder: boolean,
    drawShortcutBorder: boolean,
    ) {
    if (!activity) return;
    if (activity.aElement.enabled) {
        drawDigitImage(ctx, images, activity.aElement.imageNumber, value, 
        null, drawBorder, false, null,
        activity.aElement.prefix, 
        activity.aElement.decimalPoint, 
        activity.aElement.suffix,
        activity.aElement.suffixKM)
    }
    if (activity.aElement.icon.enabled) {
        drawImage(ctx, images, activity.aElement.icon.json)
    }
    if (activity.aProgress.imageProgress.enabled) {
        drawImageSet(ctx, images, activity.aProgress.imageProgress.json, value, total);
    }
    if (activity.aProgress.iconSetProgress.enabled) {
        drawIconSet(ctx, images, activity.aProgress.iconSetProgress.json, value, total);
    }
    if (activity.aProgress.circleScale.enabled) {
        drawCircleProgress(ctx, images, activity.aProgress.circleScale.json, value, total);
    }
    if (activity.aProgress.scale.enabled) {
        drawPointerProgress(ctx, images, activity.aProgress.scale.json, value, total);
    }
    if (activity.aElement.shortcut.enabled) {
        drawShortcutElement(ctx, activity.aElement.shortcut.json, drawShortcutBorder)
    }
}