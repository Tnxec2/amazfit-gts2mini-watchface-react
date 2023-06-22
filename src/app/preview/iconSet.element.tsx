import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { IconSet } from "../model/json.gts2minit.model";

export default function drawIconSet(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    iconSet: IconSet,
    value: number,
    total: number) {
        if (iconSet?.ImageIndex && iconSet?.Coordinates) {
            
            if (value > total) value = total
            
            let count = iconSet.Coordinates?.length

            if (count) {
                let index = Math.floor(value / (total / count))

                index = Math.max(index, 0)
                index = Math.min(index, count)

                if (index > 0) {
                    for (let i = 0; i < index ; i++) {                        
                        const img = findImageById(iconSet.ImageIndex + i, images)
                        if (img) ctx.drawImage(img, iconSet.Coordinates[i].X, iconSet.Coordinates[i].Y);
                    }
                }
                
            }
        }
}