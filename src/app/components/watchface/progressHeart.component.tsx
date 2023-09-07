import { FC } from 'react';
import { WatchIconSet, WatchImage, WatchImageSet, WatchProgressHeart, WatchScale } from '../../model/watchFace.gts2mini.model';
import IconSetComponent from './iconSet.component';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';
import ScaleComponent from './scale.component';

interface IProps {
    title: string;
    progress: WatchProgressHeart;
    onUpdate(digit: WatchProgressHeart): void;
  }

const ProgressHeartComponent: FC<IProps> = ({
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
      p.iconSetProgress = iconset;
      onUpdate(p);
    }
    function updateScale(scale: WatchScale) {
      const p = {...progress};
      p.scale = scale;
      onUpdate(p);
    }

    function updateNoData(image: WatchImage) {
      const p = {...progress};
      p.backgroundLayer = image;
      onUpdate(p);
    }

    return (
        <div>
            <ImageSetComponent
              title='Image progress'
              onUpdate={updateImageProgress}
              imageSet={{...progress.imageProgress}}
            /> 
            <IconSetComponent
              title='Icon set progress'
              onUpdate={updateIconSet}
              iconSet={{...progress.iconSetProgress}}
            />

            <ScaleComponent
              scale={{...progress.scale}}
              onUpdate={updateScale}
              title='Pointerscale'
              />
            
            <ImageComponent
            title='Background Layer'
            onUpdate={updateNoData}
            image={{...progress.backgroundLayer}}
            />
        </div>
    );
};

export default ProgressHeartComponent