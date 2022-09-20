import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchAmPmIcon, WatchAOD, WatchAodDate, WatchImageSet, WatchNumber } from "../../model/watchFace.gts2mini.model";
import WatchNumberComponent from "./number.component";
import ImageSetComponent from "./imageSet.component";
import AmPmComponent from "./ampm.component";


const DateAODComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function updateDay(d: WatchNumber) {
    const _date = { ...watchface.aod.date };
    _date.day = d;
    onUpdate(_date);
  }
  function updateMonth(d: WatchNumber) {
    const _date = { ...watchface.aod.date };
    _date.month = d;
    onUpdate(_date);
  }

  function updateWeekday(d: WatchImageSet) {
    const w = { ...watchface };
    w.aod.weekday = d;
    setWatchface(w)
  }
  
  function onUpdate(d: WatchAodDate) {
    const w = {...watchface}
    w.aod.date = d;
    setWatchface(w);
  }

  function updateAmPm(d: WatchAmPmIcon) {
    const w = {...watchface}
    w.aod.time.amPm = d;
    setWatchface(w);
  }

  return (
    <>
      <Card>
        <Card.Header
                  onClick={() => {
                    let w = {...watchface};
                    if (!w.aod) w.aod = new WatchAOD()
                    if (!w.aod.date) w.aod.date = new WatchAodDate()
                    w.aod.date.collapsed = !watchface.aod.date.collapsed;
                    setWatchface(w);
                  }}
        >
          Date
        </Card.Header>
        <Card.Body className={`${watchface.aod?.date?.collapsed ? "collapse" : ""}`}>

          <WatchNumberComponent
            title="Month"
            digit={{...watchface.aod?.date?.month}}
            onUpdate={updateMonth}
            followDisabled={true}
            showDelimiter={true}
            showDataType={true}
          />
          <WatchNumberComponent
            title="Day"
            digit={{...watchface.aod?.date?.day}}
            onUpdate={updateDay}
            showDelimiter={true}
            showDataType={true}
          />          
          <ImageSetComponent
            title="Weekday"
            imageSet={{...watchface.aod?.weekday}}
            onUpdate={updateWeekday}
          />
          <AmPmComponent 
            title='Am / PM'
            ampm={{...watchface.aod.time.amPm}}
            onUpdate={updateAmPm}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default DateAODComponent;
