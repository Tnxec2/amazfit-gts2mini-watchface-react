import { FC } from 'react';
import { WatchImage, WatchImageSet, WatchProgressUvi, WatchScale,  } from '../../model/watchFace.gts2mini.model';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';
import { Card } from 'react-bootstrap';
import ScaleComponent from './scale.component';

interface IProps {
    title: string;
    progress: WatchProgressUvi;
    onUpdate(progress: WatchProgressUvi): void;
  }

const ProgressUviComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,
  }) => {


    function updateImageProgress(imageset: WatchImageSet) {
      const p = {...progress};
      p.imageProgress = imageset;
      onUpdate(p);
    }

    function updatebackgroundLayer(image: WatchImage) {
      const p = {...progress};
      p.backgroundLayer = image;
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
            <ScaleComponent
              title='Scale'
              onUpdate={updateScale}
              scale={{...progress.scale}}
            />
            <ImageComponent
              title='Background Layer'
              onUpdate={updatebackgroundLayer}
              image={{...progress.backgroundLayer}}
            />
            </Card.Body>
        </Card>
    );
};

export default ProgressUviComponent