import { WatchDialFace } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawClockHand from "./clockHand.element";

    export default function drawTimeAnalog(ctx: CanvasRenderingContext2D, 
        images: HTMLImageElement[],
        dialFace: WatchDialFace,
        watchState: WatchState
        ) {
        if ( dialFace.enableHoursClockhand) {
            drawClockHand(ctx, images, dialFace.hoursClockhand, watchState.hours, 12 )
        }
        if ( dialFace.enableMinutesClockhand) {
            drawClockHand(ctx, images, dialFace.minutesClockhand, watchState.minutes, 60 )
        }
        if ( dialFace.enableSecondsClockhand) {
            drawClockHand(ctx, images, dialFace.secondsClockhand, watchState.seconds, 60 )
        }
    }
