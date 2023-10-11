import { FC } from "react";
import ActivityListComponent from "../watchface/activitylist.component";
import BackgroundComponent from "../watchface/background.component";
import DateComponent from "../watchface/date.component";
import StatusComponent from "../watchface/status.component";
import TimeAnalogComponent from "../watchface/timeAnalog.component";
import TimeDigitalComponent from "../watchface/timeDigital.component";
import ActivitySeparatedComponent from "./activitySeparated.component";
import AlarmComponent from "./alarm.component";
import AnimationComponent from "./animation.component";
import BatteryComponent from "./battery.component";
import ShortCutListComponent from "./shortcutslist.component";
import SunsetComponent from "./sunset.component";
import TimeDigitalSeparatedComponent from "./timeDigitalSeparated.component";
import WeatherComponent from "./weather.component";
import WeatherExtendedComponent from "./weatherext.component";
import WeekdaysImagesComponent from "./weekdaysImages.component";
import HourlyImagesComponent from "./hourlyimages.component";

const ScreenNormalcomponent: FC = () => {

  return (
    <>
      <BackgroundComponent />
      <TimeDigitalComponent />
      <TimeDigitalSeparatedComponent />
      <TimeAnalogComponent />
      <AlarmComponent />
      <HourlyImagesComponent />
      <SunsetComponent />
      <DateComponent />
      <WeekdaysImagesComponent />
      <ActivityListComponent />
      <ActivitySeparatedComponent />
      <StatusComponent />
      <BatteryComponent /> 
      <WeatherComponent />
      <WeatherExtendedComponent />
      <ShortCutListComponent />
      <AnimationComponent />
    </>
  );
};

export default ScreenNormalcomponent;
