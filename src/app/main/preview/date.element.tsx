import { ElementOrderItem, WatchDate } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawDigit from "./digit.element";

export default function draw(ctx: CanvasRenderingContext2D, 
    images: HTMLImageElement[],
    date: WatchDate,
    orderElementsTime: ElementOrderItem[],
    watchState: WatchState,
    drawborder: boolean
    ) {
        let followXY = null
        orderElementsTime.forEach((item) => {
            switch (item.type) {
                case 0:
                    if (date.enableYear) {
                        followXY = drawDigit(ctx, images, date.year, watchState.year, date.year.follow ? followXY : null, drawborder)
                    }
                    break;
                case 1:
                    if (date.enableMonth) {
                        followXY = drawDigit(ctx, images, date.month, watchState.month, date.month.follow ? followXY : null, drawborder)
                    } else if (date.enableMonthAsWord) {
                        drawDigit(ctx, images, date.monthAsWord, watchState.monthasword)
                    }
                    break;
                case 2:
                    if (date.enableDay) {
                        followXY = drawDigit(ctx, images, date.day, watchState.day, date.day.follow ? followXY : null, drawborder)
                    }
                    break;
                default:
                    break;
            }
        })

        if (date.enableWeekDay) {
            drawDigit(ctx, images, date.weekDay, watchState.weekday)
        }
}
