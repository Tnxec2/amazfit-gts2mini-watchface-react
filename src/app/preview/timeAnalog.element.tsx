import { IImage } from "../model/image.model";
import { WatchTime } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import drawClockHand from "./clockHand.element";

    export default function drawTimeAnalog(ctx: CanvasRenderingContext2D, 
        images: IImage[],
        time: WatchTime,
        watchState: WatchState,
        width: number,
        height: number
        ) {
        if ( time.timeAnalog.hours?.enabled) {
            if ( watchState.hours < 12)
                drawClockHand(ctx, images, time.timeAnalog.hours, watchState.hours, 12, time.timeAnalog.commonCenterCoordinates, width, height )
            else 
                drawClockHand(ctx, images, time.timeAnalog.hours, watchState.hours-12, 12, time.timeAnalog.commonCenterCoordinates, width, height  )
        }
        if ( time.timeAnalog.minutes?.enabled) {
            drawClockHand(ctx, images, time.timeAnalog.minutes, watchState.minutes, 60, time.timeAnalog.commonCenterCoordinates, width, height  )
        }
        if ( time.timeAnalog.seconds?.enabled) {
            drawClockHand(ctx, images, time.timeAnalog.seconds, watchState.seconds, 60, time.timeAnalog.commonCenterCoordinates, width, height  )
        }
    }
