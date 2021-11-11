import { FC } from "react";
import { Card } from "react-bootstrap";
import { WatchImageSet } from "../../model/watchFace.gts2mini.model";
import ImageSetComponent from "./imageSet.component";

interface IProps {
  title: string,
  digit: any,
  amountOfDigits: number,
  onUpdate(digit: any): void,
}

const SeparatedDigitsComponent: FC<IProps> = ({
  title,
  digit,
  amountOfDigits,
  onUpdate,
}) => {


  
  function updateTenThousands(imageSet: WatchImageSet) {
      let d = {...digit}
      d.json.TenThousands = imageSet.json
      onUpdate(d)
  }

  function updateThousands(imageSet: WatchImageSet) {
      let d = {...digit}
      d.json.Thousands = imageSet.json
      onUpdate(d)
  }
  
  function updateHundreds(imageSet: WatchImageSet) {
      let d = {...digit}
      d.json.Hundreds = imageSet.json
      onUpdate(d)
  }
  
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
          { amountOfDigits > 4 ?
          <ImageSetComponent 
            title='Ten Thousands'
            imageSet={new WatchImageSet(10, digit.json.TenThousands)}
            onUpdate={updateTenThousands}
          /> : '' }
          { amountOfDigits > 3 ?
          <ImageSetComponent 
            title='Thousands'
            imageSet={new WatchImageSet(10, digit.json.Thousands)}
            onUpdate={updateThousands}
          /> : '' }
          { amountOfDigits > 2 ?
          <ImageSetComponent 
            title='Hundreds'
            imageSet={new WatchImageSet(10, digit.json.Hundreds)}
            onUpdate={updateHundreds}
          /> : '' }
          { amountOfDigits > 1 ?
          <ImageSetComponent 
            title='Tens'
            imageSet={new WatchImageSet(10, digit.json.Tens)}
            onUpdate={updateTens}
          /> : '' }
          { amountOfDigits > 0 ?
          <ImageSetComponent 
            title='Ones'
            imageSet={new WatchImageSet(10, digit.json.Ones)}
            onUpdate={updateOnes}
          /> : '' }
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default SeparatedDigitsComponent;
