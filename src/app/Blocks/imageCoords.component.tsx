import { FC } from "react";
import { Card } from "react-bootstrap";

import { WatchImageCoords } from "../model/watchFace.model";
import SelectFileListComponent from "../../shared/selectFileList.component";

interface IProps {
  title: string;
  imageCoords: WatchImageCoords;
  onUpdate(imageCoords: WatchImageCoords): void;
}

const ImageCoordsComponent: FC<IProps> = ({ title, imageCoords, onUpdate }) => {
  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={imageCoords.enabled}
              onChange={() => {
                const ic: WatchImageCoords = { ...imageCoords };
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {imageCoords.enabled ? (
        <Card.Body>
          <div className="input-group input-group-sm">
            <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent
              setSelectedFileIndex={(ix) => {
                const ip = { ...imageCoords };
                ip.imageIndex = ix;
                onUpdate(ip);
              }}
              imageIndex={imageCoords.imageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={imageCoords.x}
              onChange={(e) => {
                const ip = { ...imageCoords };
                let x = parseInt(e.target.value);
                ip.x = !isNaN(x) ? x : 0;
                onUpdate(ip);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={imageCoords.y}
              onChange={(e) => {
                const ip = { ...imageCoords };
                let y = parseInt(e.target.value);
                ip.y = !isNaN(y) ? y : 0;
                onUpdate(ip);
              }}
            />
          </div>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ImageCoordsComponent;
