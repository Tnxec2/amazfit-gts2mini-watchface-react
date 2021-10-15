import { WatchImageCoords } from "../../model/watchFace.model";

export default function drawImageCoords(ctx: CanvasRenderingContext2D, images: HTMLImageElement[], 
    imageCoord: WatchImageCoords) {
        if (imageCoord.imageIndex) {
            let x = imageCoord.x ? imageCoord.x : 0
            let y = imageCoord.y ? imageCoord.y : 0
            if ( imageCoord.imageIndex > images.length) {
                alert('bad imageIndex:' + imageCoord.imageIndex)
                return
            }
            let img = images[imageCoord.imageIndex]
            ctx.drawImage(img, x, y, img.width, img.height);
        }
}