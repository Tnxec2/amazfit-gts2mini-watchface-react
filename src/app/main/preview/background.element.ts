import { Background } from "../../model/watchFace.model";

const colorRegex: RegExp = /^#[0-9A-F]{6}$/i;
  
export default function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, 
                images: HTMLImageElement[], background: Background) {
    if (background?.imageIndex !== undefined && background?.imageIndex !== null) {
        if (background.imageIndex >= images.length) return
            const img = images[background.imageIndex]
            ctx.drawImage(img, 0, 0, img.width, img.height);
    } else if (background.color && GFG_Fun(background.color)) {
        ctx.fillStyle = background.color
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}


function GFG_Fun(color: any) {
    return colorRegex.test(color);
}

