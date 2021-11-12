import { IImage } from "../model/image.model";
import { Image } from "../model/json.gts2minit.model";
import { findImageById } from "../shared/helper";

export default function drawImage(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    image: Image) {
        if (image?.ImageIndex) {
            let x = image.X ? image.X : 0
            let y = image.Y ? image.Y : 0
            const img = findImageById(image.ImageIndex, images)
            if (img) ctx.drawImage(img, x, y);
        }
}