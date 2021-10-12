import { Digit } from "../../model/watchFace.model"

export default function draw(ctx: CanvasRenderingContext2D, images: HTMLImageElement[], digit: Digit, 
    number: number, followXY?: [number, number]) {
    const x = followXY ? followXY[0] : digit.x
    const y = followXY ? followXY[1] : digit.y
    if (digit.imageIndex !== undefined && digit.imageIndex !== null) {
        let strNumber = number.toString()
        if (digit.paddingZero) {
            strNumber = strNumber.padStart(digit.numberLenght, '0' )
        }
        const ar = getImages(images, strNumber, digit.imageIndex, digit.imageCount )
        drawImages(ctx, ar, x, y, digit.spacing, digit.alignment, digit.numberLenght)
    }
}

function getImages(images: HTMLImageElement[], strNumber: string, startImageIndex: number, count: number): HTMLImageElement[] {
    const ar = []
    for (let i = 0; i < strNumber.length; i++) {
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
    x: number, y: number, spacing: number, alignment: number, paddingLenght: number) {
    if ( ar.length === 0) return
    let imageWidth = 0

    ar.forEach(img => imageWidth = imageWidth + spacing + img.width)

    let maxWidth = imageWidth

    if (paddingLenght) {
        maxWidth = imageWidth + ( spacing + ar[0].width ) * paddingLenght
    }

    if (alignment === 2) { // right
        x = x + maxWidth - imageWidth
    } else if (alignment === 1) { // center
        x = x + (maxWidth - imageWidth) / 2
    }
    ar.forEach(img => {
        if ( spacing ) {
            x += spacing
        }
        ctx.drawImage(img, x, y, img.width, img.height);
        x += img.width
    })
}