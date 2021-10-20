import { FC } from "react";
import { Card } from "react-bootstrap";
import SelectFileListComponent from "../../shared/selectFileList.component";
import { WatchImageProgress } from "../model/watchFace.model";

interface IProps {
  imageProgress: WatchImageProgress;
  onUpdate(imageProgress: WatchImageProgress): void;
}

const ImageProgressComponent: FC<IProps> = ({ imageProgress, onUpdate }) => {

  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">Image Progress</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={imageProgress.enabled}
              onChange={() => {
                const ip = { ...imageProgress };
                ip.enabled = !ip.enabled;
                onUpdate(ip);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {imageProgress.enabled ? (
        <Card.Body>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent
              setSelectedFileIndex={(i) => {
                let ip = imageProgress;
                ip.imageIndex = i;
                onUpdate(ip);
              }}
              imageIndex={imageProgress.imageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              Count
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={imageProgress.imageCount}
              onChange={(e) => {
                const d = imageProgress;
                d.imageCount = parseInt(e.target.value);
                onUpdate(d);
              }}
            />
          </div>
            { imageProgress.coordinates.map((coords, index) => (
              <div className="input-group input-group-sm">
                <span className="input-group-text">
                  {index}
                </span>
                <span className="input-group-text">
                  X
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={coords.x}
                  onChange={(e) => {
                    const d = imageProgress;
                    coords.x = parseInt(e.target.value);
                    onUpdate(d);
                  }}
                />
                <span className="input-group-text">
                  Y
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={coords.y}
                  onChange={(e) => {
                    const d = imageProgress;
                    coords.y = parseInt(e.target.value);
                    onUpdate(d);
                  }}
                />
              </div>
            ))
            }
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ImageProgressComponent;
