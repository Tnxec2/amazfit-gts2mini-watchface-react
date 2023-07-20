import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchImage } from "../../model/watchFace.gts2mini.model";

interface IProps {
  title: string;
  image: WatchImage;
  onUpdate(imageSet: WatchImage): void;
}

const ImageComponent: FC<IProps> = ({ title, image, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, nvalue: image.json.ImageIndex, onChange: onChangeImageIndex,
        hint: image.json.ImageIndex ? '' : 'You should select a image',
        warning: !image.json.ImageIndex
      },
        { title: 'X', type: BlockType.Number, nvalue: image.json.X, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: image.json.Y, onChange: onChangeY },
      ]
    }
  ], [image]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeImageIndex(index: number) {
    const ip = { ...image };
    ip.json.ImageIndex = index;
    onUpdate(ip);
  }

  function onChangeX(val: number) {
    const ip = { ...image };
    ip.json.X = val;
    onUpdate(ip);
  }

  function onChangeY(val: number) {
    const ip = { ...image };
    ip.json.Y = val;
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
              checked={image.enabled}
              onChange={() => {
                const ic = { ...image };
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {image.enabled ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ImageComponent;
