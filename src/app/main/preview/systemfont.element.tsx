
import { WatchCommonDigit } from "../../model/watchFace.model";
import Color from "../../shared/color";

export function drawSystemFont(
    ctx: CanvasRenderingContext2D,
    digit: WatchCommonDigit, 
    text: string): [number, number] | null {
    if (! digit.json?.Digit?.SystemFont) return null

    let systemFont = digit.json.Digit.SystemFont
    let fontSize: number = systemFont.Size ? systemFont.Size*0.8 : 0;
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

export function drawSystemFontFontRotated(
    ctx: CanvasRenderingContext2D, 
    digit: WatchCommonDigit, 
    text: string): [number, number] | null {
    
        if (! digit.json?.Digit?.SystemFont) return null

    let systemFont = digit.json.Digit.SystemFont
    let fontSize = systemFont.Size ? systemFont.Size*0.8 : 0;
    let radius = systemFont.FontRotate.Radius
    let spacing: number = digit.json.Digit.Spacing
   
    ctx.font = `${fontSize}px Verdana`;

    var tx = systemFont.FontRotate?.X ? systemFont.FontRotate.X : 0;
    var ty = systemFont.FontRotate?.Y ? systemFont.FontRotate.Y : 0;
    ctx.fillStyle = Color.colorRead(systemFont.Color)
    
    ctx.save();
    ctx.translate(tx, ty);
    if ( systemFont.FontRotate.RotateDirection !== 1) {
        ctx.rotate(Math.PI / 180 * systemFont.Angle);
        for (var i = 0; i < text.length; i++) {
            let width = ctx.measureText(text[i]).width
            ctx.fillText(text[i], 0, - systemFont.FontRotate.Radius);
            let sp = width + spacing
            let spacingAngle = sp * 180 / (radius * Math.PI)
            console.log(sp, spacingAngle);
            ctx.rotate( Math.PI / 180 * spacingAngle );
        }
    } else {
        ctx.rotate(Math.PI / 180 * (180 - systemFont.Angle) );
        for (var i = 0; i < text.length; i++) {
            let width = ctx.measureText(text[i]).width
            ctx.fillText(text[i], 0, + systemFont.FontRotate.Radius);
            let sp = width + spacing
            let spacingAngle = sp * 180 / (radius * Math.PI)
            ctx.rotate( Math.PI / 180 * -spacingAngle );
        }
    }
    ctx.restore();
    return null
}

export function addUnitsAndSeparator(text: string, digit: WatchCommonDigit): string {
    let systemFont = digit.json.Digit?.SystemFont
    let result = text
    if ( !systemFont) return result
    if (systemFont.ShowUnitCheck === -1) {
        result = result + digit.con.unit[0]
    } else if (systemFont.ShowUnitCheck === 1) {
        result = result + digit.con.unit[1]
    } else if ( systemFont.ShowUnitCheck === 2) {
        result = result + digit.con.unit[2]
    } 
    if (digit.json.Separator) {
        result = result + digit.con.separator
    }
    return result;
}

export function getSystemFontText(digit: WatchCommonDigit, value: number): string {
    let systemFontText = value.toString()
        if (digit.json.Digit.PaddingZero) systemFontText.padStart(digit.con.numberLenght, '0')
        if (digit.con.decimalDelimiter) {
            if ( systemFontText.length > 3)
                systemFontText = systemFontText.substring(0, systemFontText.length-2) + '.' + systemFontText.substring(systemFontText.length-2, systemFontText.length)
            else if ( systemFontText.length > 1 )
                systemFontText = systemFontText.substring(0, systemFontText.length-1) + '.' + systemFontText.substring(systemFontText.length-1, systemFontText.length)
        }
        if (digit.con.timeDelimiter && systemFontText.length > 2 )
            systemFontText = systemFontText.substring(0, systemFontText.length-2) + ':' + systemFontText.substring(systemFontText.length-2, systemFontText.length)
    return systemFontText
}