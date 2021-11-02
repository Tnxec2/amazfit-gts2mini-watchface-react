import React, { FC } from 'react';
import { IRow } from '../model/blocks.model';
import RowComponent from './row.component';

interface IProps {
    ar: IRow[]
}
const BlocksArrayComponent: FC<IProps> = ({ar}) => {
    return (
        <>
            { ar.map((row, index) => 
                 !row.disabled ?
                    <RowComponent key={index} row={row} /> : ''  )
            }
        </>
    );
};

export default BlocksArrayComponent;