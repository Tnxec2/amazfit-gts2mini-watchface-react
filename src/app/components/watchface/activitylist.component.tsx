import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchCaloriesActivity, WatchDistanceActivity, WatchHeartRateActivity, WatchPAIActivity, WatchStandUpActivity, WatchStepsActivity } from "../../model/watchFace.gts2mini.model";
import CaloriesComponent from "./calories.component";
import DistanceComponent from "./distance.component";
import HeartRateComponent from "./heartrate.component";
import PAIComponent from "./pai.component";
import StandUpComponent from "./standup.component";
import StepsComponent from "./steps.component";

const ActivityListComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function updateSteps(a: WatchStepsActivity) {
    const w = {...watchface};
    w.activity.steps = a;
    setWatchface(w);
  }
  function updateCaloris(a: WatchCaloriesActivity) {
    const w = {...watchface};
    w.activity.calories = a;
    setWatchface(w);
  }
  function updateHearthrate(a: WatchHeartRateActivity) {
    const w = {...watchface};
    w.activity.heartRate = a;
    setWatchface(w);
  }
  function updateDistance(a: WatchDistanceActivity) {
    const w = {...watchface};
    w.activity.distance = a;
    setWatchface(w);
  }
  function updatePai(a: WatchPAIActivity) {
    const w = {...watchface};
    w.activity.pai = a;
    setWatchface(w);
  }
  function updateStandUp(a: WatchStandUpActivity) {
    const w = {...watchface};
    w.activity.standUp = a;
    setWatchface(w);
  }
  return (
    <Card>
      <Card.Header 
        title='Click to open / close'
        onClick={() => {
          const w = {...watchface};
          w.activity.collapsed = !w.activity.collapsed
          setWatchface(w)
        }}
      >
        Activity
    
      </Card.Header>
      { !watchface.activity.collapsed  ? (
        <Card.Body>
            <StepsComponent
              title='Steps'
              activity={{...watchface.activity.steps}}
              onUpdateActivity={updateSteps}
            />
            <CaloriesComponent
              title='Calories'
              activity={{...watchface.activity.calories}}
              onUpdateActivity={updateCaloris}
            />
            <HeartRateComponent
              title='Hearth rate'
              activity={{...watchface.activity.heartRate}}
              onUpdateActivity={updateHearthrate}
            />
            <DistanceComponent
              title='Distance'
              activity={{...watchface.activity.distance}}
              onUpdateActivity={updateDistance}
            />
            <PAIComponent
              title='PAI'
              activity={{...watchface.activity.pai}}
              onUpdateActivity={updatePai}
            />
            <StandUpComponent
              title='Stand up'
              activity={{...watchface.activity.standUp}}
              onUpdateActivity={updateStandUp}
            />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ActivityListComponent;
