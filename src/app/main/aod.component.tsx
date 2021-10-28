import { FC, useContext } from "react";
import ActivityListComponent from "../Blocks/activitylist.component";
import BackgroundAODComponent from "../Blocks/backgroundaod.component";
import DateAODComponent from "../Blocks/dateaod.component";
import TimeAnalogAODComponent from "../Blocks/timeAnalogAOD.component";
import TimeDigitalAODComponent from "../Blocks/timeDigitalAOD.component";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchActivity } from "../model/watchFace.model";

const AodComponent: FC = () => {

  const { watchface, setWatchface }  = useContext<IWatchContext>(WatchfaceContext)

  function updateActivitys(al: WatchActivity[]) {
    let w = {...watchface}
    w.aod.activitylist = al
    setWatchface(w)
  }
  
  return (
    <>
      <BackgroundAODComponent />
      <TimeDigitalAODComponent />
      <TimeAnalogAODComponent />
      <DateAODComponent />
      <ActivityListComponent
        activitys={watchface.aod.activitylist}
        onUpdate={updateActivitys}
       />
    </>
  );
};

export default AodComponent;
