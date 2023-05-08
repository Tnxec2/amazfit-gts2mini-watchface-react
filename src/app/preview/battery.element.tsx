import { IImage } from "../model/image.model";
import { WatchBattery } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawDigitImage from "./digitImage.element";
import drawIconSet from "./iconSet.element";
import drawImageSet from "./imageSet.element";
import drawScale from "./scale.element";

export function drawBattery(ctx: CanvasRenderingContext2D,
    images: IImage[],
    battery: WatchBattery,
    watchState: WatchState,
    drawBorder: boolean,
    drawShortcutBorder: boolean,
    ) {
    if (!battery) return;
    if (battery.text.enabled) {
        drawDigitImage(ctx, images, battery.text.imageNumber, watchState.battery, null, drawBorder, false, null,
            battery.text.prefix, null, battery.text.suffix, null, watchState.batteryNoData ? battery.text.noData : null) 
    }
    if (battery.icon.enabled) {
        if (battery.icon.json.ImageIndex) {
            let img = findImageById(battery.icon.json.ImageIndex, images)
            if (img) ctx.drawImage(img, battery.icon.json.X, battery.icon.json.Y)
        }
    }
    if (battery.imageProgress.enabled) {
        drawImageSet(ctx, images, battery.imageProgress.json, watchState.battery, watchState.batteryGoal);
    }
    if (battery.iconSetProgress.enabled) {
        drawIconSet(ctx, images, battery.iconSetProgress.json, watchState.battery, watchState.batteryGoal);
    }
    if (battery.scale.enabled) {
        drawScale(ctx, images, battery.scale, watchState.battery, watchState.batteryGoal);
    }

}