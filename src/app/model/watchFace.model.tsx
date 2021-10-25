import Color from "../shared/color";
import {
  ClockHand, DigitalDigit, ImageCoord, ImageProgress, ProgressBar, ScreenIdle, Shortcut, Status, Text, WatchJson, Widgets, MultilangImageCoord
} from "./json.model";
import { TimeType, DateType, CommonType, ActivityType, JsonType, LangCodeType } from "./types.model";


interface IDigitConstructor {
  type: number;
  count: number;
  numberLenght: number;
  unit: string[];
  separator: string;
  displayFormAnalog?: boolean;
  imageProgressTotal?: number;
}

const digitTypes = {
  hour: {
    type: TimeType.Hour.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', ':', ':'],
    separator: '/'
  },
  min: {
    type: TimeType.Minute.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', ':', ':'],
    separator: '/'
  },
  sec: {
    type: TimeType.Second.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', ':', ':'],
    separator: '/'
  },
  year: {
    type: DateType.Year.index,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '.', '/'],
    separator: '/'
  },
  month: {
    type: DateType.Month.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '.', '/'],
    separator: '/'
  },
  monthasword: {
    type: DateType.Month.index,
    count: 12,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  day: {
    type: DateType.Day.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '.', '/'],
    separator: '/'
  },
  weekday: {
    type: 0,
    count: 7,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  battery: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['%', '%', '%'],
    separator: '/'
  },
  steps: {
    type: 0,
    count: 10,
    numberLenght: 5,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', 'Steps', 'STEPS'],
    separator: '/'
  },
  calories: {
    type: 0,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', 'kcal', 'Cal'],
    separator: '/'

  },
  heartRate: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: 6,
    unit: ['', 'bpm', 'BPM'],
    separator: '/'

  },
  pai: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  distance: {
    type: 0,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', 'km', 'KM'],
    separator: '/'
  },
  standUp: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  uvIndex: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  airQuality: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  humidity: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['%', '%', '%'],
    separator: '/'
  },
  sunrise: {
    type: 0,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  windForce: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', 'kpa', 'KPA'],
    separator: '/'
  },
  airPressure: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  stress: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  activityGoal: {
    type: 0,
    count: 10,
    numberLenght: 5,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  fatBurning: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/'
  },
  weather: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 29,
    unit: ['°C', '°C', '°C'],
    separator: '/'
  },
  weatherMin: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 29,
    unit: ['°C', '°C', '°C'],
    separator: '/'
  },
  weatherMax: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 29,
    unit: ['°C', '°C', '°C'],
    separator: '/'
  },
};
export class Background {
  imageIndex = null;
  previewIndex = null;
  color = null;
}

export class Coords {
  x: number = 0;
  y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}

export class WatchImageCoords {
  json = new ImageCoord()
  enabled = false;

  constructor(j?: ImageCoord) {
    if (j != null && j !== undefined) {
      this.enabled = true
      this.json = j
    }
  }
}
export class WatchMultilangImageCoords {
  json = new MultilangImageCoord()
  enabled = false;
  count = 1;

  constructor(j?: MultilangImageCoord, count?: number) {
    if (j != null && j !== undefined) {
      this.enabled = true
      this.json = j
    }
    if (count) {
      this.count = count
    }
  }
}

export class WatchImageProgress {
  enabled = false;
  json = new ImageProgress();

  constructor(j?: ImageProgress) {
    if (j != null && j !== undefined) {
      this.enabled = true
      this.json = j
    }
  }
}


export enum TypeOfDigit {
  TIME,
  DATE,
  COMMON
}
export class WatchCommonDigit {
  constructor(type: TypeOfDigit, d?: DigitalDigit, con?: IDigitConstructor) {
    this.json = d;
    if (d != null) {
      this.enabled = true
      if (d.Digit?.Image) this.enabledImage = true
      if (d.Digit?.SystemFont) {
        if (d.Digit?.SystemFont?.FontRotate) this.enabledSystemFontCircle = true
        else this.enabledSystemFont = true
      }
    }
    if (con != null) {
      if (!d) {
        this.json = new DigitalDigit()
        this.json.Digit = new Text()
      }
      this.con = con
    }
    this.json.DateType = type === TypeOfDigit.DATE ? DateType.toJson(con.type) : null
    this.json.TimeType = type === TypeOfDigit.TIME ? TimeType.toJson(con.type) : null
    this.json.Type = type === TypeOfDigit.COMMON ? CommonType.toJson(con.type) : null
  }
  json: DigitalDigit = new DigitalDigit();
  con: IDigitConstructor;
  enabled = false;
  enabledImage = false;
  enabledSystemFont = false;
  enabledSystemFontCircle = false;
}

export class WatchClockHand {
  enabled: boolean;

  json: ClockHand = new ClockHand()

  constructor(json?: ClockHand) {
    this.json = json
    if (json) this.enabled = true
  }
}

export class WatchDialFace {
  hoursDigital = new WatchCommonDigit(TypeOfDigit.TIME, null, digitTypes.hour);
  minutesDigital = new WatchCommonDigit(TypeOfDigit.TIME, null, digitTypes.min);
  secondsDigital = new WatchCommonDigit(TypeOfDigit.TIME, null, digitTypes.sec);
  hoursClockhand = new WatchClockHand();
  minutesClockhand = new WatchClockHand();
  secondsClockhand = new WatchClockHand();
  am = new WatchMultilangImageCoords()
  pm = new WatchMultilangImageCoords()
}

export class WatchDate {
  year = new WatchCommonDigit(TypeOfDigit.DATE, null, digitTypes.year);
  month = new WatchCommonDigit(TypeOfDigit.DATE, null, digitTypes.month);
  day = new WatchCommonDigit(TypeOfDigit.DATE, null, digitTypes.day);
  monthAsWord = new WatchCommonDigit(TypeOfDigit.DATE, null, digitTypes.monthasword);
  weekDay = new WatchCommonDigit(TypeOfDigit.COMMON, null, digitTypes.weekday);
}

export class WatchStatus {
  constructor(s?: Status) {
    if (s) {
      if (s.Bluetooth?.ImageIndex) {
        this.bluetooth = new WatchImageCoords(s.Bluetooth);
        this.bluetooth.enabled = true;
      }
      if (s.Lock?.ImageIndex) {
        this.lock = new WatchImageCoords(s.Lock);
        this.lock.enabled = true;
      }
      if (s.DoNotDisturb?.ImageIndex) {
        this.dnd = new WatchImageCoords(s.DoNotDisturb);
        this.dnd.enabled = true;
      }
      if (s.Alarm?.ImageIndex) {
        this.alarm = new WatchImageCoords(s.Alarm);
        this.alarm.enabled = true;
      }
    }
  }
  bluetooth = new WatchImageCoords(null);
  dnd = new WatchImageCoords(null);
  alarm = new WatchImageCoords(null);
  lock = new WatchImageCoords(null);
}

export class WatchProgressBar {
  enabledLinear: boolean;
  enabledCircle: boolean;
  jsonObj: ProgressBar;

  constructor(json?: ProgressBar) {
    this.jsonObj = json;
    if (json) {
      if (json.LinearSettings)
        this.enabledLinear = true;
      else if (json.AngleSettings)
        this.enabledCircle = true;
    }
  }
}
export class WatchActivity {
  digit: WatchCommonDigit;
  imageProgress = new WatchImageProgress();
  pointerProgress = new WatchClockHand();
  progressBar = new WatchProgressBar();
  icon = new WatchImageCoords();
  shortcut: Shortcut = null;

  constructor(dt: IDigitConstructor) {
    this.digit = new WatchCommonDigit(TypeOfDigit.COMMON, null, dt);
    this.imageProgress.json.ImageSet.ImagesCount = dt.imageProgressTotal;
  }
}

export class WatchActivityList {
  battery = new WatchActivity(digitTypes.battery);
  steps = new WatchActivity(digitTypes.steps);
  calories = new WatchActivity(digitTypes.calories);
  heartRate = new WatchActivity(digitTypes.heartRate);
  pai = new WatchActivity(digitTypes.pai);
  distance = new WatchActivity(digitTypes.distance);
  standUp = new WatchActivity(digitTypes.standUp);
  weather = new WatchActivity(digitTypes.weather);
  weatherMin = new WatchActivity(digitTypes.weatherMin);
  weatherMax = new WatchActivity(digitTypes.weatherMax);
  uvindex = new WatchActivity(digitTypes.uvIndex)
  airQuality = new WatchActivity(digitTypes.airQuality)
  humidity = new WatchActivity(digitTypes.humidity)
  sunrise = new WatchActivity(digitTypes.sunrise)
  windForce = new WatchActivity(digitTypes.windForce)
  airPressure = new WatchActivity(digitTypes.airPressure)
  stress = new WatchActivity(digitTypes.stress)
  activityGoal = new WatchActivity(digitTypes.activityGoal)
  fatBurning = new WatchActivity(digitTypes.fatBurning)
}

export class ElementOrderItem {
  public type: number;
  public title: string;
  constructor(jsonType: JsonType) {
    this.type = jsonType.index;
    this.title = jsonType.json;
  }
}

export class WatchAOD {
  dialFace = new WatchDialFace();
  date = new WatchDate();
  activity = new WatchActivityList();
  backgroundImageIndex: number;
  json: ScreenIdle

  orderElements = {
    orderElementsTime: [
      new ElementOrderItem(TimeType.Hour),
      new ElementOrderItem(TimeType.Minute),
      new ElementOrderItem(TimeType.Second),
    ],
    orderElementsDate: [
      new ElementOrderItem(DateType.Year),
      new ElementOrderItem(DateType.Month),
      new ElementOrderItem(DateType.Day),
    ],
    orderElementsActivity: [
      new ElementOrderItem(ActivityType.Date),
      new ElementOrderItem(ActivityType.Battery),
      new ElementOrderItem(ActivityType.Steps),
      new ElementOrderItem(ActivityType.Calories),
      new ElementOrderItem(ActivityType.HeartRate),
      new ElementOrderItem(ActivityType.Pai),
      new ElementOrderItem(ActivityType.Distance),
      new ElementOrderItem(ActivityType.StandUp),
      new ElementOrderItem(ActivityType.Weather),
    ],
  };

  constructor(j: ScreenIdle) {
    this.dialFace = new WatchDialFace();
    this.date = new WatchDate();
    this.activity = new WatchActivityList();
    this.backgroundImageIndex = null;
    this.json = j
    if (j == null) return
    this.backgroundImageIndex = j.BackgroundImageIndex

    this.dialFace = new WatchDialFace();
    this.dialFace.secondsDigital = null
    let newOrderElementsTime: ElementOrderItem[] = [];
    if (j.DialFace?.DigitalDialFace?.Digits) {
      j.DialFace.DigitalDialFace.Digits.forEach((d) => {
        switch (d.TimeType) {
          case TimeType.Minute.json:
            this.dialFace.minutesDigital = new WatchCommonDigit(TypeOfDigit.TIME, d, digitTypes.min);
            newOrderElementsTime.push(new ElementOrderItem(TimeType.Minute));
            break;
          default:
            this.dialFace.hoursDigital = new WatchCommonDigit(TypeOfDigit.TIME, d, digitTypes.hour);
            newOrderElementsTime.push(new ElementOrderItem(TimeType.Hour));
            break;
        }
      });
    }
    this.orderElements.orderElementsTime.forEach((el) => {
      if (!newOrderElementsTime.find((s) => s.type === el.type))
        newOrderElementsTime.push(el);
    });
    this.orderElements.orderElementsTime = newOrderElementsTime;

    this.dialFace.am = new WatchMultilangImageCoords(j.DialFace?.DigitalDialFace?.AM)
    this.dialFace.pm = new WatchMultilangImageCoords(j.DialFace?.DigitalDialFace?.PM)

    this.dialFace.hoursClockhand = new WatchClockHand(
      j.DialFace?.AnalogDialFace?.Hours
    );
    this.dialFace.minutesClockhand = new WatchClockHand(
      j.DialFace?.AnalogDialFace?.Minutes
    );
    this.dialFace.secondsClockhand = null

    this.date = new WatchDate();
    let newOrderElementsDate: ElementOrderItem[] = [];
    if (j.Date?.DateDigits) {
      j.Date.DateDigits.forEach((d) => {
        switch (d.DateType) {
          case DateType.Year.json:
            this.date.year = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.year);
            newOrderElementsDate.push(new ElementOrderItem(DateType.Year));
            break;
          case DateType.Month.json:
            if (d.Digit.DisplayFormAnalog) {
              this.date.monthAsWord = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.month);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            } else {
              this.date.month = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.monthasword);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            }
            break;
          case DateType.Day.json:
            this.date.day = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.day);
            newOrderElementsDate.push(new ElementOrderItem(DateType.Day));
            break;
          default:
            break;
        }
      });
    }
    this.orderElements.orderElementsDate.forEach((el) => {
      if (!newOrderElementsDate.find((s) => s.type === el.type))
        newOrderElementsDate.push(el);
    });
    this.orderElements.orderElementsDate = newOrderElementsDate;

    this.date.weekDay = new WatchCommonDigit(TypeOfDigit.COMMON,
      j.Date?.WeeksDigits,
      digitTypes.weekday
    );

    this.activity = new WatchActivityList();
    if (j.Activity) {
      j.Activity.forEach((a) => {
        let _activity: WatchActivity = null;
        let _dt: IDigitConstructor = null;
        switch (a.Type) {
          case ActivityType.Battery.json:
            _activity = this.activity.battery;
            _dt = digitTypes.battery;
            break;
          case ActivityType.Steps.json:
            _activity = this.activity.steps;
            _dt = digitTypes.steps;
            break;
          case ActivityType.Calories.json:
            _activity = this.activity.calories;
            _dt = digitTypes.calories;
            break;
          case ActivityType.HeartRate.json:
            _activity = this.activity.heartRate;
            _dt = digitTypes.heartRate;
            break;
          case ActivityType.Pai.json:
            _activity = this.activity.pai;
            _dt = digitTypes.pai;
            break;
          case ActivityType.Distance.json:
            _activity = this.activity.distance;
            _dt = digitTypes.distance;
            break;
          case ActivityType.StandUp.json:
            _activity = this.activity.standUp;
            _dt = digitTypes.standUp;
            break;
          case ActivityType.UVindex.json:
            _activity = this.activity.uvindex;
            _dt = digitTypes.uvIndex;
            break;
          case ActivityType.AirQuality.json:
            _activity = this.activity.airQuality;
            _dt = digitTypes.airQuality;
            break;
          case ActivityType.Humidity.json:
            _activity = this.activity.humidity;
            _dt = digitTypes.humidity;
            break;
          case ActivityType.Sunrise.json:
            _activity = this.activity.sunrise;
            _dt = digitTypes.sunrise;
            break;
          case ActivityType.WindForce.json:
            _activity = this.activity.windForce;
            _dt = digitTypes.windForce;
            break;
          case ActivityType.AirPressure.json:
            _activity = this.activity.airPressure;
            _dt = digitTypes.airPressure;
            break;
          case ActivityType.Weather.json:
            if (a.Digits) {
              a.Digits.forEach((digit) => {
                if (digit.Type === CommonType.Min.json) {
                  this.activity.weatherMin.digit = new WatchCommonDigit(TypeOfDigit.COMMON,
                    digit,
                    digitTypes.weatherMin
                  );
                } else if (digit.Type === CommonType.Max.json) {
                  this.activity.weatherMax.digit = new WatchCommonDigit(TypeOfDigit.COMMON,
                    digit,
                    digitTypes.weatherMax
                  );
                } else {
                  this.activity.weather.digit = new WatchCommonDigit(TypeOfDigit.COMMON,
                    digit,
                    digitTypes.weather
                  );
                }
              });
            }
            this.activity.weather.imageProgress = new WatchImageProgress(
              a.ImageProgress
            );
            this.activity.weather.icon = new WatchImageCoords(a.Icon);
            this.activity.weather.shortcut = a.Shortcut;
            break;
          default:
            break;
        }
        if (_activity) {
          _activity.digit = new WatchCommonDigit(TypeOfDigit.COMMON, a.Digits[0], _dt);
          _activity.imageProgress = new WatchImageProgress(a.ImageProgress);
          _activity.pointerProgress = new WatchClockHand(a.PointerProgress);
          _activity.progressBar = new WatchProgressBar(a.ProgressBar);
          _activity.icon = new WatchImageCoords(a.Icon);
          _activity.shortcut = a.Shortcut;
        }
      });
    }
  }
}

export class WatchWidgets {
  enabled: boolean
  json: Widgets

  constructor(json: Widgets) {
    this.json = json
    if (json) this.enabled = true
  }
}

export default class WatchFace {
  background = new Background();
  dialFace = new WatchDialFace();
  date = new WatchDate();
  activity = new WatchActivityList();
  status = new WatchStatus();
  widgets = new WatchWidgets(null)
  aod = new WatchAOD(null)

  orderElements = {
    orderElementsTime: [
      new ElementOrderItem(TimeType.Hour),
      new ElementOrderItem(TimeType.Minute),
      new ElementOrderItem(TimeType.Second),
    ],
    orderElementsDate: [
      new ElementOrderItem(DateType.Year),
      new ElementOrderItem(DateType.Month),
      new ElementOrderItem(DateType.Day),
    ],
    orderElementsActivity: [
      new ElementOrderItem(ActivityType.Date),
      new ElementOrderItem(ActivityType.Battery),
      new ElementOrderItem(ActivityType.Steps),
      new ElementOrderItem(ActivityType.Calories),
      new ElementOrderItem(ActivityType.HeartRate),
      new ElementOrderItem(ActivityType.Pai),
      new ElementOrderItem(ActivityType.Distance),
      new ElementOrderItem(ActivityType.StandUp),
      new ElementOrderItem(ActivityType.Weather),
    ],
  };

  constructor(j?: WatchJson) {
    if (!j) return;

    this.background = new Background();
    this.dialFace = new WatchDialFace();
    this.date = new WatchDate();
    this.activity = new WatchActivityList();
    this.status = new WatchStatus();
    this.aod = new WatchAOD(null)

    this.background.color = Color.colorBackgroundRead(j.Background.Color);
    this.background.imageIndex = j.Background.BackgroundImageIndex;
    if (j.Background.Preview) {
      let ix = 0;
      j.Background?.Preview?.forEach((item, index) => {
        if (item.LangCode === LangCodeType.All.json) {
          ix = index;
        }
      });
      this.background.previewIndex = j.Background.Preview[ix]?.ImageSet?.ImageIndex;
    }

    this.dialFace = new WatchDialFace();
    let newOrderElementsTime: ElementOrderItem[] = [];
    if (j.DialFace?.DigitalDialFace?.Digits) {
      j.DialFace.DigitalDialFace.Digits.forEach((d) => {
        switch (d.TimeType) {
          case TimeType.Minute.json:
            this.dialFace.minutesDigital = new WatchCommonDigit(TypeOfDigit.TIME, d, digitTypes.min);
            newOrderElementsTime.push(new ElementOrderItem(TimeType.Minute));
            break;
          case TimeType.Second.json:
            this.dialFace.secondsDigital = new WatchCommonDigit(TypeOfDigit.TIME, d, digitTypes.sec);
            newOrderElementsTime.push(new ElementOrderItem(TimeType.Second));
            break;
          default:
            this.dialFace.hoursDigital = new WatchCommonDigit(TypeOfDigit.TIME, d, digitTypes.hour);
            newOrderElementsTime.push(new ElementOrderItem(TimeType.Hour));
            break;
        }
      });
    }
    this.orderElements.orderElementsTime.forEach((el) => {
      if (!newOrderElementsTime.find((s) => s.type === el.type))
        newOrderElementsTime.push(el);
    });
    this.orderElements.orderElementsTime = newOrderElementsTime;

    this.dialFace.am = new WatchMultilangImageCoords(j.DialFace?.DigitalDialFace?.AM)
    this.dialFace.pm = new WatchMultilangImageCoords(j.DialFace?.DigitalDialFace?.PM)

    this.dialFace.hoursClockhand = new WatchClockHand(
      j.DialFace?.AnalogDialFace?.Hours
    );
    this.dialFace.minutesClockhand = new WatchClockHand(
      j.DialFace?.AnalogDialFace?.Minutes
    );
    this.dialFace.secondsClockhand = new WatchClockHand(
      j.DialFace?.AnalogDialFace?.Seconds
    );

    this.date = new WatchDate();
    let newOrderElementsDate: ElementOrderItem[] = [];
    if (j.System?.Date?.DateDigits) {
      j.System.Date.DateDigits.forEach((d) => {
        switch (d.DateType) {
          case DateType.Year.json:
            this.date.year = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.year);
            newOrderElementsDate.push(new ElementOrderItem(DateType.Year));
            break;
          case DateType.Month.json:
            if (d.Digit.DisplayFormAnalog) {
              this.date.monthAsWord = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.month);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            } else {
              this.date.month = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.monthasword);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            }
            break;
          case DateType.Day.json:
            this.date.day = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.day);
            newOrderElementsDate.push(new ElementOrderItem(DateType.Day));
            break;
          default:
            break;
        }
      });
    }
    this.orderElements.orderElementsDate.forEach((el) => {
      if (!newOrderElementsDate.find((s) => s.type === el.type))
        newOrderElementsDate.push(el);
    });
    this.orderElements.orderElementsDate = newOrderElementsDate;

    this.date.weekDay = new WatchCommonDigit(TypeOfDigit.COMMON,
      j.System?.Date?.WeeksDigits,
      digitTypes.weekday
    );

    this.status = new WatchStatus(j.System?.Status);

    this.activity = new WatchActivityList();
    if (j.System?.Activity) {
      j.System.Activity.forEach((a) => {
        let _activity: WatchActivity = null;
        let _dt: IDigitConstructor = null;
        switch (a.Type) {
          case ActivityType.Battery.json:
            _activity = this.activity.battery;
            _dt = digitTypes.battery;
            break;
          case ActivityType.Steps.json:
            _activity = this.activity.steps;
            _dt = digitTypes.steps;
            break;
          case ActivityType.Calories.json:
            _activity = this.activity.calories;
            _dt = digitTypes.calories;
            break;
          case ActivityType.HeartRate.json:
            _activity = this.activity.heartRate;
            _dt = digitTypes.heartRate;
            break;
          case ActivityType.Pai.json:
            _activity = this.activity.pai;
            _dt = digitTypes.pai;
            break;
          case ActivityType.Distance.json:
            _activity = this.activity.distance;
            _dt = digitTypes.distance;
            break;
          case ActivityType.StandUp.json:
            _activity = this.activity.standUp;
            _dt = digitTypes.standUp;
            break;
          case ActivityType.UVindex.json:
            _activity = this.activity.uvindex;
            _dt = digitTypes.uvIndex;
            break;
          case ActivityType.AirQuality.json:
            _activity = this.activity.airQuality;
            _dt = digitTypes.airQuality;
            break;
          case ActivityType.Humidity.json:
            _activity = this.activity.humidity;
            _dt = digitTypes.humidity;
            break;
          case ActivityType.Sunrise.json:
            _activity = this.activity.sunrise;
            _dt = digitTypes.sunrise;
            break;
          case ActivityType.WindForce.json:
            _activity = this.activity.windForce;
            _dt = digitTypes.windForce;
            break;
          case ActivityType.AirPressure.json:
            _activity = this.activity.airPressure;
            _dt = digitTypes.airPressure;
            break;
          case ActivityType.Weather.json:
            if (a.Digits) {
              a.Digits.forEach((digit) => {
                if (digit.Type === CommonType.Min.json) {
                  this.activity.weatherMin.digit = new WatchCommonDigit(TypeOfDigit.COMMON,
                    digit,
                    digitTypes.weatherMin
                  );
                } else if (digit.Type === CommonType.Max.json) {
                  this.activity.weatherMax.digit = new WatchCommonDigit(TypeOfDigit.COMMON,
                    digit,
                    digitTypes.weatherMax
                  );
                } else {
                  this.activity.weather.digit = new WatchCommonDigit(TypeOfDigit.COMMON,
                    digit,
                    digitTypes.weather
                  );
                }
              });
            }
            this.activity.weather.imageProgress = new WatchImageProgress(a.ImageProgress);
            this.activity.weather.icon = new WatchImageCoords(a.Icon);
            this.activity.weather.shortcut = a.Shortcut;
            break;
          default:
            break;
        }
        if (_activity) {
          if (a.Digits) _activity.digit = new WatchCommonDigit(TypeOfDigit.COMMON, a.Digits[0], _dt);
          _activity.imageProgress = new WatchImageProgress(a.ImageProgress);
          _activity.pointerProgress = new WatchClockHand(a.PointerProgress);
          _activity.progressBar = new WatchProgressBar(a.ProgressBar);
          _activity.icon = new WatchImageCoords(a.Icon);
          _activity.shortcut = a.Shortcut;
        }
      });
    }

    this.widgets = new WatchWidgets(j.Widgets)
    this.aod = new WatchAOD(j.ScreenIdle)
  }
}
