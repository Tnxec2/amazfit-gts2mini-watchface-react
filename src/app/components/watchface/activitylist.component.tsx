import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { ActivityType } from "../../model/types.gts2mini.model";
import { WatchActivity } from "../../model/watchFace.gts2mini.model";
import ActivityComponent from "./activity.component";

const ActivityListComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  function updateSteps(a: WatchActivity) {
    const w = {...watchface};
    w.activity.steps = a;
    setWatchface(w);
  }
  function updateCaloris(a: WatchActivity) {
    const w = {...watchface};
    w.activity.calories = a;
    setWatchface(w);
  }
  function updateHearthrate(a: WatchActivity) {
    const w = {...watchface};
    w.activity.heartRate = a;
    setWatchface(w);
  }
  function updateDistance(a: WatchActivity) {
    const w = {...watchface};
    w.activity.distance = a;
    setWatchface(w);
  }
  function updatePai(a: WatchActivity) {
    const w = {...watchface};
    w.activity.pai = a;
    setWatchface(w);
  }
  function updateStandUp(a: WatchActivity) {
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
            <ActivityComponent
              title='Steps'
              activity={{...watchface.activity.steps}}
              onUpdateActivity={updateSteps}
              type={ActivityType.Steps}
              showImageProgress={true}
              showIconProgress={true}
              showPointerProgress={true}
              showCircleScaleProgress={true}
            />
            <ActivityComponent
              title='Calories'
              activity={{...watchface.activity.calories}}
              onUpdateActivity={updateCaloris}
              type={ActivityType.Calories}
              showImageProgress={true}
              showIconProgress={true}
              showPointerProgress={true}
              showCircleScaleProgress={true}
            />
            <ActivityComponent
              title='Hearth rate'
              activity={{...watchface.activity.heartRate}}
              onUpdateActivity={updateHearthrate}
              type={ActivityType.HeartRate}
              showImageProgress={true}
              showIconProgress={true}
              showPointerProgress={true}
              showCircleScaleProgress={true}
            />
            <ActivityComponent
              title='Distance'
              activity={{...watchface.activity.distance}}
              onUpdateActivity={updateDistance}
              type={ActivityType.Distance}
              showImageProgress={false}
              showIconProgress={false}
              showPointerProgress={false}
              showCircleScaleProgress={false}
            />
            <ActivityComponent
              title='PAI'
              activity={{...watchface.activity.pai}}
              onUpdateActivity={updatePai}
              type={ActivityType.Pai}
              showImageProgress={true}
              showIconProgress={false}
              showPointerProgress={false}
              showCircleScaleProgress={false}
            />
            <ActivityComponent
              title='Stand up'
              activity={{...watchface.activity.standUp}}
              onUpdateActivity={updateStandUp}
              type={ActivityType.StandUp}
              showImageProgress={true}
              showIconProgress={true}
              showPointerProgress={true}
              showCircleScaleProgress={true}
            />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ActivityListComponent;
