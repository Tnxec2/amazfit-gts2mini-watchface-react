import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { ClockHand, Image } from "../../model/json.gts2minit.model";
import { WatchClockHand } from "../../model/watchFace.gts2mini.model";

interface IProps {
  title: string,
  clockHand: WatchClockHand;
  onUpdate(clockHand: WatchClockHand): void;
  showAngle: boolean;
  disableCenter: boolean,
  onCopyFromNormal?(): void,
}

const ClockHandComponent: FC<IProps> = ({ title, clockHand, onUpdate, showAngle, onCopyFromNormal, disableCenter }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Pointer', type: BlockType.SelectFile, nvalue: clockHand.json?.ImageIndex, onChange: changePointerImageIndex },
      ]
    },
    {
      disabled: disableCenter,
      blocks: [
        { title: 'Center of rotation', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: clockHand.json?.CenterCoordinates?.X ? clockHand.json.CenterCoordinates?.X : 0, onChange: changeX },
        { title: 'Y', type: BlockType.Number, nvalue: clockHand.json?.CenterCoordinates?.Y ? clockHand.json.CenterCoordinates?.Y : 0, onChange: changeY },
      ]
    },
    {
      blocks: [
        { title: 'Pointer offset', type: BlockType.Empty },
        { title: 'Y', type: BlockType.Number, nvalue: clockHand.json?.PointerCenterOfRotationY ? clockHand.json.PointerCenterOfRotationY : 0, onChange: changePointerY },
      ]
    },
    {
      blocks: [
        { title: 'Cover', type: BlockType.SelectFile, nvalue: clockHand.json?.CoverImage?.ImageIndex, onChange: changeCoverImageIndex },
        { title: 'X', type: BlockType.Number, nvalue: clockHand.json?.CoverImage?.X ? clockHand.json?.CoverImage?.X : 0, onChange: changeCoverX },
        { title: 'Y', type: BlockType.Number, nvalue: clockHand.json?.CoverImage?.Y ? clockHand.json?.CoverImage?.Y : 0, onChange: changeCoverY },
      ]
    },
    
    
  ], [clockHand]) // eslint-disable-line react-hooks/exhaustive-deps



  function toggleClockHand(e) {
    const ch = { ...clockHand };
    ch.enabled = !ch.enabled;
    if (ch.enabled && !ch.json) { 
      ch.json = new ClockHand(); 
    }
    onUpdate(ch);
  }


  function changePointerImageIndex(i: number) {
    let ch = {...clockHand};
    ch.json.ImageIndex = i;
    onUpdate(ch);
  }

  function changeX(val: number) {
    const ch = {...clockHand};
    ch.json.CenterCoordinates.X = val;
    onUpdate(ch);
  }

  function changeY(val: number) {
    const ch = {...clockHand};
    ch.json.CenterCoordinates.Y = val;
    onUpdate(ch);
  }

  function changePointerY(val: number) {
    const ch = {...clockHand};
    ch.json.PointerCenterOfRotationY = val;
    onUpdate(ch);
  }

  function changeCoverImageIndex(i: number) {
    let ch = {...clockHand};
    if (!ch.json.CoverImage) ch.json.CoverImage = new Image()
    ch.json.CoverImage.ImageIndex = i;
    onUpdate(ch);
  }

  function changeCoverX(val: number) {
    const ch = {...clockHand};
    if (!ch.json.CoverImage) ch.json.CoverImage = new Image()
    ch.json.CoverImage.X = val;
    onUpdate(ch);
  }

  function changeCoverY(val: number) {
    const ch = {...clockHand};
    if (!ch.json.CoverImage) ch.json.CoverImage = new Image()
    ch.json.CoverImage.Y = val;
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
