import { IImage } from "../model/image.model";
import { WatchAodDate, WatchAodDateOneLine, WatchImageSet } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawDigitImage, { DigitValueItem, drawDigitsFollowedArray, drawDigitsOneLine } from "./digitImage.element";
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
                drawDigitImage(ctx, images, date.month, watchState.month, null, drawborder, false, null, null, null, date.month.dataType)
            }
        } 
        if (date.day.enabled && !date.day.follow) {
            drawDigitImage(ctx, images, date.day, watchState.day, null, drawborder, true, null, null, null, date.day.dataType)
        }
        if (date.day.enabled && date.day.delimiter && date.day.delimiterCoords) {
            let img = findImageById(date.day.dataType, images)
            if (img) ctx.drawImage(img, date.day.delimiterCoords.X, date.day.delimiterCoords.Y)
        }
        if (date.month.enabled && date.month.delimiter && date.month.delimiterCoords) {
            let img = findImageById(date.month.dataType, images)
            if (img) ctx.drawImage(img, date.month.delimiterCoords.X, date.month.delimiterCoords.Y)
        }
    }

    if (weekday.enabled) drawImageSet(ctx, images, weekday.json, watchState.weekday, 7)

}