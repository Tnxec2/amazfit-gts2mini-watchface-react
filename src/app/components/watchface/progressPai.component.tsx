import { FC } from 'react';
import { WatchImage, WatchImageSet, WatchPointerScale, WatchProgressPai } from '../../model/watchFace.gts2mini.model';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';
import PointerProgressComponent from './pointerProgress.component';
import { Card } from 'react-bootstrap';

interface IProps {
    title: string;
    progress: WatchProgressPai;
    onUpdate(progress: WatchProgressPai): void;
  }

const ProgressPaiComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,
  }) => {


    function updateImageProgress(imageset: WatchImageSet) {
      const p = {...progress};
      p.imageProgress = imageset;
      onUpdate(p);
    }
    function updatePointerScale(pscale: WatchPointerScale) {
      const p = {...progress};
      p.pointerScale = pscale;
      onUpdate(p);
    }
    function updateBg(image: WatchImage) {
      const p = {...progress};
      p.backgroundLayer = image;
      onUpdate(p);
    }
    function updateAltPointerScale(pscale: WatchPointerScale) {
      const p = {...progress};
      p.altPointerScale = pscale;
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
            <PointerProgressComponent
              title='Pointer progress'
              onUpdate={updatePointerScale}
              scale={{...progress.pointerScale}}
            /> 
            <PointerProgressComponent
              title='Pointer progress Alternate'
              onUpdate={updateAltPointerScale}
              scale={{...progress.altPointerScale}}
            /> 
            <ImageComponent
            title='Background Layer'
            onUpdate={updateBg}
            image={{...progress.backgroundLayer}}
            />
            </Card.Body>
        </Card>
    );
};

export default ProgressPaiComponent