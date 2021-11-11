import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchActivity, WatchFiveDigitsSeparated, WatchFourDigitsSeparated, WatchNumber, WatchProgress, WatchThreeDigitsSeparated } from "../../model/watchFace.gts2mini.model";
import { Image } from "../../model/json.gts2minit.model";
import { Coordinates, ShortcutElement } from "../../model/json.gts2minit.model";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { ActivityType } from "../../model/types.gts2mini.model";
import WatchNumberComponent from "./number.component";
import ProgressComponent from "./progress.component";
import SeparatedDigitsComponent from "./separatedDigits.component";

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
        { title: 'Prefix', type: BlockType.SelectFile, nvalue: activity.aElement.json.PrefixImageIndex, onChange: onChangePrefix },
      ]
    },
    {
      disabled: ( type === ActivityType.Distance  ),
      blocks: [
        { title: 'NoData', type: BlockType.SelectFile, nvalue: activity.aElement.json.NoDataImageIndex, onChange: onChangeNoData },
      ]
    },
    {
      disabled: !( type === ActivityType.Steps || type === ActivityType.HeartRate ),
      blocks: [
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: activity.aElement.json.SuffixImageIndex, onChange: onChangeSuffix },
      ]
    },
    {
      disabled: !( type === ActivityType.Distance ),
      blocks: [
        { title: 'DecimalPointer', type: BlockType.SelectFile, nvalue: activity.aElement.json.DecimalPointImageIndex, onChange: onChangeDecimalPointer },
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: activity.aElement.json.SuffixImageIndex, onChange: onChangeSuffixKM },
        { title: 'X', type: BlockType.Number, nvalue: activity.aElement.json.SuffixImageCoordinates?.X ? activity.aElement.json.SuffixImageCoordinates.X : 0, onChange: onChangeSuffixCoordsX },
        { title: 'Y', type: BlockType.Number, nvalue: activity.aElement.json.SuffixImageCoordinates?.Y ? activity.aElement.json.SuffixImageCoordinates.Y : 0, onChange: onChangeSuffixCoordsY },
      ]
    },
    {
      blocks: [
        { title: 'Shorcut', type: BlockType.Empty },
        { title: 'X', type: BlockType.Number, nvalue: activity.aElement.json.Shortcut?.TopLeftX ? activity.aElement.json.Shortcut.TopLeftX : 0, onChange: onChangeShortCutX },
        { title: 'Y', type: BlockType.Number, nvalue: activity.aElement.json.Shortcut?.TopLeftY ? activity.aElement.json.Shortcut.TopLeftY : 0, onChange: onChangeShortCutY },
        { title: 'Width', type: BlockType.Number, nvalue: activity.aElement.json.Shortcut?.BottomRightX && activity.aElement.json.Shortcut?.TopLeftX  ? activity.aElement.json.Shortcut?.BottomRightX - activity.aElement.json.Shortcut?.TopLeftX : 0, onChange: onChangeShortCutWidth },
        { title: 'Height', type: BlockType.Number, nvalue: activity.aElement.json.Shortcut?.BottomRightY && activity.aElement.json.Shortcut?.TopLeftY  ? activity.aElement.json.Shortcut?.BottomRightY - activity.aElement.json.Shortcut?.TopLeftY : 0, onChange: onChangeShortCutHeight },
      ]
    },
    {
      blocks: [
        { title: 'Icon', type: BlockType.SelectFile, nvalue: activity.aElement.json.Icon?.ImageIndex, onChange: onChangeIcon },
        { title: 'X', type: BlockType.Number, nvalue: activity.aElement.json.Icon?.X ? activity.aElement.json.Icon.X : 0, onChange: onChangeIconX },
        { title: 'Y', type: BlockType.Number, nvalue: activity.aElement.json.Icon?.Y ? activity.aElement.json.Icon.Y : 0, onChange: onChangeIconY },
      ]
    }
  ], [activity]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangePrefix(val: number) {
    const a = {...activity};
    a.aElement.json.PrefixImageIndex = val
    onUpdateActivity(a)
  }
  function onChangeNoData(val: number) {
    const a = {...activity};
    a.aElement.json.NoDataImageIndex = val
    onUpdateActivity(a)
  }
  function onChangeSuffix(val: number) {
    const a = {...activity};
    a.aElement.json.SuffixImageIndex = val
    onUpdateActivity(a)
  }
  function onChangeDecimalPointer(val: number) {
    const a = {...activity};
    a.aElement.json.DecimalPointImageIndex = val
    onUpdateActivity(a)
  }
  function onChangeSuffixKM(val: number) {
    const a = {...activity};
    a.aElement.json.SuffixKMImageIndex = val
    onUpdateActivity(a)
  }
  function onChangeSuffixCoordsX(val: number) {
    const a = {...activity};
    if (!a.aElement.json.SuffixImageCoordinates) a.aElement.json.SuffixImageCoordinates = new Coordinates()
    a.aElement.json.SuffixImageCoordinates.X = val
    onUpdateActivity(a)
  }
  function onChangeSuffixCoordsY(val: number) {
    const a = {...activity};
    if (!a.aElement.json.SuffixImageCoordinates) a.aElement.json.SuffixImageCoordinates = new Coordinates()
    a.aElement.json.SuffixImageCoordinates.X = val
    onUpdateActivity(a)
  }
  function onChangeIcon(val: number) {
    const a = {...activity};
    if ( !a.aElement.json.Icon) a.aElement.json.Icon = new Image()
    a.aElement.json.Icon.ImageIndex = val
    onUpdateActivity(a)
  }
  function onChangeIconX(val: number) {
    const a = {...activity};
    if ( !a.aElement.json.Icon) a.aElement.json.Icon = new Image()
    a.aElement.json.Icon.X = val
    onUpdateActivity(a)
  }
  function onChangeIconY(val: number) {
    const a = {...activity};
    if ( !a.aElement.json.Icon) a.aElement.json.Icon = new Image()
    a.aElement.json.Icon.Y = val
    onUpdateActivity(a)
  }
  function onChangeShortCutX(val: number) {
    const a = {...activity};
    if ( !a.aElement.json.Shortcut) a.aElement.json.Shortcut = new ShortcutElement()
    a.aElement.json.Shortcut.TopLeftX = val
    onUpdateActivity(a)
  }
  function onChangeShortCutY(val: number) {
    const a = {...activity};
    if ( !a.aElement.json.Shortcut) a.aElement.json.Shortcut = new ShortcutElement()
    a.aElement.json.Shortcut.TopLeftY = val
    onUpdateActivity(a)
  }
  function onChangeShortCutWidth(val: number) {
    const a = {...activity};
    if ( !a.aElement.json.Shortcut) a.aElement.json.Shortcut = new ShortcutElement()
    a.aElement.json.Shortcut.BottomRightX = a.aElement.json.Shortcut.TopLeftX + val
    onUpdateActivity(a)
  }
  function onChangeShortCutHeight(val: number) {
    const a = {...activity};
    if ( !a.aElement.json.Shortcut) a.aElement.json.Shortcut = new ShortcutElement()
    a.aElement.json.Shortcut.BottomRightY = a.aElement.json.Shortcut.TopLeftY + val
    onUpdateActivity(a)
  }

  function udpateDigit(d: WatchNumber) {
    const a = {...activity};
    a.aElement.json.ImageNumber = d.json
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
            digit={new WatchNumber(activity.aElement.json.ImageNumber, activity.con)}
            onUpdate={udpateDigit}
          />
          <BlocksArrayComponent ar={ar} />
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
