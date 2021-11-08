import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { WatchAmPmIcon, WatchImageSet, WatchNumber } from "../../model/watchFace.gts2mini.model";
import WatchNumberComponent from "./number.component";
import ImageSetComponent from "./imageSet.component";
import AmPmComponent from "./ampm.component";


const DateComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function updateAmPm(d: WatchAmPmIcon) {
    const w = {...watchface}
    w.date.ampm = d;
    setWatchface(w);
  }

  function updateDay(d: WatchNumber) {
    const w = {...watchface}
    w.date.day = d;
    setWatchface(w);
  }

  function updateMonth(d: WatchNumber) {
    const w = {...watchface}
    w.date.month = d;
    setWatchface(w);
  }
  function updateMonthAsWord(d: WatchImageSet) {
    const w = {...watchface}
    w.date.monthAsWord = d;
    setWatchface(w);
  }
  function updateYear(d: WatchNumber) {
    const w = {...watchface}
    w.date.year = d;
    setWatchface(w);
  }
  function updateWeekday(d: WatchImageSet) {
    const w = {...watchface}
    w.date.weekday = d;
    setWatchface(w);
  }
  
  function onChangeOneLineYear(val: boolean) {
    const w = {...watchface}
    w.date.oneLineYear = val;
    setWatchface(w);
  }
  function onChangeOneLineMonth(val: boolean) {
    const w = {...watchface}
    w.date.oneLineMonth = val;
    setWatchface(w);
  }
  
  function onChangeDelimiter(val: number) {
    const w = {...watchface}
    w.date.oneLineDelimiter = val;
    setWatchface(w);
  }

  return (
    <>
      <Card>
        <Card.Header
                  onClick={() => {
                    let w = {...watchface};
                    w.date.collapsed = !watchface.date.collapsed;
                    setWatchface(w);
                  }}
        >
          Date
        </Card.Header>
        <Card.Body className={`${watchface.date.collapsed ? "collapse" : ""}`}>

          <BlocksArrayComponent ar={[
            {
              blocks: [
                { title: 'One Line Year', type: BlockType.Checkbox, checked: watchface.date.oneLineYear, onChange: onChangeOneLineYear},
                { title: 'One Line Month', type: BlockType.Checkbox, checked: watchface.date.oneLineMonth, onChange: onChangeOneLineMonth},
                { title: 'Delimiter', type: BlockType.SelectFile, nvalue: watchface.date.oneLineDelimiter, onChange: onChangeDelimiter },
              ]
            }
          ]} />

          { ! watchface.date.oneLineMonth ? 
          <WatchNumberComponent
            title="Year"
            digit={watchface.date.year}
            onUpdate={updateYear}
            followDisabled={true}
            showDelimiter={!watchface.date.oneLineYear}
            showDataType={!watchface.date.oneLineYear}
          /> : '' }
         
         { ! watchface.date.oneLineYear ? 
         <>
          <WatchNumberComponent
            title="Month"
            digit={watchface.date.month}
            onUpdate={updateMonth}
            showDelimiter={!watchface.date.oneLineMonth}
            showDataType={!watchface.date.oneLineMonth}
          />
          { ! watchface.date.oneLineMonth ? 
          <WatchNumberComponent
            title="Day Digit"
            digit={watchface.date.day}
            onUpdate={updateDay}
            showDelimiter={true}
            showDataType={true}
          /> : '' }
          </>
           : ''
         }
          <ImageSetComponent
            title="Month as word"
            imageSet={watchface.date.monthAsWord}
            onUpdate={updateMonthAsWord}
          />
          
          <ImageSetComponent
            title="Weekday"
            imageSet={watchface.date.weekday}
            onUpdate={updateWeekday}
          />

          <AmPmComponent 
            title='AmPm' 
            ampm={watchface.date.ampm}
            onUpdate={updateAmPm}
            />
        </Card.Body>
      </Card>
    </>
  );
};

export default DateComponent;
