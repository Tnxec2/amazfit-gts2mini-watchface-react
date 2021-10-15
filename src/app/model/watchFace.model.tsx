import Color from "../../shared/color"
import { Constant } from "./constant"
import { ActivityType, DigitalCommonDigit, DigitalDateDigit, DigitalTimeDigit, ImageCoord, WatchJson, Status, TimeType, DateType, JsonType, ImageProgress, ImageProgressDisplayType, 
    DigitType, FollowType, AlignmentType, LangCodeType, ClockHand } from "./json.model"

export class Background {
    imageIndex = null
    previewIndex = null
    color = null
}


export class Coords {
    x: number = 0
    y: number = 0

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
}
export class WatchImageCoords extends Coords {
    updateFromJson(Separator: ImageCoord) {
        if (Separator) {
            if (Separator.ImageIndex) {
                this.imageIndex = Separator.ImageIndex - Constant.startImageIndex
            }
            this.x = Separator.Coordinates.X
            this.y = Separator.Coordinates.Y
        }
    }
    imageIndex = null
}

export class WatchImageProgress {
    updateFromJson(ip: ImageProgress) {
        this.imageIndex = ip.ImageSet.ImageIndex - Constant.startImageIndex
        this.imageCount = ip.ImageSet.ImagesCount
        this.displayType = ImageProgressDisplayType.fromJson(ip.DisplayType)
        this.coordinates = []
        ip.Coordinates.forEach(coords => {
            this.coordinates.push(new Coords(coords.X, coords.Y))
        })
    }
    enabled = false
    imageIndex: number = null
    imageCount: number = 1
    displayType: number = 0
    coordinates: Coords[] = [new Coords()]
}

export class Digit {
    updateFromJson(d: DigitalTimeDigit | DigitalDateDigit | DigitalCommonDigit) {
        let ix = 0
        if ( d.Digit.Image.MultilangImage ) {
            d.Digit.Image.MultilangImage.forEach((image, index) => {
                if (image.LangCode === LangCodeType.All.json) {
                    ix = index
                }
            })
        }
        if ( d.Digit.Image.MultilangImage && d.Digit.Image.MultilangImage[ix]?.ImageSet?.ImageIndex ) {
            this.imageIndex = d.Digit.Image.MultilangImage[ix].ImageSet.ImageIndex - Constant.startImageIndex
        }
        this.x = d.Digit.Image.X
        this.y = d.Digit.Image.Y
        this.follow = d.CombingMode === FollowType.Follow.json
        this.paddingZero = d.Digit.PaddingZero
        this.spacing = d.Digit.Spacing
        this.displayFormAnalog = d.Digit.DisplayFormAnalog
        this.alignment =  AlignmentType.fromJson(d.Digit.Alignment)
        if ( d.Digit.Image.NoDataImageIndex ) {
            this.noDataImageIndex = d.Digit.Image.NoDataImageIndex - Constant.startImageIndex
        }
        if ( d.Digit.Image.DecimalPointImageIndex ) {
            this.decimalPointImageIndex = d.Digit.Image.DecimalPointImageIndex - Constant.startImageIndex
        }
        if ( d.Digit.Image.DelimiterImageIndex ) {
            this.delimiterImageIndex = d.Digit.Image.DelimiterImageIndex - Constant.startImageIndex
        }
        ix = 0
        if ( d.Digit.Image.MultilangImageUnit ) {
            d.Digit.Image.MultilangImageUnit.forEach((image, index) => {
                if (image.LangCode === LangCodeType.All.json) {
                    ix = index
                }
            })
        }
        if ( d.Digit.Image.MultilangImageUnit && d.Digit.Image.MultilangImageUnit[ix]?.ImageSet?.ImageIndex ) {
            this.unitImageIndex = d.Digit.Image.MultilangImageUnit[ix].ImageSet.ImageIndex - Constant.startImageIndex
        }
        this.separator.updateFromJson(d.Separator)
    }

    digitType = 0
    imageIndex = null
    imageCount = 1
    x = null
    y = null
    follow = false
    paddingZero = false
    spacing = 0
    displayFormAnalog = false
    /* 
    alignment:
        Left = 0
        Center = 1
        Right = 2
    */
    alignment = 0
    numberLenght = 1
    noDataImageIndex = null
    decimalPointImageIndex = null
    delimiterImageIndex = null
    unitImageIndex = null

    separator = new WatchImageCoords()

    enabled = false

    constructor(type = 0, count = 1, numberLenght = 1, displayFormAnalog = false) {
        this.digitType = type
        this.imageCount = count
        this.numberLenght = numberLenght
        this.displayFormAnalog = displayFormAnalog
    }
}
export class WatchClockHand extends Coords{
    scaleImageIndex: number
    scaleX: number
    scaleY: number
    pointerImageIndex: number
    pointerX: number
    pointerY: number
    coverImageIndex: number
    coverX: number
    coverY: number
    startAngle: number
    endAngle: number

    updateFromJson(json: ClockHand) {
        if ( json.Scale?.ImageSet ) {
            let scaleSet = json.Scale.ImageSet[0]
            json.Scale.ImageSet.forEach(is => {
                if (is.LangCode === LangCodeType.All.json) {
                    scaleSet = is; 
                }
            })
            if ( scaleSet.ImageSet) {
                if (scaleSet.ImageSet.ImageIndex) this.scaleImageIndex = scaleSet.ImageSet.ImageIndex- Constant.startImageIndex
            }
            this.scaleX = json.Scale?.Coordinates.X
            this.scaleY = json.Scale?.Coordinates.Y
        }
        this.x = json.X
        this.y = json.Y
        if (json.Pointer) {
            this.pointerImageIndex = json.Pointer.ImageIndex- Constant.startImageIndex
            this.pointerX = json.Pointer.Coordinates?.X
            this.pointerY = json.Pointer.Coordinates?.Y
        }
        if (json.Cover) {
            this.coverImageIndex = json.Cover.ImageIndex- Constant.startImageIndex
            this.coverX = json.Cover.Coordinates?.X
            this.coverY = json.Cover.Coordinates?.Y
        }
        this.startAngle = json.StartAngle
        this.endAngle = json.EndAngle
    }
}

export class WatchDialFace {
    hoursDigital = new Digit(0, 10, 2)
    minutesDigital = new Digit(1, 10, 2)
    secondsDigital = new Digit(2, 10, 2)
    hoursClockhand = new WatchClockHand()
    minutesClockhand = new WatchClockHand()
    secondsClockhand = new WatchClockHand()
    enableHoursDigital = false
    enableMinutesDigital = false
    enableSecondsDigital = false
    enableHoursClockhand = false
    enableMinutesClockhand = false
    enableSecondsClockhand = false
}


export class WatchDate {
    year = new Digit(0, 10, 4)
    month = new Digit(1, 10, 2)
    day = new Digit(2, 10, 2)
    monthAsWord = new Digit(1, 12, 1, true)
    weekDay = new Digit(0, 7, 1, true)
    enableYear = false
    enableMonth = false
    enableDay = false
    enableMonthAsWord = false
    enableWeekDay = false
}

export class WatchStatus {
    updateFromJson(s: Status) {
        if (s.Bluetooth?.ImageIndex) {
            this.enableBluetooth = true
            this.bluetooth.updateFromJson(s.Bluetooth)
        }
        if (s.Lock?.ImageIndex) {
            this.enableLock = true
            this.lock.updateFromJson(s.Lock)
        }
        if (s.DoNotDisturb?.ImageIndex) {
            this.enableDnd = true
            this.dnd.updateFromJson(s.DoNotDisturb)
        }
        if (s.Alarm?.ImageIndex) {
            this.enableAlarm = true
            this.alarm.updateFromJson(s.Alarm)
        }
    }
    bluetooth = new WatchImageCoords()
    dnd = new WatchImageCoords()
    alarm = new WatchImageCoords()
    lock = new WatchImageCoords()
    enableBluetooth = false
    enableDnd = false
    enableAlarm = false
    enableLock = false
}
export class WatchActivity {
    digit: Digit
    imageProgress = new WatchImageProgress()

    constructor(type = 0, count = 1, numberLenght = 1, displayFormAnalog = false, imageProgressCount = 10) {
        this.digit = new Digit(type, count, numberLenght, displayFormAnalog)
        this.imageProgress.imageCount = imageProgressCount
    }
}
export class WatchActivityList {
    battery = new WatchActivity(0, 10, 3)
    steps = new WatchActivity(0, 10, 5)
    calories = new WatchActivity(0, 10, 4)
    heartRate = new WatchActivity(0, 10, 3, false, 6)
    pai = new WatchActivity(0, 10, 3)
    distance = new WatchActivity(0, 10, 4)
    standUp = new WatchActivity(0, 10, 2)
    weather = new WatchActivity(0, 10, 2, false, 29)
    weatherMin = new WatchActivity(1, 10, 2, false, 29)
    weatherMax = new WatchActivity(2, 10, 2, false, 29)
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
    public type: number
    public title: string
    constructor(jsonType: JsonType) {
        this.type = jsonType.index
        this.title = jsonType.json
    }
}

export default class WatchFace {

    background = new Background()
    dialFace = new WatchDialFace()
    date = new WatchDate()
    activity = new WatchActivityList()
    status = new WatchStatus()

    orderElements = {
        orderElementsTime: [ 
            new ElementOrderItem(TimeType.Hour), 
            new ElementOrderItem(TimeType.Minute), 
            new ElementOrderItem(TimeType.Second)],
        orderElementsDate: [
            new ElementOrderItem(DateType.Year), 
            new ElementOrderItem(DateType.Month), 
            new ElementOrderItem(DateType.Day)],
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
        ]
    }

    updateFormJson(j: WatchJson) {

        this.background.color = Color.colorBackgroundRead(j.Background.Color)
        this.background.imageIndex = j.Background.BackgroundImageIndex - Constant.startImageIndex
        let ix = 0
        j.Background.Preview.forEach( (item, index) => {
            if (item.LangCode === LangCodeType.All.json) {
                ix = index 
            }
        })
        this.background.previewIndex = j.Background.Preview[ix].ImageSet.ImageIndex - Constant.startImageIndex

        this.dialFace = new WatchDialFace()
        let newOrderElementsTime: ElementOrderItem[] = []
        if ( j.DialFace?.DigitalDialFace.Digits ) {
            j.DialFace.DigitalDialFace.Digits.forEach(d => {
                switch (d.TimeType) {
                    case TimeType.Hour.json:
                        this.dialFace.enableHoursDigital = true
                        this.dialFace.hoursDigital.updateFromJson(d)
                        newOrderElementsTime.push(new ElementOrderItem(TimeType.Hour))
                        break;
                    case TimeType.Minute.json:
                        this.dialFace.enableMinutesDigital = true
                        this.dialFace.minutesDigital.updateFromJson(d)
                        newOrderElementsTime.push(new ElementOrderItem(TimeType.Minute))
                        break;
                    case TimeType.Second.json:
                        this.dialFace.enableSecondsDigital = true
                        this.dialFace.secondsDigital.updateFromJson(d)
                        newOrderElementsTime.push(new ElementOrderItem(TimeType.Second))
                        break;
                    default:
                        break;
                }
            })
        }
        this.orderElements.orderElementsTime.forEach(el => {
            if ( !newOrderElementsTime.find( s => s.type === el.type) ) newOrderElementsTime.push(el)
        })
        this.orderElements.orderElementsTime = newOrderElementsTime

        if ( j.DialFace?.AnalogDialFace?.Hours ) {
            this.dialFace.enableHoursClockhand = true
            this.dialFace.hoursClockhand.updateFromJson(j.DialFace.AnalogDialFace.Hours)
        }
        if ( j.DialFace?.AnalogDialFace?.Minutes ) {
            this.dialFace.enableMinutesClockhand = true
            this.dialFace.minutesClockhand.updateFromJson(j.DialFace.AnalogDialFace.Minutes)
        }
        if ( j.DialFace?.AnalogDialFace?.Seconds ) {
            this.dialFace.enableSecondsClockhand = true
            this.dialFace.secondsClockhand.updateFromJson(j.DialFace.AnalogDialFace.Seconds)
        }

        this.date = new WatchDate()
        let newOrderElementsDate: ElementOrderItem[] = []
        if (j.System?.Date?.DateDigits) {
            j.System.Date.DateDigits.forEach(d => {
                switch (d.DateType) {
                    case DateType.Year.json:
                        this.date.enableYear = true
                        this.date.year.updateFromJson(d)
                        newOrderElementsDate.push(new ElementOrderItem(DateType.Year))
                        break;
                    case DateType.Month.json:
                        if ( d.Digit.DisplayFormAnalog ) {
                            this.date.enableMonthAsWord = true
                            this.date.monthAsWord.updateFromJson(d)
                            newOrderElementsDate.push(new ElementOrderItem(DateType.Month))
                        } else {
                            this.date.enableMonth = true
                            this.date.month.updateFromJson(d)
                            newOrderElementsDate.push(new ElementOrderItem(DateType.Month))
                        }
                        break;
                    case DateType.Day.json:
                        this.date.enableDay = true
                        this.date.day.updateFromJson(d)
                        newOrderElementsDate.push(new ElementOrderItem(DateType.Day))
                        break;
                    default:
                        break;
                }
            })
        }
        this.orderElements.orderElementsDate.forEach(el => {
            if ( !newOrderElementsDate.find( s => s.type === el.type) ) newOrderElementsDate.push(el)
        })
        this.orderElements.orderElementsDate = newOrderElementsDate

        if (j.System?.Date?.WeeksDigits) {
            this.date.enableWeekDay = true
            this.date.weekDay.updateFromJson(j.System.Date.WeeksDigits)
        }

        this.status = new WatchStatus()
        if (j.System?.Status) {
            this.status.updateFromJson(j.System.Status)
        }

        this.activity = new WatchActivityList()
        if (j.System?.Activity) {
            j.System.Activity.forEach(a => {
                switch (a.Type) {
                    case ActivityType.Battery.json:
                        if (a.Digits){
                            this.activity.battery.digit.enabled = true
                            this.activity.battery.digit.updateFromJson(a.Digits[0])
                        }
                        if (a.ImageProgress) {
                            this.activity.battery.imageProgress.enabled = true
                            this.activity.battery.imageProgress.updateFromJson(a.ImageProgress)
                        }
                        break;
                    case ActivityType.Steps.json:
                        if (a.Digits){
                            this.activity.steps.digit.enabled = true
                            this.activity.steps.digit.updateFromJson(a.Digits[0])
                        }
                        if (a.ImageProgress) {
                            this.activity.steps.imageProgress.enabled = true
                            this.activity.steps.imageProgress.updateFromJson(a.ImageProgress)
                        }
                        break;
                    case ActivityType.Calories.json:
                        if (a.Digits){
                            this.activity.calories.digit.enabled = true
                            this.activity.calories.digit.updateFromJson(a.Digits[0])
                        }
                        if (a.ImageProgress) {
                            this.activity.calories.imageProgress.enabled = true
                            this.activity.calories.imageProgress.updateFromJson(a.ImageProgress)
                        }

                        break;
                    case ActivityType.HeartRate.json:
                        if (a.Digits){
                            this.activity.heartRate.digit.enabled = true
                            this.activity.heartRate.digit.updateFromJson(a.Digits[0])
                        }
                        if (a.ImageProgress) {
                            this.activity.heartRate.imageProgress.enabled = true
                            this.activity.heartRate.imageProgress.updateFromJson(a.ImageProgress)
                        }

                        break;
                    case ActivityType.Pai.json:
                        if (a.Digits){
                            this.activity.pai.digit.enabled = true
                            this.activity.pai.digit.updateFromJson(a.Digits[0])
                        }
                        if (a.ImageProgress) {
                            this.activity.pai.imageProgress.enabled = true
                            this.activity.pai.imageProgress.updateFromJson(a.ImageProgress)
                        }

                        break;
                    case ActivityType.Distance.json:
                        if (a.Digits){
                            this.activity.distance.digit.enabled = true
                            this.activity.distance.digit.updateFromJson(a.Digits[0])
                        }
                        if (a.ImageProgress) {
                            this.activity.distance.imageProgress.enabled = true
                            this.activity.distance.imageProgress.updateFromJson(a.ImageProgress)
                        }

                        break;
                    case ActivityType.StandUp.json:
                        if (a.Digits){
                            this.activity.standUp.digit.enabled = true
                            this.activity.standUp.digit.updateFromJson(a.Digits[0])
                        }
                        if (a.ImageProgress) {
                            this.activity.standUp.imageProgress.enabled = true
                            this.activity.standUp.imageProgress.updateFromJson(a.ImageProgress)
                        }

                        break;
                    case ActivityType.Weather.json:
                        if (a.Digits){
                            a.Digits.forEach(digit => {
                                if (digit.Type === DigitType.Min.json) {
                                    this.activity.weatherMin.digit.enabled = true
                                    this.activity.weatherMin.digit.updateFromJson(digit)
                                } else if (digit.Type === DigitType.Max.json) {
                                    this.activity.weatherMax.digit.enabled = true
                                    this.activity.weatherMax.digit.updateFromJson(digit)
                                } else {
                                    this.activity.weather.digit.enabled = true
                                    this.activity.weather.digit.updateFromJson(digit)
                                }
                            })
                        }
                        if (a.ImageProgress) {
                            this.activity.weather.imageProgress.enabled = true
                            this.activity.weather.imageProgress.updateFromJson(a.ImageProgress)
                        }
                        break;
                    default:
                        break;
                }
                if (a.Digits) {

                }
            })
        }
    }
}