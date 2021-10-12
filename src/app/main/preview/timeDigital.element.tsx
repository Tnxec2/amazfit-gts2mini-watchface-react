import { ElementOrderItem, WatchTimeDigital } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawDigit from "./digit.element";

    export default function drawTimeDigital(ctx: CanvasRenderingContext2D, 
        images: HTMLImageElement[],
        timeDigital: WatchTimeDigital,
        orderElementsTime: ElementOrderItem[],
        watchState: WatchState) {
        orderElementsTime.forEach((item) => {
            switch (item.type) {
                case 0:
                    if (timeDigital.enableHours) {
                        drawDigit(ctx, images, timeDigital.hours, watchState.hours)
                    }
                    break;
                case 1:
                    if (timeDigital.enableMinutes) {
                        drawDigit(ctx, images, timeDigital.minutes, watchState.minutes)
                    }
                    break;
                case 2:
                    if (timeDigital.enableSeconds) {
                        drawDigit(ctx, images, timeDigital.seconds, watchState.seconds)
                    }
                    break;
                default:
                    break;
            }
        })
    }
