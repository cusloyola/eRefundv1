import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Inquiry.css";
import { demoRows, columns, ROWS_PER_PAGE } from "../../dummy_data/inquiryData";

const Inquiry: React.FC = () => {
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("controlNo");
    const [page, setPage] = useState(1);

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

    // Pagination page numbers (simple, can be improved for large sets)
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={"inquiry-pagination-page-button" + (i === page ? " active" : "")}
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
        <div className="inquiry-root">
            <NavBar />
            <main className="inquiry-content">
                <header className="inquiry-header">
                    <h1 className="inquiry-title flex justify-center">List of Refund</h1>
                    <p className="inquiry-subtitle flex justify-center">
                        View and search refund transactions. Use the filters below to refine your results.
                    </p>
                </header>
                <section className="inquiry-toolbar" aria-label="Search and filter">
                    <label htmlFor="searchBy" className="inquiry-label">Search By:</label>
                    <select
                        id="searchBy"
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                        className="inquiry-select"
                    >
                        {columns.map((col) => (
                            <option key={col.key} value={col.key}>
                                {col.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="inquiry-search"
                        placeholder="Type to search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search value"
                    />
                </section>
                <section className="inquiry-table-container" aria-label="Inquiry results">
                    <table className="inquiry-table">
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRows.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="inquiry-no-data">
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedRows.map((row, idx) => (
                                    <tr key={idx}>
                                        {columns.map((col) => (
                                            <td key={col.key}>{row[col.key as keyof typeof row]}</td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
                <nav className="inquiry-pagination" aria-label="Pagination">
                    <button
                        className="inquiry-pagination-button"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <div className="inquiry-pagination-page-numbers">
                        {renderPageNumbers()}
                    </div>
                    <button
                        className="inquiry-pagination-button"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </nav>
                <footer className="inquiry-footer">
                    No. of Records: <b>{filteredRows.length}</b>
                </footer>
            </main>
        </div>
    );
};

export default Inquiry;
