import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { WatchWidgetElement } from '../model/watchFace.model';
import SelectFileListComponent from '../shared/selectFileList.component';
import ActivityListComponent from './activitylist.component';

interface IProps {
    index: number,
    element: WatchWidgetElement,
    onDelete(e): void,
    onUpdate(element: WatchWidgetElement)
    defaultCount: number,
}

const WidgetElementComponent: FC<IProps> = ({index, element, onDelete, onUpdate, defaultCount}) => {

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
            <div className="input-group input-group-sm mb-1">
              <SelectFileListComponent
                title='Preview'
                setSelectedFileIndex={(ix) => {
                  const ip = { ...element };
                  ip.previewImageIndex = ix;
                  onUpdate(ip);
                }}
                imageIndex={element.previewImageIndex}
              />
            </div>
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