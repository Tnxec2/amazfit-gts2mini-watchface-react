import React, { FC } from 'react';

interface IProps {
    title: string,
    onClick(e): void,
    disabled: boolean,
    className: string
    hint?: string
    warning?: boolean
}
const ButtonBlockComponent: FC<IProps> = ({ title, onClick, disabled, className, hint, warning }) => {
    return (
        <>
            <button className={`btn ${className}`}
                type="button" 
                onClick={onClick} 
                disabled={disabled}
                title={hint}
                >
                    { warning && '⚠' }
                    {title}
            </button> 
        </>
    );
};

export default ButtonBlockComponent;