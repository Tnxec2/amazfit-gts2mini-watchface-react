import React, { FC } from 'react';

interface IProps {
    title: string,
    checked: boolean,
    onChange(checked: boolean): void,
    disabled?: boolean
    hint?: string
    warning?: boolean
}

const CheckBoxBlockComponent: FC<IProps> = ({ title, checked, onChange, disabled, hint, warning }) => {
    return (
        <>
            <span className="input-group-text" id="addon-wrapping" title={hint}>
                { warning && '⚠' }
                {title}
            </span>
            <div className="input-group-text">
                <input
                    className="form-check-input form-check-input-sm"
                    type="checkbox"
                    disabled={disabled}
                    checked={checked ? true : false}
                    onChange={() => onChange(!checked)}
                    />
            </div>
        </>
    );
};

export default CheckBoxBlockComponent;