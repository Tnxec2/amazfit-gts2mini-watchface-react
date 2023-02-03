import { FC } from "react";
import { Card } from "react-bootstrap";
import {  WatchImage, WatchPointerScale, WatchScale } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import PointerProgressComponent from "./pointerProgress.component";

interface IProps {
  title: string;
  scale: WatchScale;
  onUpdate(scale: WatchScale): void;
}

const ScaleComponent: FC<IProps> = ({ title, scale, onUpdate }) => {


  function onChangePointerScale(im: WatchPointerScale) {
    const ip = { ...scale };
    ip.pointerscale = im;
    onUpdate(ip);
  }

  function onChangeBottomImage(im: WatchImage) {
    const ip = { ...scale };
    ip.bottomImage = im;
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
              checked={scale.enabled}
              onChange={() => {
                const ic = { ...scale };
                ic.enabled = !ic.enabled;
                onUpdate(ic);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {scale.enabled ? (
        <Card.Body>
          <PointerProgressComponent
            title="Pointer Scale"
            scale={{...scale.pointerscale}}
            onUpdate={onChangePointerScale}
          />
          <ImageComponent
            title="Bottom image"
            image={{...scale.bottomImage}}
            onUpdate={onChangeBottomImage}
            />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ScaleComponent;
