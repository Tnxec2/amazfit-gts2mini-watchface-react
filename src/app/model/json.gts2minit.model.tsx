import Color from "../shared/color";
import { AlignmentType } from "./types.gts2mini.model";

export class DeviceId {
  DeviceId: number;
}

export class Image {
  X: number = 0
  Y: number = 0
  ImageIndex: number
}

export class Background {
  Image: Image;
  BackgroundColor: string = Color.DEFAULT_COLOR;
  Preview: Image
  PreviewTradChinese: Image
  PreviewChinese: Image
  FloatingLayer: Image
}

export class ImageSet { 
  X: number = 0;
  Y: number = 0;
  ImageIndex: number;
  ImagesCount: number = 1;
}

export class FiveDigits {
  Unknown1: number // draw order?
  TenThousands: ImageSet
  Thousands: ImageSet
  Hundreds: ImageSet
  Tens: ImageSet
  Ones: ImageSet
  NoDataImage: ImageSet
}
export class FourDigits {
  Unknown1: number = 0 // draw order?
  Thousands: ImageSet
  Hundreds: ImageSet
  Tens: ImageSet
  Ones: ImageSet
  NoDataImage: ImageSet
}

export class ThreeDigits {
  Unknown1: number = 0 // draw order?
  Hundreds: ImageSet
  Tens: ImageSet
  Ones: ImageSet
  NoDataImage: ImageSet
}
export class TwoDigits {
    Tens: ImageSet
    Ones: ImageSet
}

export class TimeSeparateDigits {
  Hours: TwoDigits
  Minutes: TwoDigits
  Seconds: TwoDigits
  DrawOrder: number
  SeparatorHours: Image
  SeparatorMinutes: Image
  PaddingZeroHours: boolean = false
  PaddingZeroMinutes: boolean = false
}

export class NumberJson {
  TopLeftX: number = 0
  TopLeftY: number = 0
  BottomRightX: number = 1
  BottomRightY: number = 1
  Alignment: string = AlignmentType.TopLeft.json
  Spacing: number = 0
  VerticalOffset: number = 0
  ImageIndex: number
  ImagesCount: number = 1
}

export class ShortcutElement {
  TopLeftX: number = 0
  TopLeftY: number = 0
  BottomRightX: number = 1
  BottomRightY: number = 1
  UnknownBoolean5: boolean = true
}

export class TimeExtended {
  TimeSeparateDigits: TimeSeparateDigits
  SunsetTimeOneLine: NumberJson
  DelimiterSunsetImageIndex: number
  SunriseTimeOneLine: NumberJson
  DelimiterSunriseImageIndex: number
  SunsetIcon: Image
  SunriseIcon: Image
  SunsetShortcut: ShortcutElement
  SunriseShortcut: ShortcutElement
  SunsetImageIndex: number
  SunriseImageIndex: number
}



export class Coordinates {
  X: number = 0;
  Y: number = 0;
}




export class Distance {
  ImageNumber: NumberJson
  SuffixKMImageIndex: number
  DecimalPointImageIndex: number
  SuffixMIImageIndex: number
  Icon: Image
  Shortcut: ShortcutElement
  SuffixImageCoordinates: Coordinates
}

export class HeartRate {
  ImageNumber: NumberJson
  PrefixImageIndex: number
  NoDataImageIndex: number
  Icon: Image
  Shortcut: ShortcutElement
  SuffixImageIndex: number
}

export class Calories {
  ImageNumber: NumberJson
  SuffixImageIndex: number
  Icon: Image
  Shortcut: ShortcutElement
}

export class StandUp {
  ImageNumber: NumberJson
  SuffixImageIndex: number
  Icon: Image
  Shortcut: ShortcutElement
}

export class PAI {
  ImageNumber: NumberJson
  SuffixImageIndex: number
  Icon: Image
  Shortcut: ShortcutElement
}

export class Steps {
  ImageNumber: NumberJson
  PrefixImageIndex: number
  SuffixImageIndex: number
  Icon: Image
  Shortcut: ShortcutElement
  DelimiterTotalImageIndex: number
}

export class Activity {
  Steps: Steps
  Icon: Image
  Calories: Calories
  HeartRate: HeartRate
  Distance: Distance
  PAI: PAI
  UnknownLongValue7: number = 0
  StandUp: StandUp

}


export class MonthAndDayAlt{
  Month: NumberJson
  MonthAsWord: ImageSet
  MonthAsWordChinese: ImageSet
  Day: NumberJson
}

export class OneLineNumber{
  Number: NumberJson
  DelimiterImageIndex: number
}

export class YearMonthAndDay{
  Year: NumberJson
  Month: NumberJson
  Day: NumberJson
  MonthFollowsYear: boolean = false
  DayFollowsMonth: boolean = false
  MonthAsWord: ImageSet
  MonthAsWordChinese: ImageSet
  DelimiterYearImageIndex: number
  DelimiterMonthImageIndex: number
  DelimiterDayImageIndex: number
  YearDataTypeImageIndex: number
  MonthDataTypeImageIndex: number
  DayDataTypeImageIndex: number
  YearDataTypeCoordinates: Coordinates
  MonthDataTypeCoordinates: Coordinates
  DayDataTypeCoordinates: Coordinates
}
export class DateElement{
  MonthAndDayAlt: MonthAndDayAlt
  OneLineMonthAndDay: OneLineNumber
  OneLineYearMonthAndDay: OneLineNumber
  PaddingZeroMonth: boolean = false
  PaddingZeroDay: boolean = false
  UnknownBoolean6: boolean = false
  YearMonthAndDay: YearMonthAndDay
}
export class AmPmIcon{
  CommonX: number
  CommonY: number
  ImageIndexAMCN: number
  ImageIndexPMCN: number
  AmImageIndexEN: number
  PmImageIndexEN: number
  CoordinatesAM: Coordinates
  CoordinatesPM: Coordinates
}
export class IconSet{
  ImageIndex: number
  Coordinates: Coordinates[] = []
}

export class CircleScale{
  CenterX:  number = 0
  CenterY:  number = 0
  RadiusX:  number = 0
  RadiusY:  number = 0
  StartAngle:  number = 0
  EndAngle:  number = 360
  Width:  number = 0
  Color: string
  Flatness:  number = 0
  ImageIndex:  number
}

export class  PointerScale{
  CenterX: number = 0
  CenterY: number = 0
  RangeFrom: number = 0
  RangeTo: number = 360
  PointerImageIndex: number
  PointerCenterOfRotationY: number
}

export class Scale{
  PointerScale: PointerScale
  BottomImage: Image
  BottomImageChinese: Image
  BottomImageTradChinese: Image
}

export class Progress{
  ImageProgress: ImageSet
  IconSetProgress: IconSet
  CircleScale: CircleScale
  Scale: Scale
  NoDataImage: Image
  UnknownImage: Image
}

export class Alt1PointerScale {
  PointerScale: PointerScale
}
export class ProgressAlt1 {
        PointerScale: PointerScale 
        ImageProgress: ImageSet 
        Alt1PointerScale: Alt1PointerScale 
        NoDataImage: Image 
    }

export class ProgressAlt2 {
        ImageProgress: ImageSet
        NoDataImage: Image
}

export class ProgressAlt3 {
        ImageProgress: ImageSet
        NoDataImage: Image
    }

export class ProgressAlt4 {
        ImageProgress: ImageSet
        NoDataImage: Image
    }

export class ProgressAlt5 {
        ImageProgress: ImageSet
        IconSetProgress: IconSet
        PointerProgress: Scale
    }

export class DateBlock{
  Date: DateElement
  AmPm: AmPmIcon
  // Unknown3: number = 0
  Weekday: ImageSet
  WeekdayChinese: ImageSet
  WeekdayTradChinese: ImageSet
  WeekdayProgress: Progress
  WeekdayPointerScale: WeekdayPointerScale
}

export class WeekdayPointerScale {
  PointerScale: PointerScale
}

export class Icon{
  Images: ImageSet
}

export class TextTemperature{
  ImageNumber: NumberJson
  MinusImageIndex:  number
  SuffixImageIndexC:  number
  SuffixImageIndexF:  number
  NoDataImageIndex:  number
  Shortcut: ShortcutElement
}
export class OneLineMinMax {
  Number: NumberJson
  MinusImageIndex:  number
  DelimiterImageIndex:  number
  UnknownLong4:  number = 0
  DegreesImageIndex:  number
}

export class OneLine {
  OneLineMinMax: OneLineMinMax
}
export class Temperature{
  Current: TextTemperature
  OneLine: OneLine
  Lowest: TextTemperature
  Highest: TextTemperature
}

export class AirQuality{
  AirQualityNumber: NumberJson
  AirQualityIcon: Image
}

export class Humidity{
  HumidityNumber: NumberJson
  SuffixImageIndex: number
  HumidityIcon: Image
}

export class UVindex{
  UVindexNumber: NumberJson
  SuffixImageIndex: number
  Shortcut: ShortcutElement
  NoDataImageIndex: number
  UVindexIcon: Image
}
export class Weather{
  Icon: Icon
  Temperature: Temperature
  AirQuality: AirQuality
  Humidity: Humidity
  UVindex: UVindex
}

export class Switch{
  Coordinates: Coordinates = new Coordinates()
  ImageIndexOn: number
  ImageIndexOff: number
}
export class Status{
  DoNotDisturb: Switch
  Lock: Switch
  Bluetooth: Switch
  Alarm: Switch
}

export class BatteryTextElement {
  ImageNumber: NumberJson
  PrefixImageIndex: number
  SuffixImageIndex: number
  Icon: Image
  Shortcut: ShortcutElement
}

export class Battery{
  BatteryText: BatteryTextElement
  ImageProgress: ImageSet
  IconSetProgress: IconSet
  Scale: Scale
  Icon: Image
}
export class AlarmTime{
  Hours: NumberJson
  Minutes: NumberJson
  HoursDataTypeImageIndex: number
  DelimiterHoursImageIndex: number
  DelimiterMinutesImageIndex: number
  PaddingZeroHours: boolean = false
  PaddingZeroMinutes: boolean = false
  HoursDataTypeCoordinates: Coordinates // needed only when MinutesFollowHours == False
  MinutesFollowHours: boolean = false
}

export class Alarm{
  NoAlarmImage: Image
  AlarmImage: Image
  ShortcutArea: ShortcutElement
  AlarmTime: AlarmTime
}

export class Shortcut{
  Icon: Image
  ShortcutType: string  
  Element: ShortcutElement
}

export class Shortcuts{
  Shortcut: Shortcut[]
}

export class ClockHand{
  ImageIndex: number
  PointerCenterOfRotationY: number
  CenterCoordinates: Coordinates = new Coordinates()
  CoverImage: Image 
}

export class AnalogDialFace{
  CommonCenterCoordinates: Coordinates // #c695a02e7f899736773c32dcfb929a54.bin, one center for all clock hands
  Hours: ClockHand
  Minutes: ClockHand
  Seconds: ClockHand
}

export class Time{
  Unknown1:  number = 1
  Minutes: NumberJson
  Seconds: NumberJson
  PaddingZeroMinutes:  boolean = false
  PaddingZeroSeconds:  boolean = true
  MinutesDataTypeImageIndex:  number
  SecondsDataTypeImageIndex:  number
  MinutesFollowHours:  boolean = false
  SecondsFollowMinutes:  boolean = false
  HoursDataTypeCoordinates: Coordinates // needed only when MinutesFollowHours == False
  MinutesDataTypeCoordinates: Coordinates // needed only when SecondsFollowMinutes == False
  SecondsDataTypeCoordinates: Coordinates

}

export class TimeDigital{
  Hours: NumberJson
  HoursDataTypeImageIndex: number
  PaddingZeroHours: boolean = false
  DelimiterHoursImageIndex: number
  DelimiterMinutesImageIndex: number
  HoursFollowPosition: boolean = false
  DelimiterSecondsImageIndex: number
  Time: Time
}

export class AoDTimeSeparateDigits{
 Hours: TwoDigits
 Minutes: TwoDigits
 Separator: Image
 PaddingZeroHours: boolean = false
}

export class AoDAnalogDialFace{
  CommonCenterCoordinates: Coordinates
  Hours: ClockHand
  Minutes: ClockHand
}

  
export class AoDTimeDigital{
  Hours: NumberJson
  Minutes: NumberJson
  HoursDataTypeImageIndex: number
  MinutesDataTypeImageIndex: number
  DelimiterHoursImageIndex: number
  DelimiterMinutesImageIndex: number
  PaddingZeroHours: boolean = false
  PaddingZeroMinutes: boolean = false
  
  HoursDataTypeCoordinates: Coordinates
  MinutesDataTypeCoordinates: Coordinates
  MinutesFollowHours: boolean = false
}

export class AoDTimeExtended{
  TimeSeparateDigits: AoDTimeSeparateDigits
  TimeAnalog: AoDAnalogDialFace
  AmPm: AmPmIcon
  TimeDigital: AoDTimeDigital
}

export class AoDDateOneLine{
  MonthAndDay: NumberJson
  SeparatorImageIndex: number
}

export class AoDWeek{
  Weekday: ImageSet
  WeekdayChinese: ImageSet
  WeekdayTradChinese: ImageSet
}

export class AoDDate{
 Month: NumberJson
 Day: NumberJson
 MonthDataTypeImageIndex: number
 DayDataTypeImageIndex: number
 DelimiterMonthImageIndex: number
 DelimiterDayImageIndex: number
 PaddingZeroMonth: boolean = false
 PaddingZeroDay: boolean = false
 MonthDataTypeCoordinates: Coordinates
 DayDataTypeCoordinates: Coordinates
 DayFollowsMonth: boolean = false
}

export class AODSteps {
  ImageNumber: NumberJson
  PrefixImageIndex: number
  SuffixImageIndex: number
}
export class AlwaysOnDisplay{
  TimeExtended: AoDTimeExtended
  DateOneLine: AoDDateOneLine
  Week: AoDWeek
  Steps: AODSteps
  Date: AoDDate
}

export class ActivitySeparateDigits{
  Calories: FourDigits
  Battery: ThreeDigits
  Steps: FiveDigits
  HeartRate: ThreeDigits
}

export class ImageSetAnimation{
  ImageProgress: ImageSet = new ImageSet()
  FrameInterval: number //msec
  PlayTimes: number // 255 if unlimited loops
  Repeat: boolean
}

export class Animation{
  ImageSetAnimation: ImageSetAnimation[]
}

export class HourlyImages {
  HourlyImage: HourlyImage
}
export class HourlyImage {
  IconSet: IconSet
  TimeSpans: TimeSpans[]
}

export class TimeSpans{
  StartHour: number
  StartMin: number
  StopHour: number
  StopMin: number
}

export class WeekDayImages {
        Monday: Image
        Tuesday: Image
        Wednesday: Image
        Thursday: Image
        Friday: Image
        Saturday: Image
        Sunday: Image
}

export class WatchJson{
  Info: DeviceId;
  Background: Background;
  TimeExtended: TimeExtended;
  Activity: Activity;
  DateBlock: DateBlock;
  Weather: Weather;
  StepProgress: Progress;
  Status: Status;
  Battery: Battery;
  Animation: Animation;
  HeartProgress: Progress;
  WeekDayImages: WeekDayImages;
  CaloriesProgress: Progress;
  HumidityProgress: ProgressAlt3;
  Alarm: Alarm;
  Shortcuts: Shortcuts;
  TimeAnalog: AnalogDialFace;
  TimeDigital: TimeDigital;
  HourlyImages: HourlyImages;
  PaiProgress: ProgressAlt1;
  StandUpProgress: ProgressAlt5;
  UviProgress: ProgressAlt2;
  StressProgress: ProgressAlt4;
  SPO2Progress: ProgressAlt4;
  AlwaysOnDisplay: AlwaysOnDisplay;
  ActivitySeparateDigits: ActivitySeparateDigits;
}
