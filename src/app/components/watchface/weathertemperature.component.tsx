import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchNumber, WatchTextTemperature } from "../../model/watchFace.gts2mini.model";
import WatchNumberComponent from "./number.component";

interface IProps {
  title: string;
  temp: WatchTextTemperature;
  onUpdate(digit: WatchTextTemperature): void;
}

const WeatherTemperatureComponent: FC<IProps> = ({
  title,
  temp,
  onUpdate
}) => {

  const arCurrent = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Minus', type: BlockType.SelectFile, nvalue: temp.minus, onChange: onChangeMinus },
        { title: 'NoData', type: BlockType.SelectFile, nvalue: temp.nodata, onChange: onChangeNoData },
        { title: 'Suffix C', type: BlockType.SelectFile, nvalue: temp.suffixC, onChange: onChangeSuffixC },
      ]
    },
  ], [temp]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeMinus(val: number) {
    onUpdate({...temp, minus: val})
  }
  function onChangeNoData(val: number) {
    onUpdate({...temp, nodata: val})
  }
  function onChangeSuffixC(val: number) {
    onUpdate({...temp, suffixC: val})
  }
  function updateWatchNumber(n: WatchNumber) {
    onUpdate({...temp, watchNumber: {...n}})
  }

  return (
    <Card className="activity w-100">
      <Card.Header>
        <div className="input-group input-group-sm">
        <span className="input-group-text">{title}</span>
        <div className="input-group-text">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            checked={temp.enabled}
            onChange={() => {
              const d = { ...temp };
              d.enabled = !d.enabled;
              if (d.watchNumber) d.watchNumber.enabled = d.enabled
              onUpdate(d);
            }}
          />
        </div>
      </div>
      </Card.Header>
      {temp.enabled ? (
        <Card.Body>
          <WatchNumberComponent
            title='ImageNumber'
            digit={{...temp.watchNumber}}
            onUpdate={updateWatchNumber}
            followDisabled={true}
          />
          <BlocksArrayComponent ar={arCurrent} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default WeatherTemperatureComponent;
