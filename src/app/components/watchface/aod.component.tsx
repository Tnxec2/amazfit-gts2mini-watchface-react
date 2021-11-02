import { FC, useContext } from "react";
import ActivityListComponent from "./activitylist.component";
import BackgroundAODComponent from "./backgroundaod.component";
import TimeAnalogAODComponent from "./timeAnalogAOD.component";
import TimeDigitalAODComponent from "./timeDigitalAOD.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchActivity, WatchDate } from "../../model/watchFace.model";
import DateComponent from "./date.component";

const AodComponent: FC = () => {

  const { watchface, setWatchface }  = useContext<IWatchContext>(WatchfaceContext)

  function updateDate(d: WatchDate) {
    let w = {...watchface}
    w.aod.date = d
    setWatchface(w)
  }
  
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
      <DateComponent
        date={watchface.aod.date} 
        onUpdate={updateDate}
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
