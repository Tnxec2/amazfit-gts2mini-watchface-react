import Color from "../shared/color";
import { ActivityElement, ActivitySeparateDigits, Alarm, AlarmTime, AlwaysOnDisplay, AmPmIcon, AnalogDialFace, Animation, AoDAnalogDialFace, AoDDate, AoDDateOneLine, AoDTimeDigital, AoDTimeExtended, AoDTimeSeparateDigits, Background, Battery, CircleScale, ClockHand, Coordinates, DateBlock, IconSet, Image, ImageSet, ImageSetAnimation, NumberJson, PointerScale, Progress, Shortcut, ShortcutElement, Shortcuts, Status, Switch, TextTemperature, TimeDigital, TimeExtended, TimeSeparateDigits, TwoDigits, WatchJson } from "./json.gts2minit.model";

interface IDigitConstructor {
  count: number;
  numberLenght: number;
  title: string;
  decimalDelimiter?: boolean;
  timeDelimiter?: boolean;
  displayAnalog?: boolean;
  imageProgressTotal?: number;
}

export const digitTypes = {
  hour: {
    count: 10,
    numberLenght: 2,
    title: 'Hours',
    timeDelimiter: true,
    displayAnalog: false,
    imageProgressTotal: 12,
  },
  min: {
    count: 10,
    numberLenght: 2,
    title: 'Minutes',
    imageProgressTotal: 60,
    displayAnalog: false,
    timeDelimiter: true,
  },
  sec: {
    count: 10,
    numberLenght: 2,
    title: 'Seconds',
    timeDelimiter: true,
    displayAnalog: false,
    imageProgressTotal: 60,
  },
  year: {
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Year',
  },
  month: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 12,
    title: 'Month',
  },
  monthasword: {
    count: 12,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: 12,
    title: 'Month as word',
  },
  day: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 30,
    title: 'Day',
  },
  weekday: {
    count: 7,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: 7,
    title: 'Weekday',
  },
  battery: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Battery',
  },
  steps: {
    count: 10,
    numberLenght: 5,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Steps',
  },
  calories: {
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Calories',
  },
  heartRate: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: 6,
    title: 'Heart rate'
  },
  pai: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'PAI',
  },
  distance: {
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    decimalDelimiter: true,
    title: 'Distance',
  },
  standUp: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Standup',
  },
  uvIndex: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'UVIndex',
  },
  airQuality: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Air quality',
  },
  humidity: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Humidity',
  },
  sunrise: {
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    timeDelimiter: true,
    title: 'Sunrise',
  },

  weather: {
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 26,
    title: 'Weather',
  },
};

export class Coords {
  x: number = 0;
  y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }
}

export class WatchNumber {
  enabled: boolean = false
  json: NumberJson = new NumberJson()

  delimiter: number
  dataType: number
  prefix: number

  dataTypeCoords: Coordinates = new Coordinates()

  paddingZero: boolean
  follow: boolean

  con: IDigitConstructor

  constructor(j?: NumberJson, con?: IDigitConstructor) {
    if (j) {
      this.json = j
      this.enabled = true
    }
    
    if ( con ) {
      if (!this.json) this.json = new NumberJson()
      this.json.ImagesCount = con.count
      this.con = con
    }
  }
}


export class WatchShortcutElement {
  enabled: boolean = false
  json: ShortcutElement = new ShortcutElement()

  constructor(j?: ShortcutElement) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchTextTemperature {
  enabled: boolean = false
  
  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.weather)
  minus: number
  suffix: number
  nodata: number
  shortcut: WatchShortcutElement = new WatchShortcutElement()

  constructor(j?: TextTemperature) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.ImageNumber, digitTypes.weather)
      this.minus = j.MinusImageIndex
      this.suffix = j.SuffixImageIndexC
      this.nodata = j.NoDataImageIndex
      this.shortcut = new WatchShortcutElement(j.Shortcut)
    }
  }
}


export class WatchImageSet {
  enabled: boolean = false

  json: ImageSet = new ImageSet()

  constructor(count: number, j?: ImageSet) {
    if (j) {
      this.enabled = true
      this.json = j
    } else {
      if (count) {
        this.json.ImagesCount = count
      } else {
        this.json.ImagesCount = 1
      }
    }
  }
}



export class WatchImage {
  enabled: boolean = false
  json: Image = new Image()
  constructor(j?: Image) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchIconSet {
  enabled: boolean = false
  json: IconSet = new IconSet()
  constructor(j?: IconSet) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchCircleScale {
  enabled: boolean = false
  json: CircleScale = new CircleScale()
  constructor(j?: CircleScale) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchScale {
  enabled: boolean = false
  json: PointerScale = new PointerScale()
  constructor(j?: PointerScale) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchProgress {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  iconSetProgress: WatchIconSet = new WatchIconSet()
  circleScale: WatchCircleScale = new WatchCircleScale()
  scale: WatchScale = new WatchScale()
  noDataImage: WatchImage = new WatchImage()

  constructor(count: number, j?: Progress) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)
      this.iconSetProgress = new WatchIconSet(j.IconSetProgress)
      this.circleScale = new WatchCircleScale(j.CircleScale)
      this.scale = new WatchScale(j.Scale?.PointerScale)
      this.noDataImage = new WatchImage(j.NoDataImage)
    }
  }
}

export class WatchWeatherExt {
  collapsed: boolean = true
  collapsedAirQuality: boolean = true
  collapsedHumidity: boolean = true
  collapsedUvIndex: boolean = true

  airQualityNumber: WatchNumber = new WatchNumber(null, digitTypes.airQuality)
  airQualityIcon: WatchImage = new WatchImage()

  humidityNumber: WatchNumber= new WatchNumber(null, digitTypes.humidity)
  humiditySuffix: number
  humidityIcon: WatchImage = new WatchImage()
  humidityProgress: WatchProgress = new WatchProgress(digitTypes.humidity.imageProgressTotal)
  
  uvNumber: WatchNumber= new WatchNumber(null, digitTypes.uvIndex)
  uvSuffixImageIndex: number
  uvShortcut: WatchShortcutElement = new WatchShortcutElement()
  uvIcon: WatchImage = new WatchImage()
  uvProgress: WatchProgress = new WatchProgress(digitTypes.uvIndex.imageProgressTotal)

  constructor(j?: WatchJson) {
    if (j) {
      if (j.Weather?.AirQuality) {
        this.airQualityNumber = new WatchNumber(j.Weather.AirQuality.AirQualityNumber, digitTypes.airQuality)
        this.airQualityIcon = new WatchImage(j.Weather.AirQuality.AirQualityIcon)
      }
      if (j.Weather?.Humidity) {
        this.humidityNumber = new WatchNumber(j.Weather.Humidity.HumidityNumber, digitTypes.humidity)
        this.humiditySuffix = j.Weather.Humidity.SuffixImageIndex
        this.humidityIcon = new WatchImage(j.Weather.Humidity.HumidityIcon)
      }
      if (j.HumidityProgress) {
        this.humidityProgress = new WatchProgress(digitTypes.humidity.imageProgressTotal, j.HumidityProgress)
      }
      if (j.Weather?.UVindex) {
        this.uvNumber = new WatchNumber(j.Weather.UVindex.UVindexNumber, digitTypes.uvIndex)
        this.uvSuffixImageIndex = j.Weather.UVindex.SuffixImageIndex
        this.uvShortcut = new WatchShortcutElement(j.Weather.UVindex.Shortcut)
        this.uvIcon = new WatchImage(j.Weather.UVindex.UVindexIcon)
      }
      if (j.UviProgress) {
        this.uvProgress = new WatchProgress(digitTypes.uvIndex.imageProgressTotal, j.UviProgress)
      }
    }
  }
}

export class WatchWeather {
  collapsed: boolean = true

  icon: WatchImageSet = new WatchImageSet(digitTypes.weather.imageProgressTotal)
  current: WatchTextTemperature = new WatchTextTemperature()
  
  oneLineMinMax: WatchNumber = new WatchNumber(null, digitTypes.weather)
  oneLineMinus: number
  oneLineDelimiter: number
  oneLineDegrees: number

  lowest: WatchTextTemperature = new WatchTextTemperature()
  highest: WatchTextTemperature = new WatchTextTemperature()

  constructor(j?: WatchJson) {
    if (j) {
      this.icon = new WatchImageSet(digitTypes.weather.imageProgressTotal, j.Weather?.Icon?.Images)
      this.current = new WatchTextTemperature(j.Weather?.Temperature?.Current)
      this.lowest = new WatchTextTemperature(j.Weather?.Temperature?.Lowest)
      this.highest = new WatchTextTemperature(j.Weather?.Temperature?.Highest)

      if (j.Weather?.Temperature?.OneLine?.OneLineMinMax) {
        this.oneLineMinMax = new WatchNumber(j.Weather.Temperature.OneLine.OneLineMinMax.Number, digitTypes.weather)
        this.oneLineMinus = j.Weather.Temperature.OneLine.OneLineMinMax.MinusImageIndex
        this.oneLineDelimiter = j.Weather.Temperature.OneLine.OneLineMinMax.DelimiterImageIndex
        this.oneLineDegrees = j.Weather.Temperature.OneLine.OneLineMinMax.DegreesImageIndex
      }
    }
  }
}

export class WatchClockHand {
  enabled: boolean = false
  json: ClockHand = new ClockHand()
  constructor(j?: ClockHand) {
    if (j) {
      this.json = j
      this.enabled = true
    }
  }
}

export class WatchAoDAnalogDialFace {
  collapsed = true

  commonCenterCoordinates: Coordinates
  hours: WatchClockHand = new WatchClockHand()
  minutes: WatchClockHand = new WatchClockHand()

  constructor(j?: AoDAnalogDialFace) {
    if (j) {
      this.hours = new WatchClockHand(j.Hours)
      this.minutes = new WatchClockHand(j.Minutes)
      this.commonCenterCoordinates = j.CommonCenterCoordinates
    }
  }
}
export class WatchAoDTimeDigital {
  collapsed = true

  hours: WatchNumber = new WatchNumber(null, digitTypes.hour)
  minutes: WatchNumber = new WatchNumber(null, digitTypes.min)

  constructor(j?: AoDTimeDigital) {
    if (j) {
      this.hours = new WatchNumber(j.Hours, digitTypes.hour)
      this.minutes = new WatchNumber(j.Minutes, digitTypes.min)
      if (this.hours) {
        this.hours.paddingZero = j.PaddingZeroHours
      }
      if (this.minutes) {
        this.minutes.paddingZero = j.PaddingZeroMinutes
        this.minutes.follow = j.MinutesFollowHours
      }
    }
  }
}

export class WatchTwoDigitsSeparated {
  json: TwoDigits = new TwoDigits()
  enabled: boolean = false

  constructor(j?: TwoDigits) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchAoDTimeSeparateDigits {
  collapsed = true

  hours: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()
  minutes: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()
  separator: WatchImage = new WatchImage()
  paddingZero: boolean

  constructor(j?: AoDTimeSeparateDigits) {
    if (j) {
      this.hours = new WatchTwoDigitsSeparated(j.Hours)
      this.minutes = new WatchTwoDigitsSeparated(j.Minutes)
      this.separator = new WatchImage(j.Separator)
      this.paddingZero = j.PaddingZeroHours
    }
  }
}

export class WatchAmPmIcon {
  collapsed = true

  enabled: boolean = false
  json: AmPmIcon = new AmPmIcon()
  constructor(j?: AmPmIcon) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchAodTime {
  collapsed = true

  timeSeparateDigits: WatchAoDTimeSeparateDigits = new WatchAoDTimeSeparateDigits()
  timeAnalog: WatchAoDAnalogDialFace = new WatchAoDAnalogDialFace()
  amPm: WatchAmPmIcon = new WatchAmPmIcon()
  timeDigital: WatchAoDTimeDigital = new WatchAoDTimeDigital()

  constructor(j?: AoDTimeExtended) {
    if(j) {
      this.timeSeparateDigits = new WatchAoDTimeSeparateDigits(j.TimeSeparateDigits)
      this.timeAnalog = new WatchAoDAnalogDialFace(j.TimeAnalog)
      this.amPm = new WatchAmPmIcon(j.AmPm)
      this.timeDigital = new WatchAoDTimeDigital(j.TimeDigital)
    }
  }
}

export class WatchAodDateOneLine {
  enabled = false

  monthAndDay: WatchNumber = new WatchNumber(null, digitTypes.month)
  separatorImageIndex: number

  constructor(j?: AoDDateOneLine) {
    if(j) {
      this.enabled = true;
      this.monthAndDay = new WatchNumber(j.MonthAndDay, digitTypes.month)
      this.separatorImageIndex = j.SeparatorImageIndex
    }
  }
}

export class WatchAodDate {
  enabled = false;

  month: WatchNumber = new WatchNumber(null, digitTypes.month)
  day: WatchNumber = new WatchNumber(null, digitTypes.day)

  unknown: number
  separator: number
  unknown11: number

  constructor(j?: AoDDate) {
    if(j) {
      this.enabled = true;
      this.month = new WatchNumber(j.Month, digitTypes.month)
      this.day = new WatchNumber(j.Day, digitTypes.day)
      if ( this.month) this.month.paddingZero = j.PaddingZeroMonth
      if ( this.day) this.day.paddingZero = j.PaddingZeroDay
      this.unknown = j.UnknownImageIndex
      this.separator = j.SeparatorImageIndex
      this.unknown11 = j.Unknown11
    }
  }
}

export class WatchActivityElement {
  enabled: boolean
  json: ActivityElement = new ActivityElement()
  constructor(count: number, j?: ActivityElement) {
    if (j) {
      this.enabled = true
      this.json = j
    }
    if (count) {
      if (!this.json) {
        this.json = new ActivityElement()
        this.json.ImageNumber = new NumberJson()
        this.json.ImageNumber.ImagesCount = count
      }
    }
  }
}

export class WatchActivity {
  collapsed = true

  aElement: WatchActivityElement = new WatchActivityElement(0)
  aProgress: WatchProgress = new WatchProgress(null)
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, element?: ActivityElement, progress?: Progress) {
    if (element) {
      this.aElement = new WatchActivityElement(con.count, element)
    }
    if (progress) {
      this.aProgress = new WatchProgress(con.imageProgressTotal, progress)
    }
    if (!this.aElement) {
      this.aElement = new WatchActivityElement(con.count)
    }
    this.con = con
  }
}

export class WatchAOD {
  collapsed = true
  
  time: WatchAodTime = new WatchAodTime()
  dateOneLine: WatchAodDateOneLine = new WatchAodDateOneLine()
  weekday: WatchImageSet = new WatchImageSet(digitTypes.weekday.imageProgressTotal)
  steps: WatchActivity = new WatchActivity(digitTypes.steps)
  date: WatchAodDate = new WatchAodDate()

  constructor(j?: AlwaysOnDisplay) {
    if (j) {
      this.time = new WatchAodTime(j.TimeExtended)
      this.dateOneLine = new WatchAodDateOneLine(j.DateOneLine)
      this.weekday = new WatchImageSet(digitTypes.weekday.imageProgressTotal, j.Week?.Weekday)
      this.steps = new WatchActivity(digitTypes.steps, j.Steps)
      this.date = new WatchAodDate(j.Date)
    }
  }
}

export class WatchActivitySeparatedDigits {
  collapsed = true
  enabled: boolean = false

  json: ActivitySeparateDigits = new ActivitySeparateDigits()
  constructor(j?: ActivitySeparateDigits ) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchAnimation {
  collapsed: boolean = true
  imageSetAnimation: ImageSetAnimation[] = []

  constructor(j?: Animation) {
    if (j) {
      if (j.ImageSetAnimation) {
        this.imageSetAnimation = j.ImageSetAnimation
      }
    }  
  }
}



export class WatchBattery {
  collapsed: boolean = true

  text: WatchActivityElement = new WatchActivityElement(digitTypes.battery.count)
  imageProgress: WatchImageSet = new WatchImageSet(digitTypes.battery.imageProgressTotal)
  iconSetProgress: WatchIconSet = new WatchIconSet()
  scale: WatchScale = new WatchScale()
  icon: WatchImage = new WatchImage()

  constructor(j?: Battery) {
    if (j) {
      if(j.BatteryText) { this.text = new WatchActivityElement(digitTypes.battery.count, j.BatteryText) }
      if(j.ImageProgress) { this.imageProgress = new WatchImageSet(digitTypes.battery.imageProgressTotal, j.ImageProgress) ;}
      if(j.IconSetProgress) { this.iconSetProgress = new WatchIconSet(j.IconSetProgress) ;}
      if(j.Scale) { this.scale = new WatchScale(j.Scale.PointerScale) ;}
      if(j.Icon) { this.icon = new WatchImage(j.Icon) ;}
    }
  }
}

export class WatchSwitch {
  enabled: boolean = false
  json: Switch = new Switch()
  constructor(j?: Switch) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchStatus {
  collapsed = true;

  doNotDisturb: WatchSwitch = new WatchSwitch()
  lock: WatchSwitch = new WatchSwitch()
  bluetooth: WatchSwitch = new WatchSwitch()
  alarm: WatchSwitch = new WatchSwitch()

  constructor(j?: Status) {
    if (j) {
      this.doNotDisturb = new WatchSwitch(j.DoNotDisturb)
      this.lock = new WatchSwitch(j.Lock)
      this.bluetooth = new WatchSwitch(j.Bluetooth)
      this.alarm = new WatchSwitch(j.Alarm)
    }
  }
}


export class WatchActivityList {
  collapsed = true

  steps: WatchActivity = new WatchActivity(digitTypes.steps)
  calories: WatchActivity = new WatchActivity(digitTypes.calories)
  heartRate: WatchActivity = new WatchActivity(digitTypes.heartRate)
  distance: WatchActivity = new WatchActivity(digitTypes.distance)
  pai: WatchActivity = new WatchActivity(digitTypes.pai)
  standUp: WatchActivity = new WatchActivity(digitTypes.standUp)

    constructor(j?: WatchJson) {
    if (j) {
      if (j.Activity) {
        this.steps = new WatchActivity(digitTypes.steps, j.Activity.Steps, j.StepProgress)
        this.calories = new WatchActivity(digitTypes.calories, j.Activity.Calories, j.CaloriesProgress)
        this.heartRate = new WatchActivity(digitTypes.heartRate, j.Activity.HeartRate, j.HearthProgress)
        this.distance = new WatchActivity(digitTypes.distance, j.Activity.Distance, null)
        this.pai = new WatchActivity(digitTypes.pai, j.Activity.PAI, j.PaiProgress)
        this.standUp = new WatchActivity(digitTypes.standUp, j.Activity.StandUp, j.StandUpProgress)
      }
    }
  }
}

export class WatchDate {
  collapsed = true
  
  ampm: WatchAmPmIcon = new WatchAmPmIcon()
  weekday: WatchImageSet = new WatchImageSet(digitTypes.weekday.imageProgressTotal)
  weekdayProgress: WatchProgress = new WatchProgress(digitTypes.weekday.imageProgressTotal)

  year: WatchNumber = new WatchNumber(null, digitTypes.year)
  month: WatchNumber = new WatchNumber(null, digitTypes.month)
  monthAsWord: WatchImageSet = new WatchImageSet(digitTypes.monthasword.imageProgressTotal)
  day: WatchNumber = new WatchNumber(null, digitTypes.day)

  oneLineYear: boolean
  oneLineMonth: boolean
  oneLineDelimiter: number

  constructor(j?: DateBlock) {
    if (j) {
      this.ampm = new WatchAmPmIcon(j.AmPm)
      this.weekday = new WatchImageSet(digitTypes.weekday.imageProgressTotal, j.Weekday)
      this.weekdayProgress = new WatchProgress(digitTypes.weekday.imageProgressTotal, j.WeekdayProgress)

      if ( j.Date) {
        if (j.Date.MonthAndDayAlt) {
          this.month = new WatchNumber(j.Date.MonthAndDayAlt.Month, digitTypes.month)
          this.monthAsWord = new WatchImageSet(digitTypes.monthasword.imageProgressTotal, j.Date.MonthAndDayAlt.MonthName)
          this.day =  new WatchNumber(j.Date.MonthAndDayAlt.Day, digitTypes.day)
          if (this.month) this.month.paddingZero = j.Date.PaddingZeroMonth
          if (this.day) this.day.paddingZero = j.Date.PaddingZeroDay
        } 
        if (j.Date.MonthAndDay) {
          this.year = new WatchNumber(j.Date.MonthAndDay.Year, digitTypes.year)
          this.month = new WatchNumber(j.Date.MonthAndDay.Month, digitTypes.month)
          this.monthAsWord = new WatchImageSet(digitTypes.monthasword.imageProgressTotal, j.Date.MonthAndDay.MonthAsWord)
          this.day =  new WatchNumber(j.Date.MonthAndDay.Day, digitTypes.day)

          if (this.month) {
            this.month.delimiter = j.Date.MonthAndDay.MonthDataTypeImageIndex
            this.month.follow = j.Date.MonthAndDay.MonthFollowsYear ? true : false
            this.month.dataType = j.Date.MonthAndDay.DelimiterMonthImageIndex
            this.month.dataTypeCoords = j.Date.MonthAndDay.DelimiterMonthCoordinates
            this.month.paddingZero = j.Date.PaddingZeroMonth
          }
          if (this.day) {
            this.day.follow = j.Date.MonthAndDay.DayFollowsMonth ? true: false
            this.day.delimiter = j.Date.MonthAndDay.DayDataTypeImageIndex
            this.day.dataType = j.Date.MonthAndDay.DelimiterDayImageIndex
            this.day.dataTypeCoords = j.Date.MonthAndDay.DelimiterDayCoordinates
            this.day.paddingZero = j.Date.PaddingZeroDay
          }
          if ( this.year) {
            this.year.delimiter = j.Date.MonthAndDay.YearDataTypeImageIndex
            this.year.dataType = j.Date.MonthAndDay.DelimiterYearImageIndex
            this.year.dataTypeCoords = j.Date.MonthAndDay.DelimiterYearCoordinates
            this.year.paddingZero = true
          }
        }
        if (j.Date.OneLineMonthAndDay) {
          this.oneLineMonth = true
          this.month = new WatchNumber(j.Date.OneLineMonthAndDay.Number, digitTypes.month) 
          if (this.month) this.month.paddingZero = j.Date.PaddingZeroMonth
          this.oneLineDelimiter = j.Date.OneLineMonthAndDay.DelimiterImageIndex
        }
        if (j.Date.OneLineYearMonthAndDay) {
          this.oneLineYear = true
          this.year = new WatchNumber(j.Date.OneLineYearMonthAndDay.Number, digitTypes.year) 
          if (this.year) this.year.paddingZero = true
          this.oneLineDelimiter = j.Date.OneLineYearMonthAndDay.DelimiterImageIndex
        }
      }
    }
  }
}



export class WatchTimeAnalog {
  collapsed = true

  hours: WatchClockHand = new WatchClockHand()
  minutes: WatchClockHand = new WatchClockHand()
  seconds: WatchClockHand = new WatchClockHand()
  commonCenterCoordinates: Coordinates
  constructor(j?: AnalogDialFace) {
    if (j) {
      this.hours = new WatchClockHand(j.Hours)
      this.minutes = new WatchClockHand(j.Minutes)
      this.seconds = new WatchClockHand(j.Seconds)
      this.commonCenterCoordinates = j.CommonCenterCoordinates
    }
  }
}

export class WatchTimeDigitalSeparated {
  collapsed = true

  hours: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()
  minutes: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()
  seconds: WatchTwoDigitsSeparated = new WatchTwoDigitsSeparated()

  separatorHours: WatchImage = new WatchImage()
  separatorMinutes: WatchImage = new WatchImage()
  paddingZeroHours: boolean = false
  paddingZeroMinutes: boolean = false

  constructor(j?: TimeSeparateDigits) {
    if (j) {
      this.hours = new WatchTwoDigitsSeparated(j.Hours)
      this.minutes = new WatchTwoDigitsSeparated(j.Minutes)
      this.seconds = new WatchTwoDigitsSeparated(j.Seconds)

      this.separatorHours = new WatchImage(j.SeparatorHours)
      this.separatorMinutes = new WatchImage(j.SeparatorMinutes)
      this.paddingZeroHours = j.PaddingZeroHours ? true : false
      this.paddingZeroMinutes = j.PaddingZeroMinutes ? true : false
    }
  }
}

export class WatchTimeDigitalCommon {
  collapsed = true

  hours: WatchNumber = new WatchNumber(null, digitTypes.hour)
  minutes: WatchNumber = new WatchNumber(null, digitTypes.min)
  seconds: WatchNumber = new WatchNumber(null, digitTypes.sec)

  time_unknown1: number = 0

  constructor(j?: TimeDigital) {
    if (j) {
      this.hours = new WatchNumber(j.Hours, digitTypes.hour)
      if (this.hours) {
        this.hours.delimiter = j.DelimiterHoursImageIndex ? j.DelimiterHoursImageIndex : null  
        this.hours.paddingZero = j.PaddingZeroHours ? j.PaddingZeroHours : false    
        this.hours.dataType = j.HoursDataTypeImageIndex ? j.HoursDataTypeImageIndex : null  
        this.hours.follow = false
      }
      if (j.Time) {
        this.time_unknown1 = j.Time.Unknown1
        if (this.hours) this.hours.dataTypeCoords = j.Time?.HoursDataTypeCoordinates 
        this.minutes = new WatchNumber(j.Time?.Minutes, digitTypes.min)
        if (this.minutes) {
          this.minutes.delimiter = j.DelimiterMinutesImageIndex ? j.DelimiterMinutesImageIndex : null  
          this.minutes.paddingZero = j.Time?.PaddingZeroMinutes ? true : false
          this.minutes.dataType = j.Time?.MinutesDataTypeImageIndex ? j.Time.MinutesDataTypeImageIndex : null
          this.minutes.follow = j.Time?.MinutesFollowHours ? true : false
          this.minutes.dataTypeCoords = j.Time?.MinutesDataTypeCoordinates 
        }
        this.seconds = new WatchNumber(j.Time?.Seconds, digitTypes.sec)
        if (this.seconds) {
          this.seconds.delimiter = j.DelimiterSecondsImageIndex ? j.DelimiterSecondsImageIndex : null  
          this.seconds.dataType = j.Time?.SecondsDataTypeImageIndex ? j.Time.SecondsDataTypeImageIndex : null
          this.seconds.paddingZero = j.Time?.PaddingZeroSeconds ? true : false
          this.seconds.follow = j.Time?.SecondsFollowMinutes ? true : false
          this.seconds.dataTypeCoords = j.Time?.SecondsDataTypeCoordinates 
        }
      }
    }
  }
}


export class WatchSunset {
  collapsed = true

  sunsetOneLine: WatchNumber = new WatchNumber(null, digitTypes.sunrise)
  sunriseOneLine: WatchNumber = new WatchNumber(null, digitTypes.sunrise)

  sunsetIcon: WatchImage = new WatchImage()
  sunsetShortcut: WatchShortcutElement = new WatchShortcutElement()
  
  sunriseIcon: WatchImage = new WatchImage()
  sunriseShortcut: WatchShortcutElement = new WatchShortcutElement()

  constructor(j?: TimeExtended) {
    if (j) {
      this.sunsetOneLine = new WatchNumber(j.SunsetTimeOneLine)
      this.sunriseOneLine = new WatchNumber(j.SunriseTimeOneLine)
      if (this.sunsetOneLine) {
        this.sunsetOneLine.delimiter = j.DelimiterSunsetImageIndex
        this.sunsetOneLine.prefix = j.SunsetImageIndex
      }
      if ( this.sunriseOneLine) {
        this.sunriseOneLine.delimiter = j.DelimiterSunriseImageIndex
        this.sunriseOneLine.prefix = j.SunriseImageIndex
      }
      this.sunsetIcon = new WatchImage(j.SunsetIcon)
      this.sunriseIcon = new WatchImage(j.SunriseIcon)
      this.sunsetShortcut = new WatchShortcutElement(j.SunsetShortcut)
      this.sunriseShortcut = new WatchShortcutElement(j.SunriseShortcut)
    }
  }
}


export class WatchAlarmTime {
  collapsed = true

  hours: WatchNumber = new WatchNumber(null, digitTypes.hour)
  minutes: WatchNumber = new WatchNumber(null, digitTypes.min)


  constructor(j?: AlarmTime) {
    if(j) {
      this.hours = new WatchNumber(j.Hours)
      this.minutes = new WatchNumber(j.Minutes)
      if (this.hours) {
        this.hours.dataType = j.DataTypeHoursImageIndex
        this.hours.delimiter = j.DelimiterHoursImageIndex
        this.hours.paddingZero = j.PaddingZeroHours ? true : false
        this.hours.dataTypeCoords = j.DataTypeHoursCoordinates
      }
      if (this.minutes) {
        this.minutes.delimiter = j.DelimiterMinutesImageIndex
        this.minutes.paddingZero = j.PaddingZeroMinutes ? true : false
        this.minutes.follow = j.MinutesFollowHours ? true : false
      }
    }
  }
}

export class WatchAlarm {
  collapsed: boolean = true
  
  noAlarm: WatchImage = new WatchImage()
  alarmImage: WatchImage = new WatchImage()
  shortcut: WatchShortcutElement = new WatchShortcutElement()
  alarmTime: WatchAlarmTime = new WatchAlarmTime()

  constructor(j?: Alarm) {
    if (j) {
      
      this.noAlarm = new WatchImage(j.NoAlarmImage)
      this.alarmImage = new WatchImage(j.AlarmImage)
      this.shortcut = new WatchShortcutElement(j.ShortcutArea)
      this.alarmTime = new WatchAlarmTime(j.AlarmTime)
    }
  }
}

export class WatchTime {
  collapsed = true

  sunset: WatchSunset = new WatchSunset()
  timeAnalog: WatchTimeAnalog = new WatchTimeAnalog()
  timeDigitalCommon: WatchTimeDigitalCommon = new WatchTimeDigitalCommon()
  timeDigitalSeparated: WatchTimeDigitalSeparated = new WatchTimeDigitalSeparated()

  alarm: WatchAlarm = new WatchAlarm()

  constructor(j?: WatchJson) {
    if (j) {
      this.alarm = new WatchAlarm(j.Alarm)
      this.sunset = new WatchSunset(j.TimeExtended)
      this.timeAnalog = new WatchTimeAnalog(j.TimeAnalog)
      this.timeDigitalCommon = new WatchTimeDigitalCommon(j.TimeDigital)
      this.timeDigitalSeparated = new WatchTimeDigitalSeparated(j.TimeExtended?.TimeSeparateDigits)
    }
  }
}

export class WatchBackground {
  collapsed = true
  
  image: WatchImage = new WatchImage()
  preview: WatchImage = new WatchImage()
  previewc: WatchImage = new WatchImage()
  previewk: WatchImage = new WatchImage()
  floatingLayer: WatchImage = new WatchImage()
  color: string = Color.DEFAULT_COLOR

  constructor(j?: Background) {
    if (j) {
      this.image = new WatchImage(j.Image)
      this.preview = new WatchImage(j.Preview)
      this.previewc = new WatchImage(j.PreviewChinese)
      this.previewk = new WatchImage(j.PreviewKorean)
      this.floatingLayer = new WatchImage(j.FloatingLayer)
      this.color = Color.colorRead(j.BackgroundColor)
    }
  }
}

export class WatchShortcuts {
  collapsed = true
  
  json: Shortcut[] = []
  constructor(j?: Shortcuts) {
    if (j) {
      this.json = j.Shortcut
    }
  }
}

export class WatchFace {
  background: WatchBackground = new WatchBackground();
  time: WatchTime = new WatchTime()
  date: WatchDate = new WatchDate();
  activity: WatchActivityList = new WatchActivityList();
  status = new WatchStatus();
  battery = new WatchBattery()
  aod = new WatchAOD()
  
  animation: WatchAnimation = new WatchAnimation()
  weather: WatchWeather = new WatchWeather()
  weatherext: WatchWeatherExt = new WatchWeatherExt()
  shortcuts: WatchShortcuts = new WatchShortcuts()

  activitySeparatedDigits = new WatchActivitySeparatedDigits()

  constructor(j?: WatchJson) {
    if (!j) return;

    this.background = new WatchBackground(j.Background);
    this.time = new WatchTime(j)
    
    this.date = new WatchDate(j.DateBlock)
    this.activity = new WatchActivityList(j)
    this.status = new WatchStatus(j.Status)
    this.battery = new WatchBattery(j.Battery)
    this.aod = new WatchAOD(j.AlwaysOnDisplay)
    this.animation = new WatchAnimation(j.Animation)
    this.weather = new WatchWeather(j)
    this.weatherext = new WatchWeatherExt(j)
    this.shortcuts = new WatchShortcuts(j.Shortcuts)
    this.activitySeparatedDigits = new WatchActivitySeparatedDigits(j.ActivitySeparateDigits)
  }
}
