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
    w.aod.activitylistCollapsed = false;
    setWatchface(w)
  }
  
  return (
    <>
      <BackgroundAODComponent />
      <TimeDigitalAODComponent
      collapsed={watchface.aod.dialFace.collapsedDigital}
      setCollapsed={(c) => {
        let s = {...watchface};
        s.aod.dialFace.collapsedDigital = c;
        setWatchface(s)
      }}
       />
      <TimeAnalogAODComponent 
        collapsed={watchface.aod.dialFace.collapsedAnalog}
        setCollapsed={(c) => {
          let s = {...watchface};
          s.aod.dialFace.collapsedAnalog = c;
          setWatchface(s)
        }}
      />
      <DateAODComponent 
        collapsed={watchface.aod.date.collapsed}
        setCollapsed={(c) => {
          let s = {...watchface};
          s.aod.date.collapsed = c;
          setWatchface(s)
        }}
      />
      <ActivityListComponent
        activitys={watchface.aod.activitylist}
        onUpdate={updateActivitys}
        collapsed={watchface.aod.activitylistCollapsed}
        setCollapsed={(collapsed) => {
          let s = {...watchface};
          s.aod.activitylistCollapsed = collapsed;
          setWatchface(s)
        }}
       />
    </>
  );
};

export default AodComponent;
