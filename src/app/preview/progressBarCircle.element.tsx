import Color from "../shared/color";
import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import {  WatchProgressBar } from "../model/watchFace.model";

export default function drawProgressBarCircle(ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    progressBar: WatchProgressBar,
    value: number, total: number) {
        if (total === null) return
        if ( progressBar.jsonObj?.AngleSettings) {

            let width = progressBar.jsonObj.Width ? progressBar.jsonObj.Width : 0

            let angleSettings = progressBar.jsonObj.AngleSettings
            let ax = angleSettings.X ? angleSettings.X : 0
            let ay = angleSettings.Y ? angleSettings.Y : 0
            if (value > total) value = total
            let startAngle = angleSettings.StartAngle ? angleSettings.StartAngle : 0
            let endAngle = angleSettings.EndAngle ? angleSettings.EndAngle : 360
            let sector_angle = startAngle + (value * (endAngle - startAngle ) / total)
            let radius = angleSettings.Radius  
            
            if (progressBar.jsonObj?.ForegroundImageIndex) {
                const img = findImageById(progressBar.jsonObj.ForegroundImageIndex, images)
                if (img) {

                    let dX = (ax - radius - (width / 2))
                    let dY = (ay - radius - (width / 2))

                    if (progressBar.jsonObj?.BackgroundImageIndex) {
                        const backimg = findImageById(progressBar.jsonObj.BackgroundImageIndex, images)
                        if (backimg) {
                            ctx.drawImage(backimg, dX, dY, backimg.width, backimg.height);
                        }
                    }

                    /// use save when using clip Path
                    ctx.save();
                    ctx.beginPath();
                    drawArcPath(ctx, progressBar.jsonObj.Flatness, 
                        ax, ay, startAngle, sector_angle, radius, width)
                    
                    /// define this Path as clipping mask
                    ctx.clip();

                    /// draw the image
                    ctx.drawImage(img, ax - img.width/2, ay - img.height/2);
                    //ctx.stroke() // test
                    /// reset clip to default
                    ctx.restore();
                }
            } else if (progressBar.jsonObj?.Color) {
                let color = Color.colorRead(progressBar.jsonObj.Color)
                if ( Color.GFG_Fun(color)) {

                    let dX = (ax - radius - (width / 2))
                    let dY = (ay - radius - (width / 2))

                    if (progressBar.jsonObj?.BackgroundImageIndex) {
                        const backimg = findImageById(progressBar.jsonObj.BackgroundImageIndex, images)
                        if (backimg) {
                            ctx.drawImage(backimg, dX, dY, backimg.width, backimg.height);
                        }
                    }

                    // begin by calling ctx.beginPath
                    ctx.beginPath();

                    let radianStart = (Math.PI/180) * (startAngle-90)
                    let radianEnd = (Math.PI/180) * (sector_angle-90)
                    let clockwise = radianStart < radianEnd;
                    
                    // calling canvas src with all arguments
                    ctx.arc(ax, ay,
                        radius, radianStart, radianEnd, !clockwise);
                    // set stroke and fill style
                    ctx.strokeStyle = color;
                    ctx.lineWidth = width;
                    // fill, and stroke
                    ctx.stroke();
                    drawColorEndings(ctx, color, progressBar.jsonObj.Flatness, 
                        ax, ay, startAngle, sector_angle, radius, width)
                    ctx.lineWidth = 1;
                }
            }
            if (progressBar.jsonObj?.PointerImageIndex) {
                const img = findImageById(progressBar.jsonObj.PointerImageIndex, images)
                if (img) {
                    let _x = ax + (radius) * Math.cos(Math.PI * (sector_angle - 90) / 180)
                    let _y = ay + (radius) * Math.sin(Math.PI * (sector_angle - 90) / 180)
                    ctx.drawImage(img, _x, _y, img.width, img.height);
                }
            }
        }
}

function drawArcPath(ctx: CanvasRenderingContext2D, flatness: number, x: number, y: number, 
    startAngle: number, endAngle: number, radius: number, width: number) {
    if (width < 3) return

    if (flatness === 0 || !flatness) {
        let xc1 = x + (radius) * Math.cos(Math.PI * (startAngle - 90) / 180)
        let yc1 = y + (radius) * Math.sin(Math.PI * (startAngle - 90) / 180)

        let xc2 = x + (radius) * Math.cos(Math.PI * (endAngle - 90) / 180)
        let yc2 = y + (radius) * Math.sin(Math.PI * (endAngle - 90) / 180)

        let radianStart = (Math.PI/180) * (startAngle-90)
        let radianEnd = (Math.PI/180) * (endAngle-90)
        let clockwise = radianStart < radianEnd;

        ctx.arc(x, y, radius-width/2, radianStart, radianEnd, !clockwise);
        ctx.arc(xc1, yc1, width/2, radianStart - Math.PI, radianStart, !clockwise)
        ctx.arc(x, y, radius+width/2, radianStart, radianEnd, !clockwise);
        ctx.arc(xc2, yc2, width/2, radianEnd , radianEnd + Math.PI, !clockwise)

    } else if (flatness === 90) {
        // spike

        let radianStart = (Math.PI/180) * (startAngle-90)
        let radianEnd = (Math.PI/180) * (endAngle-90)
        let clockwise = radianStart < radianEnd;

        let x1 = x + (radius-width/2) * Math.cos(Math.PI * (startAngle - 90) / 180)
        let y1 = y + (radius-width/2) * Math.sin(Math.PI * (startAngle - 90) / 180)
        
        let x2 = x + (radius) * Math.cos(Math.PI * (startAngle - ( clockwise ? 1 : -1) * (width/2 * 360 / (2 * Math.PI * (radius - width / 2))) - 90) / 180)
        let y2 = y + (radius) * Math.sin(Math.PI * (startAngle - ( clockwise ? 1 : -1) * (width/2 * 360 / (2 * Math.PI * (radius - width / 2))) - 90) / 180)
        
        let x3 = x + (radius+width/2) * Math.cos(Math.PI * (startAngle - 90) / 180)
        let y3 = y + (radius+width/2) * Math.sin(Math.PI * (startAngle - 90) / 180)
        
        //let x4 = x + (radius+width/2) * Math.cos(Math.PI * (endAngle - 90) / 180)
        //let y4 = y + (radius+width/2) * Math.sin(Math.PI * (endAngle - 90) / 180)

        let x5 = x + (radius) * Math.cos(Math.PI * (endAngle + ( clockwise ? 1 : -1) * width/2 * 360 / (2 * Math.PI * (radius - width / 2)) - 90) / 180)
        let y5 = y + (radius) * Math.sin(Math.PI * (endAngle + ( clockwise ? 1 : -1) * width/2 * 360 / (2 * Math.PI * (radius - width / 2)) - 90) / 180)
        
        let x6 = x + (radius-width/2) * Math.cos(Math.PI * (endAngle - 90) / 180)
        let y6 = y + (radius-width/2) * Math.sin(Math.PI * (endAngle - 90) / 180)
        
        ctx.arc(x, y, radius-width/2, radianStart, radianEnd, !clockwise);
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        
        ctx.arc(x, y, radius+width/2, radianStart, radianEnd, !clockwise);
        ctx.lineTo(x5, y5);
        ctx.lineTo(x6, y6);

    } else {
        // flat
        let x1 = x + (radius-width/2) * Math.cos(Math.PI * (startAngle - 90) / 180)
        let y1 = y + (radius-width/2) * Math.sin(Math.PI * (startAngle - 90) / 180)

        let x2 = x + (radius+width/2) * Math.cos(Math.PI * (startAngle - 90) / 180)
        let y2 = y + (radius+width/2) * Math.sin(Math.PI * (startAngle - 90) / 180)
        
        //let x3 = x + (radius+width/2) * Math.cos(Math.PI * (endAngle - 90) / 180)
        //let y3 = y + (radius+width/2) * Math.sin(Math.PI * (endAngle - 90) / 180)
        
        let x4 = x + (radius-width/2) * Math.cos(Math.PI * (endAngle - 90) / 180)
        let y4 = y + (radius-width/2) * Math.sin(Math.PI * (endAngle - 90) / 180)
        
        let radianStart = (Math.PI/180) * (startAngle-90)
        let radianEnd = (Math.PI/180) * (endAngle-90)
        let clockwise = radianStart < radianEnd;

        ctx.arc(x, y, radius-width/2, radianStart, radianEnd, !clockwise);
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.arc(x, y, radius+width/2, radianStart, radianEnd, !clockwise);
        ctx.lineTo(x4, y4)
    }
}

function drawColorEndings(ctx: CanvasRenderingContext2D, color: string, 
    flatness: number, x: number, y: number, startAngle: number, endAngle: number, 
    radius: number, width: number) {
    if (width < 3) return



    if (flatness === 0 || !flatness) {
        // round edges
        let _x = x + (radius) * Math.cos(Math.PI * (startAngle - 90) / 180)
        let _y = y + (radius) * Math.sin(Math.PI * (startAngle - 90) / 180)
        
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(_x, _y, width/2-1, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.fill()

        _x = x + (radius) * Math.cos(Math.PI * (endAngle - 90) / 180)
        _y = y + (radius) * Math.sin(Math.PI * (endAngle - 90) / 180)
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(_x, _y, width/2-1, 0, 2* Math.PI)
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.fill()
    } else if (flatness === 90) {
        // spike
        let x1 = x + (radius+width/2) * Math.cos(Math.PI * (startAngle - 90) / 180)
        let y1 = y + (radius+width/2) * Math.sin(Math.PI * (startAngle - 90) / 180)

        let x2 = x + (radius-width/2) * Math.cos(Math.PI * (startAngle - 90) / 180)
        let y2 = y + (radius-width/2) * Math.sin(Math.PI * (startAngle - 90) / 180)

        let x3 = x + (radius) * Math.cos(Math.PI * (startAngle - width/2 * 360 / (2 * Math.PI * (radius - width / 2)) - 90) / 180)
        let y3 = y + (radius) * Math.sin(Math.PI * (startAngle - width/2 * 360 / (2 * Math.PI * (radius - width / 2)) - 90) / 180)

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();

        x1 = x + (radius+width/2) * Math.cos(Math.PI * (endAngle - 90) / 180)
        y1 = y + (radius+width/2) * Math.sin(Math.PI * (endAngle - 90) / 180)

        x2 = x + (radius-width/2) * Math.cos(Math.PI * (endAngle - 90) / 180)
        y2 = y + (radius-width/2) * Math.sin(Math.PI * (endAngle - 90) / 180)

        x3 = x + (radius) * Math.cos(Math.PI * (endAngle + width/2 * 360 / (2 * Math.PI * (radius - width / 2)) - 90) / 180)
        y3 = y + (radius) * Math.sin(Math.PI * (endAngle + width/2 * 360 / (2 * Math.PI * (radius - width / 2)) - 90) / 180)

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
    }
}