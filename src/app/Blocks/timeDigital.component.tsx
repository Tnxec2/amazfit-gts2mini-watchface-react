import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { Digit, WatchDialFace } from "../model/watchFace.model";
import DigitComponent from "./digit.component";

const TimeDigitalComponent = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateHoursDigit(h: Digit) {
    const t = {...watchface.dialFace};
    t.hoursDigital = h;
    updateTimeDigital(t);
  }

  function updateMinutesDigit(m: Digit) {
    const t = {...watchface.dialFace};
    t.minutesDigital = m;
    updateTimeDigital(t);
  }

  function updateSecondsDigit(s: Digit) {
    const t = {...watchface.dialFace};
    t.secondsDigital = s;
    updateTimeDigital(t);
  }

  function updateTimeDigital(wdf: WatchDialFace) {
    setWatchface({ ...watchface, dialFace: wdf });
  }

  return (
    <Card>
      <Card.Header
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        Time Digital
      </Card.Header>
      <Card.Body className={`${collapsed ? "collapse" : ""}`}>
        <DigitComponent
          title="Hours"
          digit={watchface.dialFace.hoursDigital}
          onUpdate={updateHoursDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={false}
        />
        <DigitComponent
          title="Minutes"
          digit={watchface.dialFace.minutesDigital}
          onUpdate={updateMinutesDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={true}
        />
        <DigitComponent
          title="Seconds"
          digit={watchface.dialFace.secondsDigital}
          onUpdate={updateSecondsDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={true}
        />
      </Card.Body>
    </Card>
  );
};
export default TimeDigitalComponent;
