
export class WatchState {
    time = new Date()
    year = this.time.getFullYear()
    month = this.time.getMonth() + 1
    monthasword = this.time.getMonth()
    day = this.time.getDate()
    hours = 9 //this.time.getHours()
    minutes = this.time.getMinutes()
    seconds = this.time.getSeconds()
    weekday = this.time.getDay()+1
}