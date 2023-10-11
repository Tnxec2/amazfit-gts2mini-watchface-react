import { IImage } from "../model/image.model";
import { WatchHourlyImages } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import { drawImageByIndex } from "./image.element";


export default function drawHourlyImages(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    hourlyImages: WatchHourlyImages,
    watchState: WatchState,
    digitBorder: boolean
    ) {

    if (hourlyImages.iconSet.enabled) {
        const iconSet = hourlyImages.iconSet.json
        const hours = watchState.hours
        const minutes = watchState.minutes
        if (iconSet?.ImageIndex && iconSet?.Coordinates) {
            for (let index = 0; index < hourlyImages.timeSpans.length; index++) {
                const element = hourlyImages.timeSpans[index];
                if ( (hours > element.StartHour && hours < element.StopHour) 
                    || (hours === element.StartHour && minutes >= element.StartMin)
                    || (hours === element.StopHour && minutes < element.StopMin)
                ) {
                    drawImageByIndex(ctx, images, iconSet.ImageIndex + index, iconSet.Coordinates[index].X, iconSet.Coordinates[index].Y, digitBorder)
                }
            }
        }
    }
}



