import { findImageById } from "../../../shared/helper";
import { Constant } from "../../model/constant";
import { IImage } from "../../model/image.model";
import { WatchClockHand } from "../../model/watchFace.model";

export default function drawclockhand(ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    clockHand: WatchClockHand, value: number, total: number) {
        if (clockHand.scaleImageIndex >= 0) {
            if ( clockHand.scaleImageIndex > images.length) {
                alert('bad imageIndex:' + clockHand.scaleImageIndex)
                return
            }
            let x = clockHand.scaleX ? clockHand.scaleX : 0
            let y = clockHand.scaleY ? clockHand.scaleY : 0
            let img = findImageById(clockHand.scaleImageIndex, images)
            if (img) ctx.drawImage(img, x, y, img.width, img.height);
        }
        if (clockHand.pointerImageIndex >= 0) {
            if ( clockHand.pointerImageIndex > images.length) {
                alert('bad imageIndex:' + clockHand.pointerImageIndex)
                return
            }
            let x = clockHand.x ? clockHand.x : 0
            let y = clockHand.y ? clockHand.y : 0
            if ( !clockHand.x && !clockHand.y) {
                x = clockHand.x ? clockHand.x : Constant.width / 2
                y = clockHand.y ? clockHand.y : Constant.height / 2
            }
            let img = findImageById(clockHand.pointerImageIndex, images)
            if (img) {
                let offsetX = clockHand.pointerX ? clockHand.pointerX : img.width / 2
                let offsetY = clockHand.pointerY ? clockHand.pointerY : img.height / 2
                
                let _startAngle = clockHand.startAngle ? clockHand.startAngle: 0
                let _endAngle = clockHand.endAngle ? clockHand.endAngle: 360
                let angle = _startAngle + Math.round(value * (_endAngle - _startAngle ) / total)
                angle = Math.min(angle, _endAngle)
                angle = Math.max(angle, _startAngle)
                let radians = (Math.PI/180) * angle
                
                ctx.save(); // save current state
                ctx.translate(x, y); // change origin to center of rotation
                ctx.rotate(radians); // rotate
                ctx.drawImage(img, -offsetX, -offsetY, img.width, img.height);
                ctx.restore(); // restore original states (no rotation etc)
            }
        }
        if (clockHand.coverImageIndex >= 0) {
            let x = clockHand.coverX ? clockHand.coverX : 0
            let y = clockHand.coverY ? clockHand.coverY : 0
            let img = findImageById(clockHand.coverImageIndex, images)
            if ( img ) ctx.drawImage(img, x, y, img.width, img.height);
        }
}