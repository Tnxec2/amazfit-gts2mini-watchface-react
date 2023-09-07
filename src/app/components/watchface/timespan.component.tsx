import { FC, useMemo } from "react";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { TimeSpans } from "../../model/json.gts2minit.model";

interface IProps {
  index: number;
  timeSpan: TimeSpans;
  onUpdate(timeSpan: TimeSpans): void;
}

const TimeSpanComponent: FC<IProps> = ({ index, timeSpan, onUpdate }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        
        { title: (index + 1).toString(), type: BlockType.Empty },
        { title: 'Start ', type: BlockType.Number, nvalue: timeSpan.StartHour ? timeSpan.StartHour : 0, onChange: onChangeStartHour },
        { title: ':', type: BlockType.Number, nvalue: timeSpan.StartMin ? timeSpan.StartMin : 0, onChange: onChangeStartMin },
        { title: 'Stop ', type: BlockType.Number, nvalue: timeSpan.StopHour ? timeSpan.StopHour : 0, onChange: onChangeStopHour },
        { title: ':', type: BlockType.Number, nvalue: timeSpan.StopMin ? timeSpan.StopMin : 0, onChange: onChangeStopMin },
        
      ]
    },
  ], [timeSpan]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeStartHour(index: number) {
    const ip = { ...timeSpan };
    ip.StartHour = index;
    onUpdate(ip);
  }

  function onChangeStartMin(index: number) {
    const ip = { ...timeSpan };
    ip.StartMin = index;
    onUpdate(ip);
  }

  function onChangeStopHour(index: number) {
    const ip = { ...timeSpan };
    ip.StopHour = index;
    onUpdate(ip);
  }

  function onChangeStopMin(index: number) {
    const ip = { ...timeSpan };
    ip.StopMin = index;
    onUpdate(ip);
  }



  return (

          <BlocksArrayComponent ar={ar} />

  );
};

export default TimeSpanComponent;
