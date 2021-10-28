import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import { ActivityType } from "../model/types.model";
import { getActivity, WatchActivity } from "../model/watchFace.model";
import ActivityComponent from "./activity.component";


interface IProps {
  activitys: WatchActivity[];
  onUpdate(activitys: WatchActivity[]): void;
}

const ActivityListComponent: FC<IProps> = ({activitys, onUpdate}) => {

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [activityToAdd, setActivityToAdd] = useState<number>(ActivityType.Battery.index);

  function updateActivity(index: number, a: WatchActivity) {
    let al = {...activitys}
    al[index] = {...a}
    onUpdate(al)
  }

  function addActivity(e) {
    e.stopPropagation()
    if (activityToAdd) {
      let _a = getActivity(null, ActivityType.findByIndex(activityToAdd) )
      if (_a) {
        activitys.push(_a)
        setCollapsed(false)
        onUpdate(activitys)
      }
    }
  }

  function deleteActivity(index: number) {
    if ( window.confirm('Are you sure?')) {
      let al = {...activitys}
      al.splice(index)
      onUpdate(al)
    }
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        Activity [{activitys?.length}]
        <span className="d-flex flex-nowrap">
          <select className="form-select" 
            onChange={(e) => setActivityToAdd(parseInt(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            value={activityToAdd}
            >
            <option value={ActivityType.Battery.index}>{ActivityType.Battery.json}</option>
            <option value={ActivityType.Steps.index}>{ActivityType.Steps.json}</option>
            <option value={ActivityType.Calories.index}>{ActivityType.Calories.json}</option>
            <option value={ActivityType.HeartRate.index}>{ActivityType.HeartRate.json}</option>
            <option value={ActivityType.Pai.index}>{ActivityType.Pai.json}</option>
            <option value={ActivityType.Distance.index}>{ActivityType.Distance.json}</option>
            <option value={ActivityType.StandUp.index}>{ActivityType.StandUp.json}</option>
            <option value={ActivityType.Weather.index}>{ActivityType.Weather.json}</option>
            <option value={ActivityType.UVindex.index}>{ActivityType.UVindex.json}</option>
            <option value={ActivityType.AirQuality.index}>{ActivityType.AirQuality.json}</option>
            <option value={ActivityType.Humidity.index}>{ActivityType.Humidity.json}</option>
            <option value={ActivityType.Sunrise.index}>{ActivityType.Sunrise.json}</option>
            <option value={ActivityType.WindForce.index}>{ActivityType.WindForce.json}</option>
            <option value={ActivityType.Altitude.index}>{ActivityType.Altitude.json}</option>
            <option value={ActivityType.AirPressure.index}>{ActivityType.AirPressure.json}</option>
            <option value={ActivityType.Stress.index}>{ActivityType.Stress.json}</option>
            <option value={ActivityType.ActivityGoal.index}>{ActivityType.ActivityGoal.json}</option>
            <option value={ActivityType.FatBurning.index}>{ActivityType.FatBurning.json}</option>
          </select>
          <button className="btn btn-outline-success" type="button" onClick={addActivity}>Add</button>
        </span>
      </Card.Header>
      {!collapsed ? (
        <Card.Body>
          {activitys?.length > 0 ? activitys.map((item, index) => {
            return (
              <ActivityComponent
                key={item.key}
                activity={item}
                onUpdateActivity={(a) => updateActivity(index, a)}
                onDelete={() => deleteActivity(index)}
                showNoData={true}
                showDecimalPointer={item.type === ActivityType.Distance}
                showProgress={item.type !== ActivityType.Distance}
                showDelimiter={item.type === ActivityType.Weather}
                title={item.digit ? item.digit.con.title : null}
                titleDefault={item.digit ? item.digit.con.titleDefault : null}
                titleMin={item.digitMin ? item.digitMin.con.titleMin : null}
                titleMax={item.digitMax ? item.digitMax.con.titleMax : null}
              />
            );
          }) 
        : 'no activitys addes'}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ActivityListComponent;
