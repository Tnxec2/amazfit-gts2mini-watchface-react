import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import { ActivityType } from "../model/types.model";
import { getActivity, WatchActivity } from "../model/watchFace.model";
import ActivityComponent from "./activity.component";


interface IProps {
  activitys: WatchActivity[];
  onUpdate(activitys: WatchActivity[]): void;
}

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const ActivityListComponent: FC<IProps> = ({activitys, onUpdate}) => {

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [activityToAdd, setActivityToAdd] = useState<number>(ActivityType.Battery.index);

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

    // onDragStart fires when an element
  // starts being dragged
  function onDragStart(event) {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: activitys,
    });

    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", "");
  }

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  function onDragOver(event) {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
      onUpdate(newList);
    }
  }

  function onDrop(event) {
    onUpdate(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  }

  function onDragLeave() {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  }

  function updateActivity(index: number, a: WatchActivity) {
    let al = [...activitys]
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
    if ( window.confirm(`would you delete this "${activitys[index].digit.con.title}" activity?`)) {
      let al = [...activitys]
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
           <ul className="list-group droplist">
          {activitys?.length > 0 ? activitys.map((item, index) => {
            return (
              <li 
              key={index}
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              className={`${
                dragAndDrop && dragAndDrop.draggedTo === Number(index)
                  ? "dropArea"
                  : ""
              }`}
              >
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
              </li>
            );
          }) 
          : 'no activitys addes'}
          </ul>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ActivityListComponent;
