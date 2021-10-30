import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import { ActivityType, JsonType } from "../model/types.model";
import { getActivityFromJson, WatchActivity } from "../model/watchFace.model";
import DnDListComponent, { IDNDItem } from "../shared/draganddroplist.component";
import ActivityComponent from "./activity.component";


interface IProps {
  activitys: WatchActivity[];
  onUpdate(activitys: WatchActivity[]): void;
}

const ActivityListComponent: FC<IProps> = ({activitys, onUpdate}) => {

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [activityToAdd, setActivityToAdd] = useState<number>(ActivityType.Date.index);

  function updateOrder(list: IDNDItem<WatchActivity>[]) {
    let al = list.map((value) => value.item)
    onUpdate(al)
  }

  function updateActivity(index: number, a: WatchActivity) {
    let al = [...activitys]
    al[index] = {...a}
    onUpdate(al)
  }

  function addActivity(e) {
    e.stopPropagation()
    if (activityToAdd) {
      let _a = getActivityFromJson(null, ActivityType.findByIndex(activityToAdd) )
      if (_a) {
        activitys.push(_a)
        setCollapsed(false)
        onUpdate(activitys)
      }
    }
  }

  function deleteActivity(e, index: number) {
    e.stopPropagation()
    if ( window.confirm(`would you delete this "${activitys[index].digit.con.title}" activity?`)) {
      let al = [...activitys]
      al.splice(index, 1)
      onUpdate(al)
    }
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center"
        title='Click to open / close'
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
              {
                Object.keys(ActivityType).map((key) => 
                  ActivityType[key] instanceof JsonType ?
                    <option value={ActivityType[key].index}>{ActivityType[key].json}</option>
                    : ''
                )
              }
          </select>
          <button className="btn btn-outline-success" type="button" onClick={addActivity}>Add</button>
        </span>
      </Card.Header>
      {!collapsed ? (
        <Card.Body>
          {activitys?.length > 0 ? 
              <DnDListComponent
              _list={activitys.map((item, index) => ( { item: item, reactItem:
                <ActivityComponent
                  key={item.key}
                  activity={item}
                  onUpdateActivity={(a) => updateActivity(index, a)}
                  onDelete={(e) => deleteActivity(e, index)}
                  showNoData={true}
                  showDecimalPointer={item.type === ActivityType.Distance}
                  showProgress={item.type !== ActivityType.Distance}
                  showDelimiter={item.type === ActivityType.Weather}
                  title={item.digit ? item.digit.con.title : null}
                  titleDefault={item.digit ? item.digit.con.titleDefault : null}
                  titleMin={item.digitMin ? item.digitMin.con.titleMin : null}
                  titleMax={item.digitMax ? item.digitMax.con.titleMax : null}
                />})
              )}
              updateOrder={updateOrder}
              />
          : 'no activitys addes'}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ActivityListComponent;
