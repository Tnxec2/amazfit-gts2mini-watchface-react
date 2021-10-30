import React, { FC } from 'react';
import { WatchCommonDigit } from '../model/watchFace.model';
import ImageDigitComponent from './imageDigit.component';
import SystemFontComponent from './systemFont.component';
import SystemFontCircleComponent from './systemFontCircle.component';

interface IProps {
    digit: WatchCommonDigit;
    title: string;
    onUpdate(digit: WatchCommonDigit): void;
    showDecimalPointer: boolean;
    showDelimiter: boolean;
    showNoData: boolean;
    paddingZeroFix: boolean;
  }

const ActivityDigitComponent: FC<IProps> = ({
    digit,
    title,
    onUpdate,
    showDecimalPointer,
    showDelimiter,
    showNoData,
    paddingZeroFix,
  }) => {

    return (
        <div>
            <ImageDigitComponent
            title={`Numerical (${title})`}
            digit={digit}
            onUpdate={onUpdate}
            showDecimalPointer={showDecimalPointer}
            showDelimiter={showDelimiter}
            showNoData={showNoData}
            paddingZeroFix={paddingZeroFix}
          />

          <SystemFontComponent
            title={`Systemfont Rotated (${title})`}
            digit={digit}
            onUpdate={onUpdate}
            paddingZeroFix={paddingZeroFix}
          />
          <SystemFontCircleComponent
            title={`Systemfont Circle (${title})`}
            digit={digit}
            onUpdate={onUpdate}
            paddingZeroFix={paddingZeroFix}
          />
        </div>
    );
};

export default ActivityDigitComponent