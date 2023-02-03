import { FC } from 'react';
import { WatchImage, WatchImageSet, WatchProgressAlt4 } from '../../model/watchFace.gts2mini.model';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';

interface IProps {
    title: string;
    progress: WatchProgressAlt4;
    onUpdate(progress: WatchProgressAlt4): void;
  }

const ProgressAlt4Component: FC<IProps> = ({
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

export default ProgressAlt4Component