import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { ImageSet } from "../model/json.gts2minit.model";

export default function drawImageSet(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    imageSet: ImageSet,
    value: number,
    total: number,
    fromZero?: boolean) {
        if (imageSet?.ImageIndex) {
            let x = imageSet.X ? imageSet.X : 0
            let y = imageSet.Y ? imageSet.Y : 0

            if (fromZero) value++;

            if (value > total) value = total
            
            let count = imageSet.ImagesCount ? imageSet.ImagesCount : 1

            let index = Math.floor(value / (total / count))

            index = Math.max(index, 0)
            index = Math.min(index, count)

            if (index > 0) {
                const img = findImageById(imageSet.ImageIndex + index - 1, images)
                if (img) ctx.drawImage(img, x, y);
            }
        }
}