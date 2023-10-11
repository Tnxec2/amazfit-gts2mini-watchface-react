import { IImage } from "../model/image.model";
import { WatchBattery } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import drawDigitImage from "./digitImage.element";
import drawIconSet from "./iconSet.element";
import {drawImage} from "./image.element";
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

    if (battery.imageProgress.enabled) {
        drawImageSet(ctx, images, battery.imageProgress.json, watchState.battery, watchState.batteryGoal, drawBorder, false);
    }
    if (battery.iconSetProgress.enabled) {
        drawIconSet(ctx, images, battery.iconSetProgress.json, watchState.battery, watchState.batteryGoal, drawBorder);
    }
    if (battery.scale.enabled) {
        drawScale(ctx, images, battery.scale, watchState.battery, watchState.batteryGoal, drawBorder);
    }
    if (battery.text.enabled) {
        drawDigitImage(ctx, images, battery.text.imageNumber, watchState.battery, null, drawBorder, false, null,
            battery.text.prefix, null, battery.text.suffix, null, null) 
    }
    if (battery.icon.enabled) {
        drawImage(ctx, images, battery.icon.json, drawBorder)
    }
}