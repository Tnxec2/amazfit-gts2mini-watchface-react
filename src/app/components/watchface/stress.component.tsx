import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import { WatchStressActivity, WatchProgressStress, WatchNumber } from "../../model/watchFace.gts2mini.model";
import ProgressStressComponent from "./progressStress.component";
import { BlockType, IRow } from "../../model/blocks.model";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import WatchNumberComponent from "./number.component";

interface IProps {
  activity: WatchStressActivity;
  title: string;
  onUpdateActivity(activity: WatchStressActivity): void;
}

const StressComponent: FC<IProps> = ({
  activity,
  title,
  onUpdateActivity,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Prefix', type: BlockType.SelectFile, nvalue: activity.aNumber.prefix, onChange: onChangePrefix },
      ]
    }
  ], [activity]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangePrefix(val: number) {
    const a = {...activity};
    a.aNumber.prefix = val
    onUpdateActivity(a)
  }

  function udpateDigit(d: WatchNumber) {
    const a = {...activity};
    a.aNumber.imageNumber = d
    a.aNumber.enabled = a.aNumber.imageNumber.enabled
    onUpdateActivity(a)
  }

  function updateProgress(d: WatchProgressStress) {
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
            digit={{...activity.aNumber.imageNumber}}
            onUpdate={udpateDigit}
            followDisabled={true}
            showDelimiter={false}
            paddingDisabled={true}
          />
          <BlocksArrayComponent ar={ar} />
          <ProgressStressComponent
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

export default StressComponent;
