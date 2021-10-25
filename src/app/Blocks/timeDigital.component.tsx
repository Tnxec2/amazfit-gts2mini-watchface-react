import { FC, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchCommonDigit, WatchDialFace, WatchMultilangImageCoords } from "../model/watchFace.model";
import ImageDigitComponent from "./imageDigit.component";
import MultilangImageCoordsComponent from "./multiLangImageCoords.component";

const TimeDigitalComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateHoursDigit(h: WatchCommonDigit) {
    const t = {...watchface.dialFace};
    t.hoursDigital = h;
    updateTimeDigital(t);
  }

  function updateMinutesDigit(m: WatchCommonDigit) {
    const t = {...watchface.dialFace};
    t.minutesDigital = m;
    updateTimeDigital(t);
  }

  function updateSecondsDigit(s: WatchCommonDigit) {
    const t = {...watchface.dialFace};
    t.secondsDigital = s;
    updateTimeDigital(t);
  }

  function updateAm(s: WatchMultilangImageCoords) {
    const t = {...watchface.dialFace};
    t.am = s;
    updateTimeDigital(t);
  }
  function updatePm(s: WatchMultilangImageCoords) {
    const t = {...watchface.dialFace};
    t.pm = s;
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
        <ImageDigitComponent
          title="Hours"
          digit={watchface.dialFace.hoursDigital}
          onUpdate={updateHoursDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={false}
        />
        <ImageDigitComponent
          title="Minutes"
          digit={watchface.dialFace.minutesDigital}
          onUpdate={updateMinutesDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={true}
        />
        <ImageDigitComponent
          title="Seconds"
          digit={watchface.dialFace.secondsDigital}
          onUpdate={updateSecondsDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={true}
        />
        <MultilangImageCoordsComponent
          title="AM"
          imageCoords={watchface.dialFace.am}
          onUpdate={updateAm} />
        <MultilangImageCoordsComponent
          title="PM"
          imageCoords={watchface.dialFace.pm}
          onUpdate={updatePm} />
      </Card.Body>
    </Card>
  );
};
export default TimeDigitalComponent;
