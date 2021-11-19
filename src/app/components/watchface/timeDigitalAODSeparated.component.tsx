import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { WatchImage, WatchTwoDigitsSeparated } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";

import SeparatedDigitsComponent from "./separatedDigits.component";

const TimeDigitalAODSeparatedComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);


  function updateHours(h: WatchTwoDigitsSeparated) {
    const w = {...watchface};
    w.aod.time.timeSeparateDigits.hours = h;
    setWatchface(w);
  }
  
  function updateMinutes(h: WatchTwoDigitsSeparated) {
    const w = {...watchface};
    w.aod.time.timeSeparateDigits.minutes = h;
    setWatchface(w);
  }

  function onChangePaddingZero(val: boolean) {
    const w = {...watchface};
    w.aod.time.timeSeparateDigits.paddingZero = val;
    setWatchface(w);
  }

  function updateSeparatorHours(val: WatchImage) {
    const w = {...watchface};
    w.aod.time.timeSeparateDigits.separator = val;
    setWatchface(w);
  }
 
  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.aod.time.timeSeparateDigits.collapsed = !watchface.aod.time.timeSeparateDigits.collapsed;
          setWatchface(w);
        }}
      >
        Time Separate Digits
      </Card.Header>
      <Card.Body className={`${watchface.aod.time.timeSeparateDigits.collapsed ? "collapse" : ""}`}>
      <BlocksArrayComponent
        ar={[
          {
            blocks: [
              { title: 'Padding Zero Hours', type: BlockType.Checkbox, checked: watchface.aod.time.timeSeparateDigits.paddingZero, onChange: onChangePaddingZero},
            ]
      
          }
        ]} />

        <SeparatedDigitsComponent
          title="Hours Digits"
          digit={{...watchface.aod.time.timeSeparateDigits.hours}}
          amountOfDigits={2}
          onUpdate={updateHours}
        />
        
        <SeparatedDigitsComponent
          title="Minutes Digits"
          digit={{...watchface.aod.time.timeSeparateDigits.minutes}}
          amountOfDigits={2}
          onUpdate={updateMinutes}
        />

        <ImageComponent 
          title='Separator'
          image={{...watchface.aod.time.timeSeparateDigits.separator}}
          onUpdate={updateSeparatorHours}
        />
      </Card.Body>
    </Card>
  );
};
export default TimeDigitalAODSeparatedComponent;
