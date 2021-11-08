import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType } from "../../model/blocks.model";
import { WatchAOD, WatchAodDateOneLine, WatchNumber } from "../../model/watchFace.gts2mini.model";
import WatchNumberComponent from "./number.component";


const DateAODOneLineComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function updateMonthAndDay(d: WatchNumber) {
    const w = { ...watchface };
    w.aod.dateOneLine.monthAndDay = d;
    setWatchface(w);
  }

  function onChangeSeparator(value: number) {
    const w = { ...watchface };
    w.aod.dateOneLine.separatorImageIndex = value;
    setWatchface(w);
  }

  return (
    <>
      <Card>
        <Card.Header
          onClick={() => {
            let w = {...watchface};
            if (!w.aod) w.aod = new WatchAOD()
            if (!w.aod.dateOneLine) w.aod.dateOneLine =new WatchAodDateOneLine()
            w.aod.dateOneLine.enabled = !watchface.aod.dateOneLine.enabled;
            setWatchface(w);
          }}
        >
          Date
        </Card.Header>
        <Card.Body className={`${watchface.aod?.dateOneLine?.enabled ? "collapse" : ""}`}>
          <BlocksArrayComponent ar={[
            {
              blocks: [
                { title: 'Separator', type: BlockType.SelectFile, nvalue: watchface.aod?.dateOneLine?.separatorImageIndex, onChange: onChangeSeparator },
              ]
            }
          ]} />
          <WatchNumberComponent
            title="MonthAndDay"
            digit={watchface.aod.dateOneLine.monthAndDay}
            onUpdate={updateMonthAndDay}
            followDisabled={true}
            showDelimiter={false}
            showDataType={false}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default DateAODOneLineComponent;
