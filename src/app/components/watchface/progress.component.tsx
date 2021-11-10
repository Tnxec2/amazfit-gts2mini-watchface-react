import React, { FC } from 'react';
import { WatchIconSet, WatchImageSet, WatchProgress, WatchScale } from '../../model/watchFace.gts2mini.model';
import IconSetComponent from './iconSet.component';
import ImageSetComponent from './imageSet.component';
import PointerProgressComponent from './pointerProgress.component';

interface IProps {
    title: string;
    progress: WatchProgress;
    onUpdate(digit: WatchProgress): void;
    showImageProgress: boolean,
    showIconProgress: boolean,
    showPointerProgress: boolean,
    showCircleScaleProgress: boolean,
  }

const ProgressComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,
    showImageProgress,
    showIconProgress,
    showPointerProgress,
    showCircleScaleProgress,
  }) => {

    function updateImageProgress(ip: WatchImageSet) {
      const p = {...progress};
      p.imageProgress = ip;
      onUpdate(p);
    }
    function updateIconSet(ip: WatchIconSet) {
      const p = {...progress};
      p.iconSetProgress = ip;
      onUpdate(p);
    }
    function updateScale(ip: WatchScale) {
      const p = {...progress};
      p.scale = ip;
      onUpdate(p);
    }

    return (
        <div>
          { showImageProgress ?
            <ImageSetComponent
              title='Image progress'
              onUpdate={updateImageProgress}
              imageSet={progress.imageProgress}
            /> : '' }
          { showIconProgress ?
            <IconSetComponent
              title='Icon set progress'
              onUpdate={updateIconSet}
              iconSet={progress.iconSetProgress}
            /> : '' }
          { showIconProgress ?
            <PointerProgressComponent
              title='Pointer progress'
              onUpdate={updateScale}
              scale={progress.scale}
            /> : '' }
        </div>
    );
};

export default ProgressComponent