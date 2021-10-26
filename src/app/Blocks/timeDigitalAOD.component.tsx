import { FC, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchCommonDigit, WatchDialFace, WatchMultilangImageCoords } from "../model/watchFace.model";
import ImageDigitComponent from "./imageDigit.component";
import MultilangImageCoordsComponent from "./multiLangImageCoords.component";
import SystemFontComponent from "./systemFont.component";
import SystemFontCircleComponent from "./systemFontCircle.component";

const TimeDigitalAODComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateHoursDigit(h: WatchCommonDigit) {
    const t = {...watchface.aod.dialFace};
    t.hoursDigital = h;
    updateTimeDigital(t);
  }

  function updateMinutesDigit(m: WatchCommonDigit) {
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

  function updateAm(s: WatchMultilangImageCoords) {
    const t = {...watchface.aod.dialFace};
    t.am = s;
    updateTimeDigital(t);
  }
  function updatePm(s: WatchMultilangImageCoords) {
    const t = {...watchface.aod.dialFace};
    t.pm = s;
    updateTimeDigital(t);
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
        <ImageDigitComponent
          title="Hours"
          digit={watchface.aod.dialFace.hoursDigital}
          onUpdate={updateHoursDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={false}
          onCopyFromNormal={copyHoursFromNormal}
          followDisabled={true}
        />
        <SystemFontComponent
            title="Hours Systemfont Rotated"
            digit={watchface.aod.dialFace.hoursDigital}
            onUpdate={updateHoursDigit}
            followDisabled={true}
          />
        <SystemFontCircleComponent
            title="Hours Systemfont Circle"
            digit={watchface.aod.dialFace.hoursDigital}
            onUpdate={updateHoursDigit}
            followDisabled={true}
        />
        <ImageDigitComponent
          title="Minutes"
          digit={watchface.aod.dialFace.minutesDigital}
          onUpdate={updateMinutesDigit}
          showDecimalPointer={false}
          showDelimiter={false}
          showNoData={false}
          paddingZeroFix={true}
          onCopyFromNormal={copyMinutesFromNormal}
        />
        <SystemFontComponent
            title="Minutes Systemfont Rotated"
            digit={watchface.aod.dialFace.minutesDigital}
            onUpdate={updateMinutesDigit}
          />
        <SystemFontCircleComponent
            title="Minutes Systemfont Circle"
            digit={watchface.aod.dialFace.minutesDigital}
            onUpdate={updateMinutesDigit}
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
export default TimeDigitalAODComponent;
