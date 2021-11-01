import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { ImageCoord } from "../model/json.model";

export default function drawImageCoords(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    imageCoord: ImageCoord) {
        if (imageCoord.ImageIndex) {
            let x = imageCoord.Coordinates?.X ? imageCoord.Coordinates.X : 0
            let y = imageCoord.Coordinates?.Y ? imageCoord.Coordinates.Y : 0
            const img = findImageById(imageCoord.ImageIndex, images)
            if (img) ctx.drawImage(img, x, y, img.width, img.height);
        }
}