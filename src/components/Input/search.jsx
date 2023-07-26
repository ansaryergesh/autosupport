import { Input } from 'antd';

import styles from './input.module.less';

const InputSearch = ({ placeholder, ...props }) => (
    <Input.Search
        {...props}
        className={styles.search}
        placeholder={placeholder}
    />
);

export default InputSearch;
