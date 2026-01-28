import React from "react";
import NavBar from "../components/NavBar";


const Help: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <div className="dashboard-content grow flex items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-800">Help Content</h1>
            </div>
        </div>
    );
};

export default Help;
