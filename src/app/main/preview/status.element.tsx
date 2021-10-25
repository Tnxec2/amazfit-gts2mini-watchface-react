import { IImage } from "../../model/image.model";
import { WatchStatus } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawImageCoords from "./imageCoords.element";

export default function draw(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    status: WatchStatus,
    watchState: WatchState
    ) {
        if (status.bluetooth.enabled && !watchState.bluetooth) {
            drawImageCoords(ctx, images, status.bluetooth.json)
        }
        if (status.dnd.enabled && watchState.dnd) {
            drawImageCoords(ctx, images, status.dnd.json)
        }
        if (status.alarm.enabled && watchState.alarm) {
            drawImageCoords(ctx, images, status.alarm.json)
        }
        if (status.lock.enabled && watchState.lock) {
            drawImageCoords(ctx, images, status.lock.json)
        }
}
