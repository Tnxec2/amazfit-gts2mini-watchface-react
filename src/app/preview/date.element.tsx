import { IImage } from "../model/image.model";
import { WatchDate } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import drawDigitImage, { DigitValueItem, drawDigitsFollowedArray, drawDigitsOneLine } from "./digitImage.element";
import drawIconSet from "./iconSet.element";
import { drawImageByIndex } from "./image.element";
import drawImageSet from "./imageSet.element";


export default function drawDate(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    date: WatchDate,
    watchState: WatchState,
    drawborder: boolean
    ) {
        
    if (date.oneLineYear) {
        if (date.year.enabled) {
            let ar = [
                watchState.year.toString(),
                date.year.paddingZero ? watchState.month.toString().padStart(2, '0') : watchState.month.toString(),
                date.year.paddingZero ? watchState.day.toString().padStart(2, '0') : watchState.day.toString()
            ]
            drawDigitsOneLine(ctx, images, date.year, ar, date.oneLineDelimiter, drawborder)
        }
    } else if (date.oneLineMonth) {
        if (date.month.enabled) {
            let ar = [
                date.month.paddingZero ? watchState.month.toString().padStart(2, '0') : watchState.month.toString(),
                date.month.paddingZero ? watchState.day.toString().padStart(2, '0') : watchState.day.toString()
            ]
            drawDigitsOneLine(ctx, images, date.month, ar, date.oneLineDelimiter, drawborder)
        }
    } else {
        if (date.year.enabled) {
            if (date.month.enabled && date.month.follow) {
                let ar: DigitValueItem[] = [ {
                    snumber: watchState.year.toString(),
                    suffix: date.year.delimiter,
                    dataType: date.year.dataType,
                },{
                    snumber: date.month.paddingZero ? watchState.month.toString().padStart(2, '0') : watchState.month.toString(),
                    suffix: date.month.delimiter,
                    dataType: date.month.dataType,
                }]
                if (date.day.enabled && date.day.follow) {
                    ar.push({
                        snumber: date.day.paddingZero ? watchState.day.toString().padStart(2, '0') : watchState.day.toString(),
                        suffix: date.day.delimiter,
                        dataType: date.day.dataType,
                    })
                }
                drawDigitsFollowedArray(ctx, images, date.year, ar, drawborder)
            } else {
                drawDigitImage(ctx, images, date.year, watchState.year, null, drawborder, true, null, null, null, date.year.delimiter)
                if (date.year.dataType && date.year.dataTypeCoords) {
                    drawImageByIndex(ctx, images, date.year.dataType, date.year.dataTypeCoords.X, date.year.dataTypeCoords.Y, drawborder)
                }
            }
        }
        if ( date.month.enabled ) {
            if (date.year.enabled && date.month.follow) {
                if (date.day.enabled && date.day.follow) {
                    let ar: DigitValueItem[] = [{
                        snumber: date.month.paddingZero ? watchState.month.toString().padStart(2, '0') : watchState.month.toString(),
                        suffix: date.month.delimiter,
                        dataType: date.month.dataType,
                    },{
                        snumber: date.day.paddingZero ? watchState.day.toString().padStart(2, '0') : watchState.day.toString(),
                        suffix: date.day.delimiter,
                        dataType: date.day.dataType,
                    }];
                    drawDigitsFollowedArray(ctx, images, date.month, ar, drawborder)
                } else {
                    drawDigitImage(ctx, images, date.month, watchState.month, null, drawborder, false, null, null, null, date.month.delimiter)
                    if (date.month.dataType && date.month.dataTypeCoords) {
                        drawImageByIndex(ctx, images, date.month.dataType, date.month.dataTypeCoords.X, date.month.dataTypeCoords.Y, drawborder)
                    }
                }
            } else {
                drawDigitImage(ctx, images, date.month, watchState.month, null, drawborder, false, null, null, null, date.month.delimiter)
                if (date.month.dataType && date.month.dataTypeCoords) {
                    drawImageByIndex(ctx, images, date.month.dataType, date.month.dataTypeCoords.X, date.month.dataTypeCoords.Y, drawborder)
                }
            }
        } 
        if (date.day.enabled) {
            if ( (!date.year.enabled && !date.month.enabled) || ((date.year.enabled || date.month.enabled) && !date.day.follow) ) {
                drawDigitImage(ctx, images, date.day, watchState.day, null, drawborder, true, null, null, null, date.day.delimiter)
                if (date.day.dataType && date.day.dataTypeCoords) {                  
                    drawImageByIndex(ctx, images, date.day.dataType, date.day.dataTypeCoords.X, date.day.dataTypeCoords.Y, drawborder)
                }
            }
        }
    }
    
    if (date.monthAsWord.enabled) 
        drawImageSet(ctx, images, date.monthAsWord.json, watchState.month, 12, drawborder, false)

    if (date.weekday.enabled) 
        drawImageSet(ctx, images, date.weekday.json, watchState.weekday, 7, drawborder, true)

    if (date.weekdayProgress.iconSetProgress.enabled) 
        drawIconSet(ctx, images, date.weekdayProgress.iconSetProgress.json, watchState.weekday+1, 7, drawborder)
    
    if (date.ampm.enabled) {
        if (watchState.hours < 12) {
            drawImageByIndex(ctx, images,date.ampm.json.AmImageIndexEN,
                date.ampm.json.CommonX ? date.ampm.json.CommonX : ( date.ampm.json.CoordinatesAM  ? date.ampm.json.CoordinatesAM.X : 0 ),
                date.ampm.json.CommonY ? date.ampm.json.CommonY : ( date.ampm.json.CoordinatesAM  ? date.ampm.json.CoordinatesAM.Y : 0 ),
                drawborder)
        } else {
            drawImageByIndex(ctx, images, date.ampm.json.PmImageIndexEN, 
                date.ampm.json.CommonX ? date.ampm.json.CommonX : ( date.ampm.json.CoordinatesPM  ? date.ampm.json.CoordinatesPM.X : 0 ),
                date.ampm.json.CommonY ? date.ampm.json.CommonY : ( date.ampm.json.CoordinatesPM  ? date.ampm.json.CoordinatesPM.Y : 0 ),
                drawborder)
        }
    }
    
}