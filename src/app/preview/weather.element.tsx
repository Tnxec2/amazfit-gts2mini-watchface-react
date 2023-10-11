import { IImage } from "../model/image.model";
import { WatchWeather, WatchWeatherExt } from "../model/watchFace.gts2mini.model";
import { WatchState } from "../model/watchState";
import drawDigitImage, { drawDigitsOneLine } from "./digitImage.element";
import {drawImage} from "./image.element";
import drawImageSet from "./imageSet.element";
import drawScale from "./scale.element";
import drawShortcutElement from "./shortcut.element";

export function drawWeather(ctx: CanvasRenderingContext2D,
    images: IImage[],
    weather: WatchWeather,
    weatherext: WatchWeatherExt,
    watchState: WatchState,
    drawBorder: boolean,
    drawShortcutBorder) {
    if (!weather) return;
    if (weather.icon.enabled) {
        drawImageSet(ctx, images, weather.icon.json, watchState.weatherIcon, 26, drawBorder, true);
    }

    if (weather.current.watchNumber.enabled) {
        drawDigitImage(ctx, images, weather.current.watchNumber, 
            watchState.temperature, null, drawBorder, false,
            weather.current.minus, null, null, weather.current.suffixC, null, watchState.tempNoData ? weather.current.nodata : null)
    }
    if (weather.lowest.watchNumber.enabled) {
        drawDigitImage(ctx, images, weather.lowest.watchNumber, 
            watchState.temperatureMin, null, drawBorder, false,
            weather.lowest.minus, null, null, weather.lowest.suffixC, null, watchState.tempNoData ? weather.lowest.nodata : null)
    }
    if (weather.highest.watchNumber.enabled) {
        drawDigitImage(ctx, images, weather.highest.watchNumber, 
            watchState.temperatureMax, null, drawBorder, false,
            weather.highest.minus, null, null, weather.highest.suffixC, null, watchState.tempNoData ? weather.highest.nodata : null)
    }
    if (weather.oneLineMinMax.enabled) {
        let min = watchState.temperatureMin
        let max = watchState.temperatureMax
        let ar = [
            // on watch are show at first the day temperature, then the night temperature
            weather.oneLineMinMax.paddingZero ? ( max < 0 ? '-' + Math.abs(max).toString().padStart(2, '0') : max.toString().padStart(2, '0') ) : max.toString(),
            weather.oneLineMinMax.paddingZero ? ( min < 0 ? '-' + Math.abs(min).toString().padStart(2, '0') : min.toString().padStart(2, '0') ) : min.toString()  
        ]
        drawDigitsOneLine(ctx, images, weather.oneLineMinMax, ar, weather.oneLineDelimiter, drawBorder, weather.oneLineDegrees, null, weather.oneLineMinus)
    }

    // 
    if (weatherext.humidityIcon.enabled) {
        drawImage(ctx, images, weatherext.humidityIcon.json, drawBorder)
    }
    if(weatherext.humidityProgress.backgroundLayerImage.enabled) 
        drawImage(ctx, images, weatherext.humidityProgress.backgroundLayerImage.json, drawBorder)
    if (weatherext.humidityProgress.imageProgress.enabled) {
        drawImageSet(ctx, images, weatherext.humidityProgress.imageProgress.json, watchState.humidity, watchState.humidityGoal, drawBorder, false)
    }
    if (weatherext.humidityNumber.enabled && !watchState.humidityNoData) {
        drawDigitImage(ctx, images, weatherext.humidityNumber, watchState.humidity, null, drawBorder, 
            false, null, null, null, weatherext.humiditySuffix)
    }


    if (weatherext.airQualityIcon.enabled) {
        drawImage(ctx, images, weatherext.airQualityIcon.json, drawBorder)
    }
    if (weatherext.airQualityProgress.backgroundLayer.enabled) {
        drawImage(ctx, images, weatherext.uvProgress.backgroundLayer.json, drawBorder);
    }
    if (weatherext.airQualityProgress.scale.enabled) {
        drawScale(ctx, images, weatherext.uvProgress.scale, watchState.uvIndex, watchState.uvIndexGoal, drawBorder)
    }
    if (weatherext.airQualityProgress.imageProgress.enabled) {
        drawImageSet(ctx, images, weatherext.uvProgress.imageProgress.json, watchState.uvIndex, watchState.uvIndexGoal, drawBorder, false)
    }
    if (weatherext.airQualityNumber.enabled) {
        drawDigitImage(ctx, images, weatherext.airQualityNumber, watchState.airQuality, null, drawBorder, 
            false, null, null, null, null)
    }


    if (weatherext.uvIcon.enabled) {
        drawImage(ctx, images, weatherext.uvIcon.json, drawBorder)
    }
    if (weatherext.uvProgress.backgroundLayer.enabled) {
        drawImage(ctx, images, weatherext.uvProgress.backgroundLayer.json, drawBorder);
    }
    if (weatherext.uvProgress.imageProgress.enabled) {
        drawImageSet(ctx, images, weatherext.uvProgress.imageProgress.json, watchState.uvIndex, watchState.uvIndexGoal, drawBorder, false)
    }
    if (weatherext.uvShortcut.enabled) {
        drawShortcutElement(ctx, weatherext.uvShortcut.json, drawShortcutBorder)
    }
    if (weatherext.uvNumber.enabled) {
        drawDigitImage(ctx, images, weatherext.uvNumber, watchState.uvIndex, null, drawBorder, 
            false, null, null, null, weatherext.uvSuffixImageIndex, null, watchState.uvNoData ? weatherext.uvNoDataImageIndex : null)
    }

}