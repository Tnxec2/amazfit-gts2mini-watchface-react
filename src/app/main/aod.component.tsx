import ActivityListAODComponent from "../Blocks/activitylistAOD.component";
import BackgroundAODComponent from "../Blocks/backgroundaod.component";
import DateAODComponent from "../Blocks/dateaod.component";
import TimeAnalogAODComponent from "../Blocks/timeAnalogAOD.component";
import TimeDigitalAODComponent from "../Blocks/timeDigitalAOD.component";

const AodComponent = () => {

  return (
    <>
      <BackgroundAODComponent />
      <TimeDigitalAODComponent />
      <TimeAnalogAODComponent />
      <DateAODComponent />
      <ActivityListAODComponent />
    </>
  );
};

export default AodComponent;
