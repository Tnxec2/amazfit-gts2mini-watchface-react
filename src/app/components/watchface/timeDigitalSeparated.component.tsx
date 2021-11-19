import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { WatchImage, WatchTwoDigitsSeparated } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";

import SeparatedDigitsComponent from "./separatedDigits.component";

const TimeDigitalSeparatedComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);


  function updateHours(h: WatchTwoDigitsSeparated) {
    const w = {...watchface};
    w.time.timeDigitalSeparated.hours = h;
    setWatchface(w);
  }
  
  function updateMinutes(h: WatchTwoDigitsSeparated) {
    const w = {...watchface};
    w.time.timeDigitalSeparated.minutes = h;
    setWatchface(w);
  }

  function updateDigitSeconds(h: WatchTwoDigitsSeparated) {
    const w = {...watchface};
    w.time.timeDigitalSeparated.seconds = h;
    setWatchface(w);
  }

  function onChangePaddingZeroHours(val: boolean) {
    const w = {...watchface};
    w.time.timeDigitalSeparated.paddingZeroHours = val;
    setWatchface(w);
  }

  function onChangePaddingZeroMinutes(val: boolean) {
    const w = {...watchface};
    w.time.timeDigitalSeparated.paddingZeroMinutes = val;
    setWatchface(w);
  }

  function updateSeparatorHours(val: WatchImage) {
    const w = {...watchface};
    w.time.timeDigitalSeparated.separatorHours = val;
    setWatchface(w);
  }
  function updateSeparatorMinutes(val: WatchImage) {
    const w = {...watchface};
    w.time.timeDigitalSeparated.separatorMinutes = val;
    setWatchface(w);
  }




  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.time.timeDigitalSeparated.collapsed = !watchface.time.timeDigitalSeparated.collapsed;
          setWatchface(w);
        }}
      >
        Time Separate Digits
      </Card.Header>
      <Card.Body className={`${watchface.time.timeDigitalSeparated.collapsed ? "collapse" : ""}`}>
      <BlocksArrayComponent
        ar={[
          {
            blocks: [
              { title: 'Padding Zero Hours', type: BlockType.Checkbox, checked: watchface.time.timeDigitalSeparated.paddingZeroHours, onChange: onChangePaddingZeroHours},
              { title: 'Padding Zero Minutes', type: BlockType.Checkbox, checked: watchface.time.timeDigitalSeparated.paddingZeroMinutes, onChange: onChangePaddingZeroMinutes},
            ]
      
          }
        ]} />

        <SeparatedDigitsComponent
          title="Hours Digits"
          digit={{...watchface.time.timeDigitalSeparated.hours}}
          amountOfDigits={2}
          onUpdate={updateHours}
        />
        
        <SeparatedDigitsComponent
          title="Minutes Digits"
          digit={{...watchface.time.timeDigitalSeparated.minutes}}
          amountOfDigits={2}
          onUpdate={updateMinutes}
        />

        <SeparatedDigitsComponent
          title="Seconds Digits"
          digit={{...watchface.time.timeDigitalSeparated.seconds}}
          amountOfDigits={2}
          onUpdate={updateDigitSeconds}
        />

        <ImageComponent 
          title='Separator hours'
          image={{...watchface.time.timeDigitalSeparated.separatorHours}}
          onUpdate={updateSeparatorHours}
        />
        <ImageComponent 
          title='Separator minutes'
          image={{...watchface.time.timeDigitalSeparated.separatorMinutes}}
          onUpdate={updateSeparatorMinutes}
        />
               
      </Card.Body>
    </Card>
  );
};
export default TimeDigitalSeparatedComponent;
