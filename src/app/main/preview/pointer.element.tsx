import { findImageById } from "../../shared/helper";
import { Constant } from "../../shared/constant";
import { IImage } from "../../model/image.model";
import { MultilangImage } from "../../model/json.model";
import { WatchClockHand } from "../../model/watchFace.model";
import { LangCodeType } from "../../model/types.model";

export default function drawPointer(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    clockHand: WatchClockHand, 
    value: number, 
    total: number,
    withOffset?: boolean) {
        if (total === null) return
        if (clockHand.json.Scale) {
            const scaleImageSetIndex = findImageIndex(clockHand.json.Scale?.ImageSet);
            if (clockHand.json.Scale.ImageSet[scaleImageSetIndex].ImageSet.ImageIndex >= 0) {
                let x = clockHand.json.Scale.Coordinates?.X ? clockHand.json.Scale.Coordinates?.X : 0
                let y = clockHand.json.Scale.Coordinates?.Y ? clockHand.json.Scale.Coordinates?.Y : 0
                let img = findImageById(clockHand.json.Scale.ImageSet[scaleImageSetIndex].ImageSet.ImageIndex, images)
                if (img) ctx.drawImage(img, x, y, img.width, img.height);
            }
        }
        if (clockHand.json.Pointer?.ImageIndex >= 0) {
            let x = clockHand.json.X ? clockHand.json.X : 0
            let y = clockHand.json.Y ? clockHand.json.Y : 0
            if ( !clockHand.json.X && !clockHand.json.Y) {
                x = clockHand.json.X ? clockHand.json.X : Constant.width / 2
                y = clockHand.json.Y ? clockHand.json.Y : Constant.height / 2
            }
            let img = findImageById(clockHand.json.Pointer?.ImageIndex, images)
            if (img) {
                let offsetX = clockHand.json.Pointer.Coordinates?.X ? clockHand.json.Pointer.Coordinates?.X : img.width / 2
                let offsetY = clockHand.json.Pointer.Coordinates?.Y ? clockHand.json.Pointer.Coordinates?.Y : img.height / 2
                
                let _startAngle = clockHand.json.StartAngle ? clockHand.json.StartAngle: 0
                let _endAngle = clockHand.json.EndAngle ? clockHand.json.EndAngle: 360
                let offsetAngle = withOffset ? (offsetX) * 180 / (offsetY * Math.PI) : 0
                let angle = _startAngle + Math.round(value * (_endAngle - _startAngle ) / total) + offsetAngle
                
                angle = Math.min(angle, _endAngle + offsetAngle)
                angle = Math.max(angle, _startAngle)
                let radians = (Math.PI/180) * angle
                
                ctx.save(); // save current state
                ctx.translate(x, y); // change origin to center of rotation
                ctx.rotate(radians); // rotate
                ctx.drawImage(img, -offsetX, -offsetY, img.width, img.height);
                ctx.restore(); // restore original states (no rotation etc)
            }
        }
        if (clockHand.json.Cover?.ImageIndex >= 0) {
            let x = clockHand.json.Cover?.Coordinates?.X ? clockHand.json.Cover.Coordinates.X : 0
            let y = clockHand.json.Cover?.Coordinates?.Y ? clockHand.json.Cover.Coordinates?.Y : 0
            let img = findImageById(clockHand.json.Cover.ImageIndex, images)
            if ( img ) ctx.drawImage(img, x, y, img.width, img.height);
        }
}

function findImageIndex(ar: MultilangImage[]): number {
    let index = ar.findIndex((item) => item.LangCode === LangCodeType.All.json)
    return index ? index : 0
  }