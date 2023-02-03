import { IImage } from "../model/image.model";
import { WatchAodStepsActivity } from "../model/watchFace.gts2mini.model";
import drawDigitImage from "./digitImage.element";

export function drawStepsAod(ctx: CanvasRenderingContext2D,
    images: IImage[],
    activity: WatchAodStepsActivity,
    value: number,
    drawBorder: boolean,
    ) {
    if (!activity) return;
    if (activity.aElement.enabled) {
        drawDigitImage(ctx, images, activity.aElement.imageNumber, value, 
        null, drawBorder, false, null,
        activity.aElement.prefix, 
        null, 
        activity.aElement.suffix,
        null)
    }
}