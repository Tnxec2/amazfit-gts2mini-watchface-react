import { IImage } from "../../model/image.model";
import { FollowType } from "../../model/types.model";
import { WatchDialFace } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawDigit from "./digit.element";
import drawMultilangImageCoords from "./multiLangImageCoords.element";
import { addUnitsAndSeparator } from "./systemfont.element";

export default function drawTimeDigital(
    ctx: CanvasRenderingContext2D, 
    images: IImage[],
    timeDigital: WatchDialFace,
    watchState: WatchState,
    digitBorder: boolean
    ) {
    let followXY = null

    let s_hours = ''
    let s_minutes = ''
    let s_seconds = ''
   
    if (timeDigital.secondsDigital?.enabled) {
        s_seconds = watchState.seconds.toString().padStart(timeDigital.secondsDigital.con.numberLenght, '0')
        s_seconds = addUnitsAndSeparator(s_seconds, timeDigital.secondsDigital)
    }
    
    if (timeDigital.minutesDigital?.enabled) {
        s_minutes = watchState.minutes.toString().padStart(timeDigital.minutesDigital.con.numberLenght, '0')
        s_minutes = addUnitsAndSeparator(s_minutes, timeDigital.minutesDigital)
        if (timeDigital.secondsDigital.json.CombingMode === FollowType.Follow.json) {
            s_minutes = s_minutes + s_seconds
            s_seconds = ''
        } else {
            s_seconds = s_minutes + s_seconds
        }
    }

    if (timeDigital.hoursDigital?.enabled) {
        s_hours = watchState.hours.toString()
        if (timeDigital.hoursDigital.json.Digit.PaddingZero) s_hours = s_hours.padStart(timeDigital.hoursDigital.con.numberLenght, '0')
        s_hours = addUnitsAndSeparator(s_hours, timeDigital.hoursDigital)
        if (timeDigital.minutesDigital.json.CombingMode === FollowType.Follow.json) {
            if (timeDigital.secondsDigital.json.CombingMode !== FollowType.Follow.json) 
                s_seconds = s_hours + s_seconds
            s_hours = s_hours + s_minutes
            s_minutes = ''
        } else {
            s_minutes = s_hours + s_minutes
            if (timeDigital.secondsDigital.json.CombingMode !== FollowType.Follow.json) 
                s_seconds = s_hours + s_seconds
        }
    }

    if (timeDigital.hoursDigital?.enabled) {
        followXY = drawDigit(ctx, images, timeDigital.hoursDigital, watchState.hours,
            timeDigital.hoursDigital.json.CombingMode === FollowType.Follow.json ? followXY : null, digitBorder, false, s_hours)
    }

    if (timeDigital.minutesDigital?.enabled) {
        followXY = drawDigit(ctx, images, timeDigital.minutesDigital, watchState.minutes, 
            timeDigital.minutesDigital.json.CombingMode === FollowType.Follow.json ? followXY : null, digitBorder, true, s_minutes)
    }

    if (timeDigital.secondsDigital?.enabled) {
        followXY = drawDigit(ctx, images, timeDigital.secondsDigital, watchState.seconds, 
            timeDigital.secondsDigital.json.CombingMode === FollowType.Follow.json ? followXY : null, digitBorder, true, s_seconds)
    }

    if (timeDigital.am && watchState.hours < 12) {
        drawMultilangImageCoords(ctx, images, timeDigital.am)
    }
    if (timeDigital.pm && watchState.hours >= 12) {
        drawMultilangImageCoords(ctx, images, timeDigital.pm)
    }
}



