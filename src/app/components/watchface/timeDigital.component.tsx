import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchNumber } from "../../model/watchFace.gts2mini.model";
import WatchNumberComponent from "./number.component";

const TimeDigitalComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);


  function updateHoursDigit(h: WatchNumber) {
    const w = {...watchface};
    w.time.timeDigitalCommon.hours = h;
    setWatchface(w);
  }
  
  function updateDigitMinutes(h: WatchNumber) {
    const w = {...watchface};
    w.time.timeDigitalCommon.minutes = h;
    setWatchface(w);
  }

  function updateDigitSeconds(h: WatchNumber) {
    const w = {...watchface};
    w.time.timeDigitalCommon.seconds = h;
    setWatchface(w);
  }


  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.time.timeDigitalCommon.collapsed = !watchface.time.timeDigitalCommon.collapsed;
          setWatchface(w);
        }}
      >
        Time Digital
      </Card.Header>
      <Card.Body className={`${watchface.time.timeDigitalCommon.collapsed ? "collapse" : ""}`}>
        <WatchNumberComponent
          title="Hours"
          digit={{...watchface.time.timeDigitalCommon.hours}}
          onUpdate={updateHoursDigit}
          followDisabled={true}
          showDelimiter={true}
          showDataType={true}
        />
        
        <WatchNumberComponent
          title="Minutes"
          digit={{...watchface.time.timeDigitalCommon.minutes}}
          onUpdate={updateDigitMinutes}
          showDelimiter={true}
          showDataType={true}
        />

        <WatchNumberComponent
          title="Second"
          digit={{...watchface.time.timeDigitalCommon.seconds}}
          onUpdate={updateDigitSeconds}
          showDelimiter={true}
          showDataType={true}
        />
               
      </Card.Body>
    </Card>
  );
};
export default TimeDigitalComponent;
