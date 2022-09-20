import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { PointerScale } from "../../model/json.gts2minit.model";
import { WatchImage, WatchScale } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";

interface IProps {
  title: string,
  scale: WatchScale;
  onUpdate(scale: WatchScale): void;
  onCopyFromNormal?(): void
}

const PointerProgressComponent: FC<IProps> = ({ title, scale, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Pointer', type: BlockType.SelectFile, nvalue: scale.pointerScaleJson?.PointerImageIndex, onChange: changePointerImageIndex },
      ]
    },
    {
      blocks: [
        { title: 'Center of rotation', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: scale.pointerScaleJson?.CenterX ? scale.pointerScaleJson.CenterX : 0, onChange: changeX },
        { title: 'Y', type: BlockType.Number, nvalue: scale.pointerScaleJson?.CenterY ? scale.pointerScaleJson.CenterY : 0, onChange: changeY },
      ]
    },
    {
      blocks: [
        { title: 'Start angle', type: BlockType.Number, nvalue: scale.pointerScaleJson?.RangeFrom ? scale.pointerScaleJson.RangeFrom : 0, onChange: changeStartAngle },
        { title: 'End angle', type: BlockType.Number, nvalue: scale.pointerScaleJson?.RangeTo ? scale.pointerScaleJson.RangeTo : 360, onChange: changeEndAngle },
      ]
    },
    {
      blocks: [
        { title: 'Pointer offset', type: BlockType.Empty },
        { title: 'Y', type: BlockType.Number, nvalue: scale.pointerScaleJson?.PointerCenterOfRotationY ? scale.pointerScaleJson.PointerCenterOfRotationY : 0, onChange: changePointerY },
      ]
    },
  ], [scale]) // eslint-disable-line react-hooks/exhaustive-deps



  function onToggle(e) {
    const ch = { ...scale };
    ch.enabled = !ch.enabled;
    if (ch.enabled && !ch.pointerScaleJson) { 
      ch.pointerScaleJson = new PointerScale(); 
    }
    onUpdate(ch);
  }


  function changePointerImageIndex(i: number) {
    let ch = {...scale};
    ch.pointerScaleJson.PointerImageIndex = i;
    onUpdate(ch);
  }

  function changeX(val: number) {
    const ch = {...scale};
    ch.pointerScaleJson.CenterX = val;
    onUpdate(ch);
  }

  function changeY(val: number) {
    const ch = {...scale};
    ch.pointerScaleJson.CenterY = val;
    onUpdate(ch);
  }

  function changePointerY(val: number) {
    const ch = {...scale};
    ch.pointerScaleJson.PointerCenterOfRotationY = val;
    onUpdate(ch);
  }

  function changeStartAngle(val: number) {
    const ch = {...scale};
    ch.pointerScaleJson.RangeFrom = val;
    onUpdate(ch);
  }

  function changeEndAngle(val: number) {
    const ch = {...scale};
    ch.pointerScaleJson.RangeTo = val;
    onUpdate(ch);
  }

  function updateBottomImage(image: WatchImage) {
    const ch = {...scale};
    ch.bottomImage = image;
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
          <ImageComponent
            title='bottom image'
            image={{...scale.bottomImage}}
            onUpdate={updateBottomImage}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );


};

export default PointerProgressComponent;
