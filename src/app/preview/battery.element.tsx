import { IImage } from "../model/image.model";
import { WatchBattery, WatchNumber } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawDigitImage from "./digitImage.element";
import drawImageSet from "./imageSet.element";

export function drawBattery(ctx: CanvasRenderingContext2D,
    images: IImage[],
    battery: WatchBattery,
    watchState: WatchState,
    drawBorder: boolean,
    drawShortcutBorder: boolean,
    ) {
    if (!battery) return;
    if (battery.text.enabled) {
        drawDigitImage(ctx, images, new WatchNumber(battery.text.json.ImageNumber), watchState.battery, null, drawBorder, false, null,
            battery.text.json.PrefixImageIndex, null, battery.text.json.SuffixImageIndex)
    }
    if (battery.icon.enabled) {
        if (battery.icon.json.ImageIndex) {
            let img = findImageById(battery.icon.json.ImageIndex, images)
            if (img) ctx.drawImage(img, battery.icon.json.X, battery.icon.json.Y)
        }
    }
    if (battery.imageProgress) {
        drawImageSet(ctx, images, battery.imageProgress.json, watchState.battery, watchState.batteryGoal);
    }
}