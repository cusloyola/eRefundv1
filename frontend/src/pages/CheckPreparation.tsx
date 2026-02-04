import React, { useState } from "react";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import ConfirmationModal from "../components/ConfirmationModal";
import "../styles/ProcessedRefund.css";
import {
    prepareCheckRows,
    prepareCheckColumns,
    ROWS_PER_PAGE,
} from "../../dummy_data/prepareCheckData";

const CheckPreparation: React.FC = () => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("controlNo");
    const [page, setPage] = useState(1);
    const [dateFrom, setDateFrom] = useState("2023-02-02");
    const [dateTo, setDateTo] = useState("2026-02-02");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);

    const filteredRows = prepareCheckRows.filter((row) => {
        if (!search) return true;
        const value = row[searchBy as keyof typeof row] || "";
        return value.toLowerCase().includes(search.toLowerCase());
    });

    // Calculate total amount refunded from filtered rows
    const totalAmountRefunded = filteredRows.reduce((sum, row) => {
        const amount = parseFloat(row.amountRefunded.replace(/,/g, ""));
        return sum + amount;
    }, 0);

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

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsModalClosing(false);
        }, 300);
    };

    const handleModalConfirm = () => {
        toast.success("Record was successfully forwarded for export");
        handleModalClose();
    };

    return (
        <div className="processed-refund-root">
            <NavBar />
            <main className="processed-refund-content">
                <header className="processed-refund-header">
                    <h1 className="processed-refund-title">Check Preparation</h1>
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
                            {prepareCheckColumns.map((col) => (
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
                        <a href="/inquiry" className="processed-refund-info-link">
                            Go to Inquiries
                        </a>
                        <button
                            className="processed-refund-info-action-btn forward"
                            onClick={handleModalOpen}
                            disabled={selectedRows.size === 0}
                        >
                            For Export
                        </button>
                    </div>
                </div>

                <section
                    className="processed-refund-table-container"
                    aria-label="Check preparation results"
                >
                    <table className="processed-refund-table">
                        <thead>
                            <tr>
                                <th className="processed-refund-checkbox-col">
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
                                {prepareCheckColumns.map((col) => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={prepareCheckColumns.length + 1}
                                        className="processed-refund-no-data"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedRows.map((row, idx) => {
                                    const globalIndex = (page - 1) * ROWS_PER_PAGE + idx;
                                    const isSelected = selectedRows.has(globalIndex);
                                    return (
                                        <tr key={idx} className={isSelected ? "selected" : ""}>
                                            <td className="processed-refund-checkbox-col">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleRowSelection(globalIndex)}
                                                />
                                            </td>
                                            {prepareCheckColumns.map((col) => (
                                                <td key={col.key}>
                                                    {row[col.key as keyof typeof row]}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
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


                <footer className="inquiry-footer">
                    Total Amount Refunded: <b>{totalAmountRefunded.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
                </footer>
            </main>
            <ConfirmationModal
                isOpen={isModalOpen}
                isClosing={isModalClosing}
                title="Forward for Export"
                message="This record(s) will be forwarded for export. Do you want to proceed?"
                confirmText="Forward"
                cancelText="Cancel"
                onConfirm={handleModalConfirm}
                onCancel={handleModalClose}
                variant="primary"
            />
        </div>
    );
};

export default CheckPreparation;
