import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchNumber } from "../../model/watchFace.gts2mini.model";
import WatchNumberComponent from "./number.component";

const TimeDigitalAODComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  function updateHoursDigit(d: WatchNumber) {
    const w = {...watchface}
    w.aod.time.timeDigital.hours = d
    setWatchface(w)
  }
  function updateMinutesDigit(d: WatchNumber) {
    const w = {...watchface}
    w.aod.time.timeDigital.minutes = d
    setWatchface(w)
  }

  return (
    <Card>
      <Card.Header
        onClick={() => {
          const w = {...watchface}
          w.aod.time.timeDigital.collapsed = !watchface.aod.time.timeDigital.collapsed
          setWatchface(w)
        }}
      >
        Time Digital
      </Card.Header>
      <Card.Body className={`${watchface.aod.time.timeDigital.collapsed ? "collapse" : ""}`}>
        <WatchNumberComponent
          title="Hours"
          digit={watchface.aod.time.timeDigital.hours}
          onUpdate={updateHoursDigit}
          followDisabled={true}
        />
        <WatchNumberComponent
          title="Minutes"
          digit={watchface.aod.time.timeDigital.minutes}
          onUpdate={updateMinutesDigit}
        />
      </Card.Body>
    </Card>
  );
};
export default TimeDigitalAODComponent;
