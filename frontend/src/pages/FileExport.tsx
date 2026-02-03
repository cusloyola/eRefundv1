import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/FileExport.css";
import { demoRows, columns, ROWS_PER_PAGE } from "../../dummy_data/fileExportData";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileExport: React.FC = () => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("controlNo");
    const [page, setPage] = useState(1);
    const [bank, setBank] = useState("BDO");

    const filteredRows = demoRows.filter((row) => {
        if (!search) return true;
        const value = row[searchBy as keyof typeof row] || "";
        return value.toLowerCase().includes(search.toLowerCase());
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredRows.length / ROWS_PER_PAGE) || 1;
    const paginatedRows = filteredRows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    // Handle page change
    const goToPage = (p: number) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
    };

    // Reset to page 1 on search/filter change
    React.useEffect(() => {
        setPage(1);
    }, [search, searchBy]);

    // Toggle row selection
    const toggleRowSelection = (index: number) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelectedRows(newSelected);
    };

    // Select all rows on current page
    const toggleSelectAll = () => {
        if (selectedRows.size === paginatedRows.length) {
            setSelectedRows(new Set());
        } else {
            const allIndices = new Set(
                paginatedRows.map((_, idx) => (page - 1) * ROWS_PER_PAGE + idx)
            );
            setSelectedRows(allIndices);
        }
    };

    // Handle export
    const handleExport = () => {
        if (selectedRows.size === 0) {
            return;
        }
        // Show success toast
        toast.success('Export successful!');
        // Clear selection after export
        setSelectedRows(new Set());
    };

    const totalAmountRefunded = filteredRows.reduce((sum, row) => {
        const amount = parseFloat(row.amountRefunded.replace(/,/g, ""));
        return sum + amount;
    }, 0);

    // Pagination page numbers
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={"fileexport-pagination-page-button" + (i === page ? " active" : "")}
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
        <div className="fileexport-root">
            <NavBar />
            <main className="fileexport-content">
                <header className="fileexport-header">
                    <h1 className="fileexport-title flex justify-center">File Export</h1>
                </header>
                <section className="fileexport-controls" aria-label="Search and filter">
                    <div className="fileexport-search-section">
                        <label htmlFor="searchBy" className="fileexport-label">Search By:</label>
                        <select
                            id="searchBy"
                            value={searchBy}
                            onChange={(e) => setSearchBy(e.target.value)}
                            className="fileexport-select"
                        >
                            {columns.map((col) => (
                                <option key={col.key} value={col.key}>
                                    {col.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="fileexport-search"
                            placeholder="Type to search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search value"
                        />
                    </div>
                    <div className="fileexport-controls-right">
                        <div className="fileexport-refresh-section">
                            <button className="fileexport-refresh-btn">Refresh</button>
                        </div>
                        <div className="fileexport-date-section">
                            <label htmlFor="fromDate" className="fileexport-date-label">From:</label>
                            <input
                                id="fromDate"
                                type="date"
                                className="fileexport-date-input"
                                defaultValue="2026-03-02"
                            />
                            <label htmlFor="toDate" className="fileexport-date-label">To:</label>
                            <input
                                id="toDate"
                                type="date"
                                className="fileexport-date-input"
                                defaultValue="2026-03-02"
                            />
                        </div>
                    </div>
                </section>
                <section className="fileexport-bank-selection">
                    <div className="fileexport-bank-left">
                        <label className="fileexport-bank-label">Choose Bank:</label>
                        <div className="fileexport-bank-options">
                            <label className="fileexport-radio-label">
                                <input
                                    type="radio"
                                    name="bank"
                                    value="BDO"
                                    checked={bank === "BDO"}
                                    onChange={(e) => setBank(e.target.value)}
                                />
                                BDO
                            </label>
                            <label className="fileexport-radio-label">
                                <input
                                    type="radio"
                                    name="bank"
                                    value="BPI"
                                    checked={bank === "BPI"}
                                    onChange={(e) => setBank(e.target.value)}
                                />
                                BPI
                            </label>
                            <label className="fileexport-radio-label">
                                <input
                                    type="radio"
                                    name="bank"
                                    value="PNB"
                                    checked={bank === "PNB"}
                                    onChange={(e) => setBank(e.target.value)}
                                />
                                PNB
                            </label>
                        </div>
                    </div>
                    <div className="fileexport-bank-right">
                        <div className="fileexport-total-amount">
                            Total Amount Refunded: <b>{totalAmountRefunded.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
                        </div>
                        <button
                            className="fileexport-export-btn"
                            onClick={handleExport}
                            disabled={selectedRows.size === 0}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Export
                        </button>
                    </div>
                </section>
                <section className="fileexport-table-container" aria-label="File export data">
                    <table className="fileexport-table">
                        <thead>
                            <tr>
                                <th className="fileexport-checkbox-col">
                                    <input
                                        type="checkbox"
                                        checked={
                                            paginatedRows.length > 0 &&
                                            selectedRows.size === paginatedRows.length
                                        }
                                        onChange={toggleSelectAll}
                                        aria-label="Select all rows"
                                    />
                                </th>
                                {columns.map((col) => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRows.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1} className="fileexport-no-data">
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedRows.map((row, idx) => {
                                    const globalIndex = (page - 1) * ROWS_PER_PAGE + idx;
                                    const isSelected = selectedRows.has(globalIndex);
                                    return (
                                        <tr key={idx} className={isSelected ? "selected" : ""}>
                                            <td className="fileexport-checkbox-col">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleRowSelection(globalIndex)}
                                                />
                                            </td>
                                            {columns.map((col) => (
                                                <td key={col.key}>{row[col.key as keyof typeof row]}</td>
                                            ))}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </section>
                <nav className="fileexport-pagination" aria-label="Pagination">
                    <button
                        className="fileexport-pagination-button"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <div className="fileexport-pagination-page-numbers">
                        {renderPageNumbers()}
                    </div>
                    <button
                        className="fileexport-pagination-button"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </nav>
            </main>
        </div>
    );
};

export default FileExport;