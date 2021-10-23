import { findImageById } from "../../shared/helper";
import { IImage } from "../../model/image.model";
import { WatchImageCoords } from "../../model/watchFace.model";

export default function drawImageCoords(ctx: CanvasRenderingContext2D, images: IImage[], 
    imageCoord: WatchImageCoords) {
        if (imageCoord.enabled && imageCoord.json.ImageIndex) {
            let x = imageCoord.json.Coordinates?.X ? imageCoord.json.Coordinates.X : 0
            let y = imageCoord.json.Coordinates?.Y ? imageCoord.json.Coordinates.Y : 0
            const img = findImageById(imageCoord.json.ImageIndex, images)
            if (img) ctx.drawImage(img, x, y, img.width, img.height);
        }
}