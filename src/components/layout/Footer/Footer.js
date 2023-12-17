import React from 'react';
import { Layout } from 'antd';
import "./Footer.css"
const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer className="footer">
            <span className="footer-text">
                Relay Computer Store ©2023 Created by Kashif Hussain
            </span>
        </Footer>
    );
};

export default AppFooter;
