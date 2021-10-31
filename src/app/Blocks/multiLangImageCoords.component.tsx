import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";

import { WatchMultilangImageCoords } from "../model/watchFace.model";
import SelectFileListComponent from "../shared/selectFileList.component";
import { Coordinates, MultilangImage } from "../model/json.model";
import { LangCodeType } from "../model/types.model";

interface IProps {
  title: string;
  imageCoords: WatchMultilangImageCoords;
  onUpdate(imageCoords: WatchMultilangImageCoords): void;
}

const MultilangImageCoordsComponent: FC<IProps> = ({ title, imageCoords, onUpdate }) => {

  const imageSetIndex = useMemo<number>(() => findImageIndex(imageCoords.json.ImageSet), [imageCoords])

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

  function changeX(e) {
    const ip = { ...imageCoords };
    let x = parseInt(e.target.value);
    if (!ip.json.Coordinates) ip.json.Coordinates = new Coordinates()
    ip.json.Coordinates.X = !isNaN(x) ? x : 0;
    onUpdate(ip);
  }

  function changeY(e) {
    const ip = { ...imageCoords };
    let y = parseInt(e.target.value);
    if (!ip.json.Coordinates) ip.json.Coordinates = new Coordinates()
    ip.json.Coordinates.Y = !isNaN(y) ? y : 0;
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
          <div className="input-group input-group-sm">
            <SelectFileListComponent
              title='ImageIndex'
              setSelectedFileIndex={changeImageIndex}
              imageIndex={imageCoords.json?.ImageSet[imageSetIndex]?.ImageSet.ImageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={imageCoords.json.Coordinates?.X}
              onChange={changeX}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={imageCoords.json.Coordinates?.Y}
              onChange={changeY}
            />
          </div>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default MultilangImageCoordsComponent;
