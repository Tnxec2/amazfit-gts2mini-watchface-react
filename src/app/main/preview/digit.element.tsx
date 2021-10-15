import { Digit } from "../../model/watchFace.model"
import drawSeparator from './imageCoords.element'

export default function draw(
    ctx: CanvasRenderingContext2D, 
    images: HTMLImageElement[], 
    digit: Digit, 
    number: number, 
    followXY?: [number, number], 
    drawBorder?: boolean,
    paddingZeroFix?: boolean) {
    const x = followXY ? followXY[0] : digit.x
    const y = followXY ? followXY[1] : digit.y
    if (digit.imageIndex !== undefined && digit.imageIndex !== null) {
        let strNumber = number.toString()
        if (number < 0) strNumber = (-number).toString()
        if (digit.paddingZero || paddingZeroFix) {
            strNumber = strNumber.padStart(digit.numberLenght, '0' )
        }
        let ar = []
        if (digit.delimiterImageIndex) {
            if (number < 0)
                ar.push(images[digit.delimiterImageIndex])
        }
        ar = ar.concat(getImages(images, strNumber, digit.imageIndex, digit.imageCount, digit.decimalPointImageIndex ))
        if (digit.unitImageIndex) {
            ar.push(images[digit.unitImageIndex])
        }

        const followXY = drawImages(ctx, ar, x, y, digit.spacing, 
            digit.alignment, digit.numberLenght - strNumber.length, drawBorder)

        if ( digit.separator) {
            drawSeparator(ctx, images, digit.separator)
        }
        return followXY
    }
}



function getImages(images: HTMLImageElement[], strNumber: string, startImageIndex: number, count: number, decimalPointer: number): HTMLImageElement[] {
    const ar = []
    for (let i = 0; i < strNumber.length; i++) {
        if (decimalPointer && i === strNumber.length - 2) {
            ar.push(images[decimalPointer])
        }
        var chr = strNumber.charAt(i);
        var n = parseInt(chr)
        if (!isNaN(n) && n < count) {
            if (startImageIndex + n < images.length) {
                ar.push(images[startImageIndex + n])
            } else {
                alert('cant load image for index ' + (startImageIndex + n))
                return []
            }
        } else {
            alert('cant parse number string: ' + strNumber + ' at index ' + i)
            return []
        }
    }
    return ar;
}

function drawImages(ctx: CanvasRenderingContext2D, ar: HTMLImageElement[], 
    startx: number, starty: number, spacing: number, alignment: number, paddingLenght: number, drawborder: boolean) {
    if ( ar.length === 0) return
    let imageWidth = 0

    ar.forEach(img => {
        if (imageWidth && spacing) imageWidth += spacing
        imageWidth += img.width
    })

    let maxWidth = imageWidth

    if (paddingLenght) {
        maxWidth = imageWidth + ( spacing + ar[0].width ) * paddingLenght
    }

    let x = startx
    let y = starty
    if (alignment === 2) { // right
        x = x + maxWidth - imageWidth
    } else if (alignment === 1) { // center
        x = x + (maxWidth - imageWidth) / 2
    }

    let height = 0
    ar.forEach(img => {
        ctx.drawImage(img, x, y, img.width, img.height);
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