import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { IconSet } from "../model/json.gts2minit.model";
import { drawBorderOnCtx } from "./drawBorder";
import { drawImageByIndex } from "./image.element";

export default function drawIconSet(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    iconSet: IconSet,
    value: number,
    total: number,
    drawBorder: boolean) {
        if (iconSet?.ImageIndex && iconSet?.Coordinates) {
            
            if (value > total) value = total
            
            let count = iconSet.Coordinates?.length

            if (count) {
                let index = Math.floor(value / (total / count))

                index = Math.max(index, 0)
                index = Math.min(index, count)

                if (index > 0) {
                    for (let i = 0; i < index ; i++) {                        
                        drawImageByIndex(ctx, images, iconSet.ImageIndex + i, iconSet.Coordinates[i].X, iconSet.Coordinates[i].Y, false)
                    }
                }
                if ( drawBorder) {
                    let x = iconSet.Coordinates[0].X
                    let y = iconSet.Coordinates[0].Y
                    let width = 0
                    let height = 0
                    for (let index = 0; index < iconSet.Coordinates.length; index++) {
                        const img = findImageById(iconSet.ImageIndex + index, images)
                         if (img) {
                            if (iconSet.Coordinates[index].X < x) x = iconSet.Coordinates[index].X
                            if (iconSet.Coordinates[index].Y < y) y = iconSet.Coordinates[index].Y
                            if (img.width > width) width = img.width
                            if (img.height > height) height = img.height
                         }
                    }
                    drawBorderOnCtx(ctx, x, y, width, height)
                }
            }
        }
}