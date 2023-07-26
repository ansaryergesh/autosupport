import React from 'react';
import {Button, Dropdown, Image, Layout, Menu, Select} from "antd";
import styles from './Header.module.less';
import { DownOutlined } from '@ant-design/icons';

import Logo from 'images/logoFreedom.svg';
import Languages from "./Languages.jsx";
const Header = () => {
    const {Header} = Layout;

    return (
        <div>
            <Header className={styles.fixedHeader} >
                <div style={{display:"flex"}}>
                    <Image src={Logo} preview={false}/>
                    <p className={"my-paragraph"} style={{marginLeft: "100px"}}>Подразделения холдинга</p>
                </div>
                <Languages />
            </Header>
        </div>
    )
}

export default Header;