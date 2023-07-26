import { Input } from 'antd';
import classNames from 'classnames';

import styles from './input.module.less';

function InputPassword(props) {
    const { readOnly, placeholder, className } = props;

    return (
        <Input.Password
            {...props}
            className={styles.password}
            placeholder={placeholder}
        />
    );
}

export default InputPassword;
