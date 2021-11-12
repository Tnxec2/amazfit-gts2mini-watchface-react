import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { Coordinates } from "../../model/json.gts2minit.model";
import { ActivityType } from "../../model/types.gts2mini.model";
import { WatchActivity, WatchImage, WatchNumber, WatchProgress, WatchShortcutElement } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import ProgressComponent from "./progress.component";
import WatchShortCutComponent from "./watchshortcut.component";

interface IProps {
  activity: WatchActivity;
  title: string;
  onUpdateActivity(activity: WatchActivity): void;
  type: ActivityType,
  showImageProgress: boolean,
  showIconProgress: boolean,
  showPointerProgress: boolean,
  showCircleScaleProgress: boolean,
}

const ActivityComponent: FC<IProps> = ({
  activity,
  title,
  onUpdateActivity,
  type,
  showImageProgress,
  showIconProgress,
  showPointerProgress,
  showCircleScaleProgress,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      disabled: !( type === ActivityType.Steps || type === ActivityType.Calories ),
      blocks: [
        { title: 'Prefix', type: BlockType.SelectFile, nvalue: activity.aElement.prefix, onChange: onChangePrefix },
      ]
    },
    {
      disabled: ( type === ActivityType.Distance  ),
      blocks: [
        { title: 'NoData', type: BlockType.SelectFile, nvalue: activity.aElement.noData, onChange: onChangeNoData },
      ]
    },
    {
      disabled: !( type === ActivityType.Steps || type === ActivityType.HeartRate ),
      blocks: [
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: activity.aElement.suffix, onChange: onChangeSuffix },
      ]
    },
    {
      disabled: !( type === ActivityType.Distance ),
      blocks: [
        { title: 'DecimalPointer', type: BlockType.SelectFile, nvalue: activity.aElement.decimalPoint, onChange: onChangeDecimalPointer },
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: activity.aElement.suffix, onChange: onChangeSuffixKM },
        { title: 'X', type: BlockType.Number, nvalue: activity.aElement.suffixImageCoordinates?.X ? activity.aElement.suffixImageCoordinates.X : 0, onChange: onChangeSuffixCoordsX },
        { title: 'Y', type: BlockType.Number, nvalue: activity.aElement.suffixImageCoordinates?.Y ? activity.aElement.suffixImageCoordinates.Y : 0, onChange: onChangeSuffixCoordsY },
      ]
    }
  ], [activity]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangePrefix(val: number) {
    const a = {...activity};
    a.aElement.prefix = val
    onUpdateActivity(a)
  }
  function onChangeNoData(val: number) {
    const a = {...activity};
    a.aElement.noData = val
    onUpdateActivity(a)
  }
  function onChangeSuffix(val: number) {
    const a = {...activity};
    a.aElement.suffix = val
    onUpdateActivity(a)
  }
  function onChangeDecimalPointer(val: number) {
    const a = {...activity};
    a.aElement.decimalPoint = val
    onUpdateActivity(a)
  }
  function onChangeSuffixKM(val: number) {
    const a = {...activity};
    a.aElement.suffixKM = val
    onUpdateActivity(a)
  }
  function onChangeSuffixCoordsX(val: number) {
    const a = {...activity};
    if (!a.aElement.suffixImageCoordinates) a.aElement.suffixImageCoordinates = new Coordinates()
    a.aElement.suffixImageCoordinates.X = val
    onUpdateActivity(a)
  }
  function onChangeSuffixCoordsY(val: number) {
    const a = {...activity};
    if (!a.aElement.suffixImageCoordinates) a.aElement.suffixImageCoordinates = new Coordinates()
    a.aElement.suffixImageCoordinates.X = val
    onUpdateActivity(a)
  }

  function updateIcon(val: WatchImage) {
    const a = {...activity};
    a.aElement.icon = val
    a.aElement.enabled = a.aElement.icon.enabled || a.aElement.imageNumber.enabled || a.aElement.shortcut.enabled
    onUpdateActivity(a)
  }

  function updateShortcut(d: WatchShortcutElement) {
    const a = {...activity};
    a.aElement.shortcut = d
    a.aElement.enabled = a.aElement.icon.enabled || a.aElement.imageNumber.enabled || a.aElement.shortcut.enabled
    onUpdateActivity(a)
  }

  function udpateDigit(d: WatchNumber) {
    const a = {...activity};
    a.aElement.imageNumber = d
    a.aElement.enabled = a.aElement.icon.enabled || a.aElement.imageNumber.enabled || a.aElement.shortcut.enabled
    onUpdateActivity(a)
  }

  function updateProgress(d: WatchProgress) {
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
          <WatchNumberComponent
            title='Number'
            digit={activity.aElement.imageNumber}
            onUpdate={udpateDigit}
            followDisabled={true}
            showDelimiter={false}
            paddingDisabled={true}
          />
          <BlocksArrayComponent ar={ar} />
          <ImageComponent
            title='Icon'
            image={activity.aElement.icon}
            onUpdate={updateIcon}
          />
          <WatchShortCutComponent
            title='Shortcut'
            shortcut={activity.aElement.shortcut}
            onUpdate={updateShortcut}
          />
          <ProgressComponent
            progress={activity.aProgress}
            title='Progress'
            onUpdate={updateProgress}
            showImageProgress={showImageProgress}
            showIconProgress={showIconProgress}
            showPointerProgress={showPointerProgress}
            showCircleScaleProgress={showCircleScaleProgress}
          />

        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ActivityComponent;
