import { FC, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import Color from "../../shared/color";
import { Activity, ActivitySeparateDigits, Alarm, AlwaysOnDisplay, AoDTimeExtended, Background, Battery, DateBlock, DateElement, Progress, ProgressPai, ProgressAirQ, ProgressHumidity, Shortcuts, Status, TimeDigital, TimeExtended, WatchJson, Weather, ProgressStandup, ProgressStress, ProgressSpo, ProgressUvi, WeekDayImages } from "../../model/json.gts2minit.model";
import { WatchActivityList, WatchAlarm, WatchAOD, WatchAodTime, WatchBackground, WatchBattery, WatchDate, WatchFace, WatchProgress, WatchProgressPai, WatchProgressHumidity, WatchShortcuts, WatchStatus, WatchTime, WatchTimeDigitalCommon, WatchWeather, WatchWeatherExt, WatchProgressStandup, WatchProgressStress, WatchProgressSpo, WatchProgressAirQ, WatchProgressUvi, WatchWeekdayImages, WatchStressActivity, WatchSpO2Activity } from "../../model/watchFace.gts2mini.model";
import cl from './JsonComponent.module.css';

const JsonComponent: FC = () => {

    const {watchface, jsonName, device } = useContext<IWatchContext>(WatchfaceContext);

    const [json, setJson] = useState<string>('')

    useEffect(() => {
        let json = generateJson(watchface)
        setJson(json)
        saveJson(json)
    }, [watchface]) // eslint-disable-line react-hooks/exhaustive-deps

    function generateJson(w: WatchFace): string {
        let timeClockHandEnabled = w.time.timeAnalog.hours.enabled || w.time.timeAnalog.minutes.enabled 
        || w.time.timeAnalog.seconds.enabled


        let j: WatchJson = {
            Info: {
                DeviceId: device.deviceId
            },
            Background: getBackground(w.background),
            TimeExtended: getTimeExtended(w.time),
            Activity: getActivity(w.activity),
            DateBlock: getDate(w.date),
            Weather: getWeater(w.weather, w.weatherext),
            StepProgress: getProgress(w.activity.steps.aProgress),
            Status: getStatus(w.status),
            Battery: getBattery(w.battery),
            Animation: w.animation?.imageSetAnimation?.length > 0 ? {
                ImageSetAnimation: w.animation.imageSetAnimation
             } : null,
            HeartProgress: getProgress(w.activity.heartRate.aProgress),
            WeekDayImages: getWeekdaysImages(w.weekdayImages),
            CaloriesProgress: getProgress(w.activity.calories.aProgress),
            HumidityProgress: getProgressAlt3(w.weatherext.humidityProgress),
            Alarm: getAlarm(w.time.alarm),
            Shortcuts: getShortCuts(w.shortcuts),
            TimeAnalog: timeClockHandEnabled ? { 
                CommonCenterCoordinates: w.time.timeAnalog.commonCenterCoordinates,
                Hours:  w.time.timeAnalog.hours.enabled ? w.time.timeAnalog.hours.json : null,
                Minutes: w.time.timeAnalog.minutes.enabled ? w.time.timeAnalog.minutes.json : null,
                Seconds: w.time.timeAnalog.seconds.enabled ? w.time.timeAnalog.seconds.json : null
            }: null,
            HourlyImages: null,
            TimeDigital: getTimeDigital(w.time.timeDigitalCommon),
            PaiProgress: getProgressPai(w.activity.pai.aProgress),
            StandUpProgress: getProgressStandUp(w.activity.standUp.aProgress),
            AirQualityProgress: getProgressAirQ(w.weatherext.airQualityProgress),
            UviProgress: getProgressUvi(w.weatherext.uvProgress),
            StressProgress: getProgressStress(w.activity.stress),
            SPO2Progress: getProgressSpo2(w.activity.spo2),
            AlwaysOnDisplay: getAod(w.aod),
            ActivitySeparateDigits: getActivitySeparatedDigits(w.activity),
        }
        return JSON.stringify(j, (key, value) => {
            if (value !== null && value !== undefined) return value
          }, "  ")
    }
    
    function saveJson(json: string) {
        if (json.length > 0) {
            var a = document.getElementById("saveJson") as HTMLAnchorElement;
            if (a) {
                var file = new Blob([json], {type: 'text/plain'});
                let filename = jsonName ? jsonName : 'watchface.json'
                a.href = URL.createObjectURL(file);
                a.download = filename;
            }
        }
    }

    return (
        <>
        <Card className={cl.json}>
            <pre>
                {json}
            </pre>
        </Card>
        <br/>
        <a href="a" id="saveJson">download json file</a>
        </>
    )
    
};

export default JsonComponent;
function getTimeExtended(time: WatchTime): TimeExtended {
    let timeSeparatedEnabled = time.timeDigitalSeparated.hours.enabled ||
                time.timeDigitalSeparated.minutes.enabled || 
                time.timeDigitalSeparated.seconds.enabled 
    let sunsetEnabled = time.sunset.sunriseOneLine.enabled || time.sunset.sunriseOneLine.enabled || time.sunset.sunsetIcon.enabled 
    || time.sunset.sunriseIcon.enabled || time.sunset.sunsetShortcut.enabled || time.sunset.sunriseShortcut.enabled
    let timeExtendedEnabled = timeSeparatedEnabled || sunsetEnabled

    if (!timeExtendedEnabled) return null;
    else return {
        TimeSeparateDigits: timeSeparatedEnabled ? {
                Hours: time?.timeDigitalSeparated?.hours.enabled ? time?.timeDigitalSeparated?.hours?.json : null,
                Minutes: time?.timeDigitalSeparated?.minutes.enabled ? time?.timeDigitalSeparated?.minutes?.json : null,
                Seconds: time?.timeDigitalSeparated?.seconds.enabled ? time?.timeDigitalSeparated?.seconds?.json : null,
                DrawOrder: time?.timeDigitalSeparated?.drawOrder,
                SeparatorHours: time?.timeDigitalSeparated?.separatorHours.enabled ? time?.timeDigitalSeparated?.separatorHours.json : null,
                SeparatorMinutes: time?.timeDigitalSeparated?.separatorMinutes.enabled ?time?.timeDigitalSeparated?.separatorMinutes.json : null,
                PaddingZeroHours: time?.timeDigitalSeparated ? (time?.timeDigitalSeparated?.paddingZeroHours ? true : false) : null,
                PaddingZeroMinutes: time?.timeDigitalSeparated ? (time?.timeDigitalSeparated?.paddingZeroMinutes ? true : false) : null,
        } : null,
        SunsetTimeOneLine: time.sunset.sunsetOneLine.enabled ? time.sunset.sunsetOneLine.json : null,
        DelimiterSunsetImageIndex: time.sunset.sunsetOneLine.enabled ? time.sunset.sunsetOneLine.delimiter : null,
        SunriseTimeOneLine: time.sunset.sunriseOneLine.enabled ? time.sunset.sunriseOneLine.json : null,
        DelimiterSunriseImageIndex: time.sunset.sunriseOneLine.enabled ? time.sunset.sunriseOneLine.delimiter : null,
        SunsetIcon: time.sunset.sunsetIcon.enabled ? time.sunset.sunsetIcon.json : null,
        SunriseIcon: time.sunset.sunriseIcon.enabled ? time.sunset.sunriseIcon.json : null,
        SunsetShortcut: time.sunset.sunsetShortcut.enabled ? time.sunset.sunsetShortcut.json : null,
        SunriseShortcut: time.sunset.sunriseShortcut.enabled ? time.sunset.sunriseShortcut.json : null,
        SunsetImageIndex: time.sunset.sunsetOneLine.enabled ? time.sunset.sunsetOneLine.prefix : null,
        SunriseImageIndex: time.sunset.sunriseOneLine.enabled ? time.sunset.sunriseOneLine.prefix : null,
    }
}

function getDate(date: WatchDate): DateBlock {
    let dateEnabled = date.day.enabled || date.month.enabled || date.monthAsWord.enabled || date.year.enabled

    if (!dateEnabled && !date.weekday.enabled && !date.ampm.enabled) return null;
    else return {
        Date: dateEnabled ? getDateElement(date) : null,
        AmPm: date.ampm.enabled ? date.ampm.json : null,
        Weekday: date.weekday.enabled ? date.weekday.json : null,
        WeekdayChinese: null,
        WeekdayTradChinese: null,
        WeekdayProgress: getProgress(date.weekdayProgress),
        WeekdayPointerScale: null, // TODO
    }
}

function getDateElement(date: WatchDate): DateElement {
    return {
        MonthAndDayAlt: null,
        OneLineMonthAndDay: date.oneLineMonth ? {
            Number: date.month.enabled ? date.month.json : null,
            DelimiterImageIndex: date.oneLineDelimiter
        } : null,
        OneLineYearMonthAndDay: date.oneLineYear ? {
            Number: date.year.enabled ? date.year.json : null,
            DelimiterImageIndex: date.oneLineDelimiter
        } : null,
        YearMonthAndDay: ! date.oneLineYear && ! date.oneLineMonth ? {
            Year: date.year?.enabled ? date.year.json : null,
            Month: date.month?.enabled ? date.month.json : null,
            Day: date.day?.enabled ? date.day.json : null,
            MonthFollowsYear: date.month?.follow ? true : false,
            DayFollowsMonth: date.day?.follow ? true : false,
            MonthAsWord: date.monthAsWord?.enabled ? date.monthAsWord.json : null,
            DelimiterYearImageIndex: date.year?.enabled ? date.year?.delimiter : null,
            DelimiterMonthImageIndex: date.month?.enabled ? date.month?.delimiter : null,
            DelimiterDayImageIndex: date.day?.enabled ? date.day?.delimiter : null,
            MonthAsWordChinese: null,
            YearDataTypeImageIndex: date.year?.enabled ? date.year?.dataType : null,
            MonthDataTypeImageIndex: date.month?.enabled ? date.month?.dataType : null,
            DayDataTypeImageIndex: date.day?.enabled ? date.day?.dataType : null,
            YearDataTypeCoordinates: date.year?.enabled && date.year?.dataType ? date.year.dataTypeCoords : null,
            MonthDataTypeCoordinates: date.month?.enabled && date.month?.dataType ? date.month.dataTypeCoords : null,
            DayDataTypeCoordinates: date.day?.enabled && date.day?.dataType ? date.day.dataTypeCoords : null
        } : null,
        PaddingZeroMonth: date.oneLineYear ? ( date.year?.paddingZero ? true : false) : ( date.month?.paddingZero ? true : false ),
        PaddingZeroDay: date.oneLineYear ? ( date.year?.paddingZero ? true : false) : (date.oneLineMonth ? ( date.month?.paddingZero ? true : false) :  date.day?.paddingZero ? true : false),
        UnknownBoolean6: false,
    }
}

function getProgress(progress: WatchProgress): Progress {
    let enabled = progress.circleScale.enabled || progress.iconSetProgress.enabled || 
    progress.imageProgress.enabled || progress.scale.enabled || progress.backgroundLayer.enabled

    if (!enabled) return null
    else return {
        ImageProgress: progress.imageProgress.enabled ? progress.imageProgress.json : null,
        IconSetProgress: progress.iconSetProgress.enabled ? progress.iconSetProgress.json : null,
        CircleScale: progress.circleScale.enabled ? progress.circleScale.json : null,
        Scale: progress.scale.enabled ? {
            PointerScale: progress.scale.pointerscale.enabled ? progress.scale.pointerscale.json : null,
            BottomImage: progress.scale.bottomImage.enabled ? progress.scale.bottomImage.json : null,
            BottomImageChinese: null,
            BottomImageTradChinese: null
             } : null,
        BackgroundLayer: progress.backgroundLayer.enabled ? progress.backgroundLayer.json : null,
        UnknownImage: null
    }
}

function getProgressPai(progress: WatchProgressPai): ProgressPai {
    let enabled = progress.imageProgress.enabled || progress.pointerScale.enabled || progress.altPointerScale.enabled ||
                 progress.backgroundLayer.enabled

    if (!enabled) return null
    else return {
        PointerScale: progress.pointerScale.enabled ? progress.pointerScale.json : null,
        Alt1PointerScale: progress.altPointerScale.enabled ?  {
            PointerScale: progress.altPointerScale.json
         } : null,
        ImageProgress: progress.imageProgress.enabled ? progress.imageProgress.json : null,
        BackgroundLayer: progress.backgroundLayer.enabled ? progress.backgroundLayer.json : null,
    }
}

function getProgressAirQ(progress: WatchProgressAirQ): ProgressAirQ {
    let enabled = progress.imageProgress.enabled || progress.backgroundLayer.enabled

    if (!enabled) return null
    else return {
        ImageProgress: progress.imageProgress.enabled ? progress.imageProgress.json : null,
        Scale: progress.scale.enabled ? {
            PointerScale: progress.scale.pointerscale.enabled ? progress.scale.pointerscale.json : null,
            BottomImage: progress.scale.bottomImage.enabled ? progress.scale.bottomImage.json : null,
            BottomImageChinese: null,
            BottomImageTradChinese: null,
        } : null,
        BackgroundLayer: progress.backgroundLayer.enabled ? progress.backgroundLayer.json : null,
    }
}

function getProgressUvi(progress: WatchProgressUvi): ProgressUvi {
    let enabled = progress.imageProgress.enabled || progress.backgroundLayer.enabled

    if (!enabled) return null
    else return {
        ImageProgress: progress.imageProgress.enabled ? progress.imageProgress.json : null,
        Scale: progress.scale.enabled ? {
            PointerScale: progress.scale.pointerscale.enabled ? progress.scale.pointerscale.json : null,
            BottomImage: progress.scale.bottomImage.enabled ? progress.scale.bottomImage.json : null,
            BottomImageChinese: null,
            BottomImageTradChinese: null,
        } : null,
        BackgroundLayer: progress.backgroundLayer.enabled ? progress.backgroundLayer.json : null,
    }
}

function getProgressAlt3(progress: WatchProgressHumidity): ProgressHumidity {
    let enabled = progress.imageProgress.enabled || progress.backgroundLayerImage.enabled

    if (!enabled) return null
    else return {
        ImageProgress: progress.imageProgress.enabled ? progress.imageProgress.json : null,
        BackgroundLayer: progress.backgroundLayerImage.enabled ? progress.backgroundLayerImage.json : null,
    }
}

function getProgressStress( activity: WatchStressActivity): ProgressStress {
    let enabled = activity.aNumber.enabled || activity.aProgress.imageProgress.enabled || activity.aProgress.backgroundLayerImage.enabled

    if (!enabled) return null
    else return {
        Text: activity.aNumber.enabled ? activity.aNumber.imageNumber.json : null,
        PrefixImageIndex: activity.aNumber.enabled ? activity.aNumber.prefix : null,
        ImageProgress: activity.aProgress.imageProgress.enabled ? activity.aProgress.imageProgress.json : null,
        BackgroundLayer: activity.aProgress.backgroundLayerImage.enabled ? activity.aProgress.backgroundLayerImage.json : null,
    }
}

function getProgressSpo2(activity: WatchSpO2Activity): ProgressSpo {
    let enabled = activity.aNumber.enabled || activity.aProgress.imageProgress.enabled || activity.aProgress.backgroundLayerImage.enabled

    if (!enabled) return null
    else return {
        Text: activity.aNumber.enabled ? activity.aNumber.imageNumber.json : null,
        PrefixImageIndex: activity.aNumber.enabled ? activity.aNumber.prefix : null,
        ImageProgress: activity.aProgress.imageProgress.enabled ? activity.aProgress.imageProgress.json : null,
        BackgroundLayer: activity.aProgress.backgroundLayerImage.enabled ? activity.aProgress.backgroundLayerImage.json : null,
    }
}

function getProgressStandUp(progress: WatchProgressStandup): ProgressStandup {
    let enabled = progress.imageProgress.enabled || progress.iconsetProgress.enabled || progress.scale.enabled

    if (!enabled) return null
    else return {
        ImageProgress: progress.imageProgress.enabled ? progress.imageProgress.json : null,
        IconSetProgress: progress.iconsetProgress.enabled ? progress.iconsetProgress.json : null,
        PointerProgress: progress.scale.enabled ? {
            PointerScale: progress.scale.pointerscale.enabled ? progress.scale.pointerscale.json : null,
            BottomImage: progress.scale.bottomImage.enabled ? progress.scale.bottomImage.json : null,
            BottomImageChinese: null,
            BottomImageTradChinese: null
             } : null,
    }
}

function getTimeDigital(time: WatchTimeDigitalCommon): TimeDigital {
    let timeCommonEnabled = time.hours.enabled ||
    time.minutes.enabled ||
    time.seconds.enabled

    if (!timeCommonEnabled) return null
    else return {
        Hours: time.hours.enabled ? time.hours.json : null,
        HoursDataTypeImageIndex: time.hours.dataType,
        PaddingZeroHours: time.hours.paddingZero ? true : false,
        DelimiterHoursImageIndex: time.hours.delimiter,
        DelimiterMinutesImageIndex: time.minutes.delimiter,
        HoursFollowPosition: false,
        DelimiterSecondsImageIndex: time.seconds.delimiter,
        Time: time.minutes.enabled || time.seconds.enabled ? {
            Unknown1:  time.time_unknown1,
            Minutes: time.minutes.enabled ? time.minutes.json : null,
            Seconds: time.seconds.enabled ? time.seconds.json : null,
            PaddingZeroMinutes:  time.minutes.paddingZero ? true : false,
            PaddingZeroSeconds:  time.seconds.paddingZero ? true : false,
            MinutesDataTypeImageIndex:  time.minutes.enabled ? time.minutes.dataType : null,
            SecondsDataTypeImageIndex:  time.seconds.enabled ? time.seconds.dataType : null,
            MinutesFollowHours:  time.minutes.follow ? true : false,
            SecondsFollowMinutes:  time.seconds.follow ? true : false,
            HoursDataTypeCoordinates: time.hours.enabled && time.hours.dataType ? time.hours.dataTypeCoords : null, // needed only when MinutesFollowHours == False
            MinutesDataTypeCoordinates: time.minutes.enabled && !time.minutes.follow  && time.minutes.dataType ? time.minutes.dataTypeCoords : null, // needed only when SecondsFollowMinutes == False
            SecondsDataTypeCoordinates: time.seconds.enabled && !time.seconds.follow && time.seconds.dataType ? time.seconds.dataTypeCoords : null
        } : null
    }

}

function getWeater(weather: WatchWeather, weatherext: WatchWeatherExt): Weather {
    let iconEnabled = weather.icon.enabled
    let tempEnabled = weather.current.enabled || weather.oneLineMinMax.enabled 
    || weather.lowest.enabled || weather.highest.enabled 
    let airQualityEnabled = weatherext.airQualityNumber.enabled || weatherext.airQualityIcon.enabled

    let humidityEnabled = weatherext.humidityNumber.enabled || weatherext.humidityIcon.enabled
    
    let uvIndexEnabled = weatherext.uvNumber.enabled || weatherext.uvIcon.enabled || weatherext.uvShortcut.enabled

    let weaterEnabled = iconEnabled || tempEnabled || airQualityEnabled || humidityEnabled || uvIndexEnabled

    if (!weaterEnabled) return null
    else return {
        Icon: iconEnabled ? {
            Images: weather.icon.json 
        } : null,
        Temperature: tempEnabled ? {
            Current: weather.current.enabled ? {
                ImageNumber: weather.current.watchNumber.enabled ? weather.current.watchNumber.json : null,
                MinusImageIndex: weather.current.minus,
                SuffixImageIndexC: weather.current.suffixC,
                SuffixImageIndexF: null,
                NoDataImageIndex: weather.current.nodata,
                Shortcut: weather.current.shortcut.enabled ? weather.current.shortcut.json : null,
            } : null,
            OneLine: weather.oneLineMinMax.enabled ? {
                OneLineMinMax: {
                    Number: weather.oneLineMinMax.enabled ? weather.oneLineMinMax.json : null,
                    MinusImageIndex:  weather.oneLineMinus,
                    DelimiterImageIndex:  weather.oneLineDelimiter,
                    UnknownLong4:  0,
                    DegreesImageIndex:  weather.oneLineDegrees
             }
            } : null,
            Lowest: weather.lowest.enabled ? {
                ImageNumber: weather.lowest.watchNumber.enabled ? weather.lowest.watchNumber.json : null,
                MinusImageIndex: weather.lowest.minus,
                SuffixImageIndexC: weather.lowest.suffixC,
                SuffixImageIndexF: null,
                NoDataImageIndex: weather.lowest.nodata,
                Shortcut: weather.lowest.shortcut.enabled ? weather.lowest.shortcut.json : null,
            } : null,
            Highest: weather.highest.enabled ? {
                ImageNumber: weather.highest.watchNumber.enabled ? weather.highest.watchNumber.json : null, 
                MinusImageIndex: weather.highest.minus,
                SuffixImageIndexC: weather.highest.suffixC,
                SuffixImageIndexF: null,
                NoDataImageIndex: weather.highest.nodata,
                Shortcut: weather.highest.shortcut.enabled ? weather.highest.shortcut.json : null,
            } : null,
        }: null,
        AirQuality: airQualityEnabled ? {
            AirQualityNumber: weatherext.airQualityNumber.enabled ? weatherext.airQualityNumber.json : null,
            AirQualityIcon: weatherext.airQualityIcon.enabled ? weatherext.airQualityIcon.json : null
        } : null,
        Humidity: humidityEnabled ? {
            HumidityNumber: weatherext.humidityNumber.enabled ? weatherext.humidityNumber.json : null,
            SuffixImageIndex: weatherext.humiditySuffix,
            HumidityIcon: weatherext.humidityIcon.enabled ? weatherext.humidityIcon.json : null
        }: null,
        UVindex: uvIndexEnabled ? {
            UVindexNumber: weatherext.uvNumber.enabled ? weatherext.uvNumber.json : null,
            SuffixImageIndex: weatherext.uvSuffixImageIndex,
            Shortcut: weatherext.uvShortcut.enabled ? weatherext.uvShortcut.json: null,
            UVindexIcon: weatherext.uvIcon.enabled ? weatherext.uvIcon.json : null,
            NoDataImageIndex: weatherext.uvNoDataImageIndex
        } : null
    }
}

function getStatus(status: WatchStatus): Status {
    if (!status.alarm.enabled && !status.bluetooth.enabled && !status.lock.enabled && !status.doNotDisturb.enabled) return null
    return {
        DoNotDisturb: status.doNotDisturb.enabled ? status.doNotDisturb.json : null,
        Lock: status.lock.enabled ? status.lock.json : null,
        Bluetooth: status.bluetooth.enabled ? status.bluetooth.json : null,
        Alarm: status.alarm.enabled ? status.alarm.json : null,
    }
}

function getBattery(battery: WatchBattery): Battery {
    let enabled = battery.text.enabled || battery.imageProgress.enabled || battery.iconSetProgress.enabled || battery.scale.enabled || battery.icon.enabled
    if (!enabled ) return null
    return {
        BatteryText: battery.text.enabled ? {
            ImageNumber: battery.text.imageNumber.enabled ? battery.text.imageNumber.json : null,
            PrefixImageIndex: battery.text.prefix,
            Icon: battery.text.icon.enabled ? battery.text.icon.json : null,
            Shortcut: battery.text.shortcut.enabled ? battery.text.shortcut.json : null,
            SuffixImageIndex: battery.text.suffix,
        } : null,
        ImageProgress: battery.imageProgress.enabled ? battery.imageProgress.json : null,
        IconSetProgress: battery.iconSetProgress.enabled ? battery.iconSetProgress.json : null,
        Scale: battery.scale.enabled ? {
            PointerScale: battery.scale.pointerscale.enabled ? battery.scale.pointerscale.json : null,
            BottomImage: battery.scale.bottomImage.enabled ? battery.scale.bottomImage.json : null,
            BottomImageChinese: null,
            BottomImageTradChinese: null
             } : null,
        Icon: battery.icon.enabled ? battery.icon.json : null,
    }
}

function getActivity(activity: WatchActivityList): Activity {
   let enabled = activity.steps.aElement.enabled || activity.calories.aElement.enabled ||
   activity.heartRate.aElement.enabled || activity.distance.aElement.enabled ||
   activity.pai.aElement.enabled || activity.standUp.aElement.enabled

   if (!enabled) return null;
   else return {
    Steps: activity.steps.aElement.enabled ? {
        ImageNumber: activity.steps.aElement.imageNumber.enabled ? activity.steps.aElement.imageNumber.json : null,
        PrefixImageIndex: activity.steps.aElement.prefix,
        SuffixImageIndex: activity.steps.aElement.suffix,
        Icon: activity.steps.aElement.icon.enabled ? activity.steps.aElement.icon.json : null,
        Shortcut: activity.steps.aElement.shortcut.enabled ? activity.steps.aElement.shortcut.json : null,
        DelimiterTotalImageIndex: activity.steps.aElement.delimiterTotal
    } : null,
    Icon: null, // TODO
    Calories: activity.calories.aElement.enabled ? {
        ImageNumber: activity.calories.aElement.imageNumber.enabled ? activity.calories.aElement.imageNumber.json : null,
        SuffixImageIndex: activity.calories.aElement.suffix,
        Icon: activity.calories.aElement.icon.enabled ? activity.calories.aElement.icon.json : null,
        Shortcut: activity.calories.aElement.shortcut.enabled ? activity.calories.aElement.shortcut.json : null,
    } : null,
    HeartRate: activity.heartRate.aElement.enabled ? {
        ImageNumber: activity.heartRate.aElement.imageNumber.enabled ? activity.heartRate.aElement.imageNumber.json : null,
        PrefixImageIndex: activity.heartRate.aElement.prefix,
        NoDataImageIndex: activity.heartRate.aElement.noData,
        SuffixImageIndex: activity.heartRate.aElement.suffix,
        Icon: activity.heartRate.aElement.icon.enabled ? activity.heartRate.aElement.icon.json : null,
        Shortcut: activity.heartRate.aElement.shortcut.enabled ? activity.heartRate.aElement.shortcut.json : null,
    } : null,
    Distance: activity.distance.aElement.enabled ? {
        ImageNumber: activity.distance.aElement.imageNumber.enabled ? activity.distance.aElement.imageNumber.json : null,
        SuffixKMImageIndex: activity.distance.aElement.suffixKM,
        DecimalPointImageIndex: activity.distance.aElement.decimalPoint,
        SuffixMIImageIndex: activity.distance.aElement.suffixMI,
        Icon: activity.distance.aElement.icon.enabled ? activity.distance.aElement.icon.json : null,
        Shortcut: activity.distance.aElement.shortcut.enabled ? activity.distance.aElement.shortcut.json : null,
        SuffixImageCoordinates: activity.distance.aElement.separattedSuffix ? activity.distance.aElement.suffixImageCoordinates : null,
    } : null,
    PAI: activity.pai.aElement.enabled ? {
        ImageNumber: activity.pai.aElement.imageNumber.enabled ? activity.pai.aElement.imageNumber.json : null,
        SuffixImageIndex: activity.pai.aElement.suffix,
        Icon: activity.pai.aElement.icon.enabled ? activity.pai.aElement.icon.json : null,
        Shortcut: activity.pai.aElement.shortcut.enabled ? activity.pai.aElement.shortcut.json : null,
    } : null,
    UnknownLongValue7: 0,
    StandUp: activity.standUp.aElement.enabled ? {
        ImageNumber: activity.standUp.aElement.imageNumber.enabled ? activity.standUp.aElement.imageNumber.json : null,
        SuffixImageIndex: activity.standUp.aElement.suffix,
        Icon: activity.standUp.aElement.icon.enabled ? activity.standUp.aElement.icon.json : null,
        Shortcut: activity.standUp.aElement.shortcut.enabled ? activity.standUp.aElement.shortcut.json : null,
    } : null,
   }
}

function getAlarm(alarm: WatchAlarm): Alarm {
    let enabled = alarm.noAlarmImage.enabled || alarm.alarmImage.enabled ||
    alarm.shortcut.enabled || alarm.alarmTime.hours.enabled || alarm.alarmTime.minutes.enabled

    if (!enabled) return null
    else return {
        NoAlarmImage: alarm.noAlarmImage.enabled ? alarm.noAlarmImage.json : null,
        AlarmImage: alarm.alarmImage.enabled ? alarm.alarmImage.json : null,
        ShortcutArea: alarm.shortcut.enabled ? alarm.shortcut.json : null,
        AlarmTime: alarm.alarmTime.hours.enabled || alarm.alarmTime.minutes.enabled ? {
            Hours: alarm.alarmTime.hours.enabled ? alarm.alarmTime.hours.json : null,
            Minutes: alarm.alarmTime.minutes.enabled ? alarm.alarmTime.minutes.json : null,
            HoursDataTypeImageIndex: alarm.alarmTime.hours.enabled ? alarm.alarmTime.hours.dataType : null,
            DelimiterHoursImageIndex: alarm.alarmTime.hours.enabled ? alarm.alarmTime.hours.delimiter : null,
            DelimiterMinutesImageIndex: alarm.alarmTime.minutes.enabled ? alarm.alarmTime.minutes.delimiter : null,
            PaddingZeroHours: alarm.alarmTime.hours.enabled ? (alarm.alarmTime.hours.paddingZero ? true : false) : null,
            PaddingZeroMinutes: alarm.alarmTime.minutes.enabled ? (alarm.alarmTime.minutes.paddingZero ? true : false) : null,
            HoursDataTypeCoordinates: alarm.alarmTime.hours.enabled && alarm.alarmTime.hours.dataType ? alarm.alarmTime.hours.dataTypeCoords : null, // needed only when MinutesFollowHours == False
            MinutesFollowHours: alarm.alarmTime?.minutes?.follow ? true : false,
        } : null,
    }
}

function getShortCuts(s: WatchShortcuts): Shortcuts {
    if (s.shortcuts && s.shortcuts.length > 0 ) {
        return {
            Shortcut: s.shortcuts.map((item) => 
                ({ 
                 Icon: item.icon?.json?.ImageIndex >= 0 ? item.icon.json : null,
                 ShortcutType: item.type,
                 Element: item.element?.json
                })
            )
        }
    } else return null
}

function getAodTimeExtended(time: WatchAodTime): AoDTimeExtended {
    let enabledTimeSeparated = time.timeSeparateDigits.hours.enabled || time.timeSeparateDigits.minutes.enabled
    let enabledTimeAnalog = time.timeAnalog.hours.enabled || time.timeAnalog.minutes.enabled
    let enabledTimeDigital = time.timeDigital.hours.enabled || time.timeDigital.minutes.enabled
    let enabledAmPm = time.amPm.enabled
    let enabledTimeExt = enabledAmPm || enabledTimeAnalog || enabledTimeDigital || enabledTimeSeparated
    return enabledTimeExt ? {
        TimeSeparateDigits: enabledTimeSeparated ? {
            Hours: time.timeSeparateDigits.hours.enabled ? time.timeSeparateDigits.hours.json : null,
            Minutes: time.timeSeparateDigits.minutes.enabled ? time.timeSeparateDigits.minutes.json : null,
            Separator: time.timeSeparateDigits.separator.enabled ? time.timeSeparateDigits.separator.json : null,
            PaddingZeroHours: time.timeSeparateDigits.hours.enabled ? (time.timeSeparateDigits.paddingZero ? true : false) : null
        } : null,
        TimeAnalog: enabledTimeAnalog ? {
            CommonCenterCoordinates: time.timeAnalog.commonCenterCoordinates ? 
                time.timeAnalog.commonCenterCoordinates : null,
            Hours: time.timeAnalog.hours.enabled ? {
                ImageIndex: time.timeAnalog.hours.json.ImageIndex,
                CenterCoordinates: null,
                PointerCenterOfRotationY: time.timeAnalog.hours.json.PointerCenterOfRotationY,
                CoverImage: time.timeAnalog.hours.json.CoverImage?.ImageIndex ? time.timeAnalog.hours.json.CoverImage : null
            } : null,
            Minutes: time.timeAnalog.minutes.enabled ? {
                ImageIndex: time.timeAnalog.minutes.json.ImageIndex,
                CenterCoordinates: null,
                PointerCenterOfRotationY: time.timeAnalog.minutes.json.PointerCenterOfRotationY,
                CoverImage: time.timeAnalog.minutes.json.CoverImage?.ImageIndex ? time.timeAnalog.minutes.json.CoverImage : null
            } : null,
        } : null,
        AmPm: enabledAmPm ? time.amPm.json : null,
        TimeDigital: enabledTimeDigital ? {
            Hours: time.timeDigital.hours.enabled ? time.timeDigital.hours.json : null,
            Minutes: time.timeDigital.minutes.enabled ? time.timeDigital.minutes.json : null,
            HoursDataTypeImageIndex: time.timeDigital.hours.enabled ? time.timeDigital.hours.dataType : null,
            MinutesDataTypeImageIndex: time.timeDigital.minutes.enabled ? time.timeDigital.minutes.dataType : null,
            DelimiterHoursImageIndex: time.timeDigital.hours.enabled ? time.timeDigital.hours.delimiter : null,
            DelimiterMinutesImageIndex: time.timeDigital.minutes.enabled ? time.timeDigital.minutes.delimiter : null,
            PaddingZeroHours: time.timeDigital.hours.enabled ? ( time.timeDigital.hours.paddingZero ? true : false) : null,
            PaddingZeroMinutes: time.timeDigital.minutes.enabled ? (time.timeDigital.minutes.paddingZero ? true : false) : null,
            MinutesFollowHours: time.timeDigital.minutes.enabled ? (time.timeDigital.minutes.follow ? true : false) : null,
            HoursDataTypeCoordinates: time.timeDigital.hours.enabled && time.timeDigital.hours.dataType ? time.timeDigital.hours.dataTypeCoords : null,
            MinutesDataTypeCoordinates: time.timeDigital.minutes.enabled && time.timeDigital.minutes.dataType ? time.timeDigital.minutes.dataTypeCoords : null,
        } : null
    } : null
}

function getAod(aod: WatchAOD): AlwaysOnDisplay {
    let enabledTimeSeparated = aod.time.timeSeparateDigits.hours.enabled || aod.time.timeSeparateDigits.minutes.enabled
    let enabledTimeAnalog = aod.time.timeAnalog.hours.enabled || aod.time.timeAnalog.minutes.enabled
    let enabledTimeDigital = aod.time.timeDigital.hours.enabled || aod.time.timeDigital.minutes.enabled
    let enabledAmPm = aod.time.amPm.enabled
    let enabledTimeExt = enabledAmPm || enabledTimeAnalog || enabledTimeDigital || enabledTimeSeparated
    let enabledDate = aod.date.day.enabled || aod.date.month.enabled
    let enabledDateOneLine = aod.dateOneLine.monthAndDay.enabled
    let enabled = enabledTimeExt || enabledDate || enabledDateOneLine || aod.steps.aElement.enabled || aod.weekday.enabled
    if (!enabled) return null
    else return  {
        TimeExtended: enabledTimeExt ? getAodTimeExtended(aod.time) : null,
        DateOneLine: aod.dateOneLine.monthAndDay.enabled ? {
            MonthAndDay: aod.dateOneLine.monthAndDay.json,
            SeparatorImageIndex: aod.dateOneLine.separatorImageIndex
        } : null,
        Week: aod.weekday.enabled ? {
            Weekday: aod.weekday.json,
            WeekdayChinese: null,
            WeekdayTradChinese: null
        } : null,
        Steps: aod.steps.aElement.enabled ? {
            ImageNumber: aod.steps.aElement.imageNumber.enabled ? aod.steps.aElement.imageNumber.json : null,
            PrefixImageIndex: aod.steps.aElement.prefix,
            SuffixImageIndex: aod.steps.aElement.suffix,
        } : null,
        Date: enabledDate ? {
            Month: aod.date.month.enabled ? aod.date.month.json : null,
            Day: aod.date.day.enabled ? aod.date.day.json : null,
            MonthDataTypeImageIndex: aod.date.month.enabled ? aod.date.month.dataType : null,
            DayDataTypeImageIndex: aod.date.day.enabled ? aod.date.day.dataType : null,
            DelimiterMonthImageIndex:aod.date.month.enabled ? aod.date.month.delimiter : null,
            DelimiterDayImageIndex: aod.date.day.enabled ? aod.date.day.delimiter : null,
            PaddingZeroMonth: aod.date.month.enabled ? (aod.date.month.paddingZero ? true : false) : false,
            PaddingZeroDay: aod.date.day.enabled ? (aod.date.day.paddingZero ? true : false) : false,
            MonthDataTypeCoordinates: aod.date.month.enabled && aod.date.month.dataType ? aod.date.month.dataTypeCoords : null,
            DayDataTypeCoordinates: aod.date.day.enabled && aod.date.day.dataType ? aod.date.day.dataTypeCoords : null,
            DayFollowsMonth: aod.date.day.follow ?  true : false,
        } : null
    }
}

function getBackground(b: WatchBackground): Background {
    let enabled = b.color || b.floatingLayer.enabled || b.image.enabled || b.preview.enabled

    if (!enabled) return null
    else return {
        Image: b.image.enabled ? b.image.json : null,
        BackgroundColor: !b.image.enabled &&  b.color ? Color.colorBackgroundWrite(b.color) : null,
        Preview: b.preview.enabled ? b.preview.json : null,
        PreviewChinese:  null,
        PreviewTradChinese:  null,
        FloatingLayer: b.floatingLayer.enabled ? b.floatingLayer.json : null,
    }
}

function getActivitySeparatedDigits(list: WatchActivityList): ActivitySeparateDigits {
    let enabled = list.stepsSeparatedDigits.enabled || list.caloriesSeparatedDigits.enabled
    || list.heartRateSeparatedDigits.enabled || list.batterySeparatedDigits.enabled
    if (!enabled) return null
    else return {
        Calories: list.caloriesSeparatedDigits.enabled ? list.caloriesSeparatedDigits.json : null,
        Steps: list.stepsSeparatedDigits.enabled ? list.stepsSeparatedDigits.json : null,
        Battery: list.batterySeparatedDigits.enabled ? list.batterySeparatedDigits.json : null,
        HeartRate: list.heartRateSeparatedDigits.enabled ? list.heartRateSeparatedDigits.json : null
    }
}
function getWeekdaysImages(weekdayImages: WatchWeekdayImages): WeekDayImages {
    let enabled = weekdayImages.monday.enabled || weekdayImages.tuesday.enabled || weekdayImages.wednesday.enabled ||
    weekdayImages.thursday.enabled || weekdayImages.friday.enabled || weekdayImages.saturday.enabled ||
    weekdayImages.sunday.enabled
    if (enabled) {
        return {
            Monday: weekdayImages.monday.enabled ? weekdayImages.monday.json : null,
            Tuesday: weekdayImages.tuesday.enabled ? weekdayImages.tuesday.json : null,
            Wednesday: weekdayImages.wednesday.enabled ? weekdayImages.wednesday.json : null,
            Thursday: weekdayImages.thursday.enabled ? weekdayImages.thursday.json : null,
            Friday: weekdayImages.friday.enabled ? weekdayImages.friday.json : null,
            Saturday: weekdayImages.saturday.enabled ? weekdayImages.saturday.json : null,
            Sunday: weekdayImages.sunday.enabled ? weekdayImages.sunday.json : null,
        }
    } else {
        return null
    }
}

