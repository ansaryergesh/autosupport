import React, {useState} from "react";
import {Radio} from "antd";

const SideBarButtons = () => {
    const [activeButton, setActiveButton] = useState('All');

    const handleRadioChange = (e) => {
        setActiveButton(e.target.value);
    };
    const activeStyle = {
        background: 'linear-gradient(90deg, #00F260 0%, #04D4C8 100%)',
        borderRadius: '10px',
        padding: '12px 24px',
        flexDirection: 'row',
        width: '50%',
        color: '#000',
        justifyContent: 'center',
        textAlign:'center',
        display: 'flex',  // Center the content horizontally
        alignItems: 'center',  // Center the content vertically
        border: 'none',
        transition: '.2s'// Remove border
    };

    const inactiveStyle = {
        background: 'none',
        borderRadius: '0px 10px 10px 0px',
        padding: '12px 24px',
        justifyContent: 'center',
        textAlign:'center',
        width: '50%',
        flexDirection: 'row',
        color: '#000',
        display: 'flex',  // Center the content horizontally
        alignItems: 'center',  // Center the content vertically
        border: 'none',
    };

    const switchContainer = {
        borderRadius: '10px',
        background: 'white',
        width: '100%',
        display: 'flex',  // Center the buttons horizontally
        justifyContent: 'center',
        border: 'none!important', // Center the buttons horizontally
    }

    return (
        <div>
            <Radio.Group
                className="switch-container"
                style={switchContainer}
                value={activeButton}
                onChange={handleRadioChange}
            >
                <Radio.Button value="All" style={activeButton === 'All' ? activeStyle : inactiveStyle}>
                    All
                </Radio.Button>
                <Radio.Button value="Popular" style={activeButton === 'Popular' ? activeStyle : inactiveStyle}>
                    Popular
                </Radio.Button>
            </Radio.Group>
        </div>
    );
};

export default SideBarButtons;