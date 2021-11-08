import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { Coordinates } from "../../model/json.gts2minit.model";
import { WatchAmPmIcon } from "../../model/watchFace.gts2mini.model";

interface IProps {
  title: string;
  ampm: WatchAmPmIcon;
  onUpdate(ampm: WatchAmPmIcon): void;
}

const AmPmComponent: FC<IProps> = ({ title, ampm, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'AM', type: BlockType.SelectFile, nvalue: ampm.json.AmImageIndexEN, onChange: onChangeAmImageIndex },
        { title: 'PM', type: BlockType.SelectFile, nvalue: ampm.json.PmImageIndexEN, onChange: onChangePmImageIndex },
      ]
    },
    {
      blocks: [
        { title: 'Common', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: ampm.json.CommonX ? ampm.json.CommonX : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: ampm.json.CommonY ? ampm.json.CommonY : 0, onChange: onChangeY },
      ]
    },
    {
      blocks: [
        { title: 'AM', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: ampm.json.CoordinatesAM?.X ? ampm.json.CoordinatesAM.X : 0, onChange: onChangeAmX },
        { title: 'Y', type: BlockType.Number, nvalue: ampm.json.CoordinatesAM?.Y ? ampm.json.CoordinatesAM.Y : 0, onChange: onChangeAmY },
      ]
    },
    {
      blocks: [
        { title: 'PM', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: ampm.json.CoordinatesPM?.X ? ampm.json.CoordinatesPM.X : 0, onChange: onChangePmX },
        { title: 'Y', type: BlockType.Number, nvalue: ampm.json.CoordinatesPM?.Y ? ampm.json.CoordinatesPM.Y : 0, onChange: onChangePmY },
      ]
    }
  ], [ampm]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeAmImageIndex(index: number) {
    const ip = { ...ampm };
    ip.json.AmImageIndexEN = index;
    onUpdate(ip);
  }

  function onChangePmImageIndex(index: number) {
    const ip = { ...ampm };
    ip.json.PmImageIndexEN = index;
    onUpdate(ip);
  }

  function onChangeX(val: number) {
    const ip = { ...ampm };
    ip.json.CommonX = val;
    onUpdate(ip);
  }

  function onChangeY(val: number) {
    const ip = { ...ampm };
    ip.json.CommonY = val;
    onUpdate(ip);
  }

  function onChangeAmX(val: number) {
    const ip = { ...ampm };
    if (!ip.json.CoordinatesAM) ip.json.CoordinatesAM = new Coordinates();
    ip.json.CoordinatesAM.X = val;
    onUpdate(ip);
  }

  function onChangeAmY(val: number) {
    const ip = { ...ampm };
    if (!ip.json.CoordinatesAM) ip.json.CoordinatesAM = new Coordinates();
    ip.json.CoordinatesAM.Y = val;
    onUpdate(ip);
  }
  function onChangePmX(val: number) {
    const ip = { ...ampm };
    if (!ip.json.CoordinatesPM) ip.json.CoordinatesPM = new Coordinates();
    ip.json.CoordinatesPM.X = val;
    onUpdate(ip);
  }

  function onChangePmY(val: number) {
    const ip = { ...ampm };
    if (!ip.json.CoordinatesPM) ip.json.CoordinatesPM = new Coordinates();
    ip.json.CoordinatesPM.Y = val;
    onUpdate(ip);
  }

  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={ampm.enabled}
              onChange={() => {
                const ic = { ...ampm };
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {ampm.enabled ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default AmPmComponent;
