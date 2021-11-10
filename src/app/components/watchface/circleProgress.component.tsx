import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { PointerScale } from "../../model/json.gts2minit.model";
import { WatchCircleScale, WatchScale } from "../../model/watchFace.gts2mini.model";

interface IProps {
  title: string,
  scale: WatchCircleScale;
  onUpdate(scale: WatchScale): void;
  onCopyFromNormal?(): void
}

const CircleProgressComponent: FC<IProps> = ({ title, scale, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Color', type: BlockType.Color, svalue: scale.json?.Color, onChange: changeColor },
        { title: 'Image', type: BlockType.SelectFile, nvalue: scale.json?.ImageIndex, onChange: changeImage },
      ]
    },
    {
      blocks: [
        { title: 'Center', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: scale.json?.CenterX ? scale.json.CenterX : 0, onChange: changeX },
        { title: 'Y', type: BlockType.Number, nvalue: scale.json?.CenterY ? scale.json.CenterY : 0, onChange: changeY },
      ]
    },
    {
      blocks: [
        { title: 'Start angle', type: BlockType.Number, nvalue: scale.json?.StartAngle ? scale.json.StartAngle : 0, onChange: changeStartAngle },
        { title: 'End angle', type: BlockType.Number, nvalue: scale.json?.EndAngle ? scale.json.EndAngle : 360, onChange: changeEndAngle },
      ]
    },
    {
      blocks: [
        { title: 'Radius', type: BlockType.Number, nvalue: scale.json?.RadiusX ? scale.json.RadiusX : 0, onChange: changeRadius },
        { title: 'Width',  type: BlockType.Number, nvalue: scale.json?.Width ? scale.json.Width : 1, onChange: changeWidth },
      ]
    },

  ], [scale]) // eslint-disable-line react-hooks/exhaustive-deps



  function onToggle(e) {
    const ch = { ...scale };
    ch.enabled = !ch.enabled;
    if (ch.enabled && !ch.json) { 
      ch.json = new PointerScale(); 
    }
    onUpdate(ch);
  }


  function changeImage(i: number) {
    let ch = {...scale};
    ch.json.PointerImageIndex = i;
    onUpdate(ch);
  }

  function changeX(val: number) {
    const ch = {...scale};
    ch.json.CenterX = val;
    onUpdate(ch);
  }

  function changeY(val: number) {
    const ch = {...scale};
    ch.json.CenterY = val;
    onUpdate(ch);
  }

  function changePointerY(val: number) {
    const ch = {...scale};
    ch.json.PointerCenterOfRotationY = val;
    onUpdate(ch);
  }

  function changeStartAngle(val: number) {
    const ch = {...scale};
    ch.json.RangeFrom = val;
    onUpdate(ch);
  }

  function changeEndAngle(val: number) {
    const ch = {...scale};
    ch.json.RangeTo = val;
    onUpdate(ch);
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
              checked={scale.enabled}
              onChange={onToggle}
            />
          </div>
        </div>
      </Card.Header>
      {scale.enabled ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );


};

export default CircleProgressComponent;
