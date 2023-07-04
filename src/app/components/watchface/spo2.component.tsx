import { FC } from "react";
import { Card } from "react-bootstrap";
import { WatchSpO2Activity, WatchProgressSpo } from "../../model/watchFace.gts2mini.model";
import ProgressSpo2Component from "./progressSpo2.component";

interface IProps {
  activity: WatchSpO2Activity;
  title: string;
  onUpdateActivity(activity: WatchSpO2Activity): void;
}

const Spo2Component: FC<IProps> = ({
  activity,
  title,
  onUpdateActivity,
}) => {

  function updateProgress(d: WatchProgressSpo) {
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
          <ProgressSpo2Component
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

export default Spo2Component;
