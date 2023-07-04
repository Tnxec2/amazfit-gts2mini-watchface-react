import { FC } from 'react';
import { WatchImage, WatchImageSet, WatchProgressAirQ, WatchScale } from '../../model/watchFace.gts2mini.model';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';
import ScaleComponent from './scale.component';
import { Card } from 'react-bootstrap';

interface IProps {
    title: string;
    progress: WatchProgressAirQ;
    onUpdate(progress: WatchProgressAirQ): void;
  }

const ProgressAirQComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,
  }) => {


    function updateImageProgress(imageset: WatchImageSet) {
      const p = {...progress};
      p.imageProgress = imageset;
      onUpdate(p);
    }

    function updateBG(image: WatchImage) {
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
            onUpdate={updateBG}
            image={{...progress.backgroundLayer}}
            />
        </Card.Body>
      </Card>
    );
};

export default ProgressAirQComponent