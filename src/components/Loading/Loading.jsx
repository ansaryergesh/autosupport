import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import cx from 'classnames';

import styles from './Loading.module.less';

export default function Loading({
  className = null,
  spinClassName = null,
  children = null,
  size = 'large',
  backdrop = false,
  ...props
}) {
  const antIcon = <LoadingOutlined spin className={styles.loading__icon} />;

  return (
    <div
      className={cx(className, styles.loading, {
        [styles.loading_backdrop]: backdrop,
        [styles.loading_children]: !!children,
      })}
    >
      <Spin className={spinClassName} indicator={antIcon} size={size} {...props}>
        {children}
      </Spin>
    </div>
  );
}
