import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { Coordinates } from "../../model/json.gts2minit.model";
import { WatchImage, WatchNumber, WatchShortcutElement, WatchDistanceActivity } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import WatchShortCutComponent from "./watchshortcut.component";

interface IProps {
  activity: WatchDistanceActivity;
  title: string;
  onUpdateActivity(activity: WatchDistanceActivity): void;
}

const DistanceComponent: FC<IProps> = ({
  activity,
  title,
  onUpdateActivity,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Decimal Pointer', type: BlockType.SelectFile, nvalue: activity.aElement.decimalPoint, onChange: onChangeDecimalPointer },
      ]
    },
    {
      blocks: [
        { title: 'Suffix KM', type: BlockType.SelectFile, nvalue: activity.aElement.suffixKM, onChange: onChangeKM },
        { title: 'Suffix MI', type: BlockType.SelectFile, nvalue: activity.aElement.suffixMI, onChange: onChangeMi },
      ]
    },

    {
      blocks: [
        { title: 'Suffix separated', type: BlockType.Checkbox, checked: activity.aElement.separattedSuffix ? true : false, onChange: onChangeSeparatedSuffix },
        { title: 'X', type: BlockType.Number, nvalue: activity.aElement.suffixImageCoordinates?.X ? activity.aElement.suffixImageCoordinates.X : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: activity.aElement.suffixImageCoordinates?.Y ? activity.aElement.suffixImageCoordinates.Y : 0, onChange: onChangeY },
      ]
    }
  ], [activity]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeSeparatedSuffix(val: boolean) {
    const d = {...activity};
    d.aElement.separattedSuffix = val;
    onUpdateActivity(d);
  }

  function onChangeKM(val: number) {
    const a = {...activity};
    a.aElement.suffixKM = val
    onUpdateActivity(a)
  }

  function onChangeX(val: number) {
    const a = {...activity};
    if (!a.aElement.suffixImageCoordinates) a.aElement.suffixImageCoordinates = new Coordinates()
    a.aElement.suffixImageCoordinates.X = val
    onUpdateActivity(a)
  }
  
  function onChangeY(val: number) {
    const a = {...activity};
    if (!a.aElement.suffixImageCoordinates) a.aElement.suffixImageCoordinates = new Coordinates()
    a.aElement.suffixImageCoordinates.Y = val
    onUpdateActivity(a)
  }

  function onChangeMi(val: number) {
    const a = {...activity};
    a.aElement.suffixMI = val
    onUpdateActivity(a)
  }

  function onChangeDecimalPointer(val: number) {
    const a = {...activity};
    a.aElement.decimalPoint = val
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
            digit={{...activity.aElement.imageNumber}}
            onUpdate={udpateDigit}
            followDisabled={true}
            showDelimiter={false}
            paddingDisabled={true}
          />
          <BlocksArrayComponent ar={ar} />
          
          <ImageComponent
            title='Icon'
            image={{...activity.aElement.icon}}
            onUpdate={updateIcon}
          />
          <WatchShortCutComponent
            title='Shortcut'
            shortcut={{...activity.aElement.shortcut}}
            onUpdate={updateShortcut}
          />

        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default DistanceComponent;
