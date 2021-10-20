import ActivityListComponent from "../Blocks/activitylist.component";
import BackgroundComponent from "../Blocks/background.component";
import DateComponent from "../Blocks/date.component";
import StatusComponent from "../Blocks/status.component";
import TimeAnalogComponent from "../Blocks/timeAnalog.component";
import TimeDigitalComponent from "../Blocks/timeDigital.component";

const Blocks = () => {
  return (
    <>
      <BackgroundComponent />
      <TimeDigitalComponent />
      <TimeAnalogComponent />
      <DateComponent />
      <ActivityListComponent />
      <StatusComponent />
    </>
  );
};

export default Blocks;
