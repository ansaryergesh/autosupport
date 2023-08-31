import { Input } from 'antd';
import classNames from 'classnames';

import styles from './input.module.less';

function InputTextArea(props) {
  const { readOnly, placeholder, className } = props;

  return (
    <Input.TextArea
      placeholder={placeholder}
      {...props}
      className={classNames(styles.input, className, readOnly && styles.readOnly)}
    />
  );
}

export default InputTextArea;
