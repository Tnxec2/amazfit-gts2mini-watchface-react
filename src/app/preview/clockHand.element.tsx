import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { WatchClockHand } from "../model/watchFace.gts2mini.model";
import { Coordinates } from "../model/json.gts2minit.model";
import { drawImage } from "./image.element";

export default function drawclockhand(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    clockHand: WatchClockHand, 
    value: number, 
    total: number,
    commonCenterCoordinates: Coordinates,
    width: number,
    height: number,
    drawBorder?: boolean ) {
        if (total === null) return
        if (clockHand.json.ImageIndex >= 0) {
            let x = 0
            let y = 0
            if (!commonCenterCoordinates) {
                x = clockHand.json.CenterCoordinates ? clockHand.json.CenterCoordinates.X : 0
                y = clockHand.json.CenterCoordinates ? clockHand.json.CenterCoordinates.Y : 0
                
                if ( ! clockHand.json.CenterCoordinates?.X && !clockHand.json.CenterCoordinates?.X ) {
                    x = clockHand.json.CenterCoordinates?.X ? clockHand.json.CenterCoordinates?.X : width / 2
                    y = clockHand.json.CenterCoordinates?.Y ? clockHand.json.CenterCoordinates?.X : height / 2
                }
            } else {
                x = commonCenterCoordinates.X ? commonCenterCoordinates.X : 0
                y = commonCenterCoordinates.Y ? commonCenterCoordinates.Y : 0
            }

            let img = findImageById(clockHand.json.ImageIndex, images)
            if (img) {
                let offsetX = img.width / 2
                let offsetY = clockHand.json.PointerCenterOfRotationY ? clockHand.json.PointerCenterOfRotationY : 0
                
                let _startAngle = 0
                let _endAngle = 360
                if (value > total) value = total
                let angle = _startAngle + (value * (_endAngle - _startAngle ) / total)

                let radians = (Math.PI/180) * angle
                
                ctx.save(); // save current state
                ctx.translate(x, y); // change origin to center of rotation
                ctx.rotate(radians); // rotate
                ctx.drawImage(img, -offsetX, -offsetY, img.width, img.height);
                ctx.restore(); // restore original states (no rotation etc)
            }
        }
        if (clockHand.json.CoverImage?.ImageIndex >= 0) {
            drawImage(ctx, images, clockHand.json.CoverImage, drawBorder)
        }
}
