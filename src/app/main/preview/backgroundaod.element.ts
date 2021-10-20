import { findImageById } from "../../../shared/helper";
import { IImage } from "../../model/image.model";

export default function drawAodBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, 
                images: IImage[], imageIndex: number) {
    if (imageIndex !== undefined && imageIndex !== null) {
        if (imageIndex >= images.length) return
            const i = findImageById(imageIndex, images)
            if (i) {
                const img = i
                ctx.drawImage(img, 0, 0, img.width, img.height);
            }
    } else {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}
