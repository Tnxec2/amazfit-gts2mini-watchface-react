import { IImage } from "../model/image.model"
import { FiveDigits, FourDigits, ThreeDigits, TwoDigits } from "../model/json.gts2minit.model"
import drawImageSet from "./imageSet.element"


export function drawTwoDigits(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digits: TwoDigits, 
    number: number,
    paddingZero: boolean
): void {
    if (digits.Tens) {
        let tens = Math.floor(number / 10)
        if ( number >= 10 || paddingZero ) drawImageSet(ctx, images, digits.Tens, tens , 10)
    }
    if (digits.Ones)
        drawImageSet(ctx, images, digits.Ones, number % 10, 10)
}

export function drawThreeDigits(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digits: ThreeDigits, 
    number: number,
    paddingZero: boolean
): void {
    if (digits.Ones) {
        let hundreds = Math.floor(number / 100)
        if ( number >= 100 || paddingZero ) drawImageSet(ctx, images, digits.Ones, hundreds , 10)
    }
    if (digits.Tens) {
        let tens = Math.floor( (number % 100) / 10)
        if ( number >= 10 || paddingZero ) drawImageSet(ctx, images, digits.Tens, tens , 10)
    }
    if (digits.Hundreds)
        drawImageSet(ctx, images, digits.Hundreds, (number % 100) % 10, 10)
}

export function drawFiveDigits(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digits: FiveDigits, 
    number: number,
    paddingZero: boolean
): void {
    if (digits.Ones) {
        let tenthousands = Math.floor(number / 10000)
        if ( number >= 10000 || paddingZero ) drawImageSet(ctx, images, digits.Ones, tenthousands , 10)
    }
    if (digits.Tens) {
        let thousands = Math.floor( (number % 10000) / 1000)
        if ( number >= 1000 || paddingZero ) drawImageSet(ctx, images, digits.Tens, thousands , 10)
    }
    if (digits.Hundreds) {
        let hundreds = Math.floor( (number % 10000 % 1000) / 100)
        if ( number >= 100 || paddingZero ) drawImageSet(ctx, images, digits.Hundreds, hundreds , 10)
    }
    if (digits.Thousands) {
        let tens = Math.floor( (number % 10000 % 1000 % 100) / 10)
        if ( number >= 10 || paddingZero ) drawImageSet(ctx, images, digits.Thousands, tens , 10)
    }
    if (digits.TenThousands)
        drawImageSet(ctx, images, digits.TenThousands, (number % 10000 % 1000 % 100) % 10, 10)
}

export function drawFourDigits(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digits: FourDigits, 
    number: number,
    paddingZero: boolean
): void {
    if (digits.Ones) {
        let thousands = Math.floor(number / 1000)
        if ( number >= 1000 || paddingZero ) drawImageSet(ctx, images, digits.Ones, thousands , 10)
    }
    if (digits.Tens) {
        let hundreds = Math.floor( (number % 1000) / 100)
        if ( number >= 100 || paddingZero ) drawImageSet(ctx, images, digits.Tens, hundreds , 10)
    }
    if (digits.Hundreds) {
        let tens = Math.floor( (number % 1000 % 100) / 10)
        if ( number >= 10 || paddingZero ) drawImageSet(ctx, images, digits.Hundreds, tens , 10)
    }
    if (digits.Thousands)
        drawImageSet(ctx, images, digits.Thousands, (number % 1000 % 100) % 10, 10)
}
