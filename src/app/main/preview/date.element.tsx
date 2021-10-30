import { IImage } from "../../model/image.model";
import { FollowType } from "../../model/types.model";
import { ElementOrderItem, WatchDate } from "../../model/watchFace.model";
import { WatchState } from "../../model/watchState";
import drawDigit from "./digit.element";
import { addUnitsAndSeparator } from "./systemfont.element";

export default function draw(ctx: CanvasRenderingContext2D, 
    images: IImage[],
    date: WatchDate,
    orderElementsDate: ElementOrderItem[],
    watchState: WatchState,
    drawborder: boolean
    ) {
        let followXY = null

        let s: string[] = []
        for(let i = 0; i < orderElementsDate.length; i++) {
            s[i] = ''
        }
       
        for (let i = 0; i < orderElementsDate.length; i++) {
            let item = orderElementsDate[i]
            let _temp = null
            let _follow = false
            switch (item.type) {
                case 0:
                    if (date.year.enabled) {
                        _follow = date.year.json.CombingMode === FollowType.Follow.json
                        _temp = watchState.year.toString().padStart(date.year.con.numberLenght, '0')
                        _temp = addUnitsAndSeparator(_temp, date.year)
                    }
                    break;
                case 1:
                    if (date.month.enabled) {
                        _follow = date.month.json.CombingMode === FollowType.Follow.json
                        _temp = watchState.month.toString().padStart(date.month.con.numberLenght, '0')
                        _temp = addUnitsAndSeparator(_temp, date.month)
                    } 
                    break;
                case 2:
                    if (date.day.enabled) {
                        _follow = date.day.json.CombingMode === FollowType.Follow.json
                        _temp = watchState.day.toString().padStart(date.day.con.numberLenght, '0')
                        _temp = addUnitsAndSeparator(_temp, date.day)
                    }
                    break;
                default:
                    break;
            }
            if (_temp) {
                for(let j = i+1; j < orderElementsDate.length ; j++) {
                    s[j] = s[j] + _temp
                }
                if (!_follow) {
                    s[i] = s[i] + _temp
                } else {
                    if ( s[i-1] !== '')
                        s[i-1] = s[i-1] + _temp
                    else 
                        s[i-2] = s[i-2] + _temp
                    s[i] = ''
                }
            }
        }

        for(let i = 0; i < orderElementsDate.length; i++) {
            let item = orderElementsDate[i]
            switch (item.type) {
                case 0:
                    if (date.year.enabled) {
                        followXY = drawDigit(ctx, images, date.year, watchState.year, date.year.json.CombingMode === FollowType.Single.json ? null : followXY, drawborder, false, s[i])
                    }
                    break;
                case 1:
                    if (date.month.enabled) {
                        followXY = drawDigit(ctx, images, date.month, watchState.month, date.month.json.CombingMode === FollowType.Single.json ? null : followXY, drawborder, false, s[i])
                    } else if (date.monthAsWord.enabled) {
                        drawDigit(ctx, images, date.monthAsWord, watchState.monthasword)
                    }
                    break;
                case 2:
                    if (date.day.enabled) {
                        followXY = drawDigit(ctx, images, date.day, watchState.day, date.day.json.CombingMode === FollowType.Single.json ? null : followXY, drawborder, false, s[i])
                    }
                    break;
                default:
                    break;
            }
        }

        if (date.weekDay.enabled) {
            drawDigit(ctx, images, date.weekDay, watchState.weekday)
        }
}
