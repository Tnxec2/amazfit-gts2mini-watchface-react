import { IImage } from "../model/image.model";
import { WatchWidget, WatchWidgets } from "../model/watchFace.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawActivityList from "./activity.element";
import drawDate from "./date.element";

export default function drawWidgets(
    ctx: CanvasRenderingContext2D,
    images: IImage[],
    widgets: WatchWidgets,
    watchState: WatchState,
    digitBorder: boolean,
    borderWidget: boolean,
    showWidgetPreview: boolean,
    ) {
    if (widgets) {
        widgets.widgets.forEach((widget, index) => {
            drawWidget(ctx, images, index, widget, watchState, digitBorder, borderWidget, showWidgetPreview, widgets.topMaskImageIndex, widgets.underMaskImageIndex)
        });
    }
}

function drawWidget(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    index: number,
    widget: WatchWidget, 
    watchState: WatchState,
    digitBorder: boolean,
    borderWidget: boolean,
    showWidgetPreview: boolean,
    topMask: number,
    bottomMask: number,
    ) {
    if (widget) {
        if (widget.widgetElements && widget.widgetElements.length > 0) {
            let previewIndex = watchState.widgets && index < watchState.widgets.length ? watchState.widgets[index] : 0
            if (showWidgetPreview && widget.widgetElements[previewIndex].previewImageIndex) {
                // show only previews of widgets
                const imgBack = findImageById(bottomMask, images)
                if (imgBack) ctx.drawImage(imgBack, 0, 0)
                
                let preview = widget.widgetElements[previewIndex].previewImageIndex;
                const img = findImageById(preview[preview].ImageSet.ImageIndex, images)
                if (img) ctx.drawImage(img, widget.x, widget.y)

                const imgTop = findImageById(topMask, images)
                if (imgTop) ctx.drawImage(imgTop, 0, 0)
            } else {
                // show all activities
                let ar = widget.widgetElements[previewIndex].activitys;
                if ( ar ) drawActivityList(ctx, images, ar, watchState, digitBorder);
                if (widget.widgetElements[previewIndex].date) {
                    drawDate(
                      ctx,
                      images,
                      widget.widgetElements[previewIndex].date,
                      widget.widgetElements[previewIndex].date.orderElements,
                      watchState,
                      digitBorder
                    );
                  }
            }
        }
        if (borderWidget) {
            ctx.strokeStyle = 'white'
            ctx.strokeRect(widget.x, widget.y, widget.width, widget.height)
        } 
    }
}


