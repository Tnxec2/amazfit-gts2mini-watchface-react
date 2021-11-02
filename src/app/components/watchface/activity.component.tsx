import { FC } from "react";
import { Alert, Card } from "react-bootstrap";
import { ActivityType } from "../../model/types.model";
import { WatchActivity, WatchCommonDigit } from "../../model/watchFace.model";
import ActivityDigitComponent from "./activityDigit.component";
import ClockHandComponent from "./clockHand.component";
import ImageCoordsComponent from "./imageCoords.component";
import ImageProgressComponent from "./imageProgress.component";
import ProgressbarCircleCodmponent from "./progressbarCircle.component";
import ProgressbarLinearCodmponent from "./progressbarLinear.component";


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
  titleMax,
}) => {

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
      onClick={() => {
        let a = {...activity};
        a.collapsed = !a.collapsed;
        onUpdateActivity(a);
      }}>
          <span className="input-group-text">{title}</span>
          <button className="btn btn-outline-danger" type="button" onClick={(e) => {e.stopPropagation(); onDelete(e);}}>Delete</button>
      </Card.Header>
      {!activity.collapsed ? (
        <Card.Body>
          { !onCopy ? '' :<button className='btn btn-outline-secondary btn-sm' onClick={onCopy}>Copy from normal screen</button> }

          { activity.type === ActivityType.Weather ?
          <div className="alert alert-info" role="alert">
            In order to center the temperature correctly (only if weather icon as ImageProgress is enabled), weather icon should be defined in separated activity and placed before activity with temperature. 
          </div> : '' }
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
              <ProgressbarLinearCodmponent
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
