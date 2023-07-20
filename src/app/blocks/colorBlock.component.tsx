import React, { FC } from 'react';

interface IProps {
    title: string,
    value: string,
    onChange(value: string): void
    hint?: string
    warning?: boolean
}
const ColorBlockComponent: FC<IProps> = ({ title, value, onChange, hint, warning }) => {


    return (
        <>
            <span className="input-group-text" title={hint}>
                    { warning && '⚠' }{title}</span>
            <input
              type="color"
              className="form-control form-control-sm"
              onChange={(e) => {
                onChange(e.target.value)
              }}
              id="colorBackground"
              value={value}
              title="Choose color"
              />
        </>
    );
};

export default ColorBlockComponent;