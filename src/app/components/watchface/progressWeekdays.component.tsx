import { FC } from 'react';
import { WatchIconSet, WatchProgressWeekdays } from '../../model/watchFace.gts2mini.model';
import IconSetComponent from './iconSet.component';
import { Card } from 'react-bootstrap';

interface IProps {
    title: string;
    progress: WatchProgressWeekdays;
    onUpdate(digit: WatchProgressWeekdays): void;
  }

const ProgressWeekdaysComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,

  }) => {


    function updateIconSet(iconset: WatchIconSet) {
      const p = {...progress};
      p.iconSetProgress = iconset;
      onUpdate(p);
    }

    return (
        <Card>
            <Card.Header onClick={(e) => { onUpdate({...progress, collapsed: !progress.collapsed})}}>
              {title}
            </Card.Header>
            { !progress.collapsed && <Card.Body>
              <IconSetComponent
                title='Weekdays icon set progress'
                onUpdate={updateIconSet}
                iconSet={{...progress.iconSetProgress}}
              />
            </Card.Body> }
            
        </Card>
    );
};

export default ProgressWeekdaysComponent