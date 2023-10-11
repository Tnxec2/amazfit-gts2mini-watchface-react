import { IImage } from "../model/image.model";
import { WatchAodDate, WatchAodDateOneLine, WatchImageSet } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import drawDigitImage, { DigitValueItem, drawDigitsFollowedArray, drawDigitsOneLine } from "./digitImage.element";
import { drawImageByIndex } from "./image.element";
import drawImageSet from "./imageSet.element";


export default function drawDateAod(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    date: WatchAodDate,
    dateOneLine: WatchAodDateOneLine,
    weekday: WatchImageSet,
    watchState: WatchState,
    drawborder: boolean
    ) {
        
    if (dateOneLine.monthAndDay.enabled) {
        if (dateOneLine.monthAndDay.enabled) {
            let ar = [
                dateOneLine.monthAndDay.paddingZero ? watchState.month.toString().padStart(2, '0') : watchState.month.toString(),
                dateOneLine.monthAndDay.paddingZero ? watchState.day.toString().padStart(2, '0') : watchState.day.toString()
            ]
            drawDigitsOneLine(ctx, images, dateOneLine.monthAndDay, ar, dateOneLine.separatorImageIndex, drawborder)
        }
    } else {
        if (date.month.enabled) {
            if (date.day.enabled && date.day.follow) {
                let ar: DigitValueItem[] = [{
                    snumber: date.month.paddingZero ? watchState.month.toString().padStart(2, '0') : watchState.month.toString(),
                    suffix: date.month.dataType
                },{
                    snumber: date.day.paddingZero ? watchState.day.toString().padStart(2, '0') : watchState.day.toString(),
                    suffix: date.day.dataType
                }];
                drawDigitsFollowedArray(ctx, images, date.month, ar, drawborder)
            } else {
                drawDigitImage(ctx, images, date.month, watchState.month, null, drawborder, false, null, null, null, date.month.delimiter)
            }
        } 
        if (date.day.enabled && !date.day.follow) {
            drawDigitImage(ctx, images, date.day, watchState.day, null, drawborder, true, null, null, null, date.day.delimiter)
        }
        if (date.day.enabled && date.day.dataType && date.day.dataTypeCoords) {
            drawImageByIndex(ctx, images, date.day.dataType, date.day.dataTypeCoords.X, date.day.dataTypeCoords.Y, drawborder)
        }
        if (date.month.enabled && date.month.dataType && date.month.dataTypeCoords) {
            drawImageByIndex(ctx, images, date.month.dataType, date.month.dataTypeCoords.X, date.month.dataTypeCoords.Y, drawborder)
        }
    }

    if (weekday.enabled) drawImageSet(ctx, images, weekday.json, watchState.weekday, 7, drawborder, true)

}