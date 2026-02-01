import React from "react";
import NavBar from "../components/NavBar";
import DateTimeBar from "../components/DateTimeBar";
import { FaFileInvoiceDollar, FaSearchDollar, FaChartBar, FaQuestionCircle } from "react-icons/fa";
import wallemLogo from "../assets/wallemrectangle.png";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
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
                    <a href="/operations/request" className="dashboard-card">
                        <FaFileInvoiceDollar className="dashboard-card-icon" />
                        <span className="dashboard-card-title">Request/Process Refund</span>
                        <span className="dashboard-card-desc">Start a new refund or process pending requests.</span>
                    </a>
                    <a href="/inquiry" className="dashboard-card">
                        <FaSearchDollar className="dashboard-card-icon" />
                        <span className="dashboard-card-title">Inquiry</span>
                        <span className="dashboard-card-desc">View the list and status of refunds.</span>
                    </a>
                    <a href="/reports" className="dashboard-card">
                        <FaChartBar className="dashboard-card-icon" />
                        <span className="dashboard-card-title">Reports</span>
                        <span className="dashboard-card-desc">Access processed refunds, container charges, and more.</span>
                    </a>
                    <a href="/help" className="dashboard-card">
                        <FaQuestionCircle className="dashboard-card-icon" />
                        <span className="dashboard-card-title">Help</span>
                        <span className="dashboard-card-desc">Browse help topics, index, and about information.</span>
                    </a>
                </section>
            </main>
            <DateTimeBar userName="Juan G. Dela Cruz" companyName="WALLEM" />
        </div>
    );
};

export default Dashboard;
