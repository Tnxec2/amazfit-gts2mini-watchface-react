import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import { ImageCoord, Widget, WidgetElement } from "../model/json.model";
import DnDListComponent, { IDNDItem } from "../shared/draganddroplist.component";
import SelectFileListComponent from "../shared/selectFileList.component";
import WidgetElementComponent from "./widgetElement.component";


interface IProps {
  title: string;
  widget: Widget;
  onUpdate(widget: Widget): void;
  onDelete(e): void;
}

const WidgetComponent: FC<IProps> = ({ title, widget, onUpdate, onDelete }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [collapsedElements, setCollapsedElements] = useState<boolean>(true);

  function addElement() {
    let _wi: Widget = {...widget}
    if (!_wi.WidgetElement) _wi.WidgetElement = []
    _wi.WidgetElement.push(new WidgetElement())
    onUpdate(_wi)
  }

  function deleteElement(index: number) {
    let _wi: Widget = {...widget}
    _wi.WidgetElement.splice(index, 1)
    onUpdate(_wi)
  }

  function updateElement(index: number, element: WidgetElement) {
    let _wi: Widget = {...widget}
    _wi.WidgetElement[index] = {...element}
    onUpdate(_wi)
  }

  function updateWidgetElementsOrder(list: IDNDItem<WidgetElement>[]) {
    let _wi: Widget = {...widget}
    _wi.WidgetElement = list.map((value) => value.item)
    onUpdate(_wi)
  }

  return (
    <Card>
      <Card.Header 
      className="d-flex justify-content-between align-items-center"
      onClick={() => setCollapsed(!collapsed)}>
          <span className="input-group-text">{title}</span>
          <button className="btn btn-outline-danger" type="button" onClick={onDelete}>Delete</button>
      </Card.Header>
      {!collapsed ? 
      <Card.Body>
          <div className="input-group input-group-sm">
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.X}
              onChange={(e) => {
                const _wi = { ...widget };
                let x = parseInt(e.target.value);
                _wi.X = !isNaN(x) ? x : 0;
                onUpdate(_wi);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.Y}
              onChange={(e) => {
                const _wi = { ...widget };
                let y = parseInt(e.target.value);
                _wi.Y = !isNaN(y) ? y : 0;
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
              value={widget.Width}
              onChange={(e) => {
                const _wi = { ...widget };
                let val = parseInt(e.target.value);
                _wi.Width = !isNaN(val) ? val : 0;
                onUpdate(_wi);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Height
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.Height}
              onChange={(e) => {
                const _wi = { ...widget };
                let val = parseInt(e.target.value);
                _wi.Height = !isNaN(val) ? val : 0;
                onUpdate(_wi);
              }}
            />
          </div>
          <div className="input-group input-group-sm pt-1">
            <SelectFileListComponent
              title='Frame activ'
              setSelectedFileIndex={(ix) => {
                const ip = { ...widget };
                ip.BorderActivImageIndex = ix;
                onUpdate(ip);
              }}
              imageIndex={widget.BorderActivImageIndex}
            />
            <SelectFileListComponent
              title='Frame inactiv'
              setSelectedFileIndex={(ix) => {
                const _wi = { ...widget };
                _wi.BorderInactivImageIndex = ix;
                onUpdate(_wi);
              }}
              imageIndex={widget.BorderInactivImageIndex}
            />
          </div>
          <div className="input-group input-group-sm pt-1">
            <SelectFileListComponent
              title='Description background'
              setSelectedFileIndex={(ix) => {
                const _wi = { ...widget };
                if (!_wi.DescriptionImageBackground) _wi.DescriptionImageBackground = new ImageCoord();
                _wi.DescriptionImageBackground.ImageIndex = ix;
                onUpdate(_wi);
              }}
              imageIndex={widget.DescriptionImageBackground?.ImageIndex}
            />
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.DescriptionImageBackground?.Coordinates?.X}
              onChange={(e) => {
                const _wi = { ...widget };
                if (!_wi.DescriptionImageBackground) _wi.DescriptionImageBackground = new ImageCoord();
                let x = parseInt(e.target.value);
                _wi.DescriptionImageBackground.Coordinates.X = !isNaN(x) ? x : 0;
                onUpdate(_wi);
              }}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.DescriptionImageBackground?.Coordinates?.Y}
              onChange={(e) => {
                const _wi = { ...widget };
                if (!_wi.DescriptionImageBackground) _wi.DescriptionImageBackground = new ImageCoord();
                let y = parseInt(e.target.value);
                _wi.DescriptionImageBackground.Coordinates.Y = !isNaN(y) ? y : 0;
                onUpdate(_wi);
              }}
            />
          </div>
          <div className="input-group input-group-sm">
            <span className="input-group-text" id="addon-wrapping">
              Description width
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={widget.DescriptionWidthCheck}
              onChange={(e) => {
                const _wi = { ...widget };
                let val = parseInt(e.target.value);
                _wi.DescriptionWidthCheck = !isNaN(val) ? val : 0;
                onUpdate(_wi);
              }}
            />
          </div>
          <Card className="pt-1">
            <Card.Header className="d-flex justify-content-between align-items-center"
              onClick={() => setCollapsedElements(!collapsedElements)}>
              Elements [{widget.WidgetElement?.length}]
              <button className="btn btn-outline-success" type="button" onClick={addElement}>Add</button>
            </Card.Header>
            { !collapsedElements ? 
            <Card.Body>
              { widget.WidgetElement?.length > 0 ?
              
              <DnDListComponent
               _list={
              widget.WidgetElement?.map(
                (element, index) => ({item: element, reactItem:
                <WidgetElementComponent
                  key={index}
                  index={index}
                  element={element}
                  defaultCount={1}
                  onDelete={() => deleteElement(index)}
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
