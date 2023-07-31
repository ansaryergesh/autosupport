import { Input } from 'antd';
import classNames from 'classnames';
import { forwardRef } from 'react';


import Group from './group';
import styles from './input.module.less';
import Search from './search';
import TextArea from './textArea';
import Password from './password';
// eslint-disable-next-line react/display-name
const InputComponent = forwardRef((props, ref) => {
    // eslint-disable-next-line react/prop-types
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

InputComponent.Group = Group;
InputComponent.Search = Search;
InputComponent.TextArea = TextArea;
InputComponent.Password = Password;

export default InputComponent;
