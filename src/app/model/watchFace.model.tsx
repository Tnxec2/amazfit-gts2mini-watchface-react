import Color from "../shared/color";
import {
  ClockHand, DigitalDigit, ImageCoord, ImageProgress, ProgressBar, ScreenIdle, Shortcut, Status, Text, WatchJson, Widgets, MultilangImageCoord, Activity, Widget, WidgetElement
} from "./json.model";
import { TimeType, DateType, CommonType, ActivityType, JsonType, LangCodeType } from "./types.model";


interface IDigitConstructor {
  type: number;
  count: number;
  numberLenght: number;
  unit: string[];
  separator: string;
  title: string;
  titleDefault?: string;
  titleMin?: string;
  titleMax?: string;
  decimalDelimiter?: boolean;
  timeDelimiter?: boolean;
  displayAnalog?: boolean;
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
    separator: '/',
    timeDelimiter: true,
    title: 'Hours',
  },
  min: {
    type: TimeType.Minute.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', ':', ':'],
    separator: '/',
    timeDelimiter: true,
    title: 'Minutes',
  },
  sec: {
    type: TimeType.Second.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', ':', ':'],
    separator: '/',
    timeDelimiter: true,
    title: 'Seconds',
  },
  year: {
    type: DateType.Year.index,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '/', '.'],
    separator: '/',
    title: 'Year',
  },
  month: {
    type: DateType.Month.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '/', '.'],
    separator: '/',
    title: 'Month',
  },
  monthasword: {
    type: DateType.Month.index,
    count: 12,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'Month as word',
  },
  day: {
    type: DateType.Day.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '/', '.'],
    separator: '/',
    title: 'Day',
  },
  weekday: {
    type: 0,
    count: 7,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'Weekday',
  },
  battery: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['%', '%', '%'],
    separator: '/',
    title: 'Battery',
  },
  steps: {
    type: 0,
    count: 10,
    numberLenght: 5,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', 'Steps', 'STEPS'],
    separator: '/',
    title: 'Steps',
    titleMin: 'goal of steps'
  },
  calories: {
    type: 0,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', 'kcal', 'Cal'],
    separator: '/',
    title: 'Calories',
    titleMin: 'goal of calories'
  },
  heartRate: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: 6,
    unit: ['', 'bpm', 'BPM'],
    separator: '/',
    title: 'Heart rate'
  },
  pai: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'PAI',
  },
  distance: {
    type: 0,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', 'km', 'KM'],
    separator: '/',
    decimalDelimiter: true,
    title: 'Distance',
  },
  standUp: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'Standup',
    titleMin: 'goal of stand up'
  },
  uvIndex: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'UVIndex',
  },
  airQuality: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'Air quality',
  },
  humidity: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['%', '%', '%'],
    separator: '/',
    title: 'Humidity',
  },
  sunrise: {
    type: 0,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    timeDelimiter: true,
    title: 'Sunrise',
    titleDefault: 'closest sunrise or sunset',
    titleMin: 'sunrise',
    titleMax: 'sunset',
  },
  windForce: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', 'kpa', 'KPA'],
    separator: '/',
    title: 'Wind force',
  },
  airPressure: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'Air pressure',
  },
  stress: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'Stress',
  },
  activityGoal: {
    type: 0,
    count: 10,
    numberLenght: 5,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'ActivityGoal',
    titleMin: 'goal of activity'
  },
  fatBurning: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
    unit: ['', '', ''],
    separator: '/',
    title: 'FatBurning',
    titleMin: 'goal of FatBurning'
  },
  weather: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 29,
    unit: ['°C', '°C', '°C'],
    separator: '/',
    title: 'Weather',
    titleDefault: 'Current',
    titleMin: 'Minimum',
    titleMax: 'Maximum',
  },

};
export class Background {
  imageIndex = null;
  previewIndex = null;
  color = Color.DEFAULT_COLOR;
  collapsed = true;
}

export class Coords {
  x: number = 0;
  y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }
}

export class WatchImageCoords {
  json = new ImageCoord()
  enabled = false;

  constructor(j?: ImageCoord) {
    if (j) {
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
  collapsedDigital = true;
  collapsedAnalog = true;
  hoursDigital = new WatchCommonDigit(TypeOfDigit.TIME, null, digitTypes.hour);
  minutesDigital = new WatchCommonDigit(TypeOfDigit.TIME, null, digitTypes.min);
  secondsDigital = new WatchCommonDigit(TypeOfDigit.TIME, null, digitTypes.sec);
  hoursClockhand = new WatchClockHand();
  minutesClockhand = new WatchClockHand();
  secondsClockhand = new WatchClockHand();
  am = new WatchMultilangImageCoords()
  pm = new WatchMultilangImageCoords()
}

export class ElementOrderItem {
  public type: number;
  public title: string;
  constructor(jsonType: JsonType) {
    this.type = jsonType.index;
    this.title = jsonType.json;
  }
}

export class WatchDate {
  collapsed = true;
  enabled = false;
  year = new WatchCommonDigit(TypeOfDigit.DATE, null, digitTypes.year);
  month = new WatchCommonDigit(TypeOfDigit.DATE, null, digitTypes.month);
  day = new WatchCommonDigit(TypeOfDigit.DATE, null, digitTypes.day);
  monthAsWord = new WatchCommonDigit(TypeOfDigit.DATE, null, digitTypes.monthasword);
  weekDay = new WatchCommonDigit(TypeOfDigit.COMMON, null, digitTypes.weekday);

  orderElements = [
    new ElementOrderItem(DateType.Year),
    new ElementOrderItem(DateType.Month),
    new ElementOrderItem(DateType.Day),
  ]
}

export class WatchStatus {
  collapsed = true;
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
  collapsed = true;
  key: string;
  type: JsonType;
  dt: IDigitConstructor;
  digit: WatchCommonDigit;
  digitMin: WatchCommonDigit;
  digitMax: WatchCommonDigit;
  imageProgress = new WatchImageProgress();
  pointerProgress = new WatchClockHand();
  progressBar = new WatchProgressBar();
  icon = new WatchImageCoords();
  shortcut: Shortcut = null;

  constructor(type: JsonType, dt: IDigitConstructor) {
    this.key = type.index + '_' + new Date().getTime()
    this.type = type;
    this.dt = dt;
    this.imageProgress.json.ImageSet.ImagesCount = dt.imageProgressTotal;
  }
}



export class WatchAOD {
  dialFace = new WatchDialFace();
  date = new WatchDate();
  activitylistCollapsed = true;
  activitylist: WatchActivity[] = [];
  backgroundImageIndex: number;
  backgroundCollapsed = true;
  json: ScreenIdle

  constructor(j: ScreenIdle) {
    this.dialFace = new WatchDialFace();
    this.date = new WatchDate();
    this.activitylist = [];
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
          case DateType.Month.json:
            if (d.Digit.DisplayFormAnalog) {
              this.date.monthAsWord = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.monthasword);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            } else {
              this.date.month = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.month);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            }
            break;
          case DateType.Day.json:
            this.date.day = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.day);
            newOrderElementsDate.push(new ElementOrderItem(DateType.Day));
            break;
          default:
            this.date.year = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.year);
            newOrderElementsDate.push(new ElementOrderItem(DateType.Year));
            break;
        }
      });
    }
    this.date.orderElements.forEach((el) => {
      if (!newOrderElementsDate.find((s) => s.type === el.type))
        newOrderElementsDate.push(el);
    });
    this.date.orderElements = newOrderElementsDate;

    this.date.weekDay = new WatchCommonDigit(TypeOfDigit.COMMON,
      j.Date?.WeeksDigits,
      digitTypes.weekday
    );

    this.activitylist = getActivityListFromJson(j.Activity);
  }
}

export function getActivityFromJson(a: Activity, atype: JsonType): WatchActivity {
  let _activity: WatchActivity = null;
  let _dt: IDigitConstructor = null;
  switch (atype) {
    case ActivityType.Battery:
      _dt = digitTypes.battery;
      break;
    case ActivityType.Steps:
      _dt = digitTypes.steps;
      break;
    case ActivityType.Calories:
      _dt = digitTypes.calories;
      break;
    case ActivityType.HeartRate:
      _dt = digitTypes.heartRate;
      break;
    case ActivityType.Pai:
      _dt = digitTypes.pai;
      break;
    case ActivityType.Distance:
      _dt = digitTypes.distance;
      break;
    case ActivityType.StandUp:
      _dt = digitTypes.standUp;
      break;
    case ActivityType.UVindex:
      _dt = digitTypes.uvIndex;
      break;
    case ActivityType.AirQuality:
      _dt = digitTypes.airQuality;
      break;
    case ActivityType.Humidity:
      _dt = digitTypes.humidity;
      break;
    case ActivityType.Sunrise:
      _dt = digitTypes.sunrise;
      break;
    case ActivityType.WindForce:
      _dt = digitTypes.windForce;
      break;
    case ActivityType.AirPressure:
      _dt = digitTypes.airPressure;
      break;
    case ActivityType.Weather:
      _dt = digitTypes.weather;
      break;
    case ActivityType.ActivityGoal:
      _dt = digitTypes.activityGoal;
      break;
    default:
      break;
  }

  if (_dt){
    _activity = new WatchActivity(atype, _dt);
    _activity.digit = new WatchCommonDigit(TypeOfDigit.COMMON, null, _dt);
    _activity.digitMin = new WatchCommonDigit(TypeOfDigit.COMMON, null, {..._dt, type: CommonType.Min.index});
    _activity.digitMax = new WatchCommonDigit(TypeOfDigit.COMMON, null, {..._dt, type: CommonType.Max.index});
  } 
  if (_activity) {
    if (a?.Digits) {
      a.Digits.forEach((digit) => {
        if ( digit.Type === CommonType.Min.json )
          _activity.digitMin = new WatchCommonDigit(TypeOfDigit.COMMON, digit, {..._dt, type: CommonType.Min.index});
        else if ( digit.Type === CommonType.Max.json )
          _activity.digitMax = new WatchCommonDigit(TypeOfDigit.COMMON, digit, {..._dt, type: CommonType.Max.index});
        else
          _activity.digit = new WatchCommonDigit(TypeOfDigit.COMMON, digit, {..._dt, type: CommonType.Default.index});
      })
    }
    _activity.imageProgress = new WatchImageProgress(a?.ImageProgress);
    _activity.pointerProgress = new WatchClockHand(a?.PointerProgress);
    _activity.progressBar = new WatchProgressBar(a?.ProgressBar);
    _activity.icon = new WatchImageCoords(a?.Icon);
    _activity.shortcut = a?.Shortcut;
  }
  return _activity
}

export function getActivityListFromJson(ar: Activity[]): WatchActivity[] | null {
  if (ar) {
    let activitylist: WatchActivity[] = []
    ar.forEach((a) => {
      let _a = getActivityFromJson(a, ActivityType.findByJson(a.Type))
      if (_a) activitylist.push(_a)
    });
    return activitylist;
  } else {
    return [];
  }

}

export class WatchWidgetElement {
  collapsed = true;
  previewImageIndex: number;
  date: WatchDate;
  activitylistCollapsed = true;
  activitys: WatchActivity[] = [];
  orderElements = {
    orderElementsDate: [
      new ElementOrderItem(DateType.Year),
      new ElementOrderItem(DateType.Month),
      new ElementOrderItem(DateType.Day),
    ]
  };

  constructor(j?: WidgetElement) {
    if (j) {
      if (!j.Preview) return null
      let index = j.Preview.findIndex((item) => item.LangCode === LangCodeType.All.json)
      this.previewImageIndex = index >= 0 ? index : 0
      this.activitys = getActivityListFromJson(j.Activity)

      this.date = new WatchDate();
      let newOrderElementsDate: ElementOrderItem[] = [];
      if (j.Date?.DateDigits) {
        j.Date.DateDigits.forEach((d) => {
          switch (d.DateType) {
            case DateType.Month.json:
              if (d.Digit.DisplayFormAnalog) {
                this.date.monthAsWord = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.monthasword);
                newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
              } else {
                this.date.month = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.month);
                newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
              }
              break;
            case DateType.Day.json:
              this.date.day = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.day);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Day));
              break;
            default:
              this.date.year = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.year);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Year));
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
    }
  }
}

export class WatchWidget {
  collapsed = true;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  widgetElementsCollapsed = true;
  widgetElements: WatchWidgetElement[] = [];
  borderActivImageIndex: number;
  borderInactivImageIndex: number;
  descriptionImageBackground: WatchImageCoords = new WatchImageCoords();
  descriptionWidthCheck: number = 0;

  constructor(j?: Widget) {
    if ( j) {
      this.x = j.X ? j.X : 0;
      this.y = j.Y ? j.Y : 0;
      this.width = j.Width;
      this.height = j.Height;
      this.widgetElements = []
      if (j.WidgetElement) {
        j.WidgetElement.forEach((item) => {
          this.widgetElements.push(new WatchWidgetElement(item))
        });
      }
      this.borderActivImageIndex = j.BorderActivImageIndex;
      this.borderInactivImageIndex = j.BorderInactivImageIndex;
      this.descriptionImageBackground = new WatchImageCoords(j.DescriptionImageBackground)
      this.descriptionWidthCheck = j.DescriptionWidthCheck
    }
  }
}

export class WatchWidgets {
  enabled: boolean
  collapsed = true;
  topMaskImageIndex: number
  underMaskImageIndex: number
  showTimeOnEditScreen: number
  widgets: WatchWidget[] = []

  constructor(json?: Widgets) {
    if (json) {
      this.enabled = true
      this.topMaskImageIndex = json.TopMaskImageIndex
      this.underMaskImageIndex = json.UnderMaskImageIndex
      this.showTimeOnEditScreen = json.Unknown4
      this.widgets = []
      if (json.Widget) {
        this.widgets = json.Widget.map((wi) => new WatchWidget(wi))
      }
    }
  }
}

export default class WatchFace {
  background: Background = new Background();
  dialFace: WatchDialFace = new WatchDialFace();
  date: WatchDate = new WatchDate();
  activitylistCollapsed = true;
  activity: WatchActivity[] = [];
  status = new WatchStatus();
  widgets = new WatchWidgets(null)
  aod = new WatchAOD(null)

  constructor(j?: WatchJson) {
    if (!j) return;

    this.background = new Background();
    this.dialFace = new WatchDialFace();
    this.date = new WatchDate();
    this.activity = [];
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
          case DateType.Month.json:
            if (d.Digit.DisplayFormAnalog) {
              this.date.monthAsWord = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.monthasword);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            } else {
              this.date.month = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.month);
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            }
            break;
          case DateType.Day.json:
            this.date.day = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.day);
            newOrderElementsDate.push(new ElementOrderItem(DateType.Day));
            break;
          default:
            this.date.year = new WatchCommonDigit(TypeOfDigit.DATE, d, digitTypes.year);
            newOrderElementsDate.push(new ElementOrderItem(DateType.Year));
            break;
        }
      });
    }
    this.date.orderElements.forEach((el) => {
      if (!newOrderElementsDate.find((s) => s.type === el.type))
        newOrderElementsDate.push(el);
    });
    this.date.orderElements = newOrderElementsDate;

    this.date.weekDay = new WatchCommonDigit(TypeOfDigit.COMMON,
      j.System?.Date?.WeeksDigits,
      digitTypes.weekday
    );

    this.status = new WatchStatus(j.System?.Status);

    this.activity = getActivityListFromJson(j.System?.Activity)

    this.widgets = new WatchWidgets(j.Widgets)
    this.aod = new WatchAOD(j.ScreenIdle)
  }
}
