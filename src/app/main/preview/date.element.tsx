import { IImage } from "../../model/image.model";
import { FollowType } from "../../model/json.model";
import { ElementOrderItem, WatchDate } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawDigit from "./digit.element";

export default function draw(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    date: WatchDate,
    orderElementsTime: ElementOrderItem[],
    watchState: WatchState,
    drawborder: boolean
    ) {
        let followXY = null
        orderElementsTime.forEach((item) => {
            switch (item.type) {
                case 0:
                    if (date.year.enabled) {
                        followXY = drawDigit(ctx, images, date.year, watchState.year, date.year.json.CombingMode === FollowType.Follow.json ? followXY : null, drawborder)
                    }
                    break;
                case 1:
                    if (date.month.enabled) {
                        followXY = drawDigit(ctx, images, date.month, watchState.month, date.month.json.CombingMode === FollowType.Follow.json ? followXY : null, drawborder)
                    } else if (date.monthAsWord.enabled) {
                        drawDigit(ctx, images, date.monthAsWord, watchState.monthasword)
                    }
                    break;
                case 2:
                    if (date.day.enabled) {
                        followXY = drawDigit(ctx, images, date.day, watchState.day, date.day.json.CombingMode === FollowType.Follow.json ? followXY : null, drawborder)
                    }
                    break;
                default:
                    break;
            }
        })

        if (date.weekDay.enabled) {
            drawDigit(ctx, images, date.weekDay, watchState.weekday)
        }
}
