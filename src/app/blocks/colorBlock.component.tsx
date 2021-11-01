import React, { FC } from 'react';

interface IProps {
    title: string,
    value: string,
    onChange(value: string): void
}
const ColorBlockComponent: FC<IProps> = ({ title, value, onChange }) => {


    return (
        <>
            <span className="input-group-text">{title}</span>
            <input
              type="color"
              className="form-control form-control-sm"
              style={{ width: 40 }}
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