import Color from "../shared/color";
import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import {  WatchProgressBar } from "../model/watchFace.model";

export default function drawProgressBarLinear(ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    progressBar: WatchProgressBar,
    value: number, total: number) {
        if (total === null) return
        if (value > total) value = total
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
                    drawArcPath(ctx, progressBar.jsonObj.Flatness, x, y, width, height)
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
                    drawColorEndings(ctx, color, progressBar.jsonObj.Flatness, x, y, width, height)
                }
            }
            if (progressBar.jsonObj?.PointerImageIndex) {
                const img = findImageById(progressBar.jsonObj.PointerImageIndex, images)
                
                if (img) {
                    let x = lineB.StartX ? lineB.StartX : 0
                    let y = lineB.StartY ? lineB.StartY : 0
                    let endx = lineB.EndX ? lineB.EndX : x
                    let width = value * (endx - x) / total - img.width
                    if ( width >= 0)
                        ctx.drawImage(img, x + width, y);
                }
            }
        }
}


function drawArcPath(ctx: CanvasRenderingContext2D,  
    flatness: number, x: number, y: number, width: number, height: number) {

    if (flatness === 0 || !flatness) {
        // round edges
        let xc1 = x 
        let y1 = y 
        
        let xc2 = x + width - height / 2
        let y2 = y + height

        ctx.arc(xc1, y + height/2, height/2, 0.5*Math.PI, 1.5*Math.PI );
        ctx.lineTo(xc2, y1)
        ctx.arc(xc2, y + height/2, height/2, 1.5*Math.PI, 0.5*Math.PI );
        ctx.lineTo(xc1, y2)
    } else {
        ctx.rect(x, y, width, height)
    }
}

function drawColorEndings(ctx: CanvasRenderingContext2D, color: string, 
    flatness: number, x: number, y: number, width: number, height: number) {
    if (width < 3) return
    
    if (flatness === 0 || !flatness) {
        // round edges
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(x, y+height/2, height/2-1, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.fill()

        let x2 = x + width

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(x2, y+height/2, height/2-1, 0, 2* Math.PI)
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.fill()
    } 
}