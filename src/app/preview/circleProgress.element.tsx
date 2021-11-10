import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { CircleScale } from "../model/json.gts2minit.model";

export default function drawCircleProgress(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    pointer: CircleScale, 
    value: number, 
    total: number ) {
        if (total === null) return
        if (pointer.PointerImageIndex >= 0) {
            let x = 0
            let y = 0
            x = pointer.CenterX ? pointer.CenterX : 0
            y = pointer.CenterY ? pointer.CenterY : 0

            let img = findImageById(pointer.PointerImageIndex, images)
            if (img) {
                let offsetX = img.width / 2
                let offsetY = pointer.PointerCenterOfRotationY ? pointer.PointerCenterOfRotationY : 0
                
                let _startAngle = pointer.RangeFrom ? pointer.RangeFrom : 0
                let _endAngle = pointer.RangeTo ? pointer.RangeTo : 360

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
}
