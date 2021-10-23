export class JsonType {
    constructor(public index: number, public json: string) {}
  }
  
  export class LangCodeType {
    static Zh = new JsonType(0, "Zh");
    static ZhHant = new JsonType(1, "ZhHant");
    static All = new JsonType(2, "All");
  
    static toJson(index: number) {
      if (index === undefined) return this.Zh.json;
      return Object.values(LangCodeType).find((val) => val.index === index).json;
    }
    static fromJson(json: string) {
      if (json === undefined) return this.Zh.index;
      return Object.values(LangCodeType).find((val) => val.json === json).index;
    }
  }
  
  export class AlignmentType {
    static Left = new JsonType(0, "Left");
    static Center = new JsonType(1, "Center");
    static Right = new JsonType(2, "Right");
  
    static toJson(index: number) {
      if (index === undefined) return this.Left.json;
      return Object.values(AlignmentType).find((val) => val.index === index).json;
    }
    static fromJson(json: string) {
      if (json === undefined) return this.Left.index;
      return Object.values(AlignmentType).find((val) => val.json === json).index;
    }
  }
  
  export class FollowType {
    static Follow = new JsonType(0, "Follow");
    static Single = new JsonType(1, "Single");
  
    static toJson(index: number) {
      if (index === undefined) return this.Follow.json;
      return Object.values(FollowType).find((val) => val.index === index).json;
    }
    static fromJson(json: string) {
      if (json === undefined) return this.Follow.index;
      return Object.values(FollowType).find((val) => val.json === json).index;
    }
  }
  
  export class CommonType {
    static Default = new JsonType(0, null);
    static Min = new JsonType(1, "Min");
    static Max = new JsonType(2, "Max");
  
    static toJson(index: number) {
      if (index === undefined) return this.Default.json;
      return Object.values(CommonType).find((val) => val.index === index).json;
    }
    static fromJson(json: string) {
      if (json === undefined) return this.Default.index;
      return Object.values(CommonType).find((val) => val.json === json).index;
    }
  }
  
  export class ImageProgressDisplayType {
    static Single = new JsonType(0, "Single");
    static Continuous = new JsonType(1, "Continuous");
  
    static toJson(index: number) {
      if (index === undefined) return this.Single.json;
      return Object.values(ImageProgressDisplayType).find((val) => val.index === index).json;
    }
    static fromJson(json: string) {
      if (json === undefined) return this.Single.index;
      return Object.values(ImageProgressDisplayType).find((val) => val.json === json).index;
    }
  }
  
  export class DateType {
    static Year = new JsonType(0, "Year");
    static Month = new JsonType(1, "Month");
    static Day = new JsonType(2, "Day");
  
    static toJson(index: number) {
      if (index === undefined) return this.Year.json;
      return Object.values(DateType).find((val) => val.index === index).json;
    }
    static fromJson(json: string) {
      if (json === undefined) return this.Year.index;
      return Object.values(DateType).find((val) => val.json === json).index;
    }
  }
  
  export class TimeType {
    static Hour = new JsonType(0, "Hour");
    static Minute = new JsonType(1, "Minute");
    static Second = new JsonType(2, "Second");
  
    static toJson(index: number) {
      if (index === undefined) return this.Hour.json;
      return Object.values(TimeType).find((val) => val.index === index).json;
    }
    static fromJson(json: string) {
      if (json === undefined) return this.Hour.index;
      return Object.values(TimeType).find((val) => val.json === json).index;
    }
  }
  
  export class ActivityType {
    static Date = new JsonType(0, "Date");
    static Battery = new JsonType(1, "Battery");
    static Steps = new JsonType(2, "Steps");
    static Calories = new JsonType(3, "Calories");
    static HeartRate = new JsonType(4, "HeartRate");
    static Pai = new JsonType(5, "PAI");
    static Distance = new JsonType(6, "Distance");
    static StandUp = new JsonType(7, "StandUp");
    static Weather = new JsonType(8, "Weather");
    static UVindex = new JsonType(9, "UVindex");
    static AirQuality = new JsonType(10, "AirQuality");
    static Humidity = new JsonType(11, "Humidity");
    static Sunrise = new JsonType(12, "Sunrise");
    static WindForce = new JsonType(13, "WindForce");
    static Altitude = new JsonType(14, "Altitude");
    static AirPressure = new JsonType(15, "AirPressure");
    static Stress = new JsonType(16, "Stress");
    static ActivityGoal = new JsonType(17, "ActivityGoal");
    static FatBurning = new JsonType(18, "FatBurning");
  
    static toJson(index: number) {
      if (index === undefined) return this.Date.json;
      return Object.values(ActivityType).find((val) => val.index === index).json;
    }
    static fromJson(json: string) {
      if (json === undefined) return this.Date.index;
      return Object.values(ActivityType).find((val) => val.json === json).index;
    }
  }