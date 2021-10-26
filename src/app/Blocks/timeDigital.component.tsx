import { FC, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchCommonDigit, WatchDialFace, WatchMultilangImageCoords } from "../model/watchFace.model";
import ImageDigitComponent from "./imageDigit.component";
import MultilangImageCoordsComponent from "./multiLangImageCoords.component";
import SystemFontComponent from "./systemFont.component";
import SystemFontCircleComponent from "./systemFontCircle.component";

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
          title="Hours Digits"
          digit={watchface.dialFace.hoursDigital}
          onUpdate={updateHoursDigit}
          followDisabled={true}
        />
        <SystemFontComponent
            title="Hours Systemfont Rotated"
            digit={watchface.dialFace.hoursDigital}
            onUpdate={updateHoursDigit}
            followDisabled={true}
          />
        <SystemFontCircleComponent
            title="Hours Systemfont Circle"
            digit={watchface.dialFace.hoursDigital}
            onUpdate={updateHoursDigit}
            followDisabled={true}
        />
        <ImageDigitComponent
          title="Minutes"
          digit={watchface.dialFace.minutesDigital}
          onUpdate={updateMinutesDigit}
          paddingZeroFix={true}
        />
        <SystemFontComponent
            title="Minutes Systemfont Rotated"
            digit={watchface.dialFace.minutesDigital}
            onUpdate={updateMinutesDigit}
          />
        <SystemFontCircleComponent
            title="Minutes Systemfont Circle"
            digit={watchface.dialFace.minutesDigital}
            onUpdate={updateMinutesDigit}
        />
        <ImageDigitComponent
          title="Seconds"
          digit={watchface.dialFace.secondsDigital}
          onUpdate={updateSecondsDigit}
          paddingZeroFix={true}
        />
        <SystemFontComponent
            title="Seconds Systemfont Rotated"
            digit={watchface.dialFace.secondsDigital}
            onUpdate={updateSecondsDigit}
          />
        <SystemFontCircleComponent
            title="Seconds Systemfont Circle"
            digit={watchface.dialFace.secondsDigital}
            onUpdate={updateSecondsDigit}
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
