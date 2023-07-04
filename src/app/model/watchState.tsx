export class WatchState {
  _date = new Date();
  year = this._date.getFullYear();
  month = this._date.getMonth() + 1;
  monthasword = this._date.getMonth();
  day = this._date.getDate();
  hours = this._date.getHours();
  minutes = this._date.getMinutes();
  
  alarmEnabled = true;
  alarmHours = this._date.getHours();
  alarmMinutes = this._date.getMinutes();

  sunsetNoData = false;
  sunsetHours = 17;
  sunsetMinutes = 42;
  sunriseHours = 5;
  sunriseMinutes = 38;

  seconds = this._date.getSeconds();
  weekday = this._date.getDay() > 0 ? this._date.getDay() - 1 : 6;

  batteryNoData = false;
  batteryGoal = 100;
  battery = Math.round(Math.random() * this.batteryGoal);

  stepsNoData = false;
  stepsGoal = (Math.round(Math.random() * 5) + 5) * 1000;
  steps = Math.round(Math.random() * this.stepsGoal);

  caloriesNoData = false;
  caloriesGoal = 200;
  calories = Math.round(Math.random() * this.caloriesGoal);

  hearthRateNoData = false;
  hearthrateGoal = 220
  hearthrate = Math.round(Math.random() * 200);

  distance = Math.round(Math.random() * 1000) + 1000;

  paiGoal = 100;
  pai = Math.round(Math.random() * this.paiGoal);

  standupGoal = 12;
  standup = Math.round(Math.random() * this.standupGoal);

  bluetooth = true;
  dnd = true;
  lock = false;
  alarm = true;
  
  tempNoData = false;

  temperature = Math.round(Math.random() * 10);
  temperatureMin = this.temperature - Math.round(Math.random() * 10)
  temperatureMax = this.temperature + Math.round(Math.random() * 10)
  weatherIcon = Math.round(Math.random() * 29);
  
  uvNoData = false;
  uvIndexGoal = 11
  uvIndex = Math.round(Math.random() * this.uvIndexGoal)


  airQualityGoal = 500
  airQuality = Math.round(Math.random() * this.airQualityGoal)

  humidityNoData = false;
  humidityGoal = 100
  humidity = Math.round(Math.random() * this.humidityGoal)
  
  windForce = Math.round(Math.random() * 12)

  airPressureGoal = 100
  airPressure = Math.round(Math.random() * this.airPressureGoal)

  stressGoal = 100
  stress = Math.round(Math.random() * this.stressGoal)
  spo2Goal = 100
  spo2 = Math.round(Math.random() * this.spo2Goal)

  fatBurningGoal = 30
  fatBurning = Math.round(Math.random() * this.fatBurningGoal)

  animation: number[] = []
}
