import { findImageById } from "../../../shared/helper";
import { IImage } from "../../model/image.model";
import { WatchImageCoords } from "../../model/watchFace.model";

export default function drawImageCoords(ctx: CanvasRenderingContext2D, images: IImage[], 
    imageCoord: WatchImageCoords) {
        if (imageCoord.imageIndex) {
            let x = imageCoord.x ? imageCoord.x : 0
            let y = imageCoord.y ? imageCoord.y : 0
            const img = findImageById(imageCoord.imageIndex, images)
            if (img) ctx.drawImage(img, x, y, img.width, img.height);
        }
}