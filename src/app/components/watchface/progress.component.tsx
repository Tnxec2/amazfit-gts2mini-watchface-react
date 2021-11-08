import React, { FC } from 'react';
import { WatchProgress } from '../../model/watchFace.gts2mini.model';

interface IProps {
    title: string;
    progress: WatchProgress;
    onUpdate(digit: WatchProgress): void;
  }

const ProgressComponent: FC<IProps> = ({
    progress,
    title,
    onUpdate,
  }) => {

    return (
        <div>
            
        </div>
    );
};

export default ProgressComponent