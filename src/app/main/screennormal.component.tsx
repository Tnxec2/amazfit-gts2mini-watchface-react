import { FC, useContext } from "react";
import ActivityListComponent from "../Blocks/activitylist.component";
import BackgroundComponent from "../Blocks/background.component";
import DateComponent from "../Blocks/date.component";
import StatusComponent from "../Blocks/status.component";
import TimeAnalogComponent from "../Blocks/timeAnalog.component";
import TimeDigitalComponent from "../Blocks/timeDigital.component";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchActivity } from "../model/watchFace.model";

const ScreenNormalcomponent: FC = () => {

  const { watchface, setWatchface }  = useContext<IWatchContext>(WatchfaceContext)

  function updateActivitys(al: WatchActivity[]) {
    let w = {...watchface}
    w.activity = al
    setWatchface(w)
  }

  return (
    <>
      <BackgroundComponent />
      <TimeDigitalComponent />
      <TimeAnalogComponent />
      <DateComponent />
      <ActivityListComponent 
        activitys={watchface.activity}
        onUpdate={updateActivitys}
      />
      <StatusComponent />
    </>
  );
};

export default ScreenNormalcomponent;
