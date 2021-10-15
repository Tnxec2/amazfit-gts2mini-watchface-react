import { Constant } from "../../model/constant";
import { WatchClockHand } from "../../model/watchFace.model";

export default function drawclockhand(ctx: CanvasRenderingContext2D, 
    images: HTMLImageElement[], 
    clockHand: WatchClockHand, value: number, total: number) {
        if (clockHand.scaleImageIndex >= 0) {
            if ( clockHand.scaleImageIndex > images.length) {
                alert('bad imageIndex:' + clockHand.scaleImageIndex)
                return
            }
            let x = clockHand.scaleX ? clockHand.scaleX : 0
            let y = clockHand.scaleY ? clockHand.scaleY : 0
            let img = images[clockHand.scaleImageIndex]
            ctx.drawImage(img, x, y, img.width, img.height);
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
            let img = images[clockHand.pointerImageIndex]
            let offsetX = clockHand.pointerX ? clockHand.pointerX : img.width / 2
            let offsetY = clockHand.pointerY ? clockHand.pointerY : img.height / 2
            let _startAngle = clockHand.startAngle ? clockHand.startAngle: 0
            let _endAngle = clockHand.endAngle ? clockHand.endAngle: 0
            let angle = Math.round(value * (_endAngle - _startAngle ) / total)
            let radians = (Math.PI/180) * angle
            
            ctx.save(); // save current state
            ctx.translate(x, y); // change origin to center of rotation
            ctx.rotate(radians); // rotate
            console.log(value, total, _startAngle, _endAngle, angle, x, offsetX, y, offsetY);
            ctx.drawImage(img, -offsetX, -offsetY, img.width, img.height);
            ctx.restore(); // restore original states (no rotation etc)
        }
        if (clockHand.coverImageIndex >= 0) {
            if ( clockHand.coverImageIndex > images.length) {
                alert('bad imageIndex:' + clockHand.coverImageIndex)
                return
            }
            let x = clockHand.coverX ? clockHand.coverX : 0
            let y = clockHand.coverY ? clockHand.coverY : 0
            let img = images[clockHand.coverImageIndex]
            ctx.drawImage(img, x, y, img.width, img.height);
        }
}