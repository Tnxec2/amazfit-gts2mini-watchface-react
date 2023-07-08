import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import { WatchSpO2Activity, WatchProgressSpo, WatchNumber } from "../../model/watchFace.gts2mini.model";
import ProgressSpo2Component from "./progressSpo2.component";
import WatchNumberComponent from "./number.component";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";

interface IProps {
  activity: WatchSpO2Activity;
  title: string;
  onUpdateActivity(activity: WatchSpO2Activity): void;
}

const Spo2Component: FC<IProps> = ({
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
  
  function updateProgress(d: WatchProgressSpo) {
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
          <ProgressSpo2Component
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

export default Spo2Component;
