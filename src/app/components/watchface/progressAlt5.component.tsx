import { FC } from 'react';
import { WatchIconSet, WatchImageSet, WatchProgressAlt5, WatchScale } from '../../model/watchFace.gts2mini.model';
import IconSetComponent from './iconSet.component';
import ImageSetComponent from './imageSet.component';
import ScaleComponent from './scale.component';

interface IProps {
    title: string;
    progress: WatchProgressAlt5;
    onUpdate(digit: WatchProgressAlt5): void;
  }

const ProgressAlt5Component: FC<IProps> = ({
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
        <div>
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
              title='Pointerscale'
              />
            
        </div>
    );
};

export default ProgressAlt5Component