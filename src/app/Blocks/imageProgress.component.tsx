import { FC } from "react";
import { Card } from "react-bootstrap";
import SelectFileListComponent from "../shared/selectFileList.component";
import { WatchImageProgress } from "../model/watchFace.model";

interface IProps {
  imageProgress: WatchImageProgress;
  onUpdate(imageProgress: WatchImageProgress): void;
}

const ImageProgressComponent: FC<IProps> = ({ imageProgress, onUpdate }) => {

  function toggle() {
    const ip = { ...imageProgress };
    ip.enabled = !ip.enabled;
    onUpdate(ip);
  }

  function changeImageIndex(i: number) {
    let ip = { ...imageProgress };
    ip.json.ImageSet.ImageIndex = i;
    onUpdate(ip);
  }

  function changeCount(e) {
    const d = { ...imageProgress };
    d.json.ImageSet.ImagesCount = parseInt(e.target.value);
    onUpdate(d);
  }

  function changeX(e, index: number) {
    const d = {...imageProgress};
    d.json.Coordinates[index].X = parseInt(e.target.value);
    onUpdate(d);
  }

  function changeY(e, index: number) {
    const d = {...imageProgress};
    d.json.Coordinates[index].Y = parseInt(e.target.value);
    onUpdate(d);
  }

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
              onChange={toggle}
            />
          </div>
        </div>
      </Card.Header>
      {imageProgress.enabled ? (
        <Card.Body>
          <div className="input-group input-group-sm mb-1">
            <SelectFileListComponent
              title='ImageIndex'
              setSelectedFileIndex={changeImageIndex}
              imageIndex={imageProgress.json.ImageSet.ImageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              Count
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={imageProgress.json.ImageSet.ImagesCount}
              onChange={changeCount}
            />
          </div>
            { imageProgress.json.Coordinates.map((coords, index) => (
              <div key={index} className="input-group input-group-sm">
                <span className="input-group-text">
                  {index}
                </span>
                <span className="input-group-text">
                  X
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={coords.X}
                  onChange={(e) => changeX(e, index)}
                />
                <span className="input-group-text">
                  Y
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={coords.Y}
                  onChange={(e) => changeY(e, index)}
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
