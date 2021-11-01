import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { Coordinates, MultilangImage } from "../../model/json.model";
import { LangCodeType } from "../../model/types.model";
import { WatchMultilangImageCoords } from "../../model/watchFace.model";


interface IProps {
  title: string;
  imageCoords: WatchMultilangImageCoords;
  onUpdate(imageCoords: WatchMultilangImageCoords): void;
}

const MultilangImageCoordsComponent: FC<IProps> = ({ title, imageCoords, onUpdate }) => {

  const imageSetIndex = useMemo<number>(() => findImageIndex(imageCoords.json.ImageSet), [imageCoords])

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, nvalue: imageCoords.json?.ImageSet[imageSetIndex]?.ImageSet.ImageIndex, onChange: changeImageIndex },
        { title: 'X', type: BlockType.Number, nvalue: imageCoords.json.Coordinates?.X ? imageCoords.json.Coordinates?.X : 0, onChange: changeX },
        { title: 'Y', type: BlockType.Number, nvalue: imageCoords.json.Coordinates?.Y ? imageCoords.json.Coordinates?.Y : 0, onChange: changeY },
      ]
    },
  ], [imageCoords]) // eslint-disable-line react-hooks/exhaustive-deps

  function findImageIndex(ar: MultilangImage[]): number {
    if (!ar) return null
    let index = ar.findIndex((item) => item.LangCode === LangCodeType.All.json)
    return index >= 0 ? index : 0
  }

  function toggle() {
    const d = { ...imageCoords };
    d.enabled = !d.enabled;
    if ( !d.json.ImageSet) {
      d.json.ImageSet = []
      let digitimage = new MultilangImage()
      digitimage.ImageSet.ImagesCount = d.count
      d.json.ImageSet[0] = digitimage
    }
    onUpdate(d)
  }

  function changeImageIndex(ix: number) {
    const ip = { ...imageCoords };
    ip.json.ImageSet[imageSetIndex].ImageSet.ImageIndex = ix;
    onUpdate(ip);
  }

  function changeX(val: number) {
    const ip = { ...imageCoords };
    if (!ip.json.Coordinates) ip.json.Coordinates = new Coordinates()
    ip.json.Coordinates.X = val;
    onUpdate(ip);
  }

  function changeY(val: number) {
    const ip = { ...imageCoords };
    if (!ip.json.Coordinates) ip.json.Coordinates = new Coordinates()
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
              onChange={toggle}
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

export default MultilangImageCoordsComponent;
