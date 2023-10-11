import { IImage } from "../model/image.model";
import { WatchImage, WatchWeekdayImages } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import {drawImage} from "./image.element";


export default function drawWeekdayImages(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    weekdayImages: WatchWeekdayImages,
    watchState: WatchState,
    drawborder: boolean
    ) {
        if (weekdayImages.monday.enabled && weekdayImages.tuesday.enabled && weekdayImages.wednesday.enabled &&
            weekdayImages.thursday.enabled && weekdayImages.friday.enabled && weekdayImages.saturday.enabled &&
            weekdayImages.sunday.enabled) {
            let weekdayImage: WatchImage = null
            
            
            switch (watchState.weekday) {
                case 0:
                    weekdayImage = weekdayImages.monday
                    break;
                case 1:
                    weekdayImage = weekdayImages.tuesday
                    break;
                case 2:
                    weekdayImage = weekdayImages.wednesday
                    break;
                case 3:
                    weekdayImage = weekdayImages.thursday
                    break;
                case 4:
                    weekdayImage = weekdayImages.friday
                    break;
                case 5:
                    weekdayImage = weekdayImages.saturday
                    break;
                case 6:
                    weekdayImage = weekdayImages.sunday
                    break;
            
                default:
                    
                    break;
            }
            if (weekdayImage) drawImage(ctx, images, weekdayImage.json, drawborder)
        }
}