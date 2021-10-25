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

  function onChangeImageIndex(index: number) {
    const d = {...imageCoords};
    if (!d.json.ImageSet) {
      d.json.ImageSet = []
    }
    if (!d.json.ImageSet[imageSetIndex]) {
      let length = d.json.ImageSet.push(new MultilangImage())
      d.json.ImageSet[length-1].LangCode = LangCodeType.All.json;
      d.json.ImageSet[length-1].ImageSet.ImageIndex = index;
      d.json.ImageSet[length-1].ImageSet.ImagesCount = d.count;
    } else {
      d.json.ImageSet[imageSetIndex].ImageSet.ImageIndex = index;
    }
    onUpdate(d);
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
                const d = { ...imageCoords };
                d.enabled = !d.enabled;
                if ( !d.json.ImageSet) {
                  d.json.ImageSet = []
                  let digitimage = new MultilangImage()
                  digitimage.ImageSet.ImagesCount = d.count
                  d.json.ImageSet[0] = digitimage
                }}
              }
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
                ip.json.ImageSet[imageSetIndex].ImageSet.ImageIndex = ix;
                onUpdate(ip);
              }}
              imageIndex={imageCoords.json?.ImageSet[imageSetIndex]?.ImageSet.ImageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={imageCoords.json.Coordinates?.X}
              onChange={(e) => {
                const ip = { ...imageCoords };
                let x = parseInt(e.target.value);
                if (!ip.json.Coordinates) ip.json.Coordinates = new Coordinates()
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
              value={imageCoords.json.Coordinates?.Y}
              onChange={(e) => {
                const ip = { ...imageCoords };
                let y = parseInt(e.target.value);
                if (!ip.json.Coordinates) ip.json.Coordinates = new Coordinates()
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

export default MultilangImageCoordsComponent;
