import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchImageSet } from "../../model/watchFace.gts2mini.model";

interface IProps {
  title: string;
  imageSet: WatchImageSet;
  onUpdate(imageSet: WatchImageSet): void;
  disableCount?: boolean;
  disableCollapse?: boolean
}

const ImageSetComponent: FC<IProps> = ({ title, imageSet, onUpdate, disableCount, disableCollapse }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, nvalue: imageSet.json.ImageIndex, onChange: onChangeImageIndex },
        { title: 'Count', type: BlockType.Number, nvalue: imageSet.json.ImagesCount, onChange: onChangeCount, disabled: disableCount },
      ]
    },
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: imageSet.json.X, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: imageSet.json.Y, onChange: onChangeY },
      ]
    }
  ], [imageSet]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeImageIndex(index: number) {
    const ip = { ...imageSet };
    ip.json.ImageIndex = index;
    onUpdate(ip);
  }

  function onChangeX(val: number) {
    const ip = { ...imageSet };
    ip.json.X = val;
    onUpdate(ip);
  }
  function onChangeCount(val: number) {
    const ip = { ...imageSet };
    ip.json.ImagesCount = val;
    onUpdate(ip);
  }

  function onChangeY(val: number) {
    const ip = { ...imageSet };
    ip.json.Y = val;
    onUpdate(ip);
  }

  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          { !disableCollapse ? 
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={imageSet.enabled}
              onChange={() => {
                const ic = { ...imageSet };
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div> : '' }
        </div>
      </Card.Header>
      {imageSet.enabled || disableCollapse? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ImageSetComponent;
