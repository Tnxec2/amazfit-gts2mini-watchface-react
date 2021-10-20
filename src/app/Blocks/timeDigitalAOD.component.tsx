import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { Digit, WatchDialFace } from "../model/watchFace.model";
import DigitComponent from "./digit.component";

const TimeDigitalAODComponent = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateHoursDigit(h: Digit) {
    const t = {...watchface.aod.dialFace};
    t.hoursDigital = h;
    updateTimeDigital(t);
  }

  function updateMinutesDigit(m: Digit) {
    const t = {...watchface.aod.dialFace};
    t.minutesDigital = m;
    updateTimeDigital(t);
  }


  function copyHoursFromNormal() {
    const t = {...watchface.aod.dialFace}
    t.hoursDigital = {...watchface.dialFace.hoursDigital}
    updateTimeDigital(t)
  }
  function copyMinutesFromNormal() {
    const t = {...watchface.aod.dialFace}
    t.minutesDigital = {...watchface.dialFace.minutesDigital}
    updateTimeDigital(t)
  }


  function updateTimeDigital(wdf: WatchDialFace) {
    setWatchface({ ...watchface, aod: {...watchface.aod, dialFace: wdf} });
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
          digit={watchface.aod.dialFace.hoursDigital}
          onUpdate={updateHoursDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={false}
          onCopyFromNormal={copyHoursFromNormal}
        />
        <DigitComponent
          title="Minutes"
          digit={watchface.aod.dialFace.minutesDigital}
          onUpdate={updateMinutesDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={true}
          onCopyFromNormal={copyMinutesFromNormal}
        />

      </Card.Body>
    </Card>
  );
};
export default TimeDigitalAODComponent;
