import { IImage } from "../model/image.model";
import { WatchDialFace } from "../model/watchFace.model";
import { WatchState } from "../model/watchState";
import drawClockHand from "./clockHand.element";

    export default function drawTimeAnalog(ctx: CanvasRenderingContext2D, 
        images: IImage[],
        dialFace: WatchDialFace,
        watchState: WatchState
        ) {
        if ( dialFace.hoursClockhand?.enabled) {
            if ( watchState.hours < 12)
                drawClockHand(ctx, images, dialFace.hoursClockhand, watchState.hours, 12 )
            else 
            drawClockHand(ctx, images, dialFace.hoursClockhand, watchState.hours-12, 12 )
        }
        if ( dialFace.minutesClockhand?.enabled) {
            drawClockHand(ctx, images, dialFace.minutesClockhand, watchState.minutes, 60 )
        }
        if ( dialFace.secondsClockhand?.enabled) {
            drawClockHand(ctx, images, dialFace.secondsClockhand, watchState.seconds, 60 )
        }
    }
