import { FC } from "react";
import { Card } from "react-bootstrap";
import { WatchStressActivity, WatchProgressStress } from "../../model/watchFace.gts2mini.model";
import ProgressStressComponent from "./progressStress.component";

interface IProps {
  activity: WatchStressActivity;
  title: string;
  onUpdateActivity(activity: WatchStressActivity): void;
}

const StressComponent: FC<IProps> = ({
  activity,
  title,
  onUpdateActivity,
}) => {

  function updateProgress(d: WatchProgressStress) {
    const a = {...activity};
    a.aProgress = d
    onUpdateActivity(a)
  }

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let a = { ...activity };
          a.collapsed = !a.collapsed;
          onUpdateActivity(a);
        }}>
        {title}
      </Card.Header>
      {!activity.collapsed ? (
        <Card.Body>
          <ProgressStressComponent
            progress={{...activity.aProgress}}
            title='Progress'
            onUpdate={updateProgress}
          />

        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default StressComponent;
