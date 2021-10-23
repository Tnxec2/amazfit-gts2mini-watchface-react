import { IImage } from "../../model/image.model";
import { Widget, Widgets } from "../../model/json.model";
  
export default function drawWidgets(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    widgets: Widgets) {
    if (widgets) {
        widgets.Widget.forEach((widget) => {
            drawWidget(ctx, images, widget)
        });
    }
}

function drawWidget(ctx:CanvasRenderingContext2D, images: IImage[], widget: Widget) {
    if ( widget) {
        ctx.strokeStyle = 'white'
        ctx.fillStyle = 'white'
        ctx.strokeRect(widget.X, widget.Y, widget.Width, widget.Height)
        ctx.font = "20px Verdana";
        let title = 'widget'
        var size = ctx.measureText(title);
        ctx.fillText('widget',  widget.X + widget.Width/2 - size.width/2, 
            widget.Y + widget.Height/2 + parseInt(ctx.font)/2)
    }
    
}