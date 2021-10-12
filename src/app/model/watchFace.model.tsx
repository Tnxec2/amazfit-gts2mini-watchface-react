
export class Background {
    imageIndex = null
    previewIndex = null
    color = null
}

export class Digit {
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

    constructor(type = 0, count = 1, numberLenght = 1, displayFormAnalog = false) {
        this.digitType = type
        this.imageCount = count
        this.numberLenght = numberLenght
        this.displayFormAnalog = displayFormAnalog
    }
}

export class WatchTimeDigital {
    hours = new Digit(0, 10, 2)
    minutes = new Digit(1, 10, 2)
    seconds = new Digit(2, 10, 2)
    enableHours = false
    enableMinutes = false
    enableSeconds = false
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

export class ElementOrderItem {
    constructor(
        public type: number,
        public title: string
    ) {
        
    }
}

export default class WatchFace {

    background = new Background()
    timeDigital = new WatchTimeDigital()
    date = new WatchDate()

    orderElements = {
        orderElementsTime: [ new ElementOrderItem(0, 'hours'), new ElementOrderItem(1, 'minutes'), new ElementOrderItem(2, 'seconds')],
        orderElementsDate: [ new ElementOrderItem(0, 'year'), new ElementOrderItem(1, 'month'), new ElementOrderItem(2, 'day')]
    }
}