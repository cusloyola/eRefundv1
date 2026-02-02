import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/ProcessedRefund.css";
import {
    processedRefundRows,
    processedRefundColumns,
    ROWS_PER_PAGE,
} from "../../dummy_data/processedRefundData";

const ProcessedRefund: React.FC = () => {
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("controlNo");
    const [page, setPage] = useState(1);
    const [dateFrom, setDateFrom] = useState("2023-02-02");
    const [dateTo, setDateTo] = useState("2026-02-02");

    const filteredRows = processedRefundRows.filter((row) => {
        if (!search) return true;
        const value = row[searchBy as keyof typeof row] || "";
        return value.toLowerCase().includes(search.toLowerCase());
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredRows.length / ROWS_PER_PAGE) || 1;
    const paginatedRows = filteredRows.slice(
        (page - 1) * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );

    // Handle page change
    const goToPage = (p: number) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
    };

    // Reset to page 1 on search/filter change
    React.useEffect(() => {
        setPage(1);
    }, [search, searchBy]);

    // Pagination page numbers
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={
                        "processed-refund-pagination-page-button" +
                        (i === page ? " active" : "")
                    }
                    onClick={() => goToPage(i)}
                    disabled={i === page}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    const handleRefresh = () => {
        setSearch("");
        setSearchBy("controlNo");
        setDateFrom("2023-02-02");
        setDateTo("2026-02-02");
        setPage(1);
    };


    return (
        <div className="processed-refund-root">
            <NavBar />
            <main className="processed-refund-content">
                <header className="processed-refund-header">
                    <h1 className="processed-refund-title">Processed Refund</h1>
                    <p className="processed-refund-subtitle">
                        View and search processed refund transactions. Use the filters
                        below to refine your results.
                    </p>
                </header>

                <section
                    className="processed-refund-toolbar"
                    aria-label="Search and filter"
                >
                    <div className="processed-refund-search-group">
                        <label htmlFor="searchBy" className="processed-refund-label">
                            Search By:
                        </label>
                        <select
                            id="searchBy"
                            value={searchBy}
                            onChange={(e) => setSearchBy(e.target.value)}
                            className="processed-refund-select"
                        >
                            {processedRefundColumns.map((col) => (
                                <option key={col.key} value={col.key}>
                                    {col.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="processed-refund-search"
                            placeholder="Type to search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search value"
                        />
                    </div>

                    <div className="processed-refund-date-group">
                        <label htmlFor="dateFrom" className="processed-refund-label">
                            From:
                        </label>
                        <input
                            type="date"
                            id="dateFrom"
                            className="processed-refund-date-input"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                        <label htmlFor="dateTo" className="processed-refund-label">
                            To:
                        </label>
                        <input
                            type="date"
                            id="dateTo"
                            className="processed-refund-date-input"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                        <button
                            className="processed-refund-refresh-btn"
                            onClick={handleRefresh}
                            title="Refresh filters"
                        >
                            Refresh
                        </button>
                    </div>
                </section>

                <div className="processed-refund-info-section">
                    <div className="processed-refund-info-card">
                        <h3 className="processed-refund-info-title">
                            Credit and Collection
                        </h3>
                        <a href="/inquiry" className="processed-refund-info-link">
                            Go to inquiries
                        </a>
                    </div>
                </div>

                <section
                    className="processed-refund-table-container"
                    aria-label="Processed refund results"
                >
                    <table className="processed-refund-table">
                        <thead>
                            <tr>
                                {processedRefundColumns.map((col) => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={processedRefundColumns.length}
                                        className="processed-refund-no-data"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedRows.map((row, idx) => (
                                    <tr key={idx}>
                                        {processedRefundColumns.map((col) => (
                                            <td key={col.key}>
                                                {row[col.key as keyof typeof row]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>

                <nav
                    className="processed-refund-pagination"
                    aria-label="Pagination"
                >
                    <button
                        className="processed-refund-pagination-button"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <div className="processed-refund-pagination-page-numbers">
                        {renderPageNumbers()}
                    </div>
                    <button
                        className="processed-refund-pagination-button"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </nav>

                <footer className="processed-refund-footer">
                    No. of Records: <b>{filteredRows.length}</b>
                </footer>
            </main>
        </div>
    );
};

export default ProcessedRefund;
