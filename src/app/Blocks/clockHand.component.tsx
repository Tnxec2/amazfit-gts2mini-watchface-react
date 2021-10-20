import { FC } from "react";
import { Card } from "react-bootstrap";

import { WatchClockHand } from "../model/watchFace.model";
import SelectFileListComponent from "../../shared/selectFileList.component";

interface IProps {
  title: string,
  clockHand: WatchClockHand;
  onUpdate(clockHand: WatchClockHand): void;
  showAngle: boolean;
  onCopyFromNormal?(): void
}

const ClockHandComponent: FC<IProps> = ({ title, clockHand, onUpdate, showAngle, onCopyFromNormal }) => {
  
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
                ch.pointerImageIndex = i;
                onUpdate(ch);
              }}
              imageIndex={clockHand.pointerImageIndex}
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
              value={clockHand.x}
              onChange={(e) => {
                const ch = clockHand;
                ch.x = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.y}
              onChange={(e) => {
                const ch = clockHand;
                ch.y = parseInt(e.target.value);
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
              value={clockHand.pointerX}
              onChange={(e) => {
                const ch = clockHand;
                ch.pointerX = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.pointerY}
              onChange={(e) => {
                const ch = clockHand;
                ch.pointerY = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">Cover</span>
            <SelectFileListComponent
              setSelectedFileIndex={(i) => {
                let ch = clockHand;
                ch.coverImageIndex = i;
                onUpdate(ch);
              }}
              imageIndex={clockHand.coverImageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.coverX}
              onChange={(e) => {
                const ch = clockHand;
                ch.coverX = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.coverY}
              onChange={(e) => {
                const ch = clockHand;
                ch.coverY = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">Scale</span>
            <SelectFileListComponent
              setSelectedFileIndex={(i) => {
                let ch = clockHand;
                ch.scaleImageIndex = i;
                onUpdate(ch);
              }}
              imageIndex={clockHand.scaleImageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.scaleX}
              onChange={(e) => {
                const ch = clockHand;
                ch.scaleX = parseInt(e.target.value);
                onUpdate(ch);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={clockHand.scaleY}
              onChange={(e) => {
                const ch = clockHand;
                ch.scaleY = parseInt(e.target.value);
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
                value={clockHand.startAngle}
                onChange={(e) => {
                  const ch = clockHand;
                  ch.startAngle = parseInt(e.target.value);
                  onUpdate(ch);
                }}
              />
              <span className="input-group-text" id="addon-wrapping">
                End angle
              </span>
              <input
                type="number"
                className="form-control form-control-sm"
                value={clockHand.endAngle}
                onChange={(e) => {
                  const ch = clockHand;
                  ch.endAngle = parseInt(e.target.value);
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
