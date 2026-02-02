import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Logs.css";
import { demoUserAccounts } from "../../dummy_data/userAccountData";

const ROWS_PER_PAGE = 5;

interface LogEntry {
    user: string;
    activity: string;
    date: string;
    time: string;
}

// Generate dummy log data
const generateDemoLogs = (): LogEntry[] => {
    const activities = [
        "Logged-on to the System",
        "Generated a container charges memo",
        "Updated user account",
        "Processed refund request",
        "Generated report",
        "Exported data",
        "Imported file",
    ];

    const logs: LogEntry[] = [];
    const now = new Date();

    // Generate logs for the past day
    for (let i = 0; i < 25; i++) {
        const randomUser = demoUserAccounts[Math.floor(Math.random() * demoUserAccounts.length)];
        const timeOffset = Math.floor(Math.random() * 1440); // Random time within 24 hours
        const logTime = new Date(now.getTime() - timeOffset * 60000);
        
        logs.push({
            user: randomUser.employeeName,
            activity: activities[Math.floor(Math.random() * activities.length)],
            date: logTime.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
            time: logTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        });
    }

    // Sort by date and time (descending)
    return logs.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB.getTime() - dateA.getTime();
    });
};

const Logs: React.FC = () => {
    const [filterType, setFilterType] = useState("all");
    const [selectedUser, setSelectedUser] = useState("all");
    const [fromDate, setFromDate] = useState("02/02/2026");
    const [toDate, setToDate] = useState("02/02/2026");
    const [page, setPage] = useState(1);
    
    const demoLogs = generateDemoLogs();

    const filteredLogs = demoLogs.filter((log) => {
        if (filterType === "per" && selectedUser !== "all") {
            return log.user === selectedUser;
        }
        return true;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredLogs.length / ROWS_PER_PAGE) || 1;
    const paginatedLogs = filteredLogs.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    // Handle page change
    const goToPage = (p: number) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
    };

    // Reset to page 1 on filter change
    React.useEffect(() => {
        setPage(1);
    }, [filterType, selectedUser]);

    // Render page numbers
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={"logs-pagination-page-button" + (i === page ? " active" : "")}
                    onClick={() => goToPage(i)}
                    disabled={i === page}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="logs-root">
            <NavBar />
            <main className="logs-content">
                <header className="logs-header">
                    <h1 className="logs-title">Logs</h1>
                    <p className="logs-subtitle">
                        View system activity and user actions. Filter by user or date range.
                    </p>
                </header>

                <section className="logs-toolbar" aria-label="Filter and search">
                    <div className="logs-filter-group">
                        <label className="logs-radio-label">
                            <input
                                type="radio"
                                name="filterType"
                                value="all"
                                checked={filterType === "all"}
                                onChange={(e) => setFilterType(e.target.value)}
                            />
                            All Users
                        </label>
                        <label className="logs-radio-label">
                            <input
                                type="radio"
                                name="filterType"
                                value="per"
                                checked={filterType === "per"}
                                onChange={(e) => setFilterType(e.target.value)}
                            />
                            Per User
                        </label>
                        {filterType === "per" && (
                            <select
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                className="logs-select"
                            >
                                <option value="all">Select User</option>
                                {demoUserAccounts.map((user) => (
                                    <option key={user.empId} value={user.employeeName}>
                                        {user.employeeName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="logs-date-group">
                        <div className="logs-date-field">
                            <label htmlFor="fromDate" className="logs-label">From:</label>
                            <input
                                id="fromDate"
                                type="date"
                                value={fromDate.split('/').reverse().join('-')}
                                onChange={(e) => {
                                    const parts = e.target.value.split('-');
                                    setFromDate(`${parts[2]}/${parts[1]}/${parts[0]}`);
                                }}
                                className="logs-date-input"
                            />
                        </div>
                        <div className="logs-date-field">
                            <label htmlFor="toDate" className="logs-label">To:</label>
                            <input
                                id="toDate"
                                type="date"
                                value={toDate.split('/').reverse().join('-')}
                                onChange={(e) => {
                                    const parts = e.target.value.split('-');
                                    setToDate(`${parts[2]}/${parts[1]}/${parts[0]}`);
                                }}
                                className="logs-date-input"
                            />
                        </div>
                    </div>

                    <button className="logs-refresh-btn" onClick={() => window.location.reload()}>
                        Refresh
                    </button>
                </section>

                <section className="logs-table-container" aria-label="Activity logs">
                    <table className="logs-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Activity</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="logs-no-data">
                                        No logs found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedLogs.map((log, idx) => (
                                    <tr key={idx}>
                                        <td>{log.user}</td>
                                        <td>{log.activity}</td>
                                        <td>{log.date}</td>
                                        <td>{log.time}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>

                <nav className="logs-pagination" aria-label="Pagination">
                    <button
                        className="logs-pagination-button"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <div className="logs-pagination-page-numbers">
                        {renderPageNumbers()}
                    </div>
                    <button
                        className="logs-pagination-button"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </nav>

                <footer className="logs-footer">
                    No. of Records: <b>{filteredLogs.length}</b>
                </footer>
            </main>
        </div>
    );
};

export default Logs;
