import { FC, useContext, useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchActivity, WatchActivityList } from "../model/watchFace.model";
import ActivityComponent from "./activity.component";

const ActivityListComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateBattery(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.activity, battery: a};
    updateActivity(al);
  }
  function updateSteps(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.activity, steps: a};
    updateActivity(al);
  }
  function updateCalories(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.activity, calories: a};
    updateActivity(al);
  }
  function updateHearthRate(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.activity, heartRate: a};
    updateActivity(al);
  }
  function updatePai(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.activity, pai: a};
    updateActivity(al);
  }
  function updateDistance(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.activity, distance: a};
    updateActivity(al);
  }
  function updateStandUp(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.activity, standUp: a};
    updateActivity(al);
  }
  function updateWeather(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.activity, weather: a};
    updateActivity(al);
  }

  function updateActivity(wa: WatchActivityList) {
    setWatchface({ ...watchface, activity: wa });
  }

  const activitys = useMemo(
    () => [
      { title: "Battery", a: watchface.activity.battery, up: updateBattery, showNoData: true },
      { title: "Steps", a: watchface.activity.steps, up: updateSteps, showNoData: true },
      { title: "Calories", a: watchface.activity.calories, up: updateCalories,showNoData: true },
      {
        title: "HearthRate",
        a: watchface.activity.heartRate,
        up: updateHearthRate,
        showNoData: true,
      },
      { title: "PAI", a: watchface.activity.pai,up: updatePai, showNoData: true },
      {
        title: "Distance",
        a: watchface.activity.distance,
        up: updateDistance,
        showNoData: true,
        showDecimalPointer: true,
        showProgress: false,
      },
      { title: "StandUp", a: watchface.activity.standUp, up: updateStandUp, showNoData: true },
      {
        title: "Weather",
        a: watchface.activity.weather,
        up: updateWeather,
        showNoData: true,
        showDelimiter: true,
      },
      {
        title: "Weather Min",
        a: watchface.activity.weatherMin,
        up: updateWeather,
        showNoData: true,
        showDelimiter: true,
      },
    ],
    [watchface]
  );

  return (
    <Card>
      <Card.Header
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        Activity
      </Card.Header>
      {!collapsed ? (
        <Card.Body>
          {activitys.map((item) => {
            return (
              <ActivityComponent
                title={item.title}
                activity={item.a}
                onUpdateActivity={item.up}
                showNoData={item.showNoData}
                showDecimalPointer={item.showDecimalPointer}
                showProgress={item.showProgress}
              />
            );
          })}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ActivityListComponent;
