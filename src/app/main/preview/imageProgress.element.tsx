import { findImageById } from "../../../shared/helper";
import { IImage } from "../../model/image.model";
import { WatchImageProgress } from "../../model/watchFace.model";

export default function drawImageProgress(ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    imageProgress: WatchImageProgress,
    value: number, total: number) {
        if (imageProgress.imageIndex) {
            if ( imageProgress.coordinates) {

                let count = imageProgress.imageCount-1
                let coors = imageProgress.coordinates

                let s = Math.floor(value / (total / count))
                if (s > count) s = count

                if (value > total) value = total

                let initial = 0
                if (!imageProgress.displayType)
                    initial = s

                console.log(value, total, count, initial, s);
                    
                for (let i = initial; i <= s; i++) {
                    console.log(value, total, i);
                    let x = i < coors.length ? coors[i].x : coors[coors.length-1].x
                    let y = i < coors.length ? coors[i].y : coors[coors.length-1].y
                    let imageIndex = imageProgress.imageIndex + i
                    const img = findImageById(imageIndex, images)
                    if (img) ctx.drawImage(img, x, y, img.width, img.height);
                }
            }
        }
}