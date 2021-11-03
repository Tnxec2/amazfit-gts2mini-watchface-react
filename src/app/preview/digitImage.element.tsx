import { findImageById } from "../shared/helper"
import { IImage } from "../model/image.model"
import { AlignmentType, LangCodeType } from "../model/types.model"
import { MultilangImage } from "../model/json.model"
import { WatchCommonDigit } from "../model/watchFace.model"
import drawSeparator from './imageCoords.element'

export default function drawDigitImage(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digit: WatchCommonDigit, 
    number: number, 
    followXY?: [number, number], 
    drawBorder?: boolean,
    paddingZeroFix?: boolean,
    weatherIconCenterX?: number
    ): [number, number] | null  {
    const x = followXY ? followXY[0] : ( digit.json?.Digit?.Image?.X ? digit.json?.Digit?.Image?.X : 0 )
    const y = followXY ? followXY[1] : ( digit.json?.Digit?.Image?.Y ? digit.json?.Digit?.Image?.Y : 0 )
    const imageSetIndex = findImageIndex(digit.json.Digit?.Image?.MultilangImage);
    const unitImageSetIndex =findImageIndex(digit.json.Digit?.Image?.MultilangImageUnit);

    //console.log(number, x, y, imageSetIndex, digit.json.Digit.Image.MultilangImage[imageSetIndex]?.ImageSet?.ImageIndex);
    

    if (digit.json.Digit?.Image?.MultilangImage &&
        digit.json.Digit.Image.MultilangImage[imageSetIndex]?.ImageSet?.ImageIndex) {
            let strNumber = number.toString()
            if (number < 0) strNumber = (-number).toString()
            if ( !digit.json.Digit.DisplayFormAnalog && (digit.json.Digit.PaddingZero || paddingZeroFix)) {
                strNumber = strNumber.padStart(digit.con.numberLenght, '0' )
            }
            let ar: HTMLImageElement[] = []
            if (digit.json.Digit.Image.DelimiterImageIndex) {
                if (number < 0){
                    const img = findImageById(digit.json.Digit.Image.DelimiterImageIndex, images)
                    if (img) ar.push(img)
                }
            }

            if (digit.json.Digit.DisplayFormAnalog) {
                const img = findImageById(digit.json.Digit.Image.MultilangImage[imageSetIndex].ImageSet.ImageIndex + number, images)
                if (img) ar.push(img)
            } else {
                ar = ar.concat(getImages(images, strNumber, 
                    digit.json.Digit.Image.MultilangImage[imageSetIndex].ImageSet.ImageIndex, 
                    digit.json.Digit.Image.MultilangImage[imageSetIndex].ImageSet.ImagesCount,
                    digit.json.Digit.Image.DecimalPointImageIndex ))
            }

            let widthUnit = 0
            if (digit.json.Digit.Image.MultilangImageUnit && digit.json.Digit.Image.MultilangImageUnit[unitImageSetIndex]) {
                const img = findImageById(digit.json.Digit.Image.MultilangImageUnit[unitImageSetIndex].ImageSet.ImageIndex, images)
                if (img) {
                    ar.push(img)
                    widthUnit = img.width
                }
            }

            const followXY = drawImages(ctx, ar, x, y, digit.json.Digit.Spacing, 
                digit.json.Digit.Alignment, digit.con.numberLenght - strNumber.length, 
                drawBorder, weatherIconCenterX, widthUnit)

            if ( digit.json.Separator) {
                drawSeparator(ctx, images, digit.json.Separator)
            }
            return followXY
        }
        return followXY;
    }

function getImages(
    images: IImage[], 
    strNumber: string, 
    startImageIndex: number, 
    count: number, decimalPointer: number): HTMLImageElement[] {
    const ar: HTMLImageElement[] = []
    for (let i = 0; i < strNumber.length; i++) {
        if (decimalPointer && i === strNumber.length - 2) {
            const img = findImageById(decimalPointer, images)
            if (img) { ar.push(img) }
        }
        var chr = strNumber.charAt(i);
        var n = parseInt(chr)
        if (!isNaN(n) && n < count) {
            const img = findImageById(startImageIndex + n, images)
            if (img) { ar.push(img) }
        } else {
            alert('cant parse number string: ' + strNumber + ' at index ' + i)
        }
    }
    return ar;
}

function drawImages(
    ctx: CanvasRenderingContext2D,
    ar: HTMLImageElement[], 
    startx: number, 
    starty: number, 
    spacing: number, 
    alignment: string, 
    paddingLenght: number, 
    drawborder: boolean,
    weatherIconCenterX?: number,
    widthUnit?: number): [number, number] | null  {
    if ( ar.length === 0) return
    
    if (!spacing) spacing = 0
    
    let imageWidth: number = 0
    //let maxWidth: number = 0
    ar.forEach(img => {
        imageWidth += img.width
        imageWidth += spacing
        //maxWidth += img.width
        //maxWidth += spacing > 0 ? spacing : 0
    })
    imageWidth -= spacing
    //maxWidth -= spacing > 0 ? spacing : 0

    //if (paddingLenght > 0) {
    //    maxWidth +=  ar[0].width * paddingLenght + 1
    //    if (spacing > 0) maxWidth += Math.abs(spacing) * (paddingLenght - 1)
    //}

    let width = ar[0].width;
    let maxWidth: number = width * ar.length + width * paddingLenght
    if (spacing > 0 ) maxWidth += spacing * (ar.length + paddingLenght - 1)

    if ( imageWidth > maxWidth ) maxWidth = imageWidth;

    let x = startx
    let y = starty
    if (alignment === AlignmentType.Right.json) { // right
        x = x + maxWidth - imageWidth
    } else if (alignment === AlignmentType.Center.json) { // center
        if (weatherIconCenterX) {
            //console.log(alignment, weatherIconCenterX, widthUnit, startx, x);
            x = weatherIconCenterX - (imageWidth - widthUnit) / 2
        } else {
            x = x + maxWidth / 2 - imageWidth / 2
        }
    }
    

    let height = 0

    ar.forEach(img => {
        ctx.drawImage(img, x, y);
        height = Math.max(img.height, height)
        x += img.width
        if ( spacing ) x += spacing
    })
    if ( drawborder) {
        ctx.beginPath();
        ctx.strokeStyle = 'gray'
        ctx.rect(startx, starty, maxWidth, height);
        ctx.stroke();
    }

    return [x, y]
}


function findImageIndex(ar: MultilangImage[]): number {
    if (!ar) return null
    let resultIndex = 0
    ar.forEach((item, index) => {
        if ( item.LangCode === LangCodeType.All.json) {
            resultIndex = index
        }
    })
   
    return resultIndex
  }