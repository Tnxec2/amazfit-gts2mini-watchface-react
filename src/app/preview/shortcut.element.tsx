import { ShortcutElement } from "../model/json.gts2minit.model";

export default function drawShortcutElement(
    ctx: CanvasRenderingContext2D,
    shortcut: ShortcutElement,
    border: boolean) {
        let x = shortcut.TopLeftX ? shortcut.TopLeftX : 0
        let y = shortcut.TopLeftY ? shortcut.TopLeftY : 0
        let xend = shortcut.BottomRightX ? shortcut.BottomRightX : x
        let yend = shortcut.BottomRightY ? shortcut.BottomRightY : y
        ctx.strokeStyle = 'cyan'
        ctx.lineWidth = 1
        if (border) ctx.strokeRect(x, y, xend - x, yend - y)
}

