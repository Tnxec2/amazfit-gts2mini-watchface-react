import { IImage } from "../model/image.model";
import { WatchDistanceActivity} from "../model/watchFace.gts2mini.model";
import drawDigitImage from "./digitImage.element";
import drawImage from "./image.element";
import drawShortcutElement from "./shortcut.element";

export function drawDistance(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchDistanceActivity,
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
        activity.aElement.decimalPoint, 
        null,
        activity.aElement.suffixKM || activity.aElement.suffixMI)
    }
    if (activity.aElement.icon.enabled) {
        drawImage(ctx, images, activity.aElement.icon.json)
    }

    if (activity.aElement.shortcut.enabled) {
        drawShortcutElement(ctx, activity.aElement.shortcut.json, drawShortcutBorder)
    }
}