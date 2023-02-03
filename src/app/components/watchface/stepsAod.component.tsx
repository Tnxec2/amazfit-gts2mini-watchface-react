import { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchAodStepsActivity, WatchNumber } from "../../model/watchFace.gts2mini.model";
import WatchNumberComponent from "./number.component";

interface IProps {

}

const StepsAodComponent: FC<IProps> = ( ) => {

  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Prefix', type: BlockType.SelectFile, nvalue: watchface.aod.steps.aElement.prefix, onChange: onChangePrefix },
        { title: 'Suffix', type: BlockType.SelectFile, nvalue: watchface.aod.steps.aElement.suffix, onChange: onChangeSuffix },
      ]
    }
  ], [watchface.aod.steps]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangePrefix(val: number) {
    const a = {...watchface.aod.steps};
    a.aElement.prefix = val
    updateSteps(a)
  }

  function onChangeSuffix(val: number) {
    const a = {...watchface.aod.steps};
    a.aElement.suffix = val
    updateSteps(a)
  }


  function udpateDigit(d: WatchNumber) {
    const a = {...watchface.aod.steps};
    a.aElement.imageNumber = d
    a.aElement.enabled = a.aElement.imageNumber.enabled
    updateSteps(a)
  }

  function updateSteps(d: WatchAodStepsActivity) {
    let w = {...watchface}
    w.aod.steps = d
    setWatchface(w)
  }


  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let a = { ...watchface.aod.steps };
          a.collapsed = !a.collapsed;
          updateSteps(a);
        }}>
        AoD Steps
      </Card.Header>
      {!watchface.aod.steps.collapsed ? (
        <Card.Body>
          <WatchNumberComponent
            title='Number'
            digit={{...watchface.aod.steps.aElement.imageNumber}}
            onUpdate={udpateDigit}
            followDisabled={true}
            showDelimiter={false}
            paddingDisabled={true}
          />
          <BlocksArrayComponent ar={ar} />

        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default StepsAodComponent;
