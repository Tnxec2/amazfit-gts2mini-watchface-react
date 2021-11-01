import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import ClockHandComponent from "./clockHand.component";

interface IProps {
  collapsed: boolean,
  setCollapsed(collapsed: boolean): void,
}

const TimeAnalogAODComponent: FC<IProps> = ({collapsed = true, setCollapsed}) => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  function copyHoursFromNormal() {
    const t = {...watchface.aod.dialFace}
    t.hoursClockhand = {...watchface.dialFace.hoursClockhand}
    setWatchface({ ...watchface, aod: {...watchface.aod, dialFace: t} });
  }
  function copyMinutesFromNormal() {
    const t = {...watchface.aod.dialFace}
    t.minutesClockhand = {...watchface.dialFace.minutesClockhand}
    setWatchface({ ...watchface, aod: {...watchface.aod, dialFace: t} });
  }

  return (
    <Card>
      <Card.Header
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        Time Analog
      </Card.Header>
      <Card.Body className={`${collapsed ? "collapse" : ""}`}>
        <ClockHandComponent
          title="Hours"
          clockHand={watchface.aod.dialFace.hoursClockhand}
          showAngle={false}
          onUpdate={(ch) => {
            const w = { ...watchface };
            w.aod.dialFace.hoursClockhand = ch;
            setWatchface(w);
          }}
          onCopyFromNormal={copyHoursFromNormal}
        />

        <ClockHandComponent
          title="Minutes"
          clockHand={watchface.aod.dialFace.minutesClockhand}
          onUpdate={(ch) => {
            const w = { ...watchface };
            w.aod.dialFace.minutesClockhand = ch;
            setWatchface(w);
          }}
          showAngle={false}
          onCopyFromNormal={copyMinutesFromNormal}
        />
      </Card.Body>
    </Card>
  );
};

export default TimeAnalogAODComponent;
