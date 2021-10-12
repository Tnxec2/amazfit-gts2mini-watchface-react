import { ElementOrderItem, WatchDate } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawDigit from "./digit.element";

export default function draw(ctx: CanvasRenderingContext2D, 
    images: HTMLImageElement[],
    date: WatchDate,
    orderElementsTime: ElementOrderItem[],
    watchState: WatchState) {
        orderElementsTime.forEach((item) => {
            switch (item.type) {
                case 0:
                    if (date.enableYear) {
                        drawDigit(ctx, images, date.year, watchState.year)
                    }
                    break;
                case 1:
                    if (date.enableMonth) {
                        drawDigit(ctx, images, date.month, watchState.month)
                    } else if (date.enableMonthAsWord) {
                        drawDigit(ctx, images, date.monthAsWord, watchState.monthasword)
                    }
                    break;
                case 2:
                    if (date.enableDay) {
                        drawDigit(ctx, images, date.day, watchState.day)
                    }
                    break;
                default:
                    break;
            }
        })

        if (date.enableWeekDay) {
            drawDigit(ctx, images, date.weekDay, this.state.watchState.weekday)
        }
}
