import React from "react";
import Header from "../Header/Header.jsx";
import PropTypes from "prop-types";
import { Layout } from 'antd';
import SidebarNav from "../SideBar/SideBar";
import Footer from "../Footer/Footer.jsx";

const Main = (props) => {
    const {children} = props;
    return (
        <div className={"main-layout"}>
            <Layout style={{ minHeight: '100vh' }}>
                <div className="sidebar-nav">
                    <SidebarNav />
                </div>
                <Layout>
                    <Header />
                    <Layout.Content className="layout-content">
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>
            <Footer />
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.node,
};

export default Main;