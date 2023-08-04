import React from 'react';
import { Image, Layout } from "antd";
import styles from './Header.module.less';
import { Link } from 'react-router-dom';
import Logo from 'images/logoFreedom.svg';
import Languages from "./Languages.jsx";

const Header = () => {
    const { Header } = Layout;

    return (
        <div>
            <Header className={styles.fixedHeader} >
                <div style={{ display: "flex" }}>
                    <Link to={'/'}>
                        <Image src={Logo} preview={false} />
                    </Link>
                    <p className={"my-paragraph"} style={{ marginLeft: "100px" }}>Подразделения холдинга</p>
                </div>
                <Languages />
            </Header>
        </div>
    )
}

export default Header;