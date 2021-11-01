import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow } from "../../model/blocks.model";
import { WatchWidget, WatchWidgetElement } from "../../model/watchFace.model";
import DnDListComponent, { IDNDItem } from "../../shared/draganddroplist.component";
import ImageCoordsComponent from "./imageCoords.component";
import WidgetElementComponent from "./widgetElement.component";


interface IProps {
  title: string;
  widget: WatchWidget;
  onUpdate(widget: WatchWidget): void;
  onDelete(e): void;
}

const WidgetComponent: FC<IProps> = ({ title, widget, onUpdate, onDelete }) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: widget?.x ? widget.x : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: widget?.y ? widget.y : 0, onChange: onChangeY },
      ]
    },
    {
      blocks: [
        { title: 'Width', type: BlockType.Number, nvalue: widget?.width ? widget.width : 0, onChange: onChangeWidth },
        { title: 'Height', type: BlockType.Number, nvalue: widget?.height ? widget.height : 0, onChange: onChangeHeight },
      ]
    },
    {
      blocks: [
        { title: 'Frame activ', type: BlockType.SelectFile, nvalue: widget.borderActivImageIndex ? widget.borderActivImageIndex : null, onChange: onChangeBorderActiv },
        { title: 'Frame inactiv', type: BlockType.SelectFile, nvalue: widget.borderInactivImageIndex ? widget.borderInactivImageIndex : null, onChange: onChangeBorderInactiv },
      ]
    },
    {
      blocks: [
        { title: 'Description width', type: BlockType.Number, nvalue: widget?.descriptionWidthCheck ? widget.descriptionWidthCheck : 0, onChange: onChangeDescriptionWidth },
      ]
    },
  ], [widget]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeX(val: number) {
    const _wi = { ...widget };
    _wi.x = val;
    onUpdate(_wi);
  }

  function onChangeY(val: number) {
    const _wi = { ...widget };
    _wi.y = val;
    onUpdate(_wi);
  }

  function onChangeWidth(val: number) {
    const _wi = { ...widget };
    _wi.width = val;
    onUpdate(_wi);
  }

  function onChangeHeight(val: number) {
    const _wi = { ...widget };
    _wi.height = val;
    onUpdate(_wi);
  }

  function onChangeBorderActiv(val: number) {
    const _wi = { ...widget };
    _wi.borderActivImageIndex = val;
    onUpdate(_wi);
  }

  function onChangeBorderInactiv(val: number) {
    const _wi = { ...widget };
    _wi.borderInactivImageIndex = val;
    onUpdate(_wi);
  }

  function onChangeDescriptionWidth(val: number) {
    const _wi = { ...widget };
    _wi.descriptionWidthCheck = val;
    onUpdate(_wi);
  }

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
          <BlocksArrayComponent ar={ar} />
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

          <Card className="mt-1">
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
