import Color from "../shared/color";
import { IImage } from "../model/image.model";
import { WatchBackground } from "../model/watchFace.gts2mini.model";
import { drawImage } from "./image.element";
  
export function drawBackground(
    canvas: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    background: WatchBackground,
    drawBorder: boolean) {

    if (background.color && Color.GFG_Fun(background.color)) {
        ctx.fillStyle = background.color
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    if (background?.image?.enabled) {
        drawImage(ctx, images, background.image?.json, false)
    }
    if (background?.floatingLayer?.enabled) {
        drawImage(ctx, images, background.floatingLayer?.json, drawBorder)
    }

}
