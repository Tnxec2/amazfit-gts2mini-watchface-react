import { useContext, useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchActivity, WatchActivityList } from "../model/watchFace.model";
import ActivityComponent from "./activity.component";

const ActivityListAODComponent = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateBattery(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.aod.activity, battery: a};
    updateActivity(al);
  }
  function updateSteps(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.aod.activity, steps: a};
    updateActivity(al);
  }
  function updateCalories(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.aod.activity, calories: a};
    updateActivity(al);
  }
  function updateHearthRate(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.aod.activity, heartRate: a};
    updateActivity(al);
  }
  function updatePai(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.aod.activity, pai: a};
    updateActivity(al);
  }
  function updateDistance(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.aod.activity, distance: a};
    updateActivity(al);
  }
  function updateStandUp(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.aod.activity, standUp: a};
    updateActivity(al);
  }
  function updateWeather(a: WatchActivity) {
    const al: WatchActivityList = {...watchface.aod.activity, weather: a};
    updateActivity(al);
  }

  function updateActivity(wa: WatchActivityList) {
    setWatchface({ ...watchface, aod: {...watchface.aod, activity: wa} });
  }

  function copyBattery() {
    const al: WatchActivityList = {...watchface.aod.activity, battery: {...watchface.activity.battery}}
    updateActivity(al)
  }
  function copySteps() {
    const al: WatchActivityList = {...watchface.aod.activity, steps: {...watchface.activity.steps}}
    updateActivity(al)
  }
  function copyCalories() {
    const al: WatchActivityList = {...watchface.aod.activity, calories: {...watchface.activity.calories}}
    updateActivity(al)
  }
  function copyhearthRate() {
    const al: WatchActivityList = {...watchface.aod.activity, heartRate: {...watchface.activity.heartRate}}
    updateActivity(al)
  }
  function copyPai() {
    const al: WatchActivityList = {...watchface.aod.activity, pai: {...watchface.activity.pai}}
    updateActivity(al)
  }
  function copyDistance() {
    const al: WatchActivityList = {...watchface.aod.activity, distance: {...watchface.activity.distance}}
    updateActivity(al)
  }
  function copyStandUp() {
    const al: WatchActivityList = {...watchface.aod.activity, standUp: {...watchface.activity.standUp}}
    updateActivity(al)
  }
  function copyWeather() {
    const al: WatchActivityList = {...watchface.aod.activity, weather: {...watchface.activity.weather}, weatherMin: {...watchface.activity.weatherMin}, weatherMax: {...watchface.activity.weatherMax}}
    updateActivity(al)
  }

  const activitys = useMemo(
    () => [
      { title: "Battery", a: watchface.aod.activity.battery, up: updateBattery, copy: copyBattery, showNoData: true },
      { title: "Steps", a: watchface.aod.activity.steps, up: updateSteps,  copy: copySteps, showNoData: true },
      { title: "Calories", a: watchface.aod.activity.calories, up: updateCalories,  copy: copyCalories, showNoData: true },
      {
        title: "HearthRate",
        a: watchface.aod.activity.heartRate,
        up: updateHearthRate,
        showNoData: true,
        copy: copyhearthRate,
      },
      { title: "PAI", a: watchface.aod.activity.pai,up: updatePai,  copy: copyPai, showNoData: true },
      {
        title: "Distance",
        a: watchface.aod.activity.distance,
        up: updateDistance,
        copy: copyDistance,
        showNoData: true,
        showDecimalPointer: true,
        showProgress: false,
      },
      { title: "StandUp", a: watchface.aod.activity.standUp, up: updateStandUp,  copy: copyStandUp, showNoData: true },
      {
        title: "Weather",
        a: watchface.aod.activity.standUp,
        up: updateWeather,
        showNoData: true,
        showDelimiter: true,
        copy: copyWeather,
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
                onCopy={item.copy}
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

export default ActivityListAODComponent;
