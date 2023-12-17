import React from 'react';
import Footer from './Footer/Footer';
import './Layout.css'; 
import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="content">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
