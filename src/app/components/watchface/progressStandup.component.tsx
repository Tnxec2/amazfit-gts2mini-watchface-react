import { FC } from 'react';
import { WatchIconSet, WatchImageSet, WatchProgressStandup, WatchScale } from '../../model/watchFace.gts2mini.model';
import IconSetComponent from './iconSet.component';
import ImageSetComponent from './imageSet.component';
import ScaleComponent from './scale.component';
import { Card } from 'react-bootstrap';

interface IProps {
    title: string;
    progress: WatchProgressStandup;
    onUpdate(digit: WatchProgressStandup): void;
  }

const ProgressStandupComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,

  }) => {

    function updateImageProgress(imageset: WatchImageSet) {
      const p = {...progress};
      p.imageProgress = imageset;
      onUpdate(p);
    }
    function updateIconSet(iconset: WatchIconSet) {
      const p = {...progress};
      p.iconsetProgress = iconset;
      onUpdate(p);
    }
    function updateScale(scale: WatchScale) {
      const p = {...progress};
      p.scale = scale;
      onUpdate(p);
    }

    return (
      <Card>
      <Card.Header>
        {title}
      </Card.Header>
      <Card.Body>
            <ImageSetComponent
              title='Image progress'
              onUpdate={updateImageProgress}
              imageSet={{...progress.imageProgress}}
            /> 
            <IconSetComponent
              title='Icon set progress'
              onUpdate={updateIconSet}
              iconSet={{...progress.iconsetProgress}}
            />
            <ScaleComponent
              scale={{...progress.scale}}
              onUpdate={updateScale}
              title='Scale'
              />
            
        </Card.Body>
        </Card>
    );
};

export default ProgressStandupComponent