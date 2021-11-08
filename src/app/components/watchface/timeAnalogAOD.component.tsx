import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { Coordinates } from "../../model/json.gts2minit.model";
import { WatchClockHand } from "../../model/watchFace.gts2mini.model";
import ClockHandComponent from "./clockHand.component";


const TimeAnalogAODComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  function updateHours(cl: WatchClockHand) {
    const w = {...watchface}
    w.aod.time.timeAnalog.hours  = cl
    setWatchface(w)
  }
  function updateMinutes(cl: WatchClockHand) {
    const w = {...watchface}
    w.aod.time.timeAnalog.minutes  = cl
    setWatchface(w)
  }
  function updatecommonCenterCoordinatesX(val: number) {
    const w = {...watchface}
    if (!w.aod.time.timeAnalog.commonCenterCoordinates) w.aod.time.timeAnalog.commonCenterCoordinates= new Coordinates()
    w.aod.time.timeAnalog.commonCenterCoordinates.X  = val
    setWatchface(w)
  }
  function updatecommonCenterCoordinatesY(val: number) {
    const w = {...watchface}
    if (!w.aod.time.timeAnalog.commonCenterCoordinates) w.aod.time.timeAnalog.commonCenterCoordinates = new Coordinates()
    w.aod.time.timeAnalog.commonCenterCoordinates.Y  = val
    setWatchface(w)
  }
  return (
    <Card>
      <Card.Header
        onClick={() => {
          const w = {...watchface}
          w.aod.time.timeAnalog.collapsed  = !watchface.aod.time.timeAnalog.collapsed
          setWatchface(w)
        }}
      >
        Time Analog
      </Card.Header>
      <Card.Body className={`${watchface.aod.time.timeAnalog.collapsed ? "collapse" : ""}`}>
        <ClockHandComponent
          title="Hours"
          clockHand={watchface.aod.time.timeAnalog.hours}
          showAngle={false}
          onUpdate={updateHours}
        />

        <ClockHandComponent
          title="Minutes"
          clockHand={watchface.aod.time.timeAnalog.minutes}
          onUpdate={updateMinutes}
          showAngle={false}
        />

        <BlocksArrayComponent ar={[
          { blocks: [
            { title: 'X', type: BlockType.Number, nvalue: watchface.aod.time.timeAnalog?.commonCenterCoordinates?.X ? watchface.aod.time.timeAnalog?.commonCenterCoordinates.X : 0, onChange: updatecommonCenterCoordinatesX },
            { title: 'Y', type: BlockType.Number, nvalue: watchface.aod.time.timeAnalog?.commonCenterCoordinates?.Y ? watchface.aod.time.timeAnalog?.commonCenterCoordinates.Y : 0, onChange: updatecommonCenterCoordinatesY },
          ]
          }
        ]} />
      </Card.Body>
    </Card>
  );
};

export default TimeAnalogAODComponent;
