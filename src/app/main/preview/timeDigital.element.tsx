import { IImage } from "../../model/image.model";
import { FollowType } from "../../model/types.model";
import { ElementOrderItem, WatchDialFace } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawDigit from "./digit.element";
import drawMultilangImageCoords from "./multiLangImageCoords.element";

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
                    if (timeDigital.hoursDigital?.enabled) {
                        followXY = drawDigit(ctx, images, timeDigital.hoursDigital, watchState.hours, timeDigital.hoursDigital.json.CombingMode === FollowType.Follow.json ? followXY : null, digitBorder)
                    }
                    break;
                case 1:
                    if (timeDigital.minutesDigital?.enabled) {
                        followXY = drawDigit(ctx, images, timeDigital.minutesDigital, watchState.minutes, timeDigital.minutesDigital.json.CombingMode === FollowType.Follow.json ? followXY : null, digitBorder, true)
                    }
                    break;
                case 2:
                    if (timeDigital.secondsDigital?.enabled) {
                        followXY = drawDigit(ctx, images, timeDigital.secondsDigital, watchState.seconds, timeDigital.secondsDigital.json.CombingMode === FollowType.Follow.json ? followXY : null, digitBorder, true)
                    }
                    break;
                default:
                    break;
            }
        })
        if (timeDigital.am && watchState.hours < 12) {
            drawMultilangImageCoords(ctx, images, timeDigital.am)
        }
        if (timeDigital.pm && watchState.hours >= 12) {
            drawMultilangImageCoords(ctx, images, timeDigital.pm)
        }
    }
