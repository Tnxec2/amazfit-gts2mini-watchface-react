import { IImage } from "../../model/image.model"
import { WatchCommonDigit } from "../../model/watchFace.model"
import drawDigitImage from "./digitImage.element"
import {drawSystemFont} from "./systemfont.element"

export default function draw(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digit: WatchCommonDigit, 
    number: number, 
    followXY?: [number, number], 
    drawBorder?: boolean,
    paddingZeroFix?: boolean,
    systemFontText?: string
    ): [number, number] | null  {
        if (digit.enabledImage) return drawDigitImage(ctx, images, digit, number, followXY, drawBorder, paddingZeroFix)
        if (digit.enabledSystemFont || digit.enabledSystemFontCircle) return drawSystemFont(ctx, digit, systemFontText)
        return followXY
}

