import { findImageById } from "../../shared/helper";
import { IImage } from "../../model/image.model";
import {  MultilangImage } from "../../model/json.model";
import { WatchMultilangImageCoords } from "../../model/watchFace.model";
import { LangCodeType } from "../../model/types.model";

export default function drawMultilangImageCoords(ctx: CanvasRenderingContext2D, images: IImage[], 
    imageCoord: WatchMultilangImageCoords) {

        const imageSetIndex = findImageIndex(imageCoord.json?.ImageSet);
    
        if (imageCoord.json.ImageSet &&
            imageCoord.json.ImageSet[imageSetIndex]?.ImageSet?.ImageIndex) {

            let x = imageCoord.json.Coordinates?.X ? imageCoord.json.Coordinates.X : 0
            let y = imageCoord.json.Coordinates?.Y ? imageCoord.json.Coordinates.Y : 0
            const img = findImageById(imageCoord.json.ImageSet[imageSetIndex].ImageSet.ImageIndex, images)
            if (img) ctx.drawImage(img, x, y, img.width, img.height);
        }
}

function findImageIndex(ar: MultilangImage[]): number {
    if (!ar) return null
    let index = ar.findIndex((item) => item.LangCode === LangCodeType.All.json)
    return index >= 0 ? index : 0
  }