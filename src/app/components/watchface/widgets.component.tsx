import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import WidgetComponent from "../watchface/widget.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchWidget, WatchWidgets } from "../../model/watchFace.model";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType } from "../../model/blocks.model";

const WidgetsComponent: FC = () => {
  const { watchface, setWatchface }  = useContext<IWatchContext>(WatchfaceContext)
 
  function updateWidgets(widgets: WatchWidgets) {
    let _wf = {...watchface}
    _wf.widgets = {...widgets}
    setWatchface(_wf)
  }

  function updateWidget(index: number, wi: WatchWidget) {
    let _wf = {...watchface}
    _wf.widgets.widgets[index] = {...wi}
    setWatchface(_wf)
  }

  function addWidget(e) {
    e.stopPropagation()
    let _wi = new WatchWidget()
    let _wf = {...watchface}
    if (!_wf.widgets) {
      _wf.widgets = new WatchWidgets()
    }
    _wf.widgets.enabled = true;
    _wf.widgets.widgets.push(_wi)
    setWatchface(_wf)
  }

  function deleteWidget(e, index: number) {
    e.stopPropagation()
    if ( window.confirm(`would you delete this widget?`)) {
      let _wf = {...watchface}
      _wf.widgets.widgets.splice(index, 1)
      setWatchface(_wf)
    }
  }

  function onChangeTopMask(index: number) {
    const ws = { ...watchface.widgets };
    ws.enabled = true;
    ws.topMaskImageIndex = index;
    updateWidgets(ws);
  }

  function onChangeBottomMask(index: number) {
    const ws = { ...watchface.widgets };
    ws.enabled = true;
    ws.underMaskImageIndex = index;
    updateWidgets(ws);
  }  
  
  return (
    <>
      <Card>
        <Card.Header>
          Common Preferences
        </Card.Header>
        <Card.Body>
          <BlocksArrayComponent ar={
            [
                { blocks: [
                  { title: 'Top mask', type: BlockType.SelectFile, nvalue: watchface.widgets?.topMaskImageIndex, onChange: onChangeTopMask },
                  { title: 'Bottom mask', type: BlockType.SelectFile, nvalue: watchface.widgets?.underMaskImageIndex, onChange: onChangeBottomMask },
                ]}
            ]
          } />
        </Card.Body>
      </Card>
      <Card>
      <Card.Header className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let wf = {...watchface};
          wf.widgets.collapsed = !wf.widgets.collapsed;
          setWatchface(wf);
        }}
      >
        Widgets [{watchface.widgets?.widgets?.length}]
          <button className="btn btn-outline-success" type="button" onClick={addWidget}>Add</button>
      </Card.Header>
      <Card.Body>
          {watchface.widgets?.widgets?.length > 0 ? 
          <>
            { watchface.widgets.widgets.map((item, index) => {
              return (
                <WidgetComponent
                  key={index}
                  title={`Widget ${index+1}`}
                  widget={item}
                  onUpdate={(widget) => updateWidget(index, widget)}
                  onDelete={(e) => deleteWidget(e, index)}
                />
              )
            }) }
          </> : 'no widgets added'}
      </Card.Body>
      </Card>
    </>
  );
};

export default WidgetsComponent;
