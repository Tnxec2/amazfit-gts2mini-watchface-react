import { ActivityType } from "../../model/json.model";
import { ElementOrderItem, WatchActivityList } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawDigit from "./digit.element";

export default function draw(
    ctx: CanvasRenderingContext2D, 
    images: HTMLImageElement[],
    activity: WatchActivityList,
    orderElements: ElementOrderItem[],
    watchState: WatchState,
    digitBorder: boolean
    ) {

        orderElements.forEach((item) => {
            switch (item.type) {
                case ActivityType.Battery.index:
                    if (activity.battery.digit.enabled) {
                        drawDigit(ctx, images, activity.battery.digit, watchState.battery, null, digitBorder)
                    }
                    break;
                case ActivityType.Steps.index:
                    if (activity.steps.digit.enabled) {
                        drawDigit(ctx, images, activity.steps.digit, watchState.steps, null, digitBorder)
                    }
                    break;
                case ActivityType.Calories.index:
                    if (activity.calories.digit.enabled) {
                        drawDigit(ctx, images, activity.calories.digit, watchState.steps, null, digitBorder)
                    }
                    break;
                case ActivityType.HeartRate.index:
                    if (activity.heartRate.digit.enabled) {
                        drawDigit(ctx, images, activity.heartRate.digit, watchState.steps, null, digitBorder)
                    }
                    break;
                case ActivityType.Pai.index:
                    if (activity.pai.digit.enabled) {
                        drawDigit(ctx, images, activity.pai.digit, watchState.steps, null, digitBorder)
                    }
                    break;
                case ActivityType.Distance.index:
                    if (activity.distance.digit.enabled) {
                        drawDigit(ctx, images, activity.distance.digit, watchState.distance, null, digitBorder)
                    }
                    break;
                case ActivityType.StandUp.index:
                    if (activity.standUp.digit.enabled) {
                        drawDigit(ctx, images, activity.standUp.digit, watchState.distance, null, digitBorder)
                    }
                    break;
                case ActivityType.Weather.index:
                    if (activity.weather.digit.enabled) {
                        drawDigit(ctx, images, activity.weather.digit, watchState.temperature, null, digitBorder)
                    }
                    if (activity.weatherMin.digit.enabled) {
                        drawDigit(ctx, images, activity.weatherMin.digit, watchState.temperature - 10, null, digitBorder)
                    }
                    if (activity.weatherMax.digit.enabled) {
                        drawDigit(ctx, images, activity.weatherMax.digit, watchState.temperature + 10, null, digitBorder)
                    }
                    break;
                default:
                    break;
            }
        });
}
