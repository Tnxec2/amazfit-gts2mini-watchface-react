import { IImage } from "../model/image.model";
import { WatchAoDAnalogDialFace } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import drawClockHand from "./clockHand.element";

export default function drawTimeAnalogAod(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    time: WatchAoDAnalogDialFace,
    watchState: WatchState
    ) {
    if ( time.hours?.enabled) {
        if ( watchState.hours < 12)
            drawClockHand(ctx, images, time.hours, watchState.hours, 12, time.commonCenterCoordinates )
        else 
            drawClockHand(ctx, images, time.hours, watchState.hours-12, 12, time.commonCenterCoordinates  )
    }
    if ( time.minutes?.enabled) {
        drawClockHand(ctx, images, time.minutes, watchState.minutes, 60, time.commonCenterCoordinates  )
    }

}
