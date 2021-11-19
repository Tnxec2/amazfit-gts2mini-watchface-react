import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import ClockHandComponent from "./clockHand.component";

const TimeAnalogComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.time.timeAnalog.collapsed = !watchface.time.timeAnalog.collapsed;
          setWatchface(w);
        }}
      >
        Time Analog
      </Card.Header>
      <Card.Body className={`${watchface.time.timeAnalog.collapsed ? "collapse" : ""}`}>
        <ClockHandComponent
          title="Hours"
          clockHand={{...watchface.time.timeAnalog.hours}}
          showAngle={false}
          onUpdate={(ch) => {
            const w = { ...watchface };
            w.time.timeAnalog.hours = ch;
            setWatchface(w);
          }}
        />

        <ClockHandComponent
          title="Minutes"
          clockHand={{...watchface.time.timeAnalog.minutes}}
          onUpdate={(ch) => {
            const d = { ...watchface };
            d.time.timeAnalog.minutes = ch;
            setWatchface(d);
          }}
          showAngle={false}
        />

        <ClockHandComponent
          title="Seconds"
          clockHand={{...watchface.time.timeAnalog.seconds}}
          onUpdate={(ch) => {
            const w = { ...watchface };
            w.time.timeAnalog.seconds = ch;
            setWatchface(w);
          }}
          showAngle={false}
        />
      </Card.Body>
    </Card>
  );
};

export default TimeAnalogComponent;
