import { FC, useContext } from "react";
import ActivityListComponent from "../watchface/activitylist.component";
import BackgroundComponent from "../watchface/background.component";
import DateComponent from "../watchface/date.component";
import StatusComponent from "../watchface/status.component";
import TimeAnalogComponent from "../watchface/timeAnalog.component";
import TimeDigitalComponent from "../watchface/timeDigital.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchActivity, WatchDate } from "../../model/watchFace.model";

const ScreenNormalcomponent: FC = () => {

  const { watchface, setWatchface } = useContext<IWatchContext>(WatchfaceContext)

  function updateDate(d: WatchDate) {
    let w = { ...watchface }
    w.date = d
    setWatchface(w)
  }

  function updateActivitys(al: WatchActivity[]) {
    let w = { ...watchface }
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
          let wf = { ...watchface };
          wf.dialFace.collapsedDigital = c;
          setWatchface(wf)
        }}
      />
      <TimeAnalogComponent
        collapsed={watchface.dialFace.collapsedAnalog}
        setCollapsed={(c) => {
          let wf = { ...watchface };
          wf.dialFace.collapsedAnalog = c;
          setWatchface(wf)
        }}
      />
      <DateComponent
        date={watchface.date}
        onUpdate={updateDate}
        collapsed={watchface.date.collapsed}
        setCollapsed={(c) => {
          let wf = { ...watchface };
          wf.date.collapsed = c;
          setWatchface(wf)
        }}

      />
      <ActivityListComponent
        activitys={watchface.activity}
        onUpdate={updateActivitys}
        collapsed={watchface.activitylistCollapsed}
        setCollapsed={(collapsed) => {
          let w = { ...watchface };
          w.activitylistCollapsed = collapsed;
          setWatchface(w);
        }}
      />
      <StatusComponent />
    </>
  );
};

export default ScreenNormalcomponent;
