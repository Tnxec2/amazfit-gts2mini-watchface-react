import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { Switch } from "../model/json.gts2minit.model";
import { drawBorderOnCtx } from "./drawBorder";

export default function drawSwitch(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    sw: Switch,
    isOn: boolean,
    drawBorder: boolean
    ) {
        if (isOn && sw.ImageIndexOn) {
            let x = sw.Coordinates.X ? sw.Coordinates.X : 0
            let y = sw.Coordinates.Y ? sw.Coordinates.Y : 0
            const img = findImageById(sw.ImageIndexOn, images)
            if (img) ctx.drawImage(img, x, y);
        }
        if (!isOn && sw.ImageIndexOff) {
            let x = sw.Coordinates.X ? sw.Coordinates.X : 0
            let y = sw.Coordinates.Y ? sw.Coordinates.Y : 0
            const img = findImageById(sw.ImageIndexOff, images)
            if (img) ctx.drawImage(img, x, y);
        }
        if (drawBorder && (sw.ImageIndexOn || sw.ImageIndexOff)){
            let x = sw.Coordinates.X ? sw.Coordinates.X : 0
            let y = sw.Coordinates.Y ? sw.Coordinates.Y : 0
            let width = 0
            let height = 0
            if (sw.ImageIndexOn) {
                const img = findImageById(sw.ImageIndexOn, images)
                if (img) {
                    width = img.width
                    height = img.height
                }
            }
            if (sw.ImageIndexOff) {
                const img = findImageById(sw.ImageIndexOff, images)
                if (img) {
                    if ( img.width > width) width = img.width
                    if ( img.height > height) height = img.height
                }
            }
            if (width && height) drawBorderOnCtx(ctx, x, y, width, height)
        }
}