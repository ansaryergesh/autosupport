import React from 'react';
import {Button, Dropdown, Image, Layout, Menu, Select} from "antd";
import styles from './Header.module.less';
import { DownOutlined } from '@ant-design/icons';

import Logo from 'images/logoFreedom.svg';
const Header = () => {
    const {Header} = Layout;
    const menu = (
        <Menu className={styles.langMenu}>
            <Menu.Item key="ru" className={styles.langMenuItem}>
                На русском
            </Menu.Item>
            <Menu.Item key="qq" className={styles.langMenuItem}>
                Qazaqca
            </Menu.Item>
            <Menu.Item key="kk" className={styles.langMenuItem}>
                Қазақша
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <Header className={styles.fixedHeader} >
                <Image src={Logo} preview={false}/>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button onClick={(e) => e.preventDefault()}>
                        {/* {lang === 'ru' ? 'На русском' : lang === 'kk' ? 'Қазақша' : 'Qazaqca'} */}
                        {(() => {return 'Qazaqca';
                        })()}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </Header>
        </div>
    )
}

export default Header;