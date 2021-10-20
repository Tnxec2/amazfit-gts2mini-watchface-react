export class DeviceId {
  DeviceId: number;
}

export class Background {
  Preview: MultilangImage[];
  BackgroundImageIndex: number;
  Color: string;
}

export class ScreenNormal {
  DigitalDialFace: DigitalDialFace;
  AnalogDialFace: AnalogDialFace;
  ProgressDialFace: ProgressDialFace;
}

export class System {
  Status: Status;
  Date: Date;
  Activity: Activity[];
}

export class Widgets {
  Widget: Widget[];
  TopMaskImageIndex: number;
  UnderMaskImageIndex: number;
  Unknown4: number;
}

export class ScreenIdle {
  DialFace: ScreenNormal;
  Date: Date;
  Activity: Activity[];
  BackgroundImageIndex: number;
}

export class Widget {
  X: number;
  Y: number;
  Width: number;
  Height: number;
  WidgetElement: WidgetElement[];
  BorderActivImageIndex: number;
  BorderInactivImageIndex: number;
  DescriptionImageBackground: ImageCoord;
  DescriptionWidthCheck: number;
}

export class WidgetElement {
  Preview: MultilangImage[];
  Date: Date;
  Activity: Activity[];
}

export class Date {
  DateDigits: DigitalDateDigit[];
  WeeksDigits: DigitalCommonDigit;
  DateClockHand: DateClockHand;
  DateProgressBar: DateProgressBar;
}

export class DateProgressBar {
  MonthProgressBar: ProgressBar;
  DayProgressBar: ProgressBar;
  WeekDayProgressBar: ProgressBar;
}

export class Status {
  Bluetooth: ImageCoord;
  DoNotDisturb: ImageCoord;
  Lock: ImageCoord;
  Alarm: ImageCoord;
}

export class Activity {
  Type: string;
  PointerProgress: ClockHand;
  ProgressBar: ProgressBar;
  ImageProgress: ImageProgress;
  Digits: DigitalCommonDigit[];
  Shortcut: Shortcut;
  Icon: ImageCoord;
}

export class Shortcut {
  BoxElement: BoxElement;
  ImageIndex: number;
}

export class BoxElement {
  TopLeftX: number;
  TopLeftY: number;
  Width: number;
  Height: number;
}

export class ImageProgress {
  Coordinates: Coordinates[];
  ImageSet: ImageSetGTR2;
  DisplayType: string;
}

export class ProgressDialFace {
  Hours: ProgressBar;
  Minutes: ProgressBar;
  Seconds: ProgressBar;
}

export class ProgressBar {
  AngleSettings: AngleSettings;
  LinearSettings: LinearSettings;
  ForegroundImageIndex: number;
  Color: string;
  Width: number;
  Flatness: number;
  PointerImageIndex: number;
  BackgroundImageIndex: number;
}

export class LinearSettings {
  StartX: number = 0;
  StartY: number = 0;
  EndX: number = 0;
  EndY: number = 0;
  Unknown5: number;
}

export class AngleSettings {
  X: number = 0;
  Y: number = 0;
  StartAngle: number = 0;
  EndAngle: number = 360;
  Radius: number = 0;
}

export class AnalogDialFace {
  Hours: ClockHand;
  Minutes: ClockHand;
  Seconds: ClockHand;
}

export class DateClockHand {
  MonthClockHand: ClockHand;
  DayClockHand: ClockHand;
  WeekDayClockHand: ClockHand;
}

export class ClockHand {
  X: number;
  Y: number;
  Scale: MultilangImageCoord;
  Pointer: ImageCoord;
  Cover: ImageCoord;
  StartAngle: number;
  EndAngle: number;
  Unknown16: number;
}

export class DigitalDialFace {
  Digits: DigitalTimeDigit[];
  AM: MultilangImageCoord;
  PM: MultilangImageCoord;
}

export class MultilangImageCoord {
  Coordinates: Coordinates;
  ImageSet: MultilangImage[];
}

export class DigitalCommonDigit {
  Type: string;
  CombingMode: string;
  Digit: Text;
  Separator: ImageCoord;
}

export class DigitalDateDigit {
  DateType: string;
  CombingMode: string;
  Digit: Text;
  Separator: ImageCoord;
}

export class JsonType {
  constructor(public index: number, public json: string) {}
}

export class LangCodeType {
  static Zh = new JsonType(0, "Zh");
  static ZhHant = new JsonType(1, "ZhHant");
  static All = new JsonType(2, "All");

  static toJson(index: number) {
    if (index === undefined) return this.Zh.json;
    return Object.values(LangCodeType).find((val) => val.index === index).json;
  }
  static fromJson(json: string) {
    if (json === undefined) return this.Zh.index;
    return Object.values(LangCodeType).find((val) => val.json === json).index;
  }
}

export class AlignmentType {
  static Left = new JsonType(0, "Left");
  static Center = new JsonType(1, "Center");
  static Right = new JsonType(2, "Right");

  static toJson(index: number) {
    if (index === undefined) return this.Left.json;
    return Object.values(AlignmentType).find((val) => val.index === index).json;
  }
  static fromJson(json: string) {
    if (json === undefined) return this.Left.index;
    return Object.values(AlignmentType).find((val) => val.json === json).index;
  }
}

export class FollowType {
  static Follow = new JsonType(0, "Follow");
  static Single = new JsonType(1, "Single");

  static toJson(index: number) {
    if (index === undefined) return this.Follow.json;
    return Object.values(FollowType).find((val) => val.index === index).json;
  }
  static fromJson(json: string) {
    if (json === undefined) return this.Follow.index;
    return Object.values(FollowType).find((val) => val.json === json).index;
  }
}

export class DigitType {
  static Default = new JsonType(0, null);
  static Min = new JsonType(1, "Min");
  static Max = new JsonType(2, "Max");

  static toJson(index: number) {
    if (index === undefined) return this.Default.json;
    return Object.values(DigitType).find((val) => val.index === index).json;
  }
  static fromJson(json: string) {
    if (json === undefined) return this.Default.index;
    return Object.values(DigitType).find((val) => val.json === json).index;
  }
}

export class ImageProgressDisplayType {
  static Single = new JsonType(0, "Single");
  static Continuous = new JsonType(1, "Continuous");

  static toJson(index: number) {
    if (index === undefined) return this.Single.json;
    return Object.values(ImageProgressDisplayType).find((val) => val.index === index).json;
  }
  static fromJson(json: string) {
    if (json === undefined) return this.Single.index;
    return Object.values(ImageProgressDisplayType).find((val) => val.json === json).index;
  }
}

export class DateType {
  static Year = new JsonType(0, "Year");
  static Month = new JsonType(1, "Month");
  static Day = new JsonType(2, "Day");

  static toJson(index: number) {
    if (index === undefined) return this.Year.json;
    return Object.values(DateType).find((val) => val.index === index).json;
  }
  static fromJson(json: string) {
    if (json === undefined) return this.Year.index;
    return Object.values(DateType).find((val) => val.json === json).index;
  }
}

export class TimeType {
  static Hour = new JsonType(0, "Hour");
  static Minute = new JsonType(1, "Minute");
  static Second = new JsonType(2, "Second");

  static toJson(index: number) {
    if (index === undefined) return this.Hour.json;
    return Object.values(TimeType).find((val) => val.index === index).json;
  }
  static fromJson(json: string) {
    if (json === undefined) return this.Hour.index;
    return Object.values(TimeType).find((val) => val.json === json).index;
  }
}

export class ActivityType {
  static Date = new JsonType(0, "Date");
  static Battery = new JsonType(1, "Battery");
  static Steps = new JsonType(2, "Steps");
  static Calories = new JsonType(3, "Calories");
  static HeartRate = new JsonType(4, "HeartRate");
  static Pai = new JsonType(5, "PAI");
  static Distance = new JsonType(6, "Distance");
  static StandUp = new JsonType(7, "StandUp");
  static Weather = new JsonType(8, "Weather");
  static UVindex = new JsonType(9, "UVindex");
  static AirQuality = new JsonType(10, "AirQuality");
  static Humidity = new JsonType(11, "Humidity");
  static Sunrise = new JsonType(12, "Sunrise");
  static WindForce = new JsonType(13, "WindForce");
  static Altitude = new JsonType(14, "Altitude");
  static AirPressure = new JsonType(15, "AirPressure");
  static Stress = new JsonType(16, "Stress");
  static ActivityGoal = new JsonType(17, "ActivityGoal");
  static FatBurning = new JsonType(18, "FatBurning");

  static toJson(index: number) {
    if (index === undefined) return this.Date.json;
    return Object.values(ActivityType).find((val) => val.index === index).json;
  }
  static fromJson(json: string) {
    if (json === undefined) return this.Date.index;
    return Object.values(ActivityType).find((val) => val.json === json).index;
  }
}

export class DigitalTimeDigit {
  TimeType: string = TimeType.Hour.json;
  CombingMode: string = FollowType.Single.json;
  Digit: Text;
  Separator: ImageCoord;
}

export class ImageCoord {
  Coordinates: Coordinates;
  ImageIndex: number = null;
  ImageIndex2: number = null;
  ImageIndex3: number = null;
}

export class Text {
  Image: Image;
  SystemFont: SystemFont;
  Alignment: string = AlignmentType.Left.json;
  Spacing: number = 0;
  PaddingZero: boolean = false;
  DisplayFormAnalog: boolean = false;
}

export class Image {
  X: number = 0;
  Y: number = 0;
  NoDataImageIndex: number = null;
  MultilangImage: MultilangImage[];
  DecimalPointImageIndex: number = null;
  MultilangImageUnit: MultilangImage[];
  DelimiterImageIndex: number = null;
  MultilangImageUnitMile: MultilangImage[];
}

export class SystemFont {
  FontRotate: FontRotate;
  Coordinates: Coordinates;
  Angle: number = null;
  Size: number = 0;
  Color: string = null;
  ShowUnitCheck: number = null;
}

export class Coordinates {
  X: number = null;
  Y: number = null;
}

export class FontRotate {
  X: number;
  Y: number;
  Radius: number;
  RotateDirection: number;
}

export class MultilangImage {
  LangCode: string;
  ImageSet: ImageSetGTR2;
}

export class ImageSetGTR2 {
  ImageIndex: number = null;
  ImagesCount: number = 1;
}

export class WatchJson {
  Info: DeviceId;
  Background: Background;
  DialFace: ScreenNormal;
  System: System;
  Widgets: Widgets;
  ScreenIdle: ScreenIdle;
}
