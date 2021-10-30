import { IImage } from "../../model/image.model";
import { Widget, Widgets } from "../../model/json.model";
import { LangCodeType } from "../../model/types.model";
import { getActivityListFromJson } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import { findImageById } from "../../shared/helper";
import drawActivityList from "./activity.element";

export default function drawWidgets(
    ctx: CanvasRenderingContext2D,
    images: IImage[],
    widgets: Widgets,
    watchState: WatchState,
    digitBorder: boolean,
    borderWidget: boolean,
    showWidgetPreview: boolean,
    ) {
    if (widgets) {
        widgets.Widget.forEach((widget, index) => {
            drawWidget(ctx, images, index, widget, watchState, digitBorder, borderWidget, showWidgetPreview, widgets.TopMaskImageIndex, widgets.UnderMaskImageIndex)
        });
    }
}

function drawWidget(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    index: number,
    widget: Widget, 
    watchState: WatchState,
    digitBorder: boolean,
    borderWidget: boolean,
    showWidgetPreview: boolean,
    topMask: number,
    bottomMask: number,
    ) {
    if (widget) {
        if (widget.WidgetElement && widget.WidgetElement.length > 0) {
            let previewIndex = watchState.widgets && index < watchState.widgets.length ? watchState.widgets[index] : 0
            if (showWidgetPreview && widget.WidgetElement[previewIndex].Preview) {
                // show only previews of widgets
                const imgBack = findImageById(bottomMask, images)
                if (imgBack) ctx.drawImage(imgBack, 0, 0)
                
                let preview = widget.WidgetElement[previewIndex].Preview;
                let index = preview.findIndex((item) => item.LangCode === LangCodeType.All.json)
                let imageIndex = index >= 0 ? index : 0
                const img = findImageById(preview[imageIndex].ImageSet.ImageIndex, images)
                if (img) ctx.drawImage(img, widget.X, widget.Y)

                const imgTop = findImageById(topMask, images)
                if (imgTop) ctx.drawImage(imgTop, 0, 0)
            } else {
                // show whole activities
                let ar = getActivityListFromJson(widget.WidgetElement[previewIndex].Activity);
                drawActivityList(ctx, images, ar, watchState, digitBorder)
            }
        }
        if (borderWidget) {
            ctx.strokeStyle = 'white'
            ctx.strokeRect(widget.X, widget.Y, widget.Width, widget.Height)
        } 
    }
}


