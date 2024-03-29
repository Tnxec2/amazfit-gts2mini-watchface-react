import { FC } from 'react';
import { WatchCircleScale, WatchIconSet, WatchImage, WatchImageSet, WatchProgressSteps, WatchScale } from '../../model/watchFace.gts2mini.model';
import CircleProgressComponent from './circleProgress.component';
import IconSetComponent from './iconSet.component';
import ImageComponent from './image.component';
import ImageSetComponent from './imageSet.component';
import ScaleComponent from './scale.component';

interface IProps {
    title: string;
    progress: WatchProgressSteps;
    onUpdate(digit: WatchProgressSteps): void;
  }

const ProgressStepsComponent: FC<IProps> = ({
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
    function updateCircle(scale: WatchCircleScale) {
      const p = {...progress};
      p.circleScale = scale;
      onUpdate(p);
    }
    function updateBackground(image: WatchImage) {
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
          <CircleProgressComponent
              title='Circle progress'
              onUpdate={updateCircle}
              scale={{...progress.circleScale}}
            /> 
            <ScaleComponent
              scale={{...progress.scale}}
              onUpdate={updateScale}
              title='Pointerscale'
              />
            
            <ImageComponent
            title='Background Layer'
            onUpdate={updateBackground}
            image={{...progress.backgroundLayer}}
            />
        </div>
    );
};

export default ProgressStepsComponent