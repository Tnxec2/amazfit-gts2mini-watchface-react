import React, { FC, useState } from 'react';
import { Card } from 'react-bootstrap';
import { activitysToJson } from '../main/json.component';
import { Date, MultilangImage } from '../model/json.model';
import { WidgetElement } from '../model/json_gts2mini.model';
import { getActivityListFromJson, WatchActivity } from '../model/watchFace.model';
import ActivityListComponent from './activitylist.component';
import MultilangImageComponent from './multiLangImage.component';

interface IProps {
    index: number,
    element: WidgetElement,
    onDelete(): void,
    onUpdate(element: WidgetElement)
    defaultCount: number,
}

const WidgetElementComponent: FC<IProps> = ({index, element, onDelete, onUpdate, defaultCount}) => {

const [collapsed, setCollapsed] = useState<boolean>(true);
    
  function updatePreviewOfElement(previewImageSet: MultilangImage[]) {
    let _we: WidgetElement = {...element}
    _we.Preview = previewImageSet
    onUpdate(_we)
  }

  function updateDateOfElement(date: Date) {
    let _we: WidgetElement = {...element}
    _we.Date = date
    onUpdate(_we)
  }

  function updateActivityOfElement(activity: WatchActivity[]) {
    let _we: WidgetElement = {...element}
    _we.Activity = activitysToJson(activity)
    onUpdate(_we)
  }

    return (
        <Card className="pt-1 pb-1  w-100">
            <Card.Header 
            className="d-flex justify-content-between align-items-center"
                onClick={() => setCollapsed(!collapsed)}>
                <span className="input-group-text">Element {index}</span>
                <button className="btn btn-outline-danger" type="button" onClick={() => onDelete()}>Delete</button>
            </Card.Header>
            { !collapsed ? 
            <Card.Body>
            <MultilangImageComponent
            title='Preview'
            images={element.Preview}
            onUpdate={(previewImageSet) => updatePreviewOfElement(previewImageSet)}
            defaultcount={1}
            />
            <ActivityListComponent
                activitys={getActivityListFromJson(element.Activity)}
                onUpdate={(activity) => updateActivityOfElement(activity)}
            />
            </Card.Body> 
            : '' }
        </Card>
    );
};

export default WidgetElementComponent;