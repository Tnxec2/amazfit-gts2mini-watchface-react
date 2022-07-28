import { FC, useContext } from "react";
import { IWatchContext, WatchfaceContext } from "../../context";
import { ActivityType } from "../../model/types.gts2mini.model";
import { WatchActivity } from "../../model/watchFace.gts2mini.model";
import ActivityComponent from "./activity.component";
import DateAODComponent from "./dateAOD.component";
import DateAODOneLineComponent from "./dateAODOneLine.component";
import TimeAnalogAODComponent from "./timeAnalogAOD.component";
import TimeDigitalAODComponent from "./timeDigitalAOD.component";
import TimeDigitalAODSeparatedComponent from "./timeDigitalAODSeparated.component";

const AodComponent: FC = () => {

  const { watchface, setWatchface }  = useContext<IWatchContext>(WatchfaceContext)

  function updateSteps(d: WatchActivity) {
    let w = {...watchface}
    w.aod.steps = d
    setWatchface(w)
  }
  
  return (
    <>
      {/* dont work on watch: <TimeDigitalAODComponent /> */}
      <TimeDigitalAODSeparatedComponent />
      <TimeAnalogAODComponent />
      <DateAODComponent />
      <DateAODOneLineComponent />
      <ActivityComponent
        activity={{...watchface.aod.steps}}
        title='Steps'
        type={ActivityType.Steps}
        onUpdateActivity={updateSteps}
        showImageProgress={true}
        showIconProgress={true}
        showPointerProgress={true}
        showCircleScaleProgress={true}
       />
    </>
  );
};

export default AodComponent;
