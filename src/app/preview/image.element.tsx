import { IImage } from "../model/image.model";
import { Image } from "../model/json.gts2minit.model";
import { findImageById } from "../shared/helper";
import { drawBorderOnCtx } from "./drawBorder";

export function drawImage(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    image: Image,
    drawBorder: boolean) {
        if (image?.ImageIndex) {
            let x = image.X ? image.X : 0
            let y = image.Y ? image.Y : 0
            const img = findImageById(image.ImageIndex, images)
            if (img) ctx.drawImage(img, x, y);
            if(img && drawBorder) drawBorderOnCtx(ctx, x, y, img.width, img.height)
        }
}

export function drawImageByIndex(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    imageIndex: number,
    x: number,
    y: number,
    drawBorder: boolean) {
        if (imageIndex) {
            const img = findImageById(imageIndex, images)
            if (img) ctx.drawImage(img, x, y);
            if(img && drawBorder) drawBorderOnCtx(ctx, x, y, img.width, img.height)
        }
}