import { FC } from "react";
import { Card } from "react-bootstrap";
import { WatchWidget, WatchWidgetElement } from "../model/watchFace.model";
import DnDListComponent, { IDNDItem } from "../shared/draganddroplist.component";
import SelectFileListComponent from "../shared/selectFileList.component";
import ImageCoordsComponent from "./imageCoords.component";
import WidgetElementComponent from "./widgetElement.component";


interface IProps {
  title: string;
  widget: WatchWidget;
  onUpdate(widget: WatchWidget): void;
  onDelete(e): void;
}

const WidgetComponent: FC<IProps> = ({ title, widget, onUpdate, onDelete }) => {

  function addElement(e) {
    e.stopPropagation()
    let _wi = {...widget}
    if (!_wi.widgetElements) _wi.widgetElements = []
    let _we = new WatchWidgetElement()
    _wi.widgetElements.push(_we)
    _wi.widgetElementsCollapsed = false
    onUpdate(_wi)
  }

  function deleteElement(e, index: number) {
    e.stopPropagation();
    if ( window.confirm(`would you delete this element of widget?`)) {
      let _wi = {...widget};
      _wi.widgetElements.splice(index, 1);
      onUpdate(_wi);
    }
  }

  function updateElement(index: number, element: WatchWidgetElement) {
    let _wi = {...widget}
    _wi.widgetElements[index] = {...element}
    onUpdate(_wi)
  }

  function updateWidgetElementsOrder(list: IDNDItem<WatchWidgetElement>[]) {
    let _wi = {...widget}
    _wi.widgetElements = list.map((value) => value.item)
    onUpdate(_wi)
  }

  return (
    <Card>
      <Card.Header 
      className="d-flex justify-content-between align-items-center"
      onClick={() => {
        let wi = {...widget};
        wi.collapsed = !wi.collapsed;
        onUpdate(wi)
      }}>
          <span className="input-group-text">{title}</span>
          <button className="btn btn-outline-danger" type="button" onClick={onDelete}>Delete</button>
      </Card.Header>
      {!widget.collapsed ? 
      <Card.Body>
          <div className="input-group input-group-sm">
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.x}
              onChange={(e) => {
                const _wi = { ...widget };
                let x = parseInt(e.target.value);
                _wi.x = !isNaN(x) ? x : 0;
                onUpdate(_wi);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.y}
              onChange={(e) => {
                const _wi = { ...widget };
                let y = parseInt(e.target.value);
                _wi.y = !isNaN(y) ? y : 0;
                onUpdate(_wi);
              }}
            />
          </div>
          <div className="input-group input-group-sm">
            <span className="input-group-text" id="addon-wrapping">
              Width
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.width}
              onChange={(e) => {
                const _wi = { ...widget };
                let val = parseInt(e.target.value);
                _wi.width = !isNaN(val) ? val : 0;
                onUpdate(_wi);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Height
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.height}
              onChange={(e) => {
                const _wi = { ...widget };
                let val = parseInt(e.target.value);
                _wi.height = !isNaN(val) ? val : 0;
                onUpdate(_wi);
              }}
            />
          </div>
          <div className="input-group input-group-sm pt-1">
            <SelectFileListComponent
              title='Frame activ'
              setSelectedFileIndex={(ix) => {
                const ip = { ...widget };
                ip.borderActivImageIndex = ix;
                onUpdate(ip);
              }}
              imageIndex={widget.borderActivImageIndex}
            />
            <SelectFileListComponent
              title='Frame inactiv'
              setSelectedFileIndex={(ix) => {
                const _wi = { ...widget };
                _wi.borderInactivImageIndex = ix;
                onUpdate(_wi);
              }}
              imageIndex={widget.borderInactivImageIndex}
            />
          </div>
          <div className="input-group input-group-sm pt-1">
            <ImageCoordsComponent
              title='Description background'
              imageCoords={widget.descriptionImageBackground}
              onUpdate={(ic) => {
                let wi = {...widget};
                wi.descriptionImageBackground = ic
                onUpdate(wi)
              }

              }
            />
          </div>
          <div className="input-group input-group-sm">
            <span className="input-group-text" id="addon-wrapping">
              Description width
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.descriptionWidthCheck}
              onChange={(e) => {
                const _wi = { ...widget };
                let val = parseInt(e.target.value);
                _wi.descriptionWidthCheck = !isNaN(val) ? val : 0;
                onUpdate(_wi);
              }}
            />
          </div>
          <Card className="pt-1">
            <Card.Header className="d-flex justify-content-between align-items-center"
              onClick={() => {
                let wi = {...widget};
                wi.widgetElementsCollapsed = !wi.widgetElementsCollapsed;
                onUpdate(wi);
              }}>
              Elements [{widget.widgetElements?.length}]
              <button className="btn btn-outline-success" type="button" onClick={addElement}>Add</button>
            </Card.Header>
            { !widget.widgetElementsCollapsed ? 
            <Card.Body>
              { widget.widgetElements?.length > 0 ?
              <DnDListComponent
               _list={
              widget.widgetElements?.map(
                (element, index) => ({item: element, reactItem:
                <WidgetElementComponent
                  key={index}
                  index={index}
                  element={element}
                  defaultCount={1}
                  onDelete={(e) => deleteElement(e, index)}
                  onUpdate={(element) => updateElement(index, element)}
                />})) }
                updateOrder={updateWidgetElementsOrder}
              /> : 'no elements added' }
            </Card.Body>
            : ''}
          </Card>
        </Card.Body>
         : '' }
     </Card>
    );
};

export default WidgetComponent;
