import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import BlocksArrayComponent from '../../blocks/blocksArray.component';
import { BlockType } from '../../model/blocks.model';
import { WatchDate, WatchWidgetElement } from '../../model/watchFace.model';
import ActivityListComponent from './activitylist.component';
import DateComponent from './date.component';

interface IProps {
    index: number,
    element: WatchWidgetElement,
    onDelete(e): void,
    onUpdate(element: WatchWidgetElement)
    defaultCount: number,
}

const WidgetElementComponent: FC<IProps> = ({index, element, onDelete, onUpdate, defaultCount}) => {

  function onChangePreviewImageIndex(index: number) {
      const _we = { ...element };
      _we.previewImageIndex = index;
      onUpdate(_we);
  }
  
  function updateDate(d: WatchDate) {
    let _we = { ...element }
    _we.date = d
    onUpdate(_we)
  }

  return (
      <Card className="w-100">
          <Card.Header 
              className="d-flex justify-content-between align-items-center"
              onClick={() => {
                let we = {...element};
                we.collapsed = !we.collapsed;
                onUpdate(we);
              }}>
              <span className="input-group-text">Element {index+1}</span>
              <button className="btn btn-outline-danger" type="button" onClick={onDelete}>Delete</button>
          </Card.Header>
          { !element.collapsed ? 
          <Card.Body>
            <BlocksArrayComponent ar={
              [
                { blocks: [
                  { title: 'Preview', type: BlockType.SelectFile, nvalue: element.previewImageIndex, onChange: onChangePreviewImageIndex },
                ]}
              ]
            } />
          <DateComponent
              date={element.date}
              onUpdate={updateDate}
              collapsed={element.date.collapsed}
              setCollapsed={(c) => {
                let _we = { ...element };
                _we.date.collapsed = c;
                onUpdate(_we)
              }}
           />
          <ActivityListComponent
              activitys={element.activitys}
              onUpdate={(al) => {
                let we = {...element};
                we.activitys = al;
                we.activitylistCollapsed = false;
                onUpdate(we);
              }}
              collapsed={element.activitylistCollapsed}
              setCollapsed={(collapsed) => {
                let we = {...element};
                we.activitylistCollapsed = collapsed;
                onUpdate(we);
              }}
          />
          </Card.Body> 
          : '' }
      </Card>
  );
};

export default WidgetElementComponent;