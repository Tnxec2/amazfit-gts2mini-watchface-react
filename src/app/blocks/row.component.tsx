import React, { FC } from 'react';
import { IRow, BlockType, IBlock } from '../model/blocks.model';
import SelectFileListComponent from '../shared/selectFileList.component';
import ButtonBlockComponent from './buttonBlock.component';
import CheckBoxBlockComponent from './checkboxBlock.component';
import ColorBlockComponent from './colorBlock.component';
import NumberBlockComponent from './numberBlock.component';
import SelectBlockComponent from './selectBlock.component';

interface IProps {
    row: IRow
}
const RowComponent: FC<IProps> = ({ row }) => {

    function getBlock(block: IBlock, index: number) {
        let result: any = '';
        switch (block.type) {
            case BlockType.Empty:
                result = <span key={index} className="input-group-text">{block.title}</span>
                break;
            case BlockType.SelectFile:
                result =
                    <SelectFileListComponent
                        key={index} 
                        title={block.title}
                        onChange={block.onChange}
                        value={block.nvalue}
                    />
                break;
            case BlockType.Number:
                result =
                    <NumberBlockComponent
                        key={index} 
                        title={block.title}
                        onChange={block.onChange}
                        value={block.nvalue}
                        disabled={block.disabled}
                    />
                break;
            case BlockType.Checkbox:
                result =
                    <CheckBoxBlockComponent
                        key={index} 
                        title={block.title}
                        onChange={block.onChange}
                        checked={block.checked}
                        disabled={block.disabled}
                    />
                break;
            case BlockType.Select:
                result = 
                    <SelectBlockComponent
                        key={index} 
                        title={block.title}
                        onChange={block.onChange}
                        value={block.svalue}
                        disabled={block.disabled}
                        options={block.selectOptions}
                    />
                break;
            case BlockType.Color:
                result =
                    <ColorBlockComponent
                        key={index} 
                        title={block.title}
                        onChange={block.onChange}
                        value={block.svalue}
                    />
                break;
            case BlockType.Button:
                result =
                    <ButtonBlockComponent
                        key={index} 
                        title={block.title}
                        onClick={block.onClick}
                        className={block.className}
                        disabled={block.disabled}
                    />
                break;
            default:
                break;
        }
        return result
    }
    return (
        <>
            <div className={`input-group input-group-sm d-flex ${ row.showDelete ? 'justify-content-between' : ''}`}>
                {row.blocks.map((block, index) =>
                    getBlock(block, index))
                }
                { row.showDelete ?
                    <button className="btn btn-outline-danger" type="button" onClick={row.onDelete} disabled={!row.onDelete}>Delete</button> : ''}
            </div>
        </>
    );
};

export default RowComponent;


