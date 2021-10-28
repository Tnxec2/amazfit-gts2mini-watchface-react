import { IImage } from "../../model/image.model";
import { Widget, Widgets } from "../../model/json.model";
import { ActivityType } from "../../model/types.model";
import { getActivity } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawActivityList from "./activity.element";

export default function drawWidgets(
    ctx: CanvasRenderingContext2D,
    images: IImage[],
    widgets: Widgets,
    watchState: WatchState,
    digitBorder: boolean) {
    if (widgets) {
        widgets.Widget.forEach((widget) => {
            drawWidget(ctx, images, widget, watchState, digitBorder)
        });
    }
}

function drawWidget(ctx: CanvasRenderingContext2D, images: IImage[], widget: Widget, watchState: WatchState,
    digitBorder: boolean) {
    if (widget) {
        if (widget.WidgetElement && widget.WidgetElement.length > 0) {
            let ar = widget.WidgetElement[0].Activity.map((a) => getActivity(a, ActivityType.findByJson(a.Type)) )
            drawActivityList(ctx, images, ar, watchState, digitBorder)
        }
        // ctx.strokeStyle = 'white'
        // ctx.fillStyle = 'white'
        // ctx.strokeRect(widget.X, widget.Y, widget.Width, widget.Height)
        // ctx.font = "20px Verdana";
        // let title = 'widget'
        // var size = ctx.measureText(title);
        // ctx.fillText('widget',  widget.X + widget.Width/2 - size.width/2, 
        //     widget.Y + widget.Height/2 + parseInt(ctx.font)/2)
    }

}


