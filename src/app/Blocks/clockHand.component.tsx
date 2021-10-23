import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";

import { WatchClockHand } from "../model/watchFace.model";
import SelectFileListComponent from "../shared/selectFileList.component";
import { ClockHand, Coordinates, ImageCoord, LangCodeType, MultilangImage, MultilangImageCoord } from "../model/json.model";

interface IProps {
  title: string,
  clockHand: WatchClockHand;
  onUpdate(clockHand: WatchClockHand): void;
  showAngle: boolean;
  onCopyFromNormal?(): void
}

const ClockHandComponent: FC<IProps> = ({ title, clockHand, onUpdate, showAngle, onCopyFromNormal }) => {
  
  const scaleImageSetIndex = useMemo<number>(() => findImageIndex(clockHand.json?.Scale?.ImageSet), [clockHand])

  function findImageIndex(ar: MultilangImage[]): number {
    if (!ar) return null
    let index = ar.findIndex((item) => item.LangCode === LangCodeType.All.json)
    return index ? index : 0
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
              onChange={() => {
                const ch = { ...clockHand };
                ch.enabled = !ch.enabled;
                if (ch.enabled && !ch.json) {ch.json = new ClockHand(); ch.json.StartAngle = 0; ch.json.EndAngle = 360; }
                onUpdate(ch);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {clockHand.enabled ? (
        <Card.Body>
          { !onCopyFromNormal ? '' : <div style={{clear:'both'}}><button className='btn btn-sm btn-secondary mb-1' style={{float:'right'}} onClick={onCopyFromNormal}>Copy from normal screen</button></div> }
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">Pointer</span>
            <SelectFileListComponent
              setSelectedFileIndex={(i) => {
                let ch = clockHand;
                if (!ch.json.Pointer) ch.json.Pointer = new ImageCoord()
                ch.json.Pointer.ImageIndex = i;
                onUpdate(ch);
              }}
              imageIndex={clockHand.json?.Pointer?.ImageIndex}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">Center of rotation</span>
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.json.X}
              onChange={(e) => {
                const ch = clockHand;
                ch.json.X = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.json.Y}
              onChange={(e) => {
                const ch = clockHand;
                ch.json.Y = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">Pointer offset</span>
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.json?.Pointer?.Coordinates?.X}
              onChange={(e) => {
                const ch = clockHand;
                if (!ch.json.Pointer) ch.json.Pointer = new ImageCoord()
                if (!ch.json.Pointer.Coordinates) ch.json.Pointer.Coordinates = new Coordinates()
                ch.json.Pointer.Coordinates.X = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.json?.Pointer?.Coordinates?.Y}
              onChange={(e) => {
                const ch = clockHand;
                if (!ch.json.Pointer) ch.json.Pointer = new ImageCoord()
                if (!ch.json.Pointer.Coordinates) ch.json.Pointer.Coordinates = new Coordinates()
                ch.json.Pointer.Coordinates.Y = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">Cover</span>
            <SelectFileListComponent
              setSelectedFileIndex={(i) => {
                let ch = clockHand;
                if (!ch.json.Cover) ch.json.Cover = new ImageCoord()
                ch.json.Cover.ImageIndex = i;
                onUpdate(ch);
              }}
              imageIndex={clockHand.json?.Cover?.ImageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.json?.Cover?.Coordinates?.X}
              onChange={(e) => {
                const ch = clockHand;
                if (!ch.json.Cover) ch.json.Cover = new ImageCoord()
                if (!ch.json.Cover.Coordinates) ch.json.Cover.Coordinates = new Coordinates()
                ch.json.Cover.Coordinates.X = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.json?.Cover?.Coordinates?.Y}
              onChange={(e) => {
                const ch = clockHand;
                if (!ch.json.Cover) ch.json.Cover = new ImageCoord()
                if (!ch.json.Cover.Coordinates) ch.json.Cover.Coordinates = new Coordinates()
                ch.json.Cover.Coordinates.Y = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">Scale</span>
            <SelectFileListComponent
              setSelectedFileIndex={(i) => {
                let ch = clockHand;
                if (!ch.json.Scale) { 
                  ch.json.Scale = new MultilangImageCoord()
                  ch.json.Scale.ImageSet[0].ImageSet.ImageIndex = i;
                } else {
                  ch.json.Scale.ImageSet[scaleImageSetIndex].ImageSet.ImageIndex = i;
                }
                onUpdate(ch);
              }}
              imageIndex={clockHand.json?.Scale?.ImageSet[scaleImageSetIndex]?.ImageSet?.ImageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.json?.Scale?.Coordinates?.X}
              onChange={(e) => {
                const ch = clockHand;
                if (!ch.json.Scale) ch.json.Scale = new MultilangImageCoord() 
                if (!ch.json.Scale.Coordinates) ch.json.Scale.Coordinates = new Coordinates()
                ch.json.Scale.Coordinates.X = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.json?.Scale?.Coordinates?.Y}
              onChange={(e) => {
                const ch = clockHand;
                if (!ch.json.Scale) ch.json.Scale = new MultilangImageCoord() 
                if (!ch.json.Scale.Coordinates) ch.json.Scale.Coordinates = new Coordinates()
                ch.json.Scale.Coordinates.Y = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
          </div>
          {showAngle ? (
            <div className="input-group input-group-sm mb-1">
              <span className="input-group-text" id="addon-wrapping">
                Start angle
              </span>
              <input
                type="number"
                className="form-control form-control-sm"
                value={clockHand.json?.StartAngle}
                onChange={(e) => {
                  const ch = clockHand;
                  ch.json.StartAngle = parseInt(e.target.value);
                  onUpdate(ch);
                }}
              />
              <span className="input-group-text" id="addon-wrapping">
                End angle
              </span>
              <input
                type="number"
                className="form-control form-control-sm"
                value={clockHand.json?.EndAngle}
                onChange={(e) => {
                  const ch = clockHand;
                  ch.json.EndAngle = parseInt(e.target.value);
                  onUpdate(ch);
                }}
              />
            </div>
          ) : (
            ""
          )}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ClockHandComponent;
