import { Input } from 'antd';

import styles from './input.module.less';

function InputGroup(props) {
    return <Input.Group {...props} className={styles.group} />;
}

export default InputGroup;
