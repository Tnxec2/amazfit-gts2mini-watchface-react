import { IImage } from "../model/image.model"
import { WatchCommonDigit } from "../model/watchFace.model"
import drawDigitImage from "./digitImage.element"
import {drawSystemFont, drawSystemFontFontRotated} from "./systemfont.element"

export default function drawDigit(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digit: WatchCommonDigit, 
    number: number, 
    followXY?: [number, number], 
    drawBorder?: boolean,
    paddingZeroFix?: boolean,
    systemFontText?: string,
    weatherIconCenterX?: number
    ): [number, number] | null  {
        if (!digit) return
        if (digit.enabledImage) 
            return drawDigitImage(ctx, images, digit, number, followXY, drawBorder, paddingZeroFix, weatherIconCenterX)
        if (digit.enabledSystemFont || digit.enabledSystemFontCircle) {
            if (!systemFontText) return followXY
            if (digit.enabledSystemFontCircle)
                return drawSystemFontFontRotated(ctx, digit, systemFontText)
            else
                return drawSystemFont(ctx, digit, systemFontText)
        }
        return followXY
}

