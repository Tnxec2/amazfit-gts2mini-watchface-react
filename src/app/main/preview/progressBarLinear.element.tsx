import Color from "../../shared/color";
import { findImageById } from "../../shared/helper";
import { IImage } from "../../model/image.model";
import {  WatchProgressBar } from "../../model/watchFace.model";

export default function drawProgressBarLinear(ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    progressBar: WatchProgressBar,
    value: number, total: number) {
        if (total === null) return
        if ( progressBar.jsonObj?.LinearSettings) {
            let lineB = progressBar.jsonObj.LinearSettings
            if (progressBar.jsonObj?.BackgroundImageIndex) {
                const img = findImageById(progressBar.jsonObj.BackgroundImageIndex, images)
                if (img) {
                    let x = lineB.StartX ? lineB.StartX : 0
                    let y = lineB.StartY ? lineB.StartY : 0
                    let endx = lineB.EndX ? lineB.EndX : x + img.width
                    let endy = lineB.EndY ? lineB.EndY : y + img.height
                    let width = Math.min(endx - x, img.width)
                    let height = Math.min(endy - y, img.height)
                    ctx.drawImage(img, x, y, width, height);
                }
            }
            if (progressBar.jsonObj?.ForegroundImageIndex) {
                const img = findImageById(progressBar.jsonObj.ForegroundImageIndex, images)
                if (img) {
                    let x = lineB.StartX ? lineB.StartX : 0
                    let y = lineB.StartY ? lineB.StartY : 0
                    let endx = lineB.EndX ? lineB.EndX : x + img.width
                    let width = value * (endx - x) / total
                    width = Math.min(width, img.width)
                    let height = progressBar.jsonObj.Width
                    height = Math.min(height, img.height)
                    
                    /// use save when using clip Path
                    ctx.save();
                    ctx.beginPath();
                    ctx.rect(x, y, width, height)
                    /// define this Path as clipping mask
                    ctx.clip();
                    
                    /// draw the image
                    ctx.drawImage(img, x, y);
                    
                    //ctx.stroke() // test
                    /// reset clip to default
                    ctx.restore();
                }
            } else if (progressBar.jsonObj?.Color) {
                let color = Color.colorRead(progressBar.jsonObj.Color)
                if ( Color.GFG_Fun(color)) {
                    ctx.fillStyle = color
                    let x = lineB.StartX ? lineB.StartX : 0
                    let y = lineB.StartY ? lineB.StartY : 0
                    let endx = lineB.EndX ? lineB.EndX : x
                    let height = progressBar.jsonObj.Width
                    let width = value * (endx - x) / total
                    ctx.fillRect(x, y, width, height)
                }
            }
            if (progressBar.jsonObj?.PointerImageIndex) {
                const img = findImageById(progressBar.jsonObj.PointerImageIndex, images)
                if (img) {
                    let x = lineB.StartX ? lineB.StartX : 0
                    let y = lineB.StartY ? lineB.StartY : 0
                    let endx = lineB.EndX ? lineB.EndX : x
                    let endy = lineB.EndY ? lineB.EndY : y
                    let width = value * (endx - x) / total
                    width = Math.min(width, img.width)
                    let height = Math.min(endy - y, img.height)
                    ctx.drawImage(img, x, y, width, height);
                }
            }
        }
}