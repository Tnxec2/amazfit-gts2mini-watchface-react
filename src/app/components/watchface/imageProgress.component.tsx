import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import { WatchImageProgress } from "../../model/watchFace.model";
import { BlockType, IRow } from "../../model/blocks.model";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { Coordinates } from "../../model/json.model";

interface IProps {
  imageProgress: WatchImageProgress;
  onUpdate(imageProgress: WatchImageProgress): void;
}

const ImageProgressComponent: FC<IProps> = ({ imageProgress, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, nvalue: imageProgress.json?.ImageSet?.ImageIndex, onChange: changeImageIndex },
        { title: 'Count', type: BlockType.Number, nvalue: imageProgress.json?.ImageSet?.ImagesCount, onChange: changeCount },
      ]
    },
    ], [imageProgress]) // eslint-disable-line react-hooks/exhaustive-deps

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

  function changeCount(val: number) {
    const d = { ...imageProgress };
    d.json.ImageSet.ImagesCount = val;
    onUpdate(d);
  }

  function changeX(val: number, index: number) {
    const d = {...imageProgress};
    d.json.Coordinates[index].X = val;
    onUpdate(d);
  }

  function changeY(val: number, index: number) {
    const d = {...imageProgress};
    d.json.Coordinates[index].Y = val;
    onUpdate(d);
  }

  function addCoordinates() {
    const d = {...imageProgress};
    let coords = new Coordinates();
    coords.X = d.json.Coordinates.length > 0 ? d.json.Coordinates[d.json.Coordinates.length-1].X : 0
    coords.Y = d.json.Coordinates.length > 0 ? d.json.Coordinates[d.json.Coordinates.length-1].Y : 0
    d.json.Coordinates.push(coords)
    onUpdate(d)
  }

  function onDelete(index: number) {
    const d = {...imageProgress};
    d.json.Coordinates.splice(index, 1)
    onUpdate(d)
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
          <BlocksArrayComponent ar={ar} />
          <Card className="mt-1">
            <Card.Header
              className="input-group input-group-sm d-flex justify-content-between">
            <span>Coordinates</span>
            <button className="btn btn-outline-success" type="button" title="add coordinates" onClick={addCoordinates}>Add</button>
            </Card.Header>
          <BlocksArrayComponent ar={ 
            imageProgress.json.Coordinates.map((coords, index) => 
            ({
              blocks: [
                { title: `${index}`, type: BlockType.Empty },
                { title: 'X', type: BlockType.Number, nvalue: coords.X ? coords.X : 0, onChange: (e) => changeX(e, index) },
                { title: 'Y', type: BlockType.Number, nvalue: coords.Y ? coords.Y : 0, onChange: (e) => changeY(e, index) },
              ],
              onDelete: index > 0 ? () => onDelete(index) : null,
              showDelete: true
            }))
          }
          />
          </Card> 
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ImageProgressComponent;
