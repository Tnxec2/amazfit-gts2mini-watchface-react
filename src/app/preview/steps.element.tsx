import { IImage } from "../model/image.model";
import { WatchStepsActivity } from "../model/watchFace.gts2mini.model";
import drawCircleProgress from "./circleProgress.element";
import drawDigitImage, { drawDigitsOneLine } from "./digitImage.element";
import drawIconSet from "./iconSet.element";
import {drawImage} from "./image.element";
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
    if (activity.aProgress.circleScale.enabled) {
        drawCircleProgress(ctx, images, activity.aProgress.circleScale.json, value, total);
    }
    if (activity.aProgress.scale.enabled) {
        drawScale(ctx, images, activity.aProgress.scale, value, total, drawBorder);
    }

    if (activity.aElement.enabled) {
        if (activity.aElement.prefix && activity.aElement.suffix) { // both prefix and suffix -> show both normaly, no total
            drawDigitImage(ctx, images, activity.aElement.imageNumber, value, 
                null, drawBorder, false, null,
                activity.aElement.prefix, 
                null, 
                activity.aElement.suffix,
                null,
                )
        } else if (activity.aElement.prefix && !activity.aElement.suffix) { // only prefix -> show prefix as suffix, no total
            drawDigitImage(ctx, images, activity.aElement.imageNumber, value, 
                null, drawBorder, false, null,
                null, 
                null, 
                activity.aElement.prefix,
                null,
                )
        } else if (activity.aElement.suffix  && !activity.aElement.prefix) { // only suffix -> show suffix as prefix, no total
            drawDigitImage(ctx, images, activity.aElement.imageNumber, value, 
                null, drawBorder, false, null,
                activity.aElement.suffix, 
                null, 
                null,
                null,
                )
        } else if (activity.aElement.delimiterTotal) { // delimitertotal work only without suffix and prefix
            drawDigitsOneLine(ctx, images, activity.aElement.imageNumber, 
                [ value.toString(), total.toString()], 
                activity.aElement.delimiterTotal,
                drawBorder,
                null,
                null,
                null)
        } else {
            drawDigitImage(ctx, images, activity.aElement.imageNumber, value, 
            null, drawBorder, false, null,
            activity.aElement.prefix, 
            null, 
            activity.aElement.suffix,
            null,
            )
        }
    }

    if (activity.aElement.shortcut.enabled) {
        drawShortcutElement(ctx, activity.aElement.shortcut.json, drawShortcutBorder)
    }
}