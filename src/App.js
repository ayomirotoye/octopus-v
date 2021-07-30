import React, { useState } from "react"
import logo from './logo.svg';
import './App.css';
import Navbar from './pages/shared/Navbar';
import Sidebar from './pages/shared/Sidebar';
import Footer from './pages/shared/Footer';
import AppRoutes from "./AppRoutes";

function App() {
    const [isFullPageLayout, setIsFullPageLayout] = useState(false);
    
    let navbarComponent = !isFullPageLayout ? <Navbar /> : '';
    let sidebarComponent = !isFullPageLayout ? <Sidebar /> : '';
    let footerComponent = !isFullPageLayout ? <Footer /> : '';
    return (
        <div className="container-scroller" > {sidebarComponent}
            <div className="container-fluid page-body-wrapper" >
                {navbarComponent}
                <div className="main-panel" >
                    <div className="content-wrapper" >
                        <AppRoutes />
                    </div>
                    {footerComponent} </div>
            </div>
        </div>
    );
}

export default App;