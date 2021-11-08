import { IImage } from "../model/image.model"
import { TwoDigits } from "../model/json.gts2minit.model"
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
        if ( tens !== 0 || paddingZero ) drawImageSet(ctx, images, digits.Tens, tens , 10)
    }
    if (digits.Ones)
        drawImageSet(ctx, images, digits.Ones, number % 10, 10)

}
