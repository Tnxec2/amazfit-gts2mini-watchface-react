
import { WatchCommonDigit } from "../../model/watchFace.model";
import Color from "../../shared/color";

export function drawSystemFont(
    ctx: CanvasRenderingContext2D, 
    digit: WatchCommonDigit, 
    value: number, 
    followXY?: [number, number]
    ): [number, number] | null {
    if (digit.json?.Digit?.SystemFont) {
        let systemFont = digit.json?.Digit?.SystemFont
        let text: string = value.toString()
        if (digit.json.Digit.PaddingZero) {
            text = text.padStart(digit.con.numberLenght, '0')
        }
        if (systemFont.ShowUnitCheck === -1) {
            text = text + digit.con.unit[0]
        } else if (systemFont.ShowUnitCheck === 1) {
            text = text + digit.con.unit[1]
        } else if ( systemFont.ShowUnitCheck === 2) {
            text = text + digit.con.unit[2]
        } else if (digit.json.Separator) {
            text = text + digit.con.separator
        }
        if (systemFont.FontRotate) return drawFontRotated(ctx, digit, text)
        else return drawText(ctx, digit, text)
    }
}

export function drawText(
    ctx: CanvasRenderingContext2D,
     digit: WatchCommonDigit, 
     text: string): [number, number] | null {
    let systemFont = digit.json.Digit.SystemFont
    let fontSize: number = systemFont.Size ? systemFont.Size : 0;
    let spacing: number = digit.json.Digit.Spacing
    ctx.font = `${fontSize}px Verdana`;

    ctx.save();
    var tx = systemFont.Coordinates?.X ? systemFont.Coordinates.X : 0;
    var ty = systemFont.Coordinates?.Y ? systemFont.Coordinates.Y : 0;
    let radians = Math.PI / 180 * (systemFont.Angle)
    ctx.translate(tx, ty);
    ctx.rotate(radians);
    ctx.fillStyle = Color.colorRead(systemFont.Color)
    let x = 0;
    for (var i = 0; i < text.length; i++) {
        ctx.fillText(text[i], x, 0);
        x = x + ctx.measureText(text[i]).width + spacing
    }
    ctx.restore();
    return null
}

function drawFontRotated(
    ctx: CanvasRenderingContext2D, 
    digit: WatchCommonDigit, 
    text: string): [number, number] | null {
    let systemFont = digit.json.Digit.SystemFont
    let fontSize = systemFont.Size ? systemFont.Size : 0;
    let spacing: number = digit.json.Digit.Spacing
    
    ctx.font = `${fontSize}px Verdana`;

    var tx = systemFont.FontRotate?.X ? systemFont.FontRotate.X : 0;
    var ty = systemFont.FontRotate?.Y ? systemFont.FontRotate.Y : 0;
    ctx.fillStyle = Color.colorRead(systemFont.Color)
    
    ctx.save();
    ctx.translate(tx, ty);
    if ( systemFont.FontRotate.RotateDirection !== 1) {
        ctx.rotate(Math.PI / 180 * systemFont.Angle);
        console.log(tx, ty, systemFont.Angle, systemFont.FontRotate.Radius);
        for (var i = 0; i < text.length; i++) {
            let width = ctx.measureText(text[i]).width
            ctx.fillText(text[i], 0, - systemFont.FontRotate.Radius);
            ctx.rotate( Math.PI / 180 * (width + spacing) );
        }
    } else {
        ctx.rotate(Math.PI / 180 * (180 - systemFont.Angle) );
        console.log(tx, ty, systemFont.Angle, systemFont.FontRotate.Radius);
        for (var i = 0; i < text.length; i++) {
            let width = ctx.measureText(text[i]).width
            ctx.fillText(text[i], 0, + systemFont.FontRotate.Radius);
            ctx.rotate( Math.PI / 180 * -(width + spacing) );
        }
    }
    ctx.restore();
    return null
}
