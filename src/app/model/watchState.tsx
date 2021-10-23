export class WatchState {
  _date = new Date();
  year = this._date.getFullYear();
  month = this._date.getMonth() + 1;
  monthasword = this._date.getMonth();
  day = this._date.getDate();
  hours = this._date.getHours();
  minutes = this._date.getMinutes();
  seconds = this._date.getSeconds();
  weekday = this._date.getDay() > 0 ? this._date.getDay() - 1 : 6;
  battery = Math.round(Math.random() * 100);
  stepsGoal = (Math.round(Math.random() * 5) + 5) * 1000;
  steps = Math.round(Math.random() * this.stepsGoal);
  calories = Math.round(Math.random() * 200);
  hearthrate = Math.round(Math.random() * 200);
  distance = Math.round(Math.random() * 1000) + 1000;
  pai = Math.round(Math.random() * 100);
  standup = Math.round(Math.random() * 12);
  bluetooth = true;
  dnd = true;
  lock = false;
  alarm = true;
  temperature = Math.round(Math.random() * 10);
  temperatureMin = this.temperature - Math.round(Math.random() * 10)
  temperatureMax = this.temperature + Math.round(Math.random() * 10)
  weatherIcon = Math.round(Math.random() * 29);
}
