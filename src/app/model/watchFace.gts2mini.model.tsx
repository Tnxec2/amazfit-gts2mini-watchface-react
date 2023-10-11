import Color from "../shared/color";
import newid from "../shared/newid";
import {  Alarm, AlarmTime, AlwaysOnDisplay, AmPmIcon, AnalogDialFace, Animation, AoDAnalogDialFace, AoDDate, AoDDateOneLine, AODSteps, AoDTimeDigital, AoDTimeExtended, AoDTimeSeparateDigits, Background, Battery, Calories, CircleScale, ClockHand, Coordinates, DateBlock, Distance, FiveDigits, FourDigits, HeartRate, IconSet, Image, ImageSet, ImageSetAnimation, NumberJson, PAI, PointerScale, ProgressWeekdays, ProgressCalories, ProgressHeart, ProgressSteps, ProgressPai, ProgressAirQ, ProgressHumidity, ProgressStandup, Scale, Shortcut, ShortcutElement, Shortcuts, StandUp, Status, Steps, Switch, BatteryTextElement, TextTemperature, ThreeDigits, TimeDigital, TimeExtended, TimeSeparateDigits, TwoDigits, WatchJson, ProgressStress, ProgressSpo, ProgressUvi, WeekDayImages, HourlyImages, TimeSpans } from "./json.gts2minit.model";

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
  stress: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'Stress',
  },
  spo2: {
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    title: 'SpO2',
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

  prefix: number
  delimiter: number
  
  dataType: number  
  dataTypeCoords: Coordinates = new Coordinates()

  paddingZero: boolean
  follow: boolean

  con: IDigitConstructor

  constructor(j: NumberJson, con: IDigitConstructor) {
    if (j) {
      this.json = j
      this.enabled = true
    }
    
    if ( con ) {
      if (!j) {
        this.json = new NumberJson()
        this.json.ImagesCount = con.count
      }
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
  enabled = false
  watchNumber: WatchNumber = new WatchNumber(null, digitTypes.weather)
  minus: number
  suffixC: number
  nodata: number
  shortcut: WatchShortcutElement = new WatchShortcutElement()

  constructor(j?: TextTemperature) {
    if (j) {
      this.enabled = true
      this.watchNumber = new WatchNumber(j.ImageNumber, digitTypes.weather)
      this.minus = j.MinusImageIndex
      this.suffixC = j.SuffixImageIndexC
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

export class WatchPointerScale {
  enabled: boolean = false
  json: PointerScale = new PointerScale()

  constructor(j?: PointerScale) {
    if (j) {
      this.enabled = true
      this.json = j
    }
  }
}

export class WatchScale {
  enabled: boolean = false
  pointerscale: WatchPointerScale = new WatchPointerScale()
  bottomImage: WatchImage = new WatchImage()
  constructor(j?: Scale) {
    if (j) {
      this.enabled = true
      this.pointerscale = new WatchPointerScale(j.PointerScale)
      this.bottomImage = new WatchImage(j.BottomImage)
    }
  }
}

export class WatchProgressWeekdays {
  collapsed = true
  iconSetProgress: WatchIconSet = new WatchIconSet()


  constructor(count: number, j?: ProgressWeekdays) {
    if(j) {

      this.iconSetProgress = new WatchIconSet(j.IconSetProgress)

    }
  }
}

export class WatchProgressSteps {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  iconSetProgress: WatchIconSet = new WatchIconSet()
  circleScale: WatchCircleScale = new WatchCircleScale()
  scale: WatchScale = new WatchScale()
  backgroundLayer: WatchImage = new WatchImage()

  constructor(count: number, j?: ProgressSteps) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)
      this.iconSetProgress = new WatchIconSet(j.IconSetProgress)
      this.circleScale = new WatchCircleScale(j.CircleScale)
      this.scale = new WatchScale(j.Scale)
      this.backgroundLayer = new WatchImage(j.BackgroundLayer)
    }
  }
}

export class WatchProgressCalories {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  iconSetProgress: WatchIconSet = new WatchIconSet()
  circleScale: WatchCircleScale = new WatchCircleScale()

  backgroundLayer: WatchImage = new WatchImage()

  constructor(count: number, j?: ProgressCalories) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)
      this.iconSetProgress = new WatchIconSet(j.IconSetProgress)
      this.circleScale = new WatchCircleScale(j.CircleScale)

      this.backgroundLayer = new WatchImage(j.BackgroundLayer)
    }
  }
}

export class WatchProgressHeart {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  iconSetProgress: WatchIconSet = new WatchIconSet()
  scale: WatchScale = new WatchScale()
  backgroundLayer: WatchImage = new WatchImage()

  constructor(count: number, j?: ProgressHeart) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)
      this.iconSetProgress = new WatchIconSet(j.IconSetProgress)
      this.scale = new WatchScale(j.Scale)
      this.backgroundLayer = new WatchImage(j.BackgroundLayer)
    }
  }
}

export class WatchProgressPai {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  pointerScale: WatchPointerScale = new WatchPointerScale()
  altPointerScale: WatchPointerScale = new WatchPointerScale()
  backgroundLayer: WatchImage = new WatchImage()

  constructor(count: number, j?: ProgressPai) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)
      this.pointerScale = new WatchPointerScale(j.PointerScale)
      this.altPointerScale = new WatchPointerScale(j.Alt1PointerScale?.PointerScale)
      this.backgroundLayer = new WatchImage(j.BackgroundLayer)
    }
  }
}

export class WatchProgressUvi {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  scale: WatchScale = new WatchScale(null)
  backgroundLayer: WatchImage = new WatchImage()

  constructor(count: number, j?: ProgressUvi) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)
      this.scale = new WatchScale(j.Scale)
      this.backgroundLayer = new WatchImage(j.BackgroundLayer)
    }
  }
}

export class WatchProgressAirQ {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  scale: WatchScale = new WatchScale(null)
  backgroundLayer: WatchImage = new WatchImage()

  constructor(count: number, j?: ProgressAirQ) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)
      this.scale = new WatchScale(j.Scale)
      this.backgroundLayer = new WatchImage(j.BackgroundLayer)
    }
  }
}

export class WatchProgressHumidity {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  backgroundLayerImage: WatchImage = new WatchImage()

  constructor(count: number, j?: ProgressHumidity) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)

      this.backgroundLayerImage = new WatchImage(j.BackgroundLayer)
    }
  }
}

export class WatchProgressStress {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  backgroundLayerImage: WatchImage = new WatchImage()

  constructor(count: number, j?: ProgressStress) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)

      this.backgroundLayerImage = new WatchImage(j.BackgroundLayer)
    }
  }
}

export class WatchProgressSpo {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  backgroundLayerImage: WatchImage = new WatchImage()

  constructor(count: number, j?: ProgressSpo) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)

      this.backgroundLayerImage = new WatchImage(j.BackgroundLayer)
    }
  }
}

export class WatchProgressStandup {
  imageProgress: WatchImageSet = new WatchImageSet(null)
  iconsetProgress: WatchIconSet = new WatchIconSet()
  scale: WatchScale = new WatchScale()

  constructor(count: number, j?: ProgressStandup) {
    if(j) {
      this.imageProgress = new WatchImageSet(count, j.ImageProgress)
      this.iconsetProgress = new WatchIconSet(j.IconSetProgress)
      this.scale = new WatchScale(j.PointerProgress)
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
  airQualityProgress: WatchProgressAirQ = new WatchProgressAirQ(digitTypes.airQuality.imageProgressTotal);

  humidityNumber: WatchNumber= new WatchNumber(null, digitTypes.humidity)
  humiditySuffix: number
  humidityIcon: WatchImage = new WatchImage()
  humidityProgress: WatchProgressHumidity = new WatchProgressHumidity(digitTypes.humidity.imageProgressTotal)
  
  uvNumber: WatchNumber= new WatchNumber(null, digitTypes.uvIndex)
  uvSuffixImageIndex: number
  uvNoDataImageIndex: number
  uvShortcut: WatchShortcutElement = new WatchShortcutElement()
  uvIcon: WatchImage = new WatchImage()
  uvProgress: WatchProgressUvi = new WatchProgressUvi(digitTypes.uvIndex.imageProgressTotal)

  

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
        this.humidityProgress = new WatchProgressHumidity(digitTypes.humidity.imageProgressTotal, j.HumidityProgress)
      }
      if (j.Weather?.UVindex) {
        this.uvNumber = new WatchNumber(j.Weather.UVindex.UVindexNumber, digitTypes.uvIndex)
        this.uvSuffixImageIndex = j.Weather.UVindex.SuffixImageIndex
        this.uvNoDataImageIndex = j.Weather.UVindex.NoDataImageIndex
        this.uvShortcut = new WatchShortcutElement(j.Weather.UVindex.Shortcut)
        this.uvIcon = new WatchImage(j.Weather.UVindex.UVindexIcon)
      }
      if (j.UviProgress) {
        this.uvProgress = new WatchProgressUvi(digitTypes.uvIndex.imageProgressTotal, j.UviProgress)
      }
      if (j.AirQualityProgress) {
        this.airQualityProgress = new WatchProgressAirQ(digitTypes.airQuality.imageProgressTotal, j.AirQualityProgress)
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
        this.hours.delimiter = j.DelimiterHoursImageIndex
        this.hours.dataType = j.HoursDataTypeImageIndex
        this.hours.dataTypeCoords = j.HoursDataTypeCoordinates
      }
      if (this.minutes) {
        this.minutes.paddingZero = j.PaddingZeroMinutes
        this.minutes.follow = j.MinutesFollowHours
        this.minutes.delimiter = j.DelimiterMinutesImageIndex
        this.minutes.dataType = j.MinutesDataTypeImageIndex
        this.minutes.dataTypeCoords = j.MinutesDataTypeCoordinates
      }
    }
  }
}

export class WatchFiveDigitsSeparated {
  json: FiveDigits = new FiveDigits()
  enabled: boolean = false

  constructor(u1: number, j?: FiveDigits) {
    if (j) {
      this.enabled = true
      this.json = j
    }else if (u1) {
      this.json.Unknown1 = u1
    }
  }
}
export class WatchFourDigitsSeparated {
  json: FourDigits = new FourDigits()
  enabled: boolean = false

  constructor(u1: number, j?: FourDigits) {
    if (j) {
      this.enabled = true
      this.json = j
    }else if (u1) {
      this.json.Unknown1 = u1
    }
  }
}
export class WatchThreeDigitsSeparated {
  json: ThreeDigits = new ThreeDigits()
  enabled: boolean = false

  constructor(u1: number, j?: ThreeDigits) {
    if (j) {
      this.enabled = true
      this.json = j
    } else if (u1) {
      this.json.Unknown1 = u1
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

export class WatchWeekdayImages {
  collapsed = true

  enabled: boolean = false
  monday: WatchImage = new WatchImage()
  tuesday: WatchImage = new WatchImage()
  wednesday: WatchImage = new WatchImage()
  thursday: WatchImage = new WatchImage()
  friday: WatchImage = new WatchImage()
  saturday: WatchImage = new WatchImage()
  sunday: WatchImage = new WatchImage()

  constructor(j?: WeekDayImages) {
    if (j) {
      this.enabled = true
      this.monday = new WatchImage(j.Monday)
      this.tuesday = new WatchImage(j.Tuesday)
      this.wednesday = new WatchImage(j.Wednesday)
      this.thursday = new WatchImage(j.Thursday)
      this.friday = new WatchImage(j.Friday)
      this.saturday = new WatchImage(j.Saturday)
      this.sunday = new WatchImage(j.Sunday)
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
  collapsed = true

  monthAndDay: WatchNumber = new WatchNumber(null, digitTypes.month)
  separatorImageIndex: number

  constructor(j?: AoDDateOneLine) {
    if(j) {
      this.monthAndDay = new WatchNumber(j.MonthAndDay, digitTypes.month)
      this.separatorImageIndex = j.SeparatorImageIndex
    }
  }
}

export class WatchAodDate {
  collapsed = true

  month: WatchNumber = new WatchNumber(null, digitTypes.month)
  day: WatchNumber = new WatchNumber(null, digitTypes.day)

  constructor(j?: AoDDate) {
    if(j) {
      this.month = new WatchNumber(j.Month, digitTypes.month)
      this.day = new WatchNumber(j.Day, digitTypes.day)
      if ( this.month) {
        this.month.paddingZero = j.PaddingZeroMonth
        this.month.dataType = j.MonthDataTypeImageIndex
        this.month.delimiter = j.DelimiterMonthImageIndex
        this.month.dataTypeCoords = j.MonthDataTypeCoordinates
      }
      if ( this.day) {
        this.day.paddingZero = j.PaddingZeroDay
        this.day.dataType = j.DayDataTypeImageIndex
        this.day.delimiter = j.DelimiterDayImageIndex
        this.day.follow = j.DayFollowsMonth ? j.DayFollowsMonth : false
        this.day.dataTypeCoords = j.DayDataTypeCoordinates
      }      
    }
  }
}

// export class WatchActivityElement {
//   enabled: boolean

//   imageNumber: WatchNumber = new WatchNumber(null, null)
//   prefix: number
//   noData: number
//   icon: WatchImage = new WatchImage()
//   shortcut: WatchShortcutElement = new WatchShortcutElement()
//   suffix: number
//   decimalPoint: number
//   suffixKM: number
//   suffixMI: number
//   suffixImageCoordinates: Coordinates

//   constructor(con?: IDigitConstructor, j?: Steps | Calories | HeartRate | PAI | Distance) {
//     if (j) {
//       this.enabled = true
//       this.imageNumber = new WatchNumber(j.ImageNumber, con)
//       this.prefix = j.PrefixImageIndex ? j.PrefixImageIndex : null
//       this.noData = j.NoDataImageIndex
//       this.icon = new WatchImage(j.Icon)
//       this.shortcut = new WatchShortcutElement(j.Shortcut)
//       this.suffix = j.SuffixImageIndex
//       this.decimalPoint = j.DecimalPointImageIndex
//       this.suffixKM = j.SuffixKMImageIndex
//       this.suffixMI = j.SuffixMIImageIndex
//       this.suffixImageCoordinates = j.SuffixImageCoordinates
//     } else if (con) {
//       this.imageNumber = new WatchNumber(null, con)
//     }
//   }
// }

export class WatchDistanceElement {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.distance)
  icon: WatchImage = new WatchImage()
  shortcut: WatchShortcutElement = new WatchShortcutElement()
  decimalPoint: number
  suffixKM: number
  suffixMI: number
  suffixImageCoordinates: Coordinates
  separattedSuffix = false

  constructor(con?: IDigitConstructor, j?: Distance) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.ImageNumber, con)
      this.icon = new WatchImage(j.Icon)
      this.shortcut = new WatchShortcutElement(j.Shortcut)
      this.decimalPoint = j.DecimalPointImageIndex
      this.suffixKM = j.SuffixKMImageIndex
      this.suffixMI = j.SuffixMIImageIndex
      this.suffixImageCoordinates = j.SuffixImageCoordinates
      if (this.suffixImageCoordinates) this.separattedSuffix = true
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}


export class WatchStepsElement {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.steps)
  prefix: number
  icon: WatchImage = new WatchImage()
  shortcut: WatchShortcutElement = new WatchShortcutElement()
  suffix: number
  delimiterTotal: number


  constructor(con?: IDigitConstructor, j?: Steps) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.ImageNumber, con)
      this.prefix = j.PrefixImageIndex ? j.PrefixImageIndex : null
      this.icon = new WatchImage(j.Icon)
      this.shortcut = new WatchShortcutElement(j.Shortcut)
      this.suffix = j.SuffixImageIndex
      this.delimiterTotal = j.DelimiterTotalImageIndex
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}

export class WatchAodStepsElement {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.steps)
  prefix: number
  suffix: number


  constructor(con?: IDigitConstructor, j?: AODSteps) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.ImageNumber, con)
      this.prefix = j.PrefixImageIndex ? j.PrefixImageIndex : null
      this.suffix = j.SuffixImageIndex
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}

export class WatchHertRateElement {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.heartRate)
  prefix: number
  noData: number
  icon: WatchImage = new WatchImage()
  shortcut: WatchShortcutElement = new WatchShortcutElement()
  suffix: number


  constructor(con?: IDigitConstructor, j?: HeartRate) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.ImageNumber, con)
      this.prefix = j.PrefixImageIndex ? j.PrefixImageIndex : null
      this.noData = j.NoDataImageIndex
      this.icon = new WatchImage(j.Icon)
      this.shortcut = new WatchShortcutElement(j.Shortcut)
      this.suffix = j.SuffixImageIndex
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}

export class WatchPaiElement {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.pai)
  icon: WatchImage = new WatchImage()
  shortcut: WatchShortcutElement = new WatchShortcutElement()
  suffix: number


  constructor(con?: IDigitConstructor, j?: PAI) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.ImageNumber, con)
      this.icon = new WatchImage(j.Icon)
      this.shortcut = new WatchShortcutElement(j.Shortcut)
      this.suffix = j.SuffixImageIndex
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}

export class WatchSpO2Element {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.stress)
  prefix: number


  constructor(con?: IDigitConstructor, j?: ProgressSpo) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.Text, con)
      this.prefix = j.PrefixImageIndex
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}

export class WatchStressElement {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.stress)
  prefix: number


  constructor(con?: IDigitConstructor, j?: ProgressStress) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.Text, con)
      this.prefix = j.PrefixImageIndex
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}

export class WatchStandUpElement {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.standUp)
  icon: WatchImage = new WatchImage()
  shortcut: WatchShortcutElement = new WatchShortcutElement()
  suffix: number


  constructor(con?: IDigitConstructor, j?: StandUp) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.ImageNumber, con)
      this.icon = new WatchImage(j.Icon)
      this.shortcut = new WatchShortcutElement(j.Shortcut)
      this.suffix = j.SuffixImageIndex
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}

export class WatchCaloriesElement {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, digitTypes.calories)
  icon: WatchImage = new WatchImage()
  shortcut: WatchShortcutElement = new WatchShortcutElement()
  suffix: number


  constructor(con?: IDigitConstructor, j?: Calories) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.ImageNumber, con)
      this.icon = new WatchImage(j.Icon)
      this.shortcut = new WatchShortcutElement(j.Shortcut)
      this.suffix = j.SuffixImageIndex
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}

export class WatchStandUpActivity {
  collapsed = true

  aElement: WatchStandUpElement = new WatchStandUpElement()
  aProgress: WatchProgressStandup = new WatchProgressStandup(null)
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, element?: StandUp, progress?: ProgressStandup) {
    if (element) {
      this.aElement = new WatchStandUpElement(con, element)
    }
    if (progress) {
      this.aProgress = new WatchProgressStandup(con.imageProgressTotal, progress)
    }
    if (!this.aElement) {
      this.aElement = new WatchStandUpElement(con)
      this.aElement.imageNumber.json.ImagesCount = con.count
    } else {
      this.aElement.imageNumber.con = con
    }
    this.con = con
  }
}

export class WatchStressActivity {
  collapsed = true
  aNumber: WatchStressElement = new WatchStressElement(null)
  aProgress: WatchProgressStress = new WatchProgressStress(null)
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, progress?: ProgressStress) {
    if (progress) {
      this.aProgress = new WatchProgressStress(con.imageProgressTotal, progress)
      this.aNumber = new WatchStressElement(con, progress)
    }

    this.con = con
  }
}

export class WatchSpO2Activity {
  collapsed = true

  aNumber: WatchSpO2Element = new WatchSpO2Element(null)
  aProgress: WatchProgressSpo = new WatchProgressSpo(null)
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, progress?: ProgressSpo) {
    if (progress) {
      this.aProgress = new WatchProgressSpo(con.imageProgressTotal, progress)
      this.aNumber = new WatchStressElement(con, progress)
    }

    this.con = con
  }
}

export class WatchPAIActivity {
  collapsed = true

  aElement: WatchPaiElement = new WatchPaiElement()
  aProgress: WatchProgressPai = new WatchProgressPai(null)
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, element?: PAI, progress?: ProgressPai) {
    if (element) {
      this.aElement = new WatchPaiElement(con, element)
    }
    if (progress) {
      this.aProgress = new WatchProgressPai(con.imageProgressTotal, progress)
    }
    if (!this.aElement) {
      this.aElement = new WatchPaiElement(con)
      this.aElement.imageNumber.json.ImagesCount = con.count
    } else {
      this.aElement.imageNumber.con = con
    }
    this.con = con
  }
}

export class WatchDistanceActivity {
  collapsed = true

  aElement: WatchDistanceElement = new WatchDistanceElement()
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, element?: Distance) {
    if (element) {
      this.aElement = new WatchDistanceElement(con, element)
    }

    if (!this.aElement) {
      this.aElement = new WatchDistanceElement(con)
      this.aElement.imageNumber.json.ImagesCount = con.count
    } else {
      this.aElement.imageNumber.con = con
    }
    this.con = con
  }
}

export class WatchHeartRateActivity {
  collapsed = true

  aElement: WatchHertRateElement = new WatchHertRateElement()
  aProgress: WatchProgressHeart = new WatchProgressHeart(null)
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, element?: HeartRate, progress?: ProgressHeart) {
    if (element) {
      this.aElement = new WatchHertRateElement(con, element)
    }
    if (progress) {
      this.aProgress = new WatchProgressHeart(con.imageProgressTotal, progress)
    }
    if (!this.aElement) {
      this.aElement = new WatchHertRateElement(con)
      this.aElement.imageNumber.json.ImagesCount = con.count
    } else {
      this.aElement.imageNumber.con = con
    }
    this.con = con
  }
}

export class WatchCaloriesActivity {
  collapsed = true

  aElement: WatchCaloriesElement = new WatchCaloriesElement()
  aProgress: WatchProgressCalories = new WatchProgressCalories(null)
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, element?: Calories, progress?: ProgressCalories) {
    if (element) {
      this.aElement = new WatchCaloriesElement(con, element)
    }
    if (progress) {
      this.aProgress = new WatchProgressCalories(con.imageProgressTotal, progress)
    }
    if (!this.aElement) {
      this.aElement = new WatchCaloriesElement(con)
      this.aElement.imageNumber.json.ImagesCount = con.count
    } else {
      this.aElement.imageNumber.con = con
    }
    this.con = con
  }
}

export class WatchStepsActivity {
  collapsed = true

  aElement: WatchStepsElement = new WatchStepsElement()
  aProgress: WatchProgressSteps = new WatchProgressSteps(null)
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, element?: Steps, progress?: ProgressSteps) {
    if (element) {
      this.aElement = new WatchStepsElement(con, element)
    }
    if (progress) {
      this.aProgress = new WatchProgressSteps(con.imageProgressTotal, progress)
    }
    if (!this.aElement) {
      this.aElement = new WatchStepsElement(con)
      this.aElement.imageNumber.json.ImagesCount = con.count
    } else {
      this.aElement.imageNumber.con = con
    }
    this.con = con
  }
}

export class WatchAodStepsActivity {
  collapsed = true

  aElement: WatchAodStepsElement = new WatchAodStepsElement()
  con: IDigitConstructor
  
  constructor(con: IDigitConstructor, element?: AODSteps) {
    if (element) {
      this.aElement = new WatchAodStepsElement(con, element)
    }

    if (!this.aElement) {
      this.aElement = new WatchStepsElement(con)
      this.aElement.imageNumber.json.ImagesCount = con.count
    } else {
      this.aElement.imageNumber.con = con
    }
    this.con = con
  }
}

export class WatchAOD {
  collapsed = true
  
  time: WatchAodTime = new WatchAodTime()
  date: WatchAodDate = new WatchAodDate()
  dateOneLine: WatchAodDateOneLine = new WatchAodDateOneLine()
  weekday: WatchImageSet = new WatchImageSet(digitTypes.weekday.imageProgressTotal)
  steps: WatchAodStepsActivity = new WatchAodStepsActivity(digitTypes.steps)

  constructor(j?: AlwaysOnDisplay) {
    if (j) {
      this.time = new WatchAodTime(j.TimeExtended)
      this.dateOneLine = new WatchAodDateOneLine(j.DateOneLine)
      this.weekday = new WatchImageSet(digitTypes.weekday.imageProgressTotal, j.Week?.Weekday)
      this.steps = new WatchAodStepsActivity(digitTypes.steps, j.Steps)
      this.date = new WatchAodDate(j.Date)
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

export class WatchTextElement {
  enabled: boolean

  imageNumber: WatchNumber = new WatchNumber(null, null)
  prefix: number
  icon: WatchImage = new WatchImage()
  shortcut: WatchShortcutElement = new WatchShortcutElement()
  suffix: number


  constructor(con?: IDigitConstructor, j?: BatteryTextElement) {
    if (j) {
      this.enabled = true
      this.imageNumber = new WatchNumber(j.ImageNumber, con)
      this.prefix = j.PrefixImageIndex ? j.PrefixImageIndex : null
      this.icon = new WatchImage(j.Icon)
      this.shortcut = new WatchShortcutElement(j.Shortcut)
      this.suffix = j.SuffixImageIndex
    } else if (con) {
      this.imageNumber = new WatchNumber(null, con)
    }
  }
}

export class WatchBattery {
  collapsed: boolean = true

  text: WatchTextElement = new WatchTextElement(digitTypes.battery)
  imageProgress: WatchImageSet = new WatchImageSet(digitTypes.battery.imageProgressTotal)
  iconSetProgress: WatchIconSet = new WatchIconSet()
  scale: WatchScale = new WatchScale()
  icon: WatchImage = new WatchImage()

  constructor(j?: Battery) {
    if (j) {
      if(j.BatteryText) { this.text = new WatchTextElement(digitTypes.battery, j.BatteryText) }
      if(j.ImageProgress) { this.imageProgress = new WatchImageSet(digitTypes.battery.imageProgressTotal, j.ImageProgress) ;}
      if(j.IconSetProgress) { this.iconSetProgress = new WatchIconSet(j.IconSetProgress) ;}
      if(j.Scale) { this.scale = new WatchScale(j.Scale) ;}
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
  collapsedSeparated = true

  steps: WatchStepsActivity = new WatchStepsActivity(digitTypes.steps)
  calories: WatchCaloriesActivity = new WatchCaloriesActivity(digitTypes.calories)
  heartRate: WatchHeartRateActivity = new WatchHeartRateActivity(digitTypes.heartRate)
  distance: WatchDistanceActivity = new WatchDistanceActivity(digitTypes.distance)
  pai: WatchPAIActivity = new WatchPAIActivity(digitTypes.pai)
  standUp: WatchStandUpActivity = new WatchStandUpActivity(digitTypes.standUp)

  stress: WatchStressActivity = new WatchStressActivity(digitTypes.stress)
  spo2: WatchSpO2Activity = new WatchSpO2Activity(digitTypes.spo2)

  caloriesSeparatedDigits: WatchFourDigitsSeparated = new WatchFourDigitsSeparated(104)
  batterySeparatedDigits: WatchThreeDigitsSeparated = new WatchThreeDigitsSeparated(101)
  stepsSeparatedDigits: WatchFiveDigitsSeparated = new WatchFiveDigitsSeparated(103)
  heartRateSeparatedDigits: WatchThreeDigitsSeparated = new WatchThreeDigitsSeparated(102)

    constructor(j?: WatchJson) {
    if (j) {
      if (j.Activity?.Steps || j.StepProgress) this.steps = new WatchStepsActivity(digitTypes.steps, j.Activity?.Steps, j.StepProgress)
      if (j.Activity?.Calories || j.CaloriesProgress)   this.calories = new WatchCaloriesActivity(digitTypes.calories, j.Activity?.Calories, j.CaloriesProgress)
      if (j.Activity?.HeartRate || j.HeartProgress) this.heartRate = new WatchHeartRateActivity(digitTypes.heartRate, j.Activity?.HeartRate, j.HeartProgress)
      if (j.Activity?.Distance) this.distance = new WatchDistanceActivity(digitTypes.distance, j.Activity?.Distance)
      if (j.Activity?.PAI || j.PaiProgress) this.pai = new WatchPAIActivity(digitTypes.pai, j.Activity?.PAI, j.PaiProgress)
      if (j.Activity?.StandUp || j.StandUpProgress) this.standUp = new WatchStandUpActivity(digitTypes.standUp, j.Activity?.StandUp, j.StandUpProgress)
      if (j.StressProgress) this.stress = new WatchStressActivity(digitTypes.stress, j.StressProgress)
      if (j.SPO2Progress) this.spo2 = new WatchSpO2Activity(digitTypes.spo2, j.SPO2Progress)
      
      if (j.ActivitySeparateDigits) {
        this.stepsSeparatedDigits = new WatchFiveDigitsSeparated(103, j.ActivitySeparateDigits.Steps)
        this.batterySeparatedDigits = new WatchThreeDigitsSeparated(101, j.ActivitySeparateDigits.Battery)
        this.caloriesSeparatedDigits = new WatchFourDigitsSeparated(104, j.ActivitySeparateDigits.Calories)
        this.heartRateSeparatedDigits = new WatchThreeDigitsSeparated(102, j.ActivitySeparateDigits.HeartRate)
      }
    }
  }
}

export class WatchDate {
  collapsed = true
  
  ampm: WatchAmPmIcon = new WatchAmPmIcon()
  weekday: WatchImageSet = new WatchImageSet(digitTypes.weekday.imageProgressTotal)
  
  weekdayProgress: WatchProgressWeekdays = new WatchProgressWeekdays(digitTypes.weekday.imageProgressTotal)

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
      this.weekdayProgress = new WatchProgressWeekdays(digitTypes.weekday.imageProgressTotal, j.WeekdayProgress)

      if ( j.Date) {
        if (j.Date.MonthAndDayAlt) {
          this.month = new WatchNumber(j.Date.MonthAndDayAlt.Month, digitTypes.month)
          this.monthAsWord = new WatchImageSet(digitTypes.monthasword.imageProgressTotal, j.Date.MonthAndDayAlt.MonthAsWord)
          this.day =  new WatchNumber(j.Date.MonthAndDayAlt.Day, digitTypes.day)
          if (this.month) this.month.paddingZero = j.Date.PaddingZeroMonth
          if (this.day) this.day.paddingZero = j.Date.PaddingZeroDay
        } 
        if (j.Date.YearMonthAndDay) {
          this.year = new WatchNumber(j.Date.YearMonthAndDay.Year, digitTypes.year)
          this.month = new WatchNumber(j.Date.YearMonthAndDay.Month, digitTypes.month)
          this.monthAsWord = new WatchImageSet(digitTypes.monthasword.imageProgressTotal, j.Date.YearMonthAndDay.MonthAsWord)
          this.day =  new WatchNumber(j.Date.YearMonthAndDay.Day, digitTypes.day)

          if (this.month) {
            this.month.delimiter = j.Date.YearMonthAndDay.DelimiterMonthImageIndex
            this.month.follow = j.Date.YearMonthAndDay.MonthFollowsYear ? true : false
            this.month.dataType = j.Date.YearMonthAndDay.MonthDataTypeImageIndex
            this.month.dataTypeCoords = j.Date.YearMonthAndDay.MonthDataTypeCoordinates
            this.month.paddingZero = j.Date.PaddingZeroMonth
          }
          if (this.day) {
            this.day.follow = j.Date.YearMonthAndDay.DayFollowsMonth ? true: false
            this.day.delimiter = j.Date.YearMonthAndDay.DelimiterDayImageIndex
            this.day.dataType = j.Date.YearMonthAndDay.DayDataTypeImageIndex
            this.day.dataTypeCoords = j.Date.YearMonthAndDay.DayDataTypeCoordinates
            this.day.paddingZero = j.Date.PaddingZeroDay
          }
          if ( this.year) {
            this.year.delimiter = j.Date.YearMonthAndDay.DelimiterYearImageIndex
            this.year.dataType = j.Date.YearMonthAndDay.YearDataTypeImageIndex
            this.year.dataTypeCoords = j.Date.YearMonthAndDay.YearDataTypeCoordinates
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
  unknownBoolean7: boolean = false
  paddingZeroMinutes: boolean = false
  drawOrder: number;

  constructor(j?: TimeSeparateDigits) {
    if (j) {
      this.hours = new WatchTwoDigitsSeparated(j.Hours)
      this.minutes = new WatchTwoDigitsSeparated(j.Minutes)
      this.seconds = new WatchTwoDigitsSeparated(j.Seconds)
      this.drawOrder = j.DrawOrder 
      this.separatorHours = new WatchImage(j.SeparatorHours)
      this.separatorMinutes = new WatchImage(j.SeparatorMinutes)
      this.unknownBoolean7 = j.UnknowBoolean7 ? true : false
      this.paddingZeroMinutes = j.PaddingZeroMinutes ? true : false
    }
  }
}

export class WatchTimeDigitalCommon {
  collapsed = true

  hours: WatchNumber = new WatchNumber(null, digitTypes.hour)
  minutes: WatchNumber = new WatchNumber(null, digitTypes.min)
  seconds: WatchNumber = new WatchNumber(null, digitTypes.sec)

  time_unknown1: number = 1

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
      this.sunsetOneLine = new WatchNumber(j.SunsetTimeOneLine, digitTypes.sunrise)
      this.sunriseOneLine = new WatchNumber(j.SunriseTimeOneLine, digitTypes.sunrise)
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
      this.hours = new WatchNumber(j.Hours, digitTypes.hour)
      this.minutes = new WatchNumber(j.Minutes, digitTypes.min)
      if (this.hours) {
        this.hours.dataType = j.HoursDataTypeImageIndex
        this.hours.delimiter = j.DelimiterHoursImageIndex
        this.hours.paddingZero = j.PaddingZeroHours ? true : false
        this.hours.dataTypeCoords = j.HoursDataTypeCoordinates
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
  
  noAlarmImage: WatchImage = new WatchImage()
  alarmImage: WatchImage = new WatchImage()
  shortcut: WatchShortcutElement = new WatchShortcutElement()
  alarmTime: WatchAlarmTime = new WatchAlarmTime()

  constructor(j?: Alarm) {
    if (j) {
      
      this.noAlarmImage = new WatchImage(j.NoAlarmImage)
      this.alarmImage = new WatchImage(j.AlarmImage)
      this.shortcut = new WatchShortcutElement(j.ShortcutArea)
      this.alarmTime = new WatchAlarmTime(j.AlarmTime)
    }
  }
}


export class WatchHourlyImages {
  iconSet: WatchIconSet = new WatchIconSet()
  timeSpans: TimeSpans[] = []
  collapsed = true;

  constructor(j?: HourlyImages) {
    if (j) {
      this.iconSet = new WatchIconSet(j.HourlyImage.IconSet)
      this.timeSpans = j.HourlyImage.TimeSpans
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

  hourlyImages: WatchHourlyImages = new WatchHourlyImages()

  constructor(j?: WatchJson) {
    if (j) {
      this.alarm = new WatchAlarm(j.Alarm)
      this.sunset = new WatchSunset(j.TimeExtended)
      this.timeAnalog = new WatchTimeAnalog(j.TimeAnalog)
      this.timeDigitalCommon = new WatchTimeDigitalCommon(j.TimeDigital)
      this.timeDigitalSeparated = new WatchTimeDigitalSeparated(j.TimeExtended?.TimeSeparateDigits)
      this.hourlyImages = new WatchHourlyImages(j.HourlyImages)
    }
  }
}

export class WatchBackground {
  collapsed = true
  
  image: WatchImage = new WatchImage()
  preview: WatchImage = new WatchImage()
  previewc: WatchImage = new WatchImage()
  previewtradchin: WatchImage = new WatchImage()
  floatingLayer: WatchImage = new WatchImage()
  color: string = Color.DEFAULT_COLOR

  constructor(j?: Background) {
    if (j) {
      this.image = new WatchImage(j.Image)
      this.preview = new WatchImage(j.Preview)
      this.previewc = new WatchImage(j.PreviewChinese)
      this.previewtradchin = new WatchImage(j.PreviewTradChinese)
      this.floatingLayer = new WatchImage(j.FloatingLayer)
      this.color = Color.colorRead(j.BackgroundColor)
    }
  }
}

export class WatchShortcut {
  uid: string = newid()
  icon: WatchImage = new WatchImage()
  type: string
  element: WatchShortcutElement = new WatchShortcutElement()

  constructor(j?: Shortcut) {
    if (j) {
      this.icon = new WatchImage(j.Icon)
      this.type = j.ShortcutType
      this.element = new WatchShortcutElement(j.Element)
    }
  }
}
export class WatchShortcuts {
  collapsed = true
  
  shortcuts: WatchShortcut[] = []

  constructor(j?: Shortcuts) {
    if (j) {
      this.shortcuts = j.Shortcut.map(item => new WatchShortcut(item))
    }
  }
}

export class WatchFace {
  background: WatchBackground = new WatchBackground();
  time: WatchTime = new WatchTime()
  activity: WatchActivityList = new WatchActivityList();
  date: WatchDate = new WatchDate();
  weekdayImages: WatchWeekdayImages = new WatchWeekdayImages()
  status = new WatchStatus();
  battery = new WatchBattery()
   
  animation: WatchAnimation = new WatchAnimation()
  weather: WatchWeather = new WatchWeather()
  weatherext: WatchWeatherExt = new WatchWeatherExt()
  shortcuts: WatchShortcuts = new WatchShortcuts()
  aod = new WatchAOD()

  constructor(j?: WatchJson) {
    if (!j) return;

    this.background = new WatchBackground(j.Background);
    this.time = new WatchTime(j)
    this.date = new WatchDate(j.DateBlock)
    this.weekdayImages = new WatchWeekdayImages(j.WeekDayImages)
    this.activity = new WatchActivityList(j)
    this.status = new WatchStatus(j.Status)
    this.battery = new WatchBattery(j.Battery)
    this.aod = new WatchAOD(j.AlwaysOnDisplay)
    this.animation = new WatchAnimation(j.Animation)
    this.weather = new WatchWeather(j)
    this.weatherext = new WatchWeatherExt(j)
    this.shortcuts = new WatchShortcuts(j.Shortcuts)
  }
}
