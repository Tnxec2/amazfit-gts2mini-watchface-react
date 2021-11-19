import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchFiveDigitsSeparated, WatchFourDigitsSeparated, WatchThreeDigitsSeparated } from "../../model/watchFace.gts2mini.model";
import SeparatedDigitsComponent from "./separatedDigits.component";


const ActivitySeparatedComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);


  function updateSteps(h: WatchFiveDigitsSeparated) {
    const w = {...watchface};
    w.activity.stepsSeparatedDigits = h;
    setWatchface(w);
  }
  
  function updateCalories(h: WatchFourDigitsSeparated) {
    const w = {...watchface};
    w.activity.caloriesSeparatedDigits = h;
    setWatchface(w);
  }

  function updateHeartRate(h: WatchThreeDigitsSeparated) {
    const w = {...watchface};
    w.activity.heartRateSeparatedDigits = h;
    setWatchface(w);
  }
  function updateBattery(h: WatchThreeDigitsSeparated) {
    const w = {...watchface};
    w.activity.batterySeparatedDigits = h;
    setWatchface(w);
  }

  return (
    <Card>
      <Card.Header
        onClick={() => {
          let w = {...watchface};
          w.activity.collapsedSeparated = !watchface.activity.collapsedSeparated;
          setWatchface(w);
        }}
      >
        Activity (Separate Digits)
      </Card.Header>
      <Card.Body className={`${watchface.activity.collapsedSeparated ? "collapse" : ""}`}>

        <SeparatedDigitsComponent
          title="Steps"
          digit={{...watchface.activity.stepsSeparatedDigits}}
          amountOfDigits={5}
          onUpdate={updateSteps}
        />
        
        <SeparatedDigitsComponent
          title="Calories"
          digit={{...watchface.activity.caloriesSeparatedDigits}}
          amountOfDigits={4}
          onUpdate={updateCalories}
        />

        <SeparatedDigitsComponent
          title="Heart rate"
          digit={{...watchface.activity.heartRateSeparatedDigits}}
          amountOfDigits={3}
          onUpdate={updateHeartRate}
        />

        <SeparatedDigitsComponent
          title="Battery"
          digit={{...watchface.activity.batterySeparatedDigits}}
          amountOfDigits={3}
          onUpdate={updateBattery}
        />
               
      </Card.Body>
    </Card>
  );
};
export default ActivitySeparatedComponent;
