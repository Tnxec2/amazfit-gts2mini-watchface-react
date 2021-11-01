import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { ClockHand, Coordinates, ImageCoord, MultilangImage, MultilangImageCoord } from "../../model/json.model";
import { LangCodeType } from "../../model/types.model";
import { WatchClockHand } from "../../model/watchFace.model";

interface IProps {
  title: string,
  clockHand: WatchClockHand;
  onUpdate(clockHand: WatchClockHand): void;
  showAngle: boolean;
  onCopyFromNormal?(): void
}

const ClockHandComponent: FC<IProps> = ({ title, clockHand, onUpdate, showAngle, onCopyFromNormal }) => {

  const scaleImageSetIndex = useMemo<number>(() => findImageIndex(clockHand.json?.Scale?.ImageSet), [clockHand])

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Pointer', type: BlockType.SelectFile, nvalue: clockHand.json?.Pointer?.ImageIndex, onChange: changePointerImageIndex },
      ]
    },
    {
      blocks: [
        { title: 'Center of rotation', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: clockHand.json?.X ? clockHand.json.X : 0, onChange: changeX },
        { title: 'Y', type: BlockType.Number, nvalue: clockHand.json?.Y ? clockHand.json?.Y : 0, onChange: changeY },
      ]
    },
    {
      blocks: [
        { title: 'Pointer offset', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: clockHand.json?.Pointer?.Coordinates?.X ? clockHand.json?.Pointer?.Coordinates?.X : 0, onChange: changePointerX },
        { title: 'Y', type: BlockType.Number, nvalue: clockHand.json?.Pointer?.Coordinates?.Y ? clockHand.json?.Pointer?.Coordinates?.Y : 0, onChange: changePointerY },
      ]
    },
    {
      blocks: [
        { title: 'Cover', type: BlockType.SelectFile, nvalue: clockHand.json?.Cover?.ImageIndex, onChange: changeCoverImageIndex },
        { title: 'X', type: BlockType.Number, nvalue: clockHand.json?.Cover?.Coordinates?.X ? clockHand.json?.Cover?.Coordinates?.X : 0, onChange: changeCoverX },
        { title: 'Y', type: BlockType.Number, nvalue: clockHand.json?.Cover?.Coordinates?.Y ? clockHand.json?.Cover?.Coordinates?.Y : 0, onChange: changeCoverY },
      ]
    },
    {
      blocks: [
        { title: 'Scale', type: BlockType.SelectFile, nvalue: clockHand.json?.Scale?.ImageSet[scaleImageSetIndex]?.ImageSet?.ImageIndex, onChange: changeScaleImageIndex },
        { title: 'X', type: BlockType.Number, nvalue: clockHand.json?.Scale?.Coordinates?.X ? clockHand.json?.Scale?.Coordinates?.X : 0, onChange: changeScaleX },
        { title: 'Y', type: BlockType.Number, nvalue: clockHand.json?.Scale?.Coordinates?.Y ? clockHand.json?.Scale?.Coordinates?.Y : 0, onChange: changeScaleY },
      ]
    },
    {
      disabled: !showAngle,
      blocks: [
        { title: 'Start angle', type: BlockType.Number, nvalue: clockHand.json?.StartAngle, onChange: changeStartAngle },
        { title: 'End angle', type: BlockType.Number, nvalue: clockHand.json?.EndAngle, onChange: changeEndAngle },
      ]
    },
  ], [clockHand]) // eslint-disable-line react-hooks/exhaustive-deps

  function findImageIndex(ar: MultilangImage[]): number {
    if (!ar) return null
    let index = ar.findIndex((item) => item.LangCode === LangCodeType.All.json)
    return index ? index : 0
  }

  function toggleClockHand(e) {
    const ch = { ...clockHand };
    ch.enabled = !ch.enabled;
    if (ch.enabled && !ch.json) { ch.json = new ClockHand(); ch.json.StartAngle = 0; ch.json.EndAngle = 360; }
    onUpdate(ch);
  }

  function changeEndAngle(val: number) {
    const ch = {...clockHand};
    ch.json.EndAngle = val;
    onUpdate(ch);
  }

  function changeStartAngle(val: number) {
    const ch = {...clockHand};
    ch.json.StartAngle = val;
    onUpdate(ch);
  }

  function changePointerImageIndex(i: number) {
    let ch = {...clockHand};
    if (!ch.json.Pointer) ch.json.Pointer = new ImageCoord()
    ch.json.Pointer.ImageIndex = i;
    onUpdate(ch);
  }

  function changeX(val: number) {
    const ch = {...clockHand};
    ch.json.X = val;
    onUpdate(ch);
  }

  function changeY(val: number) {
    const ch = {...clockHand};
    ch.json.Y = val;
    onUpdate(ch);
  }

  function changePointerX(val: number) {
    const ch = {...clockHand};
    if (!ch.json.Pointer) ch.json.Pointer = new ImageCoord()
    if (!ch.json.Pointer.Coordinates) ch.json.Pointer.Coordinates = new Coordinates()
    ch.json.Pointer.Coordinates.X = val;
    onUpdate(ch);
  }

  function changePointerY(val: number) {
    const ch = {...clockHand};
    if (!ch.json.Pointer) ch.json.Pointer = new ImageCoord()
    if (!ch.json.Pointer.Coordinates) ch.json.Pointer.Coordinates = new Coordinates()
    ch.json.Pointer.Coordinates.Y = val;
    onUpdate(ch);
  }

  function changeCoverImageIndex(i: number) {
    let ch = {...clockHand};
    if (!ch.json.Cover) ch.json.Cover = new ImageCoord()
    ch.json.Cover.ImageIndex = i;
    onUpdate(ch);
  }

  function changeCoverX(val: number) {
    const ch = {...clockHand};
    if (!ch.json.Cover) ch.json.Cover = new ImageCoord()
    if (!ch.json.Cover.Coordinates) ch.json.Cover.Coordinates = new Coordinates()
    ch.json.Cover.Coordinates.X = val;
    onUpdate(ch);
  }

  function changeCoverY(val: number) {
    const ch = {...clockHand};
    if (!ch.json.Cover) ch.json.Cover = new ImageCoord()
    if (!ch.json.Cover.Coordinates) ch.json.Cover.Coordinates = new Coordinates()
    ch.json.Cover.Coordinates.Y = val;
    onUpdate(ch);
  }

  function changeScaleImageIndex(i: number) {
    let ch = {...clockHand};
    if (!ch.json.Scale) {
      ch.json.Scale = new MultilangImageCoord()
      ch.json.Scale.ImageSet[0].ImageSet.ImageIndex = i;
    } else {
      ch.json.Scale.ImageSet[scaleImageSetIndex].ImageSet.ImageIndex = i;
    }
    onUpdate(ch);
  }

  function changeScaleX(val: number) {
    const ch = {...clockHand};
    if (!ch.json.Scale) ch.json.Scale = new MultilangImageCoord()
    if (!ch.json.Scale.Coordinates) ch.json.Scale.Coordinates = new Coordinates()
    ch.json.Scale.Coordinates.X = val;
    onUpdate(ch);
  }

  function changeScaleY(val: number) {
    const ch = {...clockHand};
    if (!ch.json.Scale) ch.json.Scale = new MultilangImageCoord()
    if (!ch.json.Scale.Coordinates) ch.json.Scale.Coordinates = new Coordinates()
    ch.json.Scale.Coordinates.Y = val;
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
              checked={clockHand.enabled}
              onChange={toggleClockHand}
            />
          </div>
        </div>
      </Card.Header>
      {clockHand.enabled ? (
        <Card.Body>
          {!onCopyFromNormal ? '' : <div style={{ clear: 'both' }}><button className='btn btn-sm btn-secondary mb-1' style={{ float: 'right' }} onClick={onCopyFromNormal}>Copy from normal screen</button></div>}
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );


};

export default ClockHandComponent;
