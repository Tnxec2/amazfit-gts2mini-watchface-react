import { IImage } from "../../model/image.model";
import { ActivityType } from "../../model/json.model";
import { ElementOrderItem, WatchActivity, WatchActivityList } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawclockhand from "./clockHand.element";
import drawDigit from "./digit.element";
import drawImageCoords from "./imageCoords.element";
import drawImageProgress from "./imageProgress.element";
import drawProgressBarCircle from "./progressBarCircle.element";
import drawProgressBarLinear from "./progressBarLinear.element";

export default function draw(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    activity: WatchActivityList,
    orderElements: ElementOrderItem[],
    watchState: WatchState,
    digitBorder: boolean
    ) {
        orderElements.forEach((item) => {
            switch (item.type) {
                case ActivityType.Battery.index:
                    drawActivity(ctx, images, activity.battery, watchState.battery, 100, digitBorder)
                    break;
                case ActivityType.Steps.index:
                    drawActivity(ctx, images, activity.steps, watchState.steps, watchState.stepsGoal, digitBorder)
                    break;
                case ActivityType.Calories.index:
                    drawActivity(ctx, images, activity.calories, watchState.calories, 999, digitBorder)
                    break;
                case ActivityType.HeartRate.index:
                    drawActivity(ctx, images, activity.heartRate, watchState.hearthrate, 200, digitBorder)
                    break;
                case ActivityType.Pai.index:
                    drawActivity(ctx, images, activity.pai, watchState.pai, 100, digitBorder)
                    break;
                case ActivityType.Distance.index:
                    drawDistance(ctx, images, activity.distance, watchState.distance, digitBorder)
                    break;
                case ActivityType.StandUp.index:
                    drawActivity(ctx, images, activity.standUp, watchState.standup, 12, digitBorder)
                    break;
                case ActivityType.Weather.index:
                    if (activity.weather.digit.enabled) {
                        drawDigit(ctx, images, activity.weather.digit, watchState.temperature, null, digitBorder)
                    }
                    if (activity.weather.imageProgress.enabled) {
                        drawImageProgress(ctx, images, activity.weather.imageProgress, watchState.weatherIcon, 29)
                    }
                    if (activity.weather.icon.enabled) {
                        drawImageCoords(ctx, images, activity.weather.icon)
                    }
                    if (activity.weatherMin.digit.enabled) {
                        drawDigit(ctx, images, activity.weatherMin.digit, watchState.temperatureMin, null, digitBorder)
                    }
                    if (activity.weatherMin.imageProgress.enabled) {
                        drawImageProgress(ctx, images, activity.weatherMin.imageProgress, watchState.weatherIcon, 29)
                    }
                    if (activity.weatherMin.icon.enabled) {
                        drawImageCoords(ctx, images, activity.weatherMin.icon)
                    }
                    if (activity.weatherMax.digit.enabled) {
                        drawDigit(ctx, images, activity.weatherMax.digit, watchState.temperatureMax, null, digitBorder)
                    }
                    if (activity.weatherMax.imageProgress.enabled) {
                        drawImageProgress(ctx, images, activity.weatherMax.imageProgress, watchState.weatherIcon, 29)
                    }
                    if (activity.weatherMax.icon.enabled) {
                        drawImageCoords(ctx, images, activity.weatherMax.icon)
                    }
                    break;
                default:
                    break;
            }
        });
}

function drawActivity(ctx: CanvasRenderingContext2D, images: IImage[], a: WatchActivity, value: number, total: number, digitBorder: boolean) {
    if (a.digit.enabled) {
        drawDigit(ctx, images, a.digit, value, null, digitBorder)
    }
    if (a.imageProgress.enabled) {
        drawImageProgress(ctx, images, a.imageProgress, value, total)
    }
    if (a.pointerProgress.enabled) {
        drawclockhand(ctx, images, a.pointerProgress, value, total)
    }
    if (a.progressBar.enabledLinear) {
        drawProgressBarLinear(ctx, images, a.progressBar, value, total)
    }
    if (a.progressBar.enabledCircle) {
        drawProgressBarCircle(ctx, images, a.progressBar, value, total)
    }
    if (a.icon.enabled) {
        drawImageCoords(ctx, images, a.icon)
    }
}

function drawDistance(ctx: CanvasRenderingContext2D, images: IImage[], a: WatchActivity, value: number, digitBorder: boolean) {
    if (a.digit.enabled) {
        drawDigit(ctx, images, a.digit, value, null, digitBorder)
    }
    if (a.icon.enabled) {
        drawImageCoords(ctx, images, a.icon)
    }
}