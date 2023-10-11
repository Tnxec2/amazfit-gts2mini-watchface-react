import { IImage } from "../model/image.model";
import { WatchScale } from "../model/watchFace.gts2mini.model";
import drawPointerProgress from "./pointerProgress.element";
import {drawImage} from "./image.element";

export default function drawScale(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    scale: WatchScale, 
    value: number, 
    total: number,
    drawBorder: boolean ) {
        if (total === null) return
        if (scale?.pointerscale?.enabled ) drawPointerProgress(ctx, images, scale.pointerscale.json, value, total)
        if (scale?.bottomImage?.enabled ) drawImage(ctx, images, scale.bottomImage.json, drawBorder)
}
