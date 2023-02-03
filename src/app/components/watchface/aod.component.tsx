import { FC } from "react";

import DateAODComponent from "./dateAOD.component";
import DateAODOneLineComponent from "./dateAODOneLine.component";
import StepsAodComponent from "./stepsAod.component";
import TimeAnalogAODComponent from "./timeAnalogAOD.component";
import TimeDigitalAODComponent from "./timeDigitalAOD.component";
import TimeDigitalAODSeparatedComponent from "./timeDigitalAODSeparated.component";

const AodComponent: FC = () => {

  return (
    <>
      <TimeDigitalAODSeparatedComponent />
      <TimeAnalogAODComponent />
      <DateAODComponent />
      <DateAODOneLineComponent />
      <StepsAodComponent  />
      <TimeDigitalAODComponent />
    </>
  );
};

export default AodComponent;
