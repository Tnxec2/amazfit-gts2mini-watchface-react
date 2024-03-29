import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchCaloriesActivity, WatchImage, WatchNumber, WatchProgressCalories, WatchShortcutElement } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import WatchShortCutComponent from "./watchshortcut.component";
import ProgressCaloriesComponent from "./progressCalories.component";

interface IProps {
  activity: WatchCaloriesActivity;
  title: string;
  onUpdateActivity(activity: WatchCaloriesActivity): void;
}

const CaloriesComponent: FC<IProps> = ({
  activity,
  title,
  onUpdateActivity,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: activity.aElement.suffix, onChange: onChangeSuffix },
      ]
    },
   
  ], [activity]) // eslint-disable-line react-hooks/exhaustive-deps


  function onChangeSuffix(val: number) {
    const a = {...activity};
    a.aElement.suffix = val
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

  function updateProgress(d: WatchProgressCalories) {
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
          <ProgressCaloriesComponent
            progress={{...activity.aProgress}}
            title='Progress'
            onUpdate={updateProgress}
          />

        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default CaloriesComponent;
