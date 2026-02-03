import React, { useState } from "react";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import ConfirmationModal from "../components/ConfirmationModal";
import "../styles/ProcessedRefund.css";
import {
    holdApproveRefundRows,
    holdApproveRefundColumns,
    ROWS_PER_PAGE,
} from "../../dummy_data/holdApproveRefundData";

const HoldApproveRefund: React.FC = () => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("controlNo");
    const [page, setPage] = useState(1);
    const [dateFrom, setDateFrom] = useState("2023-02-02");
    const [dateTo, setDateTo] = useState("2026-02-02");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [modalAction, setModalAction] = useState<"back" | "forward" | null>(null);

    const filteredRows = holdApproveRefundRows.filter((row) => {
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

    const handleModalOpen = (action: "back" | "forward") => {
        setModalAction(action);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsModalClosing(false);
            setModalAction(null);
        }, 300);
    };

    const handleModalConfirm = () => {
        if (modalAction === "back") {
            toast.success("Record was successfully moved to Equipment control");
        } else if (modalAction === "forward") {
            toast.success("Record was successfully forwarded to Inquiry");
        }
        handleModalClose();
    };

    return (
        <div className="processed-refund-root">
            <NavBar />
            <main className="processed-refund-content">
                <header className="processed-refund-header">
                    <h1 className="processed-refund-title">Hold or Approve Refund</h1>
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
                            {holdApproveRefundColumns.map((col) => (
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
                        <div className="processed-refund-info-links">
                            <a href="/inquiry" className="processed-refund-info-link">
                                Go to inquiries
                            </a>
                            <a href="/hold-refund" className="processed-refund-info-link">
                                List of Hold Refund
                            </a>
                        </div>
                        <div className="processed-refund-info-actions">
                            <button 
                                className="processed-refund-info-action-btn back"
                                onClick={() => handleModalOpen("back")}
                                disabled={selectedRows.size === 0}
                            >
                                Back to Equipment
                            </button>
                            <button 
                                className="processed-refund-info-action-btn forward"
                                onClick={() => handleModalOpen("forward")}
                                disabled={selectedRows.size === 0}
                            >
                                Forward
                            </button>
                        </div>
                    </div>
                </div>

                <section
                    className="processed-refund-table-container"
                    aria-label="Hold/Approve refund results"
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
                                {holdApproveRefundColumns.map((col) => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={holdApproveRefundColumns.length + 1}
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
                                            {holdApproveRefundColumns.map((col) => (
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
                
                <ConfirmationModal
                    isOpen={isModalOpen}
                    isClosing={isModalClosing}
                    title={modalAction === "back" ? "Back to Equipment" : "Forward to Inquiry"}
                    message={
                        modalAction === "back"
                            ? "This record(s) will be forwarded back to equipment. Do you want to proceed?"
                            : "This record(s) will be forwarded to inquiry. Do you want to proceed?"
                    }
                    confirmText={modalAction === "back" ? "Go Back" : "Forward"}
                    cancelText="Cancel"
                    onConfirm={handleModalConfirm}
                    onCancel={handleModalClose}
                    variant={modalAction === "back" ? "primary" : "primary"}
                />
            </main>
        </div>
    );
};

export default HoldApproveRefund;
