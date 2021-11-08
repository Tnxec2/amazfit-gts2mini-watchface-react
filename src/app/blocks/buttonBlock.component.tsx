import React, { FC } from 'react';

interface IProps {
    title: string,
    onClick(e): void,
    disabled: boolean,
    className: string
}
const ButtonBlockComponent: FC<IProps> = ({ title, onClick, disabled, className }) => {
    return (
        <>
            <button className={`btn ${className}`}
            type="button" 
            onClick={onClick} 
            disabled={disabled}>
                {title}
            </button> 
        </>
    );
};

export default ButtonBlockComponent;