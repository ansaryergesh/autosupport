import React from 'react';
import { forwardRef } from 'react';
import {Input} from "antd";
import classNames from 'classnames';

const InputComponent = forwardRef((props, ref) => {
    const { readOnly = false, disabled = false, placeholder, className } = props;

    const handleWheel = (e) => {
        e.target.blur();
    };

    return (
        <Input
            ref={ref}
            {...props}
            className={classNames(
                styles.input,
                {
                    [styles.disabled]: disabled,
                    [styles.readOnly]: readOnly,
                },
                className,
            )}
            disabled={disabled}
            placeholder={placeholder}
            onWheel={handleWheel}
        />
    );
});


export default InputComponent;