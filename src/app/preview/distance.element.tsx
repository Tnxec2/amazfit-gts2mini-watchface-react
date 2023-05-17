import { IImage } from "../model/image.model";
import { WatchDistanceActivity} from "../model/watchFace.gts2mini.model";
import { findImageById } from "../shared/helper";
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
        !activity.aElement.separattedSuffix ? (activity.aElement.suffixKM || activity.aElement.suffixMI) : null)
        if (activity.aElement.separattedSuffix && activity.aElement.suffixImageCoordinates) {
            let x = activity.aElement.suffixImageCoordinates.X ? activity.aElement.suffixImageCoordinates.X : 0
            let y = activity.aElement.suffixImageCoordinates.Y ? activity.aElement.suffixImageCoordinates.Y : 0
            const img = findImageById(activity.aElement.suffixKM || activity.aElement.suffixMI, images)
            if (img) ctx.drawImage(img, x, y);
        }
    }
    if (activity.aElement.icon.enabled) {
        drawImage(ctx, images, activity.aElement.icon.json)
    }

    if (activity.aElement.shortcut.enabled) {
        drawShortcutElement(ctx, activity.aElement.shortcut.json, drawShortcutBorder)
    }
}