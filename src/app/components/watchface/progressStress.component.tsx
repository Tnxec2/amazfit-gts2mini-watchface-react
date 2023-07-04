import { FC } from 'react';
import { WatchImage, WatchImageSet, WatchProgressStress } from '../../model/watchFace.gts2mini.model';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';
import { Card } from 'react-bootstrap';

interface IProps {
    title: string;
    progress: WatchProgressStress;
    onUpdate(progress: WatchProgressStress): void;
  }

const ProgressStressComponent: FC<IProps> = ({
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
      p.backgroundLayerImage = image;
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

            <ImageComponent
            title='Background Image'
            onUpdate={updateBG}
            image={{...progress.backgroundLayerImage}}
            />
        </Card.Body>
        </Card>
    );
};

export default ProgressStressComponent