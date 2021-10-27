import { IImage } from "../../model/image.model";
import { ActivityType } from "../../model/types.model";
import { WatchActivity } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawclockhand from "./clockHand.element";
import drawDigit from "./digit.element";
import drawImageCoords from "./imageCoords.element";
import drawImageProgress from "./imageProgress.element";
import drawProgressBarCircle from "./progressBarCircle.element";
import drawProgressBarLinear from "./progressBarLinear.element";
import { getSystemFontText } from "./systemfont.element";

interface IDigitDraw {
    cur: {
        value: number,
        total: number
    },
    min: {
        value: number,
        total: number
    },
    max: {
        value: number,
        total: number
    },
    imageProgress: {
        value: number,
        total: number
    }
}

export default function draw(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    activitys: WatchActivity[],
    watchState: WatchState,
    digitBorder: boolean
    ) {
        let val = 0
        let total = 0
        activitys.forEach((activity) => {
            switch (activity.type) {
                case ActivityType.Battery:
                    val = watchState.battery
                    total = watchState.batteryGoal
                    drawActivity(ctx, images, activity, { cur: { value: val, total: total }, min: { value: val, total: total }, max: { value: val, total: total }, imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.Steps:
                    val = watchState.steps
                    total = watchState.stepsGoal
                    drawActivity(ctx, images, activity, { cur: { value: val, total: total }, min: { value: val, total: total }, max: { value: val, total: total }, imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.Calories:
                    val = watchState.calories
                    total = watchState.caloriesGoal
                    drawActivity(ctx, images, activity, { cur: { value: val, total: total }, min: { value: val, total: total }, max: { value: val, total: total }, imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.HeartRate:
                    val = watchState.hearthrate
                    total = watchState.hearthrateGoal
                    drawActivity(ctx, images, activity, { cur: { value: val, total: total }, min: { value: val, total: total }, max: { value: val, total: total }, imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.Pai:
                    val = watchState.pai
                    total = watchState.paiGoal
                    drawActivity(ctx, images, activity, { cur: { value: val, total: total }, min: { value: val, total: total }, max: { value: val, total: total }, imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.Distance:
                    val = watchState.distance
                    drawActivity(ctx, images, activity, { cur: { value: val, total: null }, min: { value: val, total: null }, max: { value: val, total: null }, imageProgress: null}, digitBorder)
                    break;
                case ActivityType.StandUp:
                    val = watchState.standup
                    total = watchState.standupGoal
                    drawActivity(ctx, images, activity, { cur: { value: val, total: total }, min: { value: val, total: total }, max: { value: val, total: total }, imageProgress: { value: val, total: total}}, digitBorder)
                    break;
                case ActivityType.Weather:
                    drawActivity(ctx, images, activity, {
                         cur: { value: watchState.temperature, total: null },
                         min: { value: watchState.temperatureMin, total: null }, 
                         max: { value: watchState.temperatureMax, total: null }, 
                         imageProgress: { value: watchState.weatherIcon, total: 29}},
                         digitBorder)
                    break;
                default:
                    break;
            }
        });
}

function drawActivity(ctx: CanvasRenderingContext2D, images: IImage[], a: WatchActivity, values: IDigitDraw, digitBorder: boolean) {
    let followxy = null
    if (a.digit?.enabled) {
        followxy = drawDigit(ctx, images, a.digit, values.cur.value, followxy, digitBorder, false, getSystemFontText(a.digit, values.cur.value))
    }
    if (a.digitMin?.enabled) {
        followxy = drawDigit(ctx, images, a.digitMin, values.min.value, followxy, digitBorder, false, getSystemFontText(a.digit, values.min.value))
    }
    if (a.digitMax?.enabled) {
        drawDigit(ctx, images, a.digit, values.max.value, followxy, digitBorder, false, getSystemFontText(a.digit, values.min.value))
    }
    if (a.imageProgress.enabled) {
        drawImageProgress(ctx, images, a.imageProgress, values.imageProgress.value, values.imageProgress.total)
    }
    if (a.pointerProgress.enabled) {
        drawclockhand(ctx, images, a.pointerProgress, values.cur.value, values.cur.total)
    }
    if (a.progressBar.enabledLinear) {
        drawProgressBarLinear(ctx, images, a.progressBar, values.cur.value, values.cur.total)
    }
    if (a.progressBar.enabledCircle) {
        drawProgressBarCircle(ctx, images, a.progressBar, values.cur.value, values.cur.total)
    }
    if (a.icon.enabled) {
        drawImageCoords(ctx, images, a.icon.json)
    }
}
