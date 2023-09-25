import { Input } from 'antd';

import styles from './input.module.less';

function InputPassword(props) {
  const { placeholder } = props;

  return <Input.Password {...props} className={styles.password} placeholder={placeholder} />;
}

export default InputPassword;
