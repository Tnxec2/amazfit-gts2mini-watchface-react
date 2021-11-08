import { FC } from "react";
import { Card } from "react-bootstrap";
import { WatchImageSet, WatchTwoDigitsSeparated } from "../../model/watchFace.gts2mini.model";
import ImageSetComponent from "./imageSet.component";

interface IProps {
  title: string;
  digit: WatchTwoDigitsSeparated;
  onUpdate(digit: WatchTwoDigitsSeparated): void;
}

const TwoDigitsComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
 
}) => {

  function updateTens(imageSet: WatchImageSet) {
    let d = {...digit}
    d.json.Tens = imageSet.json
    onUpdate(d)
  }
  
  function updateOnes(imageSet: WatchImageSet) {
    let d = {...digit}
    d.json.Ones = imageSet.json
    onUpdate(d)
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
              checked={digit.enabled}
              onChange={() => {
                const d = { ...digit };
                d.enabled = !d.enabled;
                onUpdate(d);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {digit.enabled ? (
        <Card.Body>
          <ImageSetComponent 
            title='Tens'
            imageSet={new WatchImageSet(10, digit.json.Tens)}
            onUpdate={updateTens}
          />
          <ImageSetComponent 
            title='Ones'
            imageSet={new WatchImageSet(10, digit.json.Ones)}
            onUpdate={updateOnes}
          />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default TwoDigitsComponent;
