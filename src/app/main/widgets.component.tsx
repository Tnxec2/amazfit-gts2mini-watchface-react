import { FC, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import WidgetComponent from "../Blocks/widget.component";
import { IWatchContext, WatchfaceContext } from "../context";
import { Widget, Widgets } from "../model/json.model";
import { WatchWidgets } from "../model/watchFace.model";
import SelectFileListComponent from "../shared/selectFileList.component";

const WidgetsComponent: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { watchface, setWatchface }  = useContext<IWatchContext>(WatchfaceContext)

 
  function updateWidgets(widgets: WatchWidgets) {
    let _wf = {...watchface}
    _wf.widgets = {...widgets}
    setWatchface(_wf)
  }

  function updateWidget(index: number, wi: Widget) {
    let _wf = {...watchface}
    _wf.widgets.json.Widget[index] = {...wi}
    setWatchface(_wf)
  }

  function addWidget(e) {
    e.stopPropagation()
    let _wi = new Widget()
    let _wf = {...watchface}
    if (!_wf.widgets.json) {
      _wf.widgets.json = new Widgets()
      _wf.widgets.json.Widget = []
    }
    _wf.widgets.json.Widget.push(_wi)
    setWatchface(_wf)
  }

  function deleteWidget(e, index: number) {
    e.stopPropagation()
    if ( window.confirm(`would you delete this widget?`)) {
      let _wf = {...watchface}
      _wf.widgets.json.Widget.splice(index, 1)
      setWatchface(_wf)
    }
  }
  
  return (
    <>
      <Card>
        <Card.Body>
          <div className="input-group input-group-sm">
                <SelectFileListComponent
                  title='Top mask'
                  setSelectedFileIndex={(ix) => {
                    const ws = { ...watchface.widgets };
                    if (!ws.json) ws.json = new Widgets()
                    ws.json.TopMaskImageIndex = ix;
                    updateWidgets(ws);
                  }}
                  imageIndex={watchface.widgets?.json?.TopMaskImageIndex}
                />
                <SelectFileListComponent
                  title='Bottom mask'
                  setSelectedFileIndex={(ix) => {
                    const ws = { ...watchface.widgets };
                    if (!ws.json) ws.json = new Widgets()
                    ws.json.UnderMaskImageIndex = ix;
                    updateWidgets(ws);
                  }}
                  imageIndex={watchface.widgets?.json?.UnderMaskImageIndex}
                />
          </div>
        </Card.Body>
      </Card>
      <Card>
      <Card.Header className="d-flex justify-content-between align-items-center"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        Widgets [{watchface.widgets?.json?.Widget?.length}]
          <button className="btn btn-outline-success" type="button" onClick={addWidget}>Add</button>
      </Card.Header>
      <Card.Body>
          {watchface.widgets?.json?.Widget?.length > 0 ? 
          <>
            { watchface.widgets.json.Widget.map((item, index) => {
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
