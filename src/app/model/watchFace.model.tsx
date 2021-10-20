import Color from "../../shared/color";

import {
  ActivityType,
  DigitalCommonDigit,
  DigitalDateDigit,
  DigitalTimeDigit,
  ImageCoord,
  WatchJson,
  Status,
  TimeType,
  DateType,
  JsonType,
  ImageProgress,
  ImageProgressDisplayType,
  DigitType,
  FollowType,
  AlignmentType,
  LangCodeType,
  ClockHand,
  ProgressBar,
  Shortcut,
  ScreenIdle,
  Widget,
  Widgets,
} from "./json.model";

interface IDigitConstructor {
  type: number;
  count: number;
  numberLenght: number;
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
  },
  min: {
    type: TimeType.Minute.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  sec: {
    type: TimeType.Second.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  year: {
    type: DateType.Year.index,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  month: {
    type: DateType.Month.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  monthasword: {
    type: DateType.Month.index,
    count: 12,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: null,
  },
  day: {
    type: DateType.Day.index,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  weekday: {
    type: 0,
    count: 7,
    numberLenght: 1,
    displayAnalog: true,
    imageProgressTotal: null,
  },
  battery: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  steps: {
    type: 0,
    count: 10,
    numberLenght: 5,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  calories: {
    type: 0,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  heartRate: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: 6,
  },
  pai: {
    type: 0,
    count: 10,
    numberLenght: 3,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  distance: {
    type: 0,
    count: 10,
    numberLenght: 4,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  standUp: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: null,
  },
  weather: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 29,
  },
  weatherMin: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 29,
  },
  weatherMax: {
    type: 0,
    count: 10,
    numberLenght: 2,
    displayAnalog: false,
    imageProgressTotal: 29,
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
export class WatchImageCoords extends Coords {
  constructor(ic?: ImageCoord) {
    super();
    if (ic) {
      if (ic.ImageIndex) {
        this.imageIndex = ic.ImageIndex;
      }
      this.x = ic.Coordinates.X;
      this.y = ic.Coordinates.Y;
    }
  }
  imageIndex = null;
  enabled = false;
}

export class WatchImageProgress {
  constructor(ip?: ImageProgress) {
    if (ip) {
      this.imageIndex = ip.ImageSet.ImageIndex;
      this.imageCount = ip.ImageSet.ImagesCount;
      this.displayType = ImageProgressDisplayType.fromJson(ip.DisplayType);
      this.coordinates = [];
      ip.Coordinates.forEach((coords) => {
        this.coordinates.push(new Coords(coords.X, coords.Y));
      });
    }
  }
  enabled = false;
  imageIndex: number = null;
  imageCount: number = 1;
  displayType: number = 0;
  coordinates: Coords[] = [new Coords()];
}

export class Digit {
  constructor(
    d?: DigitalTimeDigit | DigitalDateDigit | DigitalCommonDigit,
    con?: IDigitConstructor
  ) {
    if (con) {
      this.digitType = con.type;
      this.imageCount = con.count;
      this.numberLenght = con.numberLenght;
      this.displayFormAnalog = con.displayFormAnalog;
    }
    if (d) {
      let ix = 0;
      if (d.Digit.Image.MultilangImage) {
        d.Digit.Image.MultilangImage.forEach((image, index) => {
          if (image.LangCode === LangCodeType.All.json) {
            ix = index;
          }
        });
      }
      if (
        d.Digit.Image.MultilangImage &&
        d.Digit.Image.MultilangImage[ix]?.ImageSet?.ImageIndex
      ) {
        this.imageIndex = d.Digit.Image.MultilangImage[ix].ImageSet.ImageIndex;
        this.imageCount = d.Digit.Image.MultilangImage[ix].ImageSet.ImagesCount;
      }
      this.x = d.Digit.Image.X;
      this.y = d.Digit.Image.Y;
      this.follow = d.CombingMode === FollowType.Follow.json;
      this.paddingZero = d.Digit.PaddingZero;
      this.spacing = d.Digit.Spacing;
      this.displayFormAnalog = d.Digit.DisplayFormAnalog;
      this.alignment = AlignmentType.fromJson(d.Digit.Alignment);
      if (d.Digit.Image.NoDataImageIndex) {
        this.noDataImageIndex = d.Digit.Image.NoDataImageIndex;
      }
      if (d.Digit.Image.DecimalPointImageIndex) {
        this.decimalPointImageIndex = d.Digit.Image.DecimalPointImageIndex;
      }
      if (d.Digit.Image.DelimiterImageIndex) {
        this.delimiterImageIndex = d.Digit.Image.DelimiterImageIndex;
      }
      ix = 0;
      if (d.Digit.Image.MultilangImageUnit) {
        d.Digit.Image.MultilangImageUnit.forEach((image, index) => {
          if (image.LangCode === LangCodeType.All.json) {
            ix = index;
          }
        });
      }
      if (
        d.Digit.Image.MultilangImageUnit &&
        d.Digit.Image.MultilangImageUnit[ix]?.ImageSet?.ImageIndex
      ) {
        this.unitImageIndex =
          d.Digit.Image.MultilangImageUnit[ix].ImageSet.ImageIndex;
      }
      this.separator = new WatchImageCoords(d.Separator);
    }
  }

  digitType = 0;
  imageIndex = null;
  imageCount = 1;
  x = null;
  y = null;
  follow = false;
  paddingZero = false;
  spacing = 0;
  displayFormAnalog = false;
  /* 
    alignment:
        Left = 0
        Center = 1
        Right = 2
    */
  alignment = 0;
  numberLenght = 1;
  noDataImageIndex = null;
  decimalPointImageIndex = null;
  delimiterImageIndex = null;
  unitImageIndex = null;

  separator = new WatchImageCoords();

  enabled = false;
}
export class WatchClockHand extends Coords {
  enabled: boolean;
  scaleImageIndex: number;
  scaleX: number;
  scaleY: number;
  pointerImageIndex: number;
  pointerX: number;
  pointerY: number;
  coverImageIndex: number;
  coverX: number;
  coverY: number;
  startAngle: number;
  endAngle: number;

  constructor(json?: ClockHand) {
    super();
    if (json) {
      if (json.Scale?.ImageSet) {
        let scaleSet = json.Scale.ImageSet[0];
        json.Scale.ImageSet.forEach((is) => {
          if (is.LangCode === LangCodeType.All.json) {
            scaleSet = is;
          }
        });
        if (scaleSet.ImageSet) {
          if (scaleSet.ImageSet.ImageIndex)
            this.scaleImageIndex = scaleSet.ImageSet.ImageIndex;
        }
        this.scaleX = json.Scale?.Coordinates.X;
        this.scaleY = json.Scale?.Coordinates.Y;
      }
      this.x = json.X;
      this.y = json.Y;
      if (json.Pointer) {
        this.pointerImageIndex = json.Pointer.ImageIndex;
        this.pointerX = json.Pointer.Coordinates?.X;
        this.pointerY = json.Pointer.Coordinates?.Y;
      }
      if (json.Cover) {
        this.coverImageIndex = json.Cover.ImageIndex;
        this.coverX = json.Cover.Coordinates?.X;
        this.coverY = json.Cover.Coordinates?.Y;
      }
      this.startAngle = json.StartAngle;
      this.endAngle = json.EndAngle;
    }
  }
}

export class WatchDialFace {
  hoursDigital = new Digit(null, { type: 0, count: 10, numberLenght: 2 });
  minutesDigital = new Digit(null, { type: 1, count: 10, numberLenght: 2 });
  secondsDigital = new Digit(null, { type: 2, count: 10, numberLenght: 2 });
  hoursClockhand = new WatchClockHand();
  minutesClockhand = new WatchClockHand();
  secondsClockhand = new WatchClockHand();
  amImageIndex: number;
  amX: number;
  amY: number;
  pmImageIndex: number;
  pmX: number;
  pmY: number;
}

export class WatchDate {
  year = new Digit(null, { type: 0, count: 10, numberLenght: 4 });
  month = new Digit(null, { type: 1, count: 10, numberLenght: 2 });
  day = new Digit(null, { type: 2, count: 10, numberLenght: 2 });
  monthAsWord = new Digit(null, {
    type: 1,
    count: 12,
    numberLenght: 1,
    displayFormAnalog: true,
  });
  weekDay = new Digit(null, {
    type: 0,
    count: 7,
    numberLenght: 1,
    displayFormAnalog: true,
  });
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
  bluetooth = new WatchImageCoords();
  dnd = new WatchImageCoords();
  alarm = new WatchImageCoords();
  lock = new WatchImageCoords();
}

export class WatchProgressBar {
  enabledLinear: boolean;
  enabledCircle: boolean;
  jsonObj: ProgressBar;
}
export class WatchActivity {
  digit: Digit;
  imageProgress = new WatchImageProgress();
  pointerProgress = new WatchClockHand();
  progressBar = new WatchProgressBar();
  icon = new WatchImageCoords();
  shortcut: Shortcut = null;

  constructor(dt: IDigitConstructor) {
    this.digit = new Digit(null, dt);
    this.imageProgress.imageCount = dt.imageProgressTotal;
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
  //UVindex = new WatchActivity(0, 10, 2)
  //AirQuality = new WatchActivity(0, 10, 2)
  //Humidity = new WatchActivity(0, 10, 3)
  //Sunrise = new WatchActivity(0, 10, 1)
  //WindForce = new WatchActivity(0, 10, 2)
  //Altitude = new WatchActivity(0, 10, 3)
  //AirPressure = new WatchActivity(0, 10, 2)
  //Stress = new WatchActivity(0, 10, 2)
  //ActivityGoal = new WatchActivity(0, 10, 5)
  //FatBurning = new WatchActivity(0, 10, 2)
}

export class ElementOrderItem {
  public type: number;
  public title: string;
  constructor(jsonType: JsonType) {
    this.type = jsonType.index;
    this.title = jsonType.json;
  }
}

export class WatchAOD{
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
              this.dialFace.minutesDigital = new Digit(d, digitTypes.min);
              this.dialFace.minutesDigital.enabled = true;
              newOrderElementsTime.push(new ElementOrderItem(TimeType.Minute));
              break;
            default:
              this.dialFace.hoursDigital = new Digit(d, digitTypes.hour);
              this.dialFace.hoursDigital.enabled = true;
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

    if (j.DialFace.DigitalDialFace.AM) {
      if (j.DialFace.DigitalDialFace.AM.ImageSet) {
        let scaleSet = j.DialFace.DigitalDialFace.AM.ImageSet[0];
        j.DialFace.DigitalDialFace.AM.ImageSet.forEach((is) => {
          if (is.LangCode === LangCodeType.All.json) {
            scaleSet = is;
          }
        });
        if (scaleSet.ImageSet) {
          if (scaleSet.ImageSet[0].ImageIndex)
            this.dialFace.amImageIndex = scaleSet.ImageSet.ImageIndex;
        }
        this.dialFace.amX = j.DialFace.DigitalDialFace.AM.Coordinates.X;
        this.dialFace.amY = j.DialFace.DigitalDialFace.AM.Coordinates.Y;
      }
    }
    
    if (j.DialFace.DigitalDialFace.PM) {
      if (j.DialFace.DigitalDialFace.PM.ImageSet) {
        let scaleSet = j.DialFace.DigitalDialFace.PM.ImageSet[0];
        j.DialFace.DigitalDialFace.PM.ImageSet.forEach((is) => {
          if (is.LangCode === LangCodeType.All.json) {
            scaleSet = is;
          }
        });
        if (scaleSet.ImageSet) {
          if (scaleSet.ImageSet[0].ImageIndex)
            this.dialFace.pmImageIndex = scaleSet.ImageSet.ImageIndex;
        }
        this.dialFace.pmX = j.DialFace.DigitalDialFace.PM.Coordinates.X;
        this.dialFace.pmY = j.DialFace.DigitalDialFace.PM.Coordinates.Y;
      }
    }
    
    if (j.DialFace?.AnalogDialFace?.Hours) {
      this.dialFace.hoursClockhand = new WatchClockHand(
        j.DialFace.AnalogDialFace.Hours
      );
      this.dialFace.hoursClockhand.enabled = true;
    }
    if (j.DialFace?.AnalogDialFace?.Minutes) {
      this.dialFace.minutesClockhand = new WatchClockHand(
        j.DialFace.AnalogDialFace.Minutes
      );
      this.dialFace.minutesClockhand.enabled = true;
    }
    this.dialFace.secondsClockhand = null

    this.date = new WatchDate();
    let newOrderElementsDate: ElementOrderItem[] = [];
    if (j.Date?.DateDigits) {
      j.Date.DateDigits.forEach((d) => {
        switch (d.DateType) {
          case DateType.Year.json:
            this.date.year = new Digit(d, digitTypes.year);
            this.date.year.enabled = true;
            newOrderElementsDate.push(new ElementOrderItem(DateType.Year));
            break;
          case DateType.Month.json:
            if (d.Digit.DisplayFormAnalog) {
              this.date.monthAsWord = new Digit(d, digitTypes.month);
              this.date.monthAsWord.enabled = true;
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            } else {
              this.date.month = new Digit(d, digitTypes.monthasword);
              this.date.month.enabled = true;
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            }
            break;
          case DateType.Day.json:
            this.date.day = new Digit(d, digitTypes.day);
            this.date.day.enabled = true;
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

    if (j.Date?.WeeksDigits) {
      this.date.weekDay = new Digit(
        j.Date.WeeksDigits,
        digitTypes.weekday
      );
      this.date.weekDay.enabled = true;
    }

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
          case ActivityType.Weather.json:
            if (a.Digits) {
              a.Digits.forEach((digit) => {
                if (digit.Type === DigitType.Min.json) {
                  this.activity.weatherMin.digit = new Digit(
                    digit,
                    digitTypes.weatherMin
                  );
                  this.activity.weatherMin.digit.enabled = true;
                } else if (digit.Type === DigitType.Max.json) {
                  this.activity.weatherMax.digit = new Digit(
                    digit,
                    digitTypes.weatherMax
                  );
                  this.activity.weatherMax.digit.enabled = true;
                } else {
                  this.activity.weather.digit = new Digit(
                    digit,
                    digitTypes.weather
                  );
                  this.activity.weather.digit.enabled = true;
                }
              });
            }
            if (a.ImageProgress) {
              this.activity.weather.imageProgress = new WatchImageProgress(
                a.ImageProgress
              );
              this.activity.weather.imageProgress.enabled = true;
            }
            if (a.Icon) {
              this.activity.weather.icon = new WatchImageCoords(a.Icon);
            }
            if (a.Shortcut) {
              this.activity.weather.shortcut = a.Shortcut;
            }
            break;
          default:
            break;
        }
        if (_activity) {
          if (a.Digits) {
            _activity.digit = new Digit(a.Digits[0], _dt);
            _activity.digit.enabled = true;
          }
          if (a.ImageProgress) {
            _activity.imageProgress = new WatchImageProgress(a.ImageProgress);
            _activity.imageProgress.enabled = true;
          }
          if (a.PointerProgress) {
            _activity.pointerProgress = new WatchClockHand(a.PointerProgress);
            _activity.pointerProgress.enabled = true;
          }
          if (a.ProgressBar) {
            _activity.progressBar.jsonObj = a.ProgressBar;
            if (a.ProgressBar.LinearSettings)
              _activity.progressBar.enabledLinear = true;
            else if (a.ProgressBar.AngleSettings)
              _activity.progressBar.enabledCircle = true;
          }
          if (a.Icon) {
            _activity.icon = new WatchImageCoords(a.Icon);
            _activity.icon.enabled = true;
          }
          if (a.Shortcut) {
            _activity.shortcut = a.Shortcut;
          }
        }
      });
    }
  }
}

export class WatchWidgets {
  json: Widgets

  constructor(json: Widgets) {
    this.json = json
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
    let ix = 0;
    j.Background.Preview.forEach((item, index) => {
      if (item.LangCode === LangCodeType.All.json) {
        ix = index;
      }
    });
    this.background.previewIndex = j.Background.Preview[ix].ImageSet.ImageIndex;

    this.dialFace = new WatchDialFace();
    let newOrderElementsTime: ElementOrderItem[] = [];
    if (j.DialFace?.DigitalDialFace?.Digits) {
      j.DialFace.DigitalDialFace.Digits.forEach((d) => {
        switch (d.TimeType) {
            case TimeType.Minute.json:
              this.dialFace.minutesDigital = new Digit(d, digitTypes.min);
              this.dialFace.minutesDigital.enabled = true;
            newOrderElementsTime.push(new ElementOrderItem(TimeType.Minute));
            break;
            case TimeType.Second.json:
            this.dialFace.secondsDigital = new Digit(d, digitTypes.sec);
            this.dialFace.secondsDigital.enabled = true;
            newOrderElementsTime.push(new ElementOrderItem(TimeType.Second));
            break;
          default:
            this.dialFace.hoursDigital = new Digit(d, digitTypes.hour);
            this.dialFace.hoursDigital.enabled = true;
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

    if (j.DialFace.DigitalDialFace.AM) {
      if (j.DialFace.DigitalDialFace.AM.ImageSet) {
        let scaleSet = j.DialFace.DigitalDialFace.AM.ImageSet[0];
        j.DialFace.DigitalDialFace.AM.ImageSet.forEach((is) => {
          if (is.LangCode === LangCodeType.All.json) {
            scaleSet = is;
          }
        });
        if (scaleSet.ImageSet) {
          if (scaleSet.ImageSet[0].ImageIndex)
            this.dialFace.amImageIndex = scaleSet.ImageSet.ImageIndex;
        }
        this.dialFace.amX = j.DialFace.DigitalDialFace.AM.Coordinates.X;
        this.dialFace.amY = j.DialFace.DigitalDialFace.AM.Coordinates.Y;
      }
    }

    if (j.DialFace.DigitalDialFace.PM) {
      if (j.DialFace.DigitalDialFace.PM.ImageSet) {
        let scaleSet = j.DialFace.DigitalDialFace.PM.ImageSet[0];
        j.DialFace.DigitalDialFace.PM.ImageSet.forEach((is) => {
          if (is.LangCode === LangCodeType.All.json) {
            scaleSet = is;
          }
        });
        if (scaleSet.ImageSet) {
          if (scaleSet.ImageSet[0].ImageIndex)
            this.dialFace.pmImageIndex = scaleSet.ImageSet.ImageIndex;
        }
        this.dialFace.pmX = j.DialFace.DigitalDialFace.PM.Coordinates.X;
        this.dialFace.pmY = j.DialFace.DigitalDialFace.PM.Coordinates.Y;
      }
    }

    if (j.DialFace?.AnalogDialFace?.Hours) {
      this.dialFace.hoursClockhand = new WatchClockHand(
        j.DialFace.AnalogDialFace.Hours
      );
      this.dialFace.hoursClockhand.enabled = true;
    }
    if (j.DialFace?.AnalogDialFace?.Minutes) {
      this.dialFace.minutesClockhand = new WatchClockHand(
        j.DialFace.AnalogDialFace.Minutes
      );
      this.dialFace.minutesClockhand.enabled = true;
    }
    if (j.DialFace?.AnalogDialFace?.Seconds) {
      this.dialFace.secondsClockhand = new WatchClockHand(
        j.DialFace.AnalogDialFace.Seconds
      );
      this.dialFace.secondsClockhand.enabled = true;
    }

    this.date = new WatchDate();
    let newOrderElementsDate: ElementOrderItem[] = [];
    if (j.System?.Date?.DateDigits) {
      j.System.Date.DateDigits.forEach((d) => {
        switch (d.DateType) {
          case DateType.Year.json:
            this.date.year = new Digit(d, digitTypes.year);
            this.date.year.enabled = true;
            newOrderElementsDate.push(new ElementOrderItem(DateType.Year));
            break;
          case DateType.Month.json:
            if (d.Digit.DisplayFormAnalog) {
              this.date.monthAsWord = new Digit(d, digitTypes.month);
              this.date.monthAsWord.enabled = true;
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            } else {
              this.date.month = new Digit(d, digitTypes.monthasword);
              this.date.month.enabled = true;
              newOrderElementsDate.push(new ElementOrderItem(DateType.Month));
            }
            break;
          case DateType.Day.json:
            this.date.day = new Digit(d, digitTypes.day);
            this.date.day.enabled = true;
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

    if (j.System?.Date?.WeeksDigits) {
      this.date.weekDay = new Digit(
        j.System.Date.WeeksDigits,
        digitTypes.weekday
      );
      this.date.weekDay.enabled = true;
    }

    this.status = new WatchStatus();
    if (j.System?.Status) {
      this.status = new WatchStatus(j.System.Status);
    }

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
          case ActivityType.Weather.json:
            if (a.Digits) {
              a.Digits.forEach((digit) => {
                if (digit.Type === DigitType.Min.json) {
                  this.activity.weatherMin.digit = new Digit(
                    digit,
                    digitTypes.weatherMin
                  );
                  this.activity.weatherMin.digit.enabled = true;
                } else if (digit.Type === DigitType.Max.json) {
                  this.activity.weatherMax.digit = new Digit(
                    digit,
                    digitTypes.weatherMax
                  );
                  this.activity.weatherMax.digit.enabled = true;
                } else {
                  this.activity.weather.digit = new Digit(
                    digit,
                    digitTypes.weather
                  );
                  this.activity.weather.digit.enabled = true;
                }
              });
            }
            if (a.ImageProgress) {
              this.activity.weather.imageProgress = new WatchImageProgress(
                a.ImageProgress
              );
              this.activity.weather.imageProgress.enabled = true;
            }
            if (a.Icon) {
              this.activity.weather.icon = new WatchImageCoords(a.Icon);
            }
            if (a.Shortcut) {
              this.activity.weather.shortcut = a.Shortcut;
            }
            break;
          default:
            break;
        }
        if (_activity) {
          if (a.Digits) {
            _activity.digit = new Digit(a.Digits[0], _dt);
            _activity.digit.enabled = true;
          }
          if (a.ImageProgress) {
            _activity.imageProgress = new WatchImageProgress(a.ImageProgress);
            _activity.imageProgress.enabled = true;
          }
          if (a.PointerProgress) {
            _activity.pointerProgress = new WatchClockHand(a.PointerProgress);
            _activity.pointerProgress.enabled = true;
          }
          if (a.ProgressBar) {
            _activity.progressBar.jsonObj = a.ProgressBar;
            if (a.ProgressBar.LinearSettings)
              _activity.progressBar.enabledLinear = true;
            else if (a.ProgressBar.AngleSettings)
              _activity.progressBar.enabledCircle = true;
          }
          if (a.Icon) {
            _activity.icon = new WatchImageCoords(a.Icon);
            _activity.icon.enabled = true;
          }
          if (a.Shortcut) {
            _activity.shortcut = a.Shortcut;
          }
        }
      });
    }

    if (j.Widgets) {
      this.widgets = new WatchWidgets(j.Widgets)
    }
    if (j.ScreenIdle) {
      this.aod = new WatchAOD(j.ScreenIdle)
    }
  }
}
