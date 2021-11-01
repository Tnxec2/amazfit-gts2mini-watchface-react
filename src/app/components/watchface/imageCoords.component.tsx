import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchImageCoords } from "../../model/watchFace.model";

interface IProps {
  title: string;
  imageCoords: WatchImageCoords;
  onUpdate(imageCoords: WatchImageCoords): void;
}

const ImageCoordsComponent: FC<IProps> = ({ title, imageCoords, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, nvalue: imageCoords.json.ImageIndex, onChange: onChangeImageIndex },
        { title: 'X', type: BlockType.Number, nvalue: imageCoords.json.Coordinates.X, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: imageCoords.json.Coordinates.Y, onChange: onChangeY },
      ]
    }
  ], [imageCoords]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeImageIndex(index: number) {
    const ip = { ...imageCoords };
    ip.json.ImageIndex = index;
    onUpdate(ip);
  }

  function onChangeX(val: number) {
    const ip = { ...imageCoords };
    ip.json.Coordinates.X = val;
    onUpdate(ip);
  }

  function onChangeY(val: number) {
    const ip = { ...imageCoords };
    ip.json.Coordinates.Y = val;
    onUpdate(ip);
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
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ImageCoordsComponent;
