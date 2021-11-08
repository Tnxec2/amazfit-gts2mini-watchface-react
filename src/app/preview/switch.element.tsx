import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { Switch } from "../model/json.gts2minit.model";

export default function drawSwitch(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    sw: Switch,
    isOn: boolean
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
}