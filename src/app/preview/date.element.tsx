import { IImage } from "../model/image.model";
import { WatchDate } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawDigitImage, { drawDigitImageArray } from "./digitImage.element";
import drawImageSet from "./imageSet.element";


export default function drawDate(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    date: WatchDate,
    watchState: WatchState,
    drawborder: boolean
    ) {
        
    let followXY = null

    if (date.oneLineYear) {
        if (date.year.enabled) {
            let ar = [
                watchState.year.toString(),
                date.year.paddingZero ? watchState.month.toString().padStart(2, '0') : watchState.month.toString(),
                date.year.paddingZero ? watchState.day.toString().padStart(2, '0') : watchState.day.toString()
            ]
            drawDigitImageArray(ctx, images, date.year, ar, date.oneLineDelimiter, drawborder)
        }
    } else if (date.oneLineMonth) {
        if (date.month.enabled) {
            let ar = [
                date.month.paddingZero ? watchState.month.toString().padStart(2, '0') : watchState.month.toString(),
                date.month.paddingZero ? watchState.day.toString().padStart(2, '0') : watchState.day.toString()
            ]
            drawDigitImageArray(ctx, images, date.month, ar, date.oneLineDelimiter, drawborder)
        }
    } else {

        if (date.year.enabled) {
            followXY = drawDigitImage(ctx, images, date.year, watchState.year, followXY, drawborder, true, null, null, null, date.year.delimiter)
            if (date.year.dataType && date.year.dataTypeCoords) {
                let img = findImageById(date.year.dataType, images)
                if (img)
                    ctx.drawImage(img, date.year.dataTypeCoords.X, date.year.dataTypeCoords.Y)
            }
        }
                    
        if (date.month.enabled) {
            followXY = drawDigitImage(ctx, images, date.month, watchState.month, followXY, drawborder, true, null, null, null, date.month.delimiter)
            if (date.month.dataType && date.month.dataTypeCoords) {
                let img = findImageById(date.month.dataType, images)
                if (img)
                    ctx.drawImage(img, date.month.dataTypeCoords.X, date.month.dataTypeCoords.Y)
            }
        } 
        
        if (date.day.enabled) {
            drawDigitImage(ctx, images, date.day, watchState.day, followXY, drawborder, true, null, null, null, date.day.delimiter)
            if (date.day.dataType && date.day.dataTypeCoords) {
                let img = findImageById(date.day.dataType, images)
                if (img)
                ctx.drawImage(img, date.day.dataTypeCoords.X, date.day.dataTypeCoords.Y)
            }
        }
    }
    
    if (date.monthAsWord.enabled) 
        drawImageSet(ctx, images, date.monthAsWord.json, watchState.month-1, 12)

    if (date.weekday.enabled) 
        drawImageSet(ctx, images, date.weekday.json, watchState.weekday, 7)
    
    if (date.ampm.enabled) {
        if (watchState.hours < 12) {
            let img = findImageById(date.ampm.json.AmImageIndexEN, images)
            if (img) {
                let x = date.ampm.json.CommonX ? date.ampm.json.CommonX : ( date.ampm.json.CoordinatesAM  ? date.ampm.json.CoordinatesAM.X : 0 )
                let y = date.ampm.json.CommonY ? date.ampm.json.CommonY : ( date.ampm.json.CoordinatesAM  ? date.ampm.json.CoordinatesAM.Y : 0 )
                ctx.drawImage(img, x, y)
            }
        } else {
            let img = findImageById(date.ampm.json.PmImageIndexEN, images)
            if (img) {
                let x = date.ampm.json.CommonX ? date.ampm.json.CommonX : ( date.ampm.json.CoordinatesPM  ? date.ampm.json.CoordinatesPM.X : 0 )
                let y = date.ampm.json.CommonY ? date.ampm.json.CommonY : ( date.ampm.json.CoordinatesPM  ? date.ampm.json.CoordinatesPM.Y : 0 )
                ctx.drawImage(img, x, y)
            }
        }
    }
    
}