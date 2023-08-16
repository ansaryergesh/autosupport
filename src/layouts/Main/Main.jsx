import React from "react";
import Header from "../Header/Header.jsx";
import PropTypes from "prop-types";
import { Layout } from 'antd';
import SidebarNav from "../SideBar/SideBar";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const Main = (props) => {
    const {children} = props;

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={"main-layout"}>
                <Layout style={{ minHeight: '100vh'}} >
                    <div className="sidebar-nav">
                        <SidebarNav />
                    </div>
                    <Layout >
                        <Header />
                        <Layout.Content className="layout-content" >
                            {children}
                        </Layout.Content>
                    </Layout>
                </Layout>
            </div>
        </DndProvider>
    )
}

Main.propTypes = {
    children: PropTypes.node,
};

export default Main;