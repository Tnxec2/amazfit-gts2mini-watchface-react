import React, { FC } from 'react';
import { IOption } from '../model/blocks.model';

interface IProps {
    title: string,
    value: string,
    onChange(value: string): void,
    options: IOption[],
    disabled?: boolean
    hint?: string
    warning?: boolean
}

const SelectBlockComponent: FC<IProps> = ({ title, value, onChange, disabled, options, hint, warning }) => {
    return (
        <>
            <span className="input-group-text" title={hint}>
                { warning && '⚠' }
                {title}
            </span>
            <select
                disabled={disabled}
                value={value}
                className="form-select form-select-sm"
                onChange={(e) => onChange(e.target.value)}
            >
                { options.map(
                    (item) => 
                    <option key={item.value} value={item.value}>
                        {item.title}
                    </option>
                )}
            </select>
        </>
    );
};

export default SelectBlockComponent;