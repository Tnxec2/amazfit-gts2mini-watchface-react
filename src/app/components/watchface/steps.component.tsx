import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchStepsActivity, WatchImage, WatchNumber, WatchProgressSteps, WatchShortcutElement } from "../../model/watchFace.gts2mini.model";
import ImageComponent from "./image.component";
import WatchNumberComponent from "./number.component";
import ProgressStepsComponent from "./progressSteps.component";
import WatchShortCutComponent from "./watchshortcut.component";

interface IProps {
  activity: WatchStepsActivity;
  title: string;
  onUpdateActivity(activity: WatchStepsActivity): void;
}

const StepsComponent: FC<IProps> = ({
  activity,
  title,
  onUpdateActivity,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Prefix', type: BlockType.SelectFile, nvalue: activity.aElement.prefix, onChange: onChangePrefix, 
        hint: activity.aElement.prefix && !activity.aElement.suffix ? 
        'Prefix without suffix becomes suffix ' : 'Prefix', 
        warning: activity.aElement.delimiterTotal && activity.aElement.prefix && !activity.aElement.suffix ? true : false },
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: activity.aElement.suffix, onChange: onChangeSuffix, 
        hint: activity.aElement.suffix && !activity.aElement.prefix ? 
        'Suffix without prefix becomes prefix' : 'Suffix', 
        warning: activity.aElement.delimiterTotal && activity.aElement.suffix && !activity.aElement.prefix ? true : false },
        { title: 'Delimiter Total', type: BlockType.SelectFile, nvalue: activity.aElement.delimiterTotal, onChange: onChangeDelimiter, 
        hint: 'Works only without prefix and suffix', 
        warning: activity.aElement.delimiterTotal && ( activity.aElement.prefix || activity.aElement.suffix) ? true : false},
      ]
    }
  ], [activity]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangePrefix(val: number) {
    const a = {...activity};
    a.aElement.prefix = val
    onUpdateActivity(a)
  }
  function onChangeDelimiter(val: number) {
    const a = {...activity};
    a.aElement.delimiterTotal = val
    onUpdateActivity(a)
  }
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

  function updateProgress(d: WatchProgressSteps) {
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
          <ProgressStepsComponent
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

export default StepsComponent;
