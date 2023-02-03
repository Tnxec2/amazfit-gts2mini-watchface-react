import { FC } from 'react';
import { WatchImage, WatchImageSet, WatchProgressAlt3 } from '../../model/watchFace.gts2mini.model';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';

interface IProps {
    title: string;
    progress: WatchProgressAlt3;
    onUpdate(progress: WatchProgressAlt3): void;
  }

const ProgressAlt3Component: FC<IProps> = ({
    progress,
    title,
    onUpdate,
  }) => {


    function updateImageProgress(imageset: WatchImageSet) {
      const p = {...progress};
      p.imageProgress = imageset;
      onUpdate(p);
    }

    function updateNoData(image: WatchImage) {
      const p = {...progress};
      p.noDataImage = image;
      onUpdate(p);
    }


    return (
        <div>
          <ImageSetComponent
              title='Image progress'
              onUpdate={updateImageProgress}
              imageSet={{...progress.imageProgress}}
            /> 

            <ImageComponent
            title='No data Image'
            onUpdate={updateNoData}
            image={{...progress.noDataImage}}
            />
        </div>
    );
};

export default ProgressAlt3Component