import { FC } from 'react';
import { WatchImage, WatchImageSet, WatchPointerScale, WatchProgressAlt1 } from '../../model/watchFace.gts2mini.model';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';
import PointerProgressComponent from './pointerProgress.component';

interface IProps {
    title: string;
    progress: WatchProgressAlt1;
    onUpdate(progress: WatchProgressAlt1): void;
  }

const ProgressAlt1Component: FC<IProps> = ({
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
    function updateNoData(image: WatchImage) {
      const p = {...progress};
      p.noDataImage = image;
      onUpdate(p);
    }
    function updateAltPointerScale(pscale: WatchPointerScale) {
      const p = {...progress};
      p.altPointerScale = pscale;
      onUpdate(p);
    }

    return (
        <div>
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
            title='No data Image'
            onUpdate={updateNoData}
            image={{...progress.noDataImage}}
            />
        </div>
    );
};

export default ProgressAlt1Component