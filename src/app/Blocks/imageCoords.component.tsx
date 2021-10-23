import { FC } from "react";
import { Card } from "react-bootstrap";

import { WatchImageCoords } from "../model/watchFace.model";
import SelectFileListComponent from "../shared/selectFileList.component";

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
                ip.json.ImageIndex = ix;
                onUpdate(ip);
              }}
              imageIndex={imageCoords.json.ImageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={imageCoords.json.Coordinates.X}
              onChange={(e) => {
                const ip = { ...imageCoords };
                let x = parseInt(e.target.value);
                ip.json.Coordinates.X = !isNaN(x) ? x : 0;
                onUpdate(ip);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={imageCoords.json.Coordinates.Y}
              onChange={(e) => {
                const ip = { ...imageCoords };
                let y = parseInt(e.target.value);
                ip.json.Coordinates.Y = !isNaN(y) ? y : 0;
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
