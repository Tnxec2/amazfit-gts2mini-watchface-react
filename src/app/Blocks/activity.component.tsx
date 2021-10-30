import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import { WatchActivity, WatchCommonDigit } from "../model/watchFace.model";
import ActivityDigitComponent from "./activityDigit.component";
import ClockHandComponent from "./clockHand.component";
import ImageCoordsComponent from "./imageCoords.component";
import ImageProgressComponent from "./imageProgress.component";
import ProgressbarCircleCodmponent from "./progressbarCircle.component";
import ProgressbarLinearComponent from "./progressbarLinear.component";

interface IProps {
  activity: WatchActivity;
  title: string;
  onUpdateActivity(activity: WatchActivity): void;
  onDelete(e): void;
  showDecimalPointer?: boolean;
  showDelimiter?: boolean;
  showNoData?: boolean;
  paddingZeroFix?: boolean;
  showProgress?: boolean;
  onCopy?(): void;
  titleDefault?: string;
  titleMin?: string;
  titleMax?: string;
}

const ActivityComponent: FC<IProps> = ({
  activity,
  title,
  onUpdateActivity,
  showDecimalPointer,
  showDelimiter,
  showNoData,
  paddingZeroFix,
  showProgress,
  onCopy,
  onDelete,
  titleDefault,
  titleMin,
  titleMax
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  function onUpdateDigit(d: WatchCommonDigit) {
    let a = {...activity}
    a.digit = {...d}
    onUpdateActivity(a)
  }
  
  function onUpdateDigitMin(d: WatchCommonDigit) {
    let a = {...activity}
    a.digitMin = {...d}
    onUpdateActivity(a)
  }

  function onUpdateDigitMax(d: WatchCommonDigit) {
    let a = {...activity}
    a.digitMax = {...d}
    onUpdateActivity(a)
  }

  return (
    <Card className="activity w-100">
      <Card.Header
      className="d-flex justify-content-between align-items-center"
      onClick={() => setCollapsed(!collapsed)}>
          <span className="input-group-text">{title}</span>
          <button className="btn btn-outline-danger" type="button" onClick={(e) => {e.stopPropagation(); onDelete(e);}}>Delete</button>
      </Card.Header>
      {!collapsed ? (
        <Card.Body>
          { !onCopy ? '' :<button className='btn btn-outline-secondary btn-sm mr-0' onClick={onCopy}>Copy from normal screen</button> }

          <ActivityDigitComponent
            digit={activity.digit}
            title={titleDefault ? titleDefault : title}
            onUpdate={onUpdateDigit}
            showDecimalPointer={showDecimalPointer}
            showDelimiter={showDelimiter}
            showNoData={showNoData}
            paddingZeroFix={paddingZeroFix}
          />

        { titleMin ?
          <ActivityDigitComponent
            digit={activity.digitMin}
            title={titleMin}
            onUpdate={onUpdateDigitMin}
            showDecimalPointer={showDecimalPointer}
            showDelimiter={showDelimiter}
            showNoData={showNoData}
            paddingZeroFix={paddingZeroFix}
          /> : '' }

        { titleMax ? 
          <ActivityDigitComponent
            digit={activity.digitMax}
            title={titleMax}
            onUpdate={onUpdateDigitMax}
            showDecimalPointer={showDecimalPointer}
            showDelimiter={showDelimiter}
            showNoData={showNoData}
            paddingZeroFix={paddingZeroFix}
          /> : '' }

          {showProgress === undefined || showProgress === true ? 
            <>
              <ImageProgressComponent
                imageProgress={activity.imageProgress}
                onUpdate={(d) => {
                  const a = { ...activity };
                  a.imageProgress = d;
                  onUpdateActivity(a);
                }}
              />
              <ProgressbarCircleCodmponent
                progressBar={activity.progressBar}
                onUpdate={(d) => {
                  const a = { ...activity };
                  a.progressBar = d;
                  onUpdateActivity(a);
                }}
              />
              <ProgressbarLinearComponent
                progressBar={activity.progressBar}
                onUpdate={(d) => {
                  const a = { ...activity };
                  a.progressBar = d;
                  onUpdateActivity(a);
                }}
              />
            <ClockHandComponent
              title="Pointer Progress"
              clockHand={activity.pointerProgress}
              onUpdate={(ch) => {
                const a = { ...activity };
                a.pointerProgress = ch;
                onUpdateActivity(a);
              }}
              showAngle={true}
            />
            </> : ""}
          {activity.icon ? (
            <ImageCoordsComponent
              title="Icon"
              imageCoords={activity.icon}
              onUpdate={(ip) => {
                const a = { ...activity };
                a.icon = ip;
                onUpdateActivity(a);
              }}
            />
          ) : (
            ""
          )}
        </Card.Body>
      ) : (
        ""
        )}
    </Card>
  );
};

export default ActivityComponent;
