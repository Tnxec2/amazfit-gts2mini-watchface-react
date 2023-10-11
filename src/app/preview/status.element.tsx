import { IImage } from "../model/image.model";
import { WatchStatus } from "../model/watchFace.gts2mini.model";

import { WatchState } from "../model/watchState";
import drawSwitch from "./switch.element";

export default function draw(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    status: WatchStatus,
    watchState: WatchState,
    drawBorder: boolean
    ) {
        if (status.bluetooth.enabled) {
            drawSwitch(ctx, images, status.bluetooth.json, watchState.bluetooth, drawBorder)
        }
        if (status.doNotDisturb.enabled) {
            drawSwitch(ctx, images, status.doNotDisturb.json, watchState.dnd, drawBorder)
        }
        if (status.alarm.enabled) {
            drawSwitch(ctx, images, status.alarm.json, watchState.alarm, drawBorder)
        }
        if (status.lock.enabled) {
            drawSwitch(ctx, images, status.lock.json, watchState.lock, drawBorder)
        }
}
