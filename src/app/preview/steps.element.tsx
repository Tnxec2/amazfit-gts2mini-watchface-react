import { IImage } from "../model/image.model";
import { WatchStepsActivity } from "../model/watchFace.gts2mini.model";
import drawCircleProgress from "./circleProgress.element";
import drawDigitImage from "./digitImage.element";
import drawIconSet from "./iconSet.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";
import drawScale from "./scale.element";
import drawShortcutElement from "./shortcut.element";

export function drawSteps(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchStepsActivity,
    value: number,
    total: number,
    drawBorder: boolean,
    drawShortcutBorder: boolean,
    noData: boolean
    ) {
    if (!activity) return;
    if (activity.aElement.enabled) {
        drawDigitImage(ctx, images, activity.aElement.imageNumber, value, 
        null, drawBorder, false, null,
        activity.aElement.prefix, 
        null, 
        activity.aElement.suffix,
        null,
        noData ? activity.aElement.noData : null)
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
        drawScale(ctx, images, activity.aProgress.scale, value, total);
    }
    if (activity.aElement.shortcut.enabled) {
        drawShortcutElement(ctx, activity.aElement.shortcut.json, drawShortcutBorder)
    }
}