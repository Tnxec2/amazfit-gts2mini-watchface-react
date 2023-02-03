import { IImage } from "../model/image.model";
import { WatchStandUpActivity } from "../model/watchFace.gts2mini.model";
import drawDigitImage from "./digitImage.element";
import drawIconSet from "./iconSet.element";
import drawImage from "./image.element";
import drawImageSet from "./imageSet.element";
import drawShortcutElement from "./shortcut.element";

export function drawStandUp(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchStandUpActivity,
    value: number,
    total: number,
    drawBorder: boolean,
    drawShortcutBorder: boolean,
    ) {
    if (!activity) return;
    if (activity.aElement.enabled) {
        drawDigitImage(ctx, images, activity.aElement.imageNumber, value, 
        null, drawBorder, false, null,
        null, 
        null, 
        activity.aElement.suffix,
        null)
    }
    if (activity.aElement.icon.enabled) {
        drawImage(ctx, images, activity.aElement.icon.json)
    }
    if (activity.aProgress.imageProgress.enabled) {
        drawImageSet(ctx, images, activity.aProgress.imageProgress.json, value, total);
    }
    if (activity.aProgress.iconsetProgress.enabled) {
        drawIconSet(ctx, images, activity.aProgress.iconsetProgress.json, value, total);
    }
    
    if (activity.aElement.shortcut.enabled) {
        drawShortcutElement(ctx, activity.aElement.shortcut.json, drawShortcutBorder)
    }
}