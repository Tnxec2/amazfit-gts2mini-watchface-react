import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { IconSet } from "../model/json.gts2minit.model";

export default function drawIconSet(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    iconSet: IconSet,
    value: number,
    total: number) {
        if (iconSet.ImageIndex && iconSet.Coordinates) {
            
            if (value > total) value = total
            
            let count = iconSet.Coordinates.length
            
            let index = Math.floor(value / (total / count))

            index = Math.max(index, 0)
            index = Math.min(index, count-1)

            console.log('iconset', value, total, count, index, iconSet.ImageIndex + index, iconSet.Coordinates[index].X, iconSet.Coordinates[index].Y);
            
            const img = findImageById(iconSet.ImageIndex + index, images)
            if (img) ctx.drawImage(img, iconSet.Coordinates[index].X, iconSet.Coordinates[index].Y);
        }
}