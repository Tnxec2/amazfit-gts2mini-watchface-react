import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchImage, WatchNumber, WatchShortcutElement } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import WatchShortCutComponent from "./watchshortcut.component";

const AlarmComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);


  function updateHoursDigit(h: WatchNumber) {
    const w = {...watchface};
    w.time.alarm.alarmTime.hours = h;
    setWatchface(w);
  }
  
  function updateDigitMinutes(h: WatchNumber) {
    const w = {...watchface};
    w.time.alarm.alarmTime.minutes = h;
    setWatchface(w);
  }

  function updateAlarmImage(im: WatchImage) {
    const w = {...watchface};
    w.time.alarm.alarmImage = im;
    setWatchface(w);
  }

  function updateNoAlarmImage(im: WatchImage) {
    const w = {...watchface};
    w.time.alarm.noAlarm = im;
    setWatchface(w);
  }

  function updateShortcut(sh: WatchShortcutElement) {
    const w = {...watchface};
    w.time.alarm.shortcut = sh;
    setWatchface(w);
  }


  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.time.alarm.collapsed = !watchface.time.alarm.collapsed;
          setWatchface(w);
        }}
      >
        Alarm
      </Card.Header>
      <Card.Body className={`${watchface.time.alarm.collapsed ? "collapse" : ""}`}>
        <WatchNumberComponent
          title="Hours"
          digit={{...watchface.time.alarm.alarmTime.hours}}
          onUpdate={updateHoursDigit}
          followDisabled={true}
          showDelimiter={true}
          showDataType={true}
        />
        
        <WatchNumberComponent
          title="Minutes"
          digit={{...watchface.time.alarm.alarmTime.minutes}}
          onUpdate={updateDigitMinutes}
          showDelimiter={true}
          showDataType={true}
        />
        <ImageComponent 
          title='Alarm ON'
          image={{...watchface.time.alarm.alarmImage}}
          onUpdate={updateAlarmImage}
        />
        <ImageComponent 
          title='Alarm OFF'
          image={{...watchface.time.alarm.noAlarm}}
          onUpdate={updateNoAlarmImage}
        />
        <WatchShortCutComponent 
          title='Alarm shortcut'
          shortcut={{...watchface.time.alarm.shortcut}}
          onUpdate={updateShortcut}
        />
      </Card.Body>
    </Card>
  );
};
export default AlarmComponent;
