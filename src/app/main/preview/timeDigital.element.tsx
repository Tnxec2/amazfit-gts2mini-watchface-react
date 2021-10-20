import { IImage } from "../../model/image.model";
import { ElementOrderItem, WatchDialFace } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawDigit from "./digit.element";

    export default function drawTimeDigital(
        ctx: CanvasRenderingContext2D, 
        images: IImage[],
        timeDigital: WatchDialFace,
        orderElementsTime: ElementOrderItem[],
        watchState: WatchState,
        digitBorder: boolean
        ) {
        let followXY = null
        orderElementsTime.forEach((item) => {
            switch (item.type) {
                case 0:
                    if (timeDigital.hoursDigital.enabled) {
                        followXY = drawDigit(ctx, images, timeDigital.hoursDigital, watchState.hours, timeDigital.hoursDigital.follow ? followXY : null, digitBorder)
                    }
                    break;
                case 1:
                    if (timeDigital.minutesDigital.enabled) {
                        followXY = drawDigit(ctx, images, timeDigital.minutesDigital, watchState.minutes, timeDigital.minutesDigital.follow ? followXY : null, digitBorder, true)
                    }
                    break;
                case 2:
                    if (timeDigital.secondsDigital.enabled) {
                        followXY = drawDigit(ctx, images, timeDigital.secondsDigital, watchState.seconds, timeDigital.secondsDigital.follow ? followXY : null, digitBorder, true)
                    }
                    break;
                default:
                    break;
            }
        })
    }
