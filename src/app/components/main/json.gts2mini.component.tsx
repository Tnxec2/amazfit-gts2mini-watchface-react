import { FC, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { Activity, ActivitySeparateDigits, Alarm, AlwaysOnDisplay, Background, Battery, DateBlock, Progress, Shortcuts, Status, TimeDigital, TimeExtended, WatchJson, Weather } from "../../model/json.gts2minit.model";
import { WatchActivityList, WatchAlarm, WatchAOD, WatchBackground, WatchBattery, WatchDate, WatchFace, WatchProgress, WatchShortcuts, WatchStatus, WatchTime, WatchTimeDigitalCommon, WatchWeather, WatchWeatherExt } from "../../model/watchFace.gts2mini.model";
import { Constant } from "../../shared/constant";
import cl from './JsonComponent.module.css';

const JsonComponent: FC = () => {

    const {watchface, jsonName } = useContext<IWatchContext>(WatchfaceContext);

    const [json, setJson] = useState<string>('')

    useEffect(() => {
        let json = generateJson(watchface)
        setJson(json)
        saveJson(json)
    }, [watchface]) // eslint-disable-line react-hooks/exhaustive-deps

    function generateJson(w: WatchFace): string {
        let timeClockHandEnabled = w.time.timeAnalog.hours.enabled || w.time.timeAnalog.minutes.enabled || w.time.timeAnalog.seconds.enabled


        let j: WatchJson = {
            Info: {
                DeviceId: Constant.deviceId
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
            HearthProgress: getProgress(w.activity.heartRate.aProgress),
            CaloriesProgress: getProgress(w.activity.calories.aProgress),
            HumidityProgress: getProgress(w.weatherext.humidityProgress),
            Alarm: getAlarm(w.time.alarm),
            Shortcuts: getShortCuts(w.shortcuts),
            TimeAnalog: timeClockHandEnabled ? { 
                CommonCenterCoordinates: w.time.timeAnalog.commonCenterCoordinates,
                Hours:  w.time.timeAnalog.hours.enabled ? w.time.timeAnalog.hours.json : null,
                Minutes: w.time.timeAnalog.minutes.enabled ? w.time.timeAnalog.minutes.json : null,
                Seconds: w.time.timeAnalog.seconds.enabled ? w.time.timeAnalog.seconds.json : null
            }: null,
            TimeDigital: getTimeDigital(w.time.timeDigitalCommon),
            PaiProgress: getProgress(w.activity.pai.aProgress),
            StandUpProgress: getProgress(w.activity.standUp.aProgress),
            UviProgress: getProgress(w.weatherext.uvProgress),
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
    let sunsetEnabled = time.sunset.sunriseOneLine.enabled || time.sunset.sunriseOneLine.enabled || time.sunset.sunsetIcon.enabled || time.sunset.sunriseIcon.enabled || time.sunset.sunsetShortcut.enabled || time.sunset.sunriseShortcut.enabled
    let timeExtendedEnabled = timeSeparatedEnabled || sunsetEnabled

    if (!timeExtendedEnabled) return null;
    else return {
        TimeSeparateDigits: timeSeparatedEnabled ? {
                Hours: time?.timeDigitalSeparated?.hours.enabled ? time?.timeDigitalSeparated?.hours?.json : null,
                Minutes: time?.timeDigitalSeparated?.minutes.enabled ? time?.timeDigitalSeparated?.minutes?.json : null,
                Seconds: time?.timeDigitalSeparated?.seconds.enabled ? time?.timeDigitalSeparated?.seconds?.json : null,
                SeparatorHours: time?.timeDigitalSeparated?.separatorHours.enabled ? time?.timeDigitalSeparated?.separatorHours.json : null,
                SeparatorMinutes: time?.timeDigitalSeparated?.separatorMinutes.enabled ?time?.timeDigitalSeparated?.separatorMinutes.json : null,
                PaddingZeroHours: time?.timeDigitalSeparated?.paddingZeroHours,
                PaddingZeroMinutes: time?.timeDigitalSeparated?.paddingZeroMinutes,
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
        Date: dateEnabled ? {
            MonthAndDayAlt: null,
            OneLineMonthAndDay: date.oneLineMonth ? {
                Number: date.month.enabled ? date.month.json : null,
                DelimiterImageIndex: date.oneLineDelimiter
            } : null,
            OneLineYearMonthAndDay: date.oneLineYear ? {
                Number: date.year.enabled ? date.year.json : null,
                DelimiterImageIndex: date.oneLineDelimiter
            } : null,
            PaddingZeroMonth: date.oneLineYear ? date.year?.paddingZero : date.month?.paddingZero,
            PaddingZeroDay: date.oneLineYear ? date.year?.paddingZero : (date.oneLineMonth ? date.month?.paddingZero :  date.day?.paddingZero),
            Unknown6: 0,
            MonthAndDay: ! date.oneLineYear && ! date.oneLineMonth ? {
                Year: date.year?.enabled ? date.year.json : null,
                Month: date.month?.enabled ? date.month.json : null,
                Day: date.day?.enabled ? date.day.json : null,
                MonthFollowsYear: date.month?.follow,
                DayFollowsMonth: date.day?.follow,
                MonthAsWord: date.monthAsWord?.enabled ? date.monthAsWord.json : null,
                MonthAsWordChinese: date.monthAsWord?.enabled ? date.monthAsWord.json : null,
                YearDataTypeImageIndex: date.year.enabled ? date.year?.delimiter : null,
                MonthDataTypeImageIndex: date.month.enabled ? date.month?.delimiter : null,
                DayDataTypeImageIndex: date.day.enabled ? date.day.delimiter : null,
                DelimiterYearImageIndex: date.year.enabled ? date.year.dataType : null,
                DelimiterMonthImageIndex: date.month.enabled ? date.month.dataType : null,
                DelimiterDayImageIndex: date.day.enabled ? date.day.dataType : null,
                DelimiterYearCoordinates: date.year.enabled && date.year.dataType ? date.year.dataTypeCoords : null,
                DelimiterMonthCoordinates: date.month.enabled && date.month.dataType ? date.month.dataTypeCoords : null,
                DelimiterDayCoordinates: date.day.enabled && date.day.dataType ? date.day.dataTypeCoords : null
            } : null
        } : null,
        AmPm: date.ampm.enabled ? date.ampm.json : null,
        Unknown3: null,
        Weekday: date.weekday.enabled ? date.weekday.json : null,
        WeekdayChinese: date.weekday.enabled ? date.weekday.json : null,
        WeekdayKorean: date.weekday.enabled ? date.weekday.json : null,
        WeekdayProgress: getProgress(date.weekdayProgress)
    }
}

function getProgress(progress: WatchProgress): Progress {
    let enabled = progress.circleScale.enabled || progress.iconSetProgress.enabled || 
    progress.imageProgress.enabled || progress.scale.enabled || progress.noDataImage.enabled

    if (!enabled) return null
    else return {
        ImageProgress: progress.imageProgress.enabled ? progress.imageProgress.json : null,
        IconSetProgress: progress.iconSetProgress.enabled ? progress.iconSetProgress.json : null,
        CircleScale: progress.circleScale.enabled ? progress.circleScale.json : null,
        Scale: progress.scale.enabled ? {
            PointerScale: progress.scale.json
         } : null,
        NoDataImage: progress.noDataImage.enabled ? progress.noDataImage.json : null,
        UnknownImage: null
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
        PaddingZeroHours: time.hours.paddingZero,
        DelimiterHoursImageIndex: time.hours.delimiter,
        DelimiterMinutesImageIndex: time.minutes.delimiter,
        HoursFollowPosition: false,
        DelimiterSecondsImageIndex: time.seconds.delimiter,
        Time: time.minutes.enabled || time.seconds.enabled ? {
            Unknown1:  time.time_unknown1,
            Minutes: time.minutes.enabled ? time.minutes.json : null,
            Seconds: time.seconds.enabled ? time.seconds.json : null,
            PaddingZeroMinutes:  time.minutes.paddingZero,
            PaddingZeroSeconds:  time.seconds.paddingZero,
            MinutesDataTypeImageIndex:  time.minutes.enabled ? time.minutes.dataType : null,
            SecondsDataTypeImageIndex:  time.seconds.enabled ? time.seconds.dataType : null,
            MinutesFollowHours:  time.minutes.follow,
            SecondsFollowMinutes:  time.seconds.follow,
            HoursDataTypeCoordinates: time.hours.enabled && time.hours.dataType ? time.hours.dataTypeCoords : null, // needed only when MinutesFollowHours == False
            MinutesDataTypeCoordinates: time.minutes.enabled && !time.minutes.follow  && time.minutes.dataType ? time.minutes.dataTypeCoords : null, // needed only when SecondsFollowMinutes == False
            SecondsDataTypeCoordinates: time.seconds.enabled && !time.seconds.follow && time.seconds.dataType ? time.seconds.dataTypeCoords : null
        } : null
    }

}

function getWeater(weather: WatchWeather, weatherext: WatchWeatherExt): Weather {
    let iconEnabled = weather.icon.enabled
    let tempEnabled = weather.current.enabled || weather.oneLineMinMax.enabled || weather.lowest.enabled || weather.highest.enabled 
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
                ImageNumber: weather.current.imageNumber.json,
                MinusImageIndex: weather.current.minus,
                SuffixImageIndexC: weather.current.suffix,
                SuffixImageIndexF: weather.current.suffix,
                NoDataImageIndex: weather.current.nodata,
                Shortcut: weather.current.shortcut.enabled ? weather.current.shortcut.json : null,
            } : null,
            OneLine: weather.oneLineMinMax.enabled ? {
                OneLineMinMax: {
                    Number: weather.oneLineMinMax.json,
                    MinusImageIndex:  weather.oneLineMinus,
                    DelimiterImageIndex:  weather.oneLineDelimiter,
                    UnknownLong4:  0,
                    DegreesImageIndex:  weather.oneLineDegrees
             }
            } : null,
            Lowest: weather.lowest.enabled ? {
                ImageNumber: weather.lowest.imageNumber.json,
                MinusImageIndex: weather.lowest.minus,
                SuffixImageIndexC: weather.lowest.suffix,
                SuffixImageIndexF: weather.lowest.suffix,
                NoDataImageIndex: weather.lowest.nodata,
                Shortcut: weather.lowest.shortcut.enabled ? weather.lowest.shortcut.json : null,
            } : null,
            Highest: weather.highest.enabled ? {
                ImageNumber: weather.highest.imageNumber.json,
                MinusImageIndex: weather.highest.minus,
                SuffixImageIndexC: weather.highest.suffix,
                SuffixImageIndexF: weather.highest.suffix,
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
            UVindexIcon: weatherext.uvIcon.enabled ? weatherext.uvIcon.json : null
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
        BatteryText: battery.text.enabled ? battery.text.json : null,
        ImageProgress: battery.imageProgress.enabled ? battery.imageProgress.json : null,
        IconSetProgress: battery.iconSetProgress.enabled ? battery.iconSetProgress.json : null,
        Scale: battery.scale.enabled ? {
            PointerScale: battery.scale.json
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
    Steps: activity.steps.aElement.enabled ? activity.steps.aElement.json : null,
    Calories: activity.calories.aElement.enabled ? activity.calories.aElement.json : null,
    HeartRate: activity.heartRate.aElement.enabled ? activity.heartRate.aElement.json : null,
    Distance: activity.distance.aElement.enabled ? activity.distance.aElement.json : null,
    PAI: activity.pai.aElement.enabled ? activity.pai.aElement.json : null,
    UnknownLongValue7: 0,
    StandUp: activity.standUp.aElement.enabled ? activity.standUp.aElement.json : null,
   }
}

function getAlarm(alarm: WatchAlarm): Alarm {
    let enabled = alarm.noAlarm.enabled || alarm.alarmImage.enabled ||
    alarm.shortcut.enabled || alarm.alarmTime.hours.enabled || alarm.alarmTime.minutes.enabled

    if (!enabled) return null
    else return {
        NoAlarmImage: alarm.noAlarm.enabled ? alarm.noAlarm.json : null,
        AlarmImage: alarm.alarmImage.enabled ? alarm.alarmImage.json : null,
        ShortcutArea: alarm.shortcut.enabled ? alarm.shortcut.json : null,
        AlarmTime: alarm.alarmTime.hours.enabled || alarm.alarmTime.minutes.enabled ? {
            Hours: alarm.alarmTime.hours.enabled ? alarm.alarmTime.hours.json : null,
            Minutes: alarm.alarmTime.minutes.enabled ? alarm.alarmTime.minutes.json : null,
            DataTypeHoursImageIndex: alarm.alarmTime.hours.enabled ? alarm.alarmTime.hours.dataType : null,
            DelimiterHoursImageIndex: alarm.alarmTime.hours.enabled ? alarm.alarmTime.hours.delimiter : null,
            DelimiterMinutesImageIndex: alarm.alarmTime.minutes.enabled ? alarm.alarmTime.minutes.delimiter : null,
            PaddingZeroHours: alarm.alarmTime.hours.enabled ? alarm.alarmTime.hours.paddingZero : null,
            PaddingZeroMinutes: alarm.alarmTime.minutes.enabled ? alarm.alarmTime.minutes.paddingZero : null,
            DataTypeHoursCoordinates: alarm.alarmTime.hours.enabled && alarm.alarmTime.hours.dataType ? alarm.alarmTime.hours.dataTypeCoords : null, // needed only when MinutesFollowHours == False
            MinutesFollowHours: alarm.alarmTime.minutes.enabled ? alarm.alarmTime.minutes.follow : null,
        } : null,
    }
}

function getShortCuts(s: WatchShortcuts): Shortcuts {
    if (s.json && s.json.length > 0 ) {
        return {
            Shortcut: s.json.map((item) => 
                ({ 
                 Icon: item.Icon?.ImageIndex >= 0 ? item.Icon : null,
                 ShortcutType: item.ShortcutType,
                 Element: item.Element
                })
            )
        }
    } else return null
}

function getAod(aod: WatchAOD): AlwaysOnDisplay {
    let enabledAmPm = aod.time.amPm.enabled
    let enabledTimeAnalog = aod.time.timeAnalog.hours.enabled || aod.time.timeAnalog.minutes.enabled
    let enabledTimeDigital = aod.time.timeDigital.hours.enabled || aod.time.timeDigital.minutes.enabled
    let enabledTimeSeparated = aod.time.timeSeparateDigits.hours.enabled || aod.time.timeSeparateDigits.minutes.enabled
    let enabledTimeExt = enabledAmPm || enabledTimeAnalog || enabledTimeDigital || enabledTimeSeparated
    let enabledDate = aod.date.day.enabled || aod.date.month.enabled || enabledTimeExt
    let enabled = enabledTimeExt || enabledDate || aod.steps.aElement.enabled || aod.weekday.enabled
    if (!enabled) return null
    else return  {
        TimeExtended: enabledTimeExt ? {
            TimeSeparateDigits: enabledTimeSeparated ? {
                Hours: aod.time.timeSeparateDigits.hours.enabled ? aod.time.timeSeparateDigits.hours.json : null,
                Minutes: aod.time.timeSeparateDigits.minutes.enabled ? aod.time.timeSeparateDigits.minutes.json : null,
                Separator: aod.time.timeSeparateDigits.separator.enabled ? aod.time.timeSeparateDigits.separator.json : null,
                PaddingZeroHours: aod.time.timeSeparateDigits.hours.enabled ? aod.time.timeSeparateDigits.paddingZero : null
            } : null,
            TimeAnalog: enabledTimeAnalog ? {
                CommonCenterCoordinates: aod.time.timeAnalog.commonCenterCoordinates ? aod.time.timeAnalog.commonCenterCoordinates : null,
                Hours: aod.time.timeAnalog.hours.enabled ? aod.time.timeAnalog.hours.json : null,
                Minutes: aod.time.timeAnalog.minutes.enabled ? aod.time.timeAnalog.minutes.json : null,
            } : null,
            AmPm: enabledAmPm ? aod.time.amPm.json : null,
            TimeDigital: enabledTimeDigital ? {
                Hours: aod.time.timeDigital.hours.enabled ? aod.time.timeDigital.hours.json : null,
                Minutes: aod.time.timeDigital.minutes.enabled ? aod.time.timeDigital.minutes.json : null,
                PaddingZeroHours: aod.time.timeDigital.hours.enabled ? aod.time.timeDigital.hours.paddingZero : null,
                PaddingZeroMinutes: aod.time.timeDigital.hours.enabled ? aod.time.timeDigital.minutes.paddingZero : null,
                MinutesFollowHours: aod.time.timeDigital.hours.enabled ? aod.time.timeDigital.minutes.follow : null,
            } : null
        }: null,
        DateOneLine: aod.dateOneLine.monthAndDay.enabled ? {
            MonthAndDay: aod.dateOneLine.monthAndDay.json,
            SeparatorImageIndex: aod.dateOneLine.separatorImageIndex
        } : null,
        Week: aod.weekday.enabled ? {
            Weekday: aod.weekday.json,
            WeekdayChinese: null,
            WeekdayKorean: null
        } : null,
        Steps: aod.steps.aElement.enabled ? aod.steps.aElement.json : null,
        Date: enabledDate ? {
            Month: aod.date.month.enabled ? aod.date.month.json : null,
            Day: aod.date.day.enabled ? aod.date.day.json : null,
            UnknownImageIndex: aod.date.unknown,
            SeparatorImageIndex: aod.date.separator,
            PaddingZeroMonth: aod.date.month.enabled ? aod.date.month.paddingZero : null,
            PaddingZeroDay: aod.date.day.enabled ? aod.date.day.paddingZero : null,
            Unknown11: aod.date.unknown11
        } : null
    }
}

function getBackground(b: WatchBackground): Background {
    let enabled = b.color || b.floatingLayer.enabled || b.image.enabled || b.preview.enabled

    if (!enabled) return null
    else return {
        Image: b.image.enabled ? b.image.json : null,
        BackgroundColor: !b.image.enabled && b.color ? b.color : null,
        Preview: b.preview.enabled ? b.preview.json : null,
        PreviewChinese: b.previewc.enabled ? b.previewc.json : null,
        PreviewKorean: b.previewk.enabled ? b.previewk.json : null,
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
