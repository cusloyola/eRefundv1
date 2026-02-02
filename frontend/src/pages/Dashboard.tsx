import React from "react";
import NavBar from "../components/NavBar";
import { FaChartBar, FaUserCircle, FaHistory, FaFileExport } from "react-icons/fa";
import wallemLogo from "../assets/wallemrectangle.png";
import "../styles/Dashboard.css";
import { useUserRole } from "../hooks/useUserRole";

const Dashboard: React.FC = () => {

    const { isAccountingRole, isCreditAndCollection } = useUserRole();

    return (
        <div className="dashboard-root">
            <NavBar />
            <main className="dashboard-content">
                <div className="dashboard-logo-container">
                    <img src={wallemLogo} alt="Wallem Logo" className="dashboard-logo" />
                </div>
                <section className="dashboard-welcome">
                    <h1 className="dashboard-title">Welcome to eRefund</h1>
                    <p className="dashboard-subtitle">
                        Your one-stop portal for managing refund operations, inquiries, and reports.<br />
                    </p>
                </section>
                <section className="dashboard-cards">
                    <a href={isCreditAndCollection ? "/reports/check-preparation" : "/reports/processed-refund"} className="dashboard-card">
                        <FaChartBar className="dashboard-card-icon" />
                        <span className="dashboard-card-title">Reports</span>
                        <span className="dashboard-card-desc">Start a new refund or process pending requests.</span>
                    </a>
                    <a
                        href={isAccountingRole ? "/user-account" : "#"}
                        className={`dashboard-card${!isAccountingRole ? ' disabled' : ''}`}
                        onClick={(e) => !isAccountingRole && e.preventDefault()}
                    >
                        <FaUserCircle className="dashboard-card-icon" />
                        <span className="dashboard-card-title">User Account</span>
                        <span className="dashboard-card-desc">View the list and status of refunds.</span>
                    </a>
                    <a
                        href={isAccountingRole ? "/logs" : "#"}
                        className={`dashboard-card${!isAccountingRole ? ' disabled' : ''}`}
                        onClick={(e) => !isAccountingRole && e.preventDefault()}
                    >
                        <FaHistory className="dashboard-card-icon" />
                        <span className="dashboard-card-title">Logs</span>
                        <span className="dashboard-card-desc">Access processed refunds, container charges, and more.</span>
                    </a>
                    <a
                        href={isAccountingRole ? "/file-export" : "#"}
                        className={`dashboard-card${!isAccountingRole ? ' disabled' : ''}`}
                        onClick={(e) => !isAccountingRole && e.preventDefault()}
                    >
                        <FaFileExport className="dashboard-card-icon" />
                        <span className="dashboard-card-title">File Export</span>
                        <span className="dashboard-card-desc">Browse help topics, index, and about information.</span>
                    </a>
                </section>
            </main>
            {/*             <DateTimeBar userName="Juan G. Dela Cruz" companyName="WALLEM" />
 */}        </div>
    );
};

export default Dashboard;
