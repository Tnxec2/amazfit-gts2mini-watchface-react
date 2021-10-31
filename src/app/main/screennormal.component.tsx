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
    w.activitylistCollapsed = false;
    setWatchface(w)
  }

  return (
    <>
      <BackgroundComponent />
      <TimeDigitalComponent
        collapsed={watchface.dialFace.collapsedDigital}
        setCollapsed={(c) => {
          let wf = {...watchface};
          wf.dialFace.collapsedDigital = c;
          setWatchface(wf)
        }}
      />
      <TimeAnalogComponent 
              collapsed={watchface.dialFace.collapsedAnalog}
              setCollapsed={(c) => {
                let wf = {...watchface};
                wf.dialFace.collapsedAnalog = c;
                setWatchface(wf)
              }}
      />
      <DateComponent
              collapsed={watchface.date.collapsed}
              setCollapsed={(c) => {
                let wf = {...watchface};
                wf.date.collapsed = c;
                setWatchface(wf)
              }}
      
      />
      <ActivityListComponent 
        activitys={watchface.activity}
        onUpdate={updateActivitys}
        collapsed={watchface.activitylistCollapsed}
        setCollapsed={(collapsed) => {
          let w = {...watchface};
          w.activitylistCollapsed = collapsed;
          setWatchface(w);
        }}
      />
      <StatusComponent />
    </>
  );
};

export default ScreenNormalcomponent;
