import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import { WatchActivity, WatchCommonDigit } from "../model/watchFace.model";
import ClockHandComponent from "./clockHand.component";
import ImageCoordsComponent from "./imageCoords.component";
import ImageDigitComponent from "./imageDigit.component";
import ImageProgressComponent from "./imageProgress.component";
import ProgressbarCircleCodmponent from "./progressbarCircle.component";
import ProgressbarLinearComponent from "./progressbarLinear.component";
import SystemFontComponent from "./systemFont.component";
import SystemFontCircleComponent from "./systemFontCircle.component";

interface IProps {
  activity: WatchActivity;
  title: string;
  onUpdateActivity(activity: WatchActivity): void;
  showDecimalPointer?: boolean;
  showDelimiter?: boolean;
  showNoData?: boolean;
  paddingZeroFix?: boolean;
  showProgress?: boolean;
  onCopy?(): void
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
  onCopy
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <Card className="activity">
      <Card.Header onClick={() => setCollapsed(!collapsed)}>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
        </div>
      </Card.Header>
      {!collapsed ? (
        <Card.Body>
          { !onCopy ? '' :<button className='btn btn-outline-secondary btn-sm mr-0' onClick={onCopy}>Copy from normal screen</button> }
          <ImageDigitComponent
            title="Numerical"
            digit={activity.digit}
            onUpdate={(d) => {
              const a = { ...activity };
              a.digit = d as WatchCommonDigit;
              onUpdateActivity(a);
            }}
            showDecimalPointer={showDecimalPointer}
            showDelimiter={showDelimiter}
            showNoData={showNoData}
            paddingZeroFix={paddingZeroFix}
          />

          <SystemFontComponent
            title="Systemfont Rotated"
            digit={activity.digit}
            onUpdate={(d) => {
              const a = { ...activity };
              a.digit = d as WatchCommonDigit;
              onUpdateActivity(a);
            }}
            paddingZeroFix={paddingZeroFix}
          />
          <SystemFontCircleComponent 
            title="Systemfont Circle"
            digit={activity.digit}
            onUpdate={(d) => {
              const a = { ...activity };
              a.digit = d as WatchCommonDigit;
              onUpdateActivity(a);
            }}
            paddingZeroFix={paddingZeroFix}
          />

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
