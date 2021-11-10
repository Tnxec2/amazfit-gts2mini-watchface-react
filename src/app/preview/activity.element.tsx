import { IImage } from "../model/image.model";
import { WatchActivity, WatchNumber } from "../model/watchFace.gts2mini.model";
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
        drawDigitImage(ctx, images, new WatchNumber(activity.aElement.json.ImageNumber), value, 
        null, drawBorder, false, null,
        activity.aElement.json.PrefixImageIndex, 
        activity.aElement.json.DecimalPointImageIndex, 
        activity.aElement.json.SuffixImageIndex,
        activity.aElement.json.SuffixKMImageIndex)
    }
    if (activity.aElement.json.Icon?.ImageIndex >= 0) {
        drawImage(ctx, images, activity.aElement.json.Icon)
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
    if (activity.aElement.json.Shortcut) {
        drawShortcutElement(ctx, activity.aElement.json.Shortcut, drawShortcutBorder)
    }
}