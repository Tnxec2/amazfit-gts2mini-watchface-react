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
  PreviewKorean: Image
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
  SeparatorHours: Image
  SeparatorMinutes: Image
  PaddingZeroHours: boolean = false
  PaddingZeroMinutes: boolean = false
}

export class NumberJson {
  TopLeftX: number = 0
  TopLeftY: number = 0
  BottomRightX: number = 0
  BottomRightY: number = 0
  Alignment: string = AlignmentType.Left.json
  Spacing: number = 0
  VerticalOffset: number = 0
  ImageIndex: number
  ImagesCount: number = 1
}

export class ShortcutElement {
  TopLeftX: number = 0
  TopLeftY: number = 0
  BottomRightX: number = 0
  BottomRightY: number = 0
  Unknown5: number = 0
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

export class ActivityElement {
  ImageNumber: NumberJson
  PrefixImageIndex: number
  NoDataImageIndex: number
  Icon: Image
  Shortcut: ShortcutElement
  SuffixImageIndex: number
  DecimalPointImageIndex: number
  SuffixKMImageIndex: number
  SuffixMIImageIndex: number
  SuffixImageCoordinates: Coordinates
}

export class Activity {
  Steps: ActivityElement
  Calories: ActivityElement
  HeartRate: ActivityElement
  Distance: ActivityElement
  PAI: ActivityElement
  UnknownLongValue7: number = 0
  StandUp: ActivityElement

}


export class MonthAndDayAlt{
  Month: NumberJson
  MonthName: ImageSet
  MonthNameChinese: ImageSet
  Day: NumberJson
}

export class OneLineNumber{
  Number: NumberJson
  DelimiterImageIndex: number
}

export class MonthAndDay{
  Year: NumberJson
  Month: NumberJson
  Day: NumberJson
  MonthFollowsYear: boolean = false
  DayFollowsMonth: boolean = false
  MonthAsWord: ImageSet
  MonthAsWordChinese: ImageSet
  YearDataTypeImageIndex: number
  MonthDataTypeImageIndex: number
  DayDataTypeImageIndex: number
  DelimiterYearImageIndex: number
  DelimiterMonthImageIndex: number
  DelimiterDayImageIndex: number
  DelimiterYearCoordinates: Coordinates
  DelimiterMonthCoordinates: Coordinates
  DelimiterDayCoordinates: Coordinates
}
export class Date{
  MonthAndDayAlt: MonthAndDayAlt
  OneLineMonthAndDay: OneLineNumber
  OneLineYearMonthAndDay: OneLineNumber
  PaddingZeroMonth: boolean = false
  PaddingZeroDay: boolean = false
  Unknown6: number = 0
  MonthAndDay: MonthAndDay
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

export class PointerScale{
  CenterX: number = 0
  CenterY: number = 0
  RangeFrom: number = 0
  RangeTo: number = 360
  PointerImageIndex: number
  PointerCenterOfRotationY: number
}

export class Scale{
  PointerScale: PointerScale
}

export class Progress{
  ImageProgress: ImageSet
  IconSetProgress: IconSet
  CircleScale: CircleScale
  Scale: Scale
  NoDataImage: Image
  UnknownImage: Image
}

export class DateBlock{
  Date: Date
  AmPm: AmPmIcon
  Unknown3: number = 0
  Weekday: ImageSet
  WeekdayChinese: ImageSet
  WeekdayKorean: ImageSet
  WeekdayProgress: Progress
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

export class Battery{
  BatteryText: ActivityElement
  ImageProgress: ImageSet
  IconSetProgress: IconSet
  Scale: Scale
  Icon: Image
}
export class AlarmTime{
  Hours: NumberJson
  Minutes: NumberJson
  DataTypeHoursImageIndex: number
  DelimiterHoursImageIndex: number
  DelimiterMinutesImageIndex: number
  PaddingZeroHours: boolean = false
  PaddingZeroMinutes: boolean = false
  DataTypeHoursCoordinates: Coordinates // needed only when MinutesFollowHours == False
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
  Unknown1:  number = 0
  Minutes: NumberJson
  Seconds: NumberJson
  PaddingZeroMinutes:  boolean = false
  PaddingZeroSeconds:  boolean = false
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
  Unknown7: number = 0
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
  PaddingZeroHours: boolean = false
  PaddingZeroMinutes: boolean = false
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
  WeekdayKorean: ImageSet
}

export class AoDDate{
 Month: NumberJson
 Day: NumberJson
 UnknownImageIndex: number
 SeparatorImageIndex: number
 PaddingZeroMonth: boolean = false
 PaddingZeroDay: boolean = false
 Unknown11: number
}

export class AlwaysOnDisplay{
  TimeExtended: AoDTimeExtended
  DateOneLine: AoDDateOneLine
  Week: AoDWeek
  Steps: ActivityElement
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
  HearthProgress: Progress;
  CaloriesProgress: Progress;
  HumidityProgress: Progress;
  Alarm: Alarm;
  Shortcuts: Shortcuts;
  TimeAnalog: AnalogDialFace;
  TimeDigital: TimeDigital;
  PaiProgress: Progress;
  StandUpProgress: Progress;
  UviProgress: Progress;
  AlwaysOnDisplay: AlwaysOnDisplay;
  ActivitySeparateDigits: ActivitySeparateDigits;
}
