import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/ContainerCharges.css";
import {
	summaryContainerDetentionRows,
	summaryContainerDetentionColumns,
	ROWS_PER_PAGE,
} from "../../dummy_data/summaryContainerDetentionData";

const SummaryContainerDetention: React.FC = () => {
	const [search, setSearch] = useState("");
	const [searchBy, setSearchBy] = useState("controlNo");
	const [page, setPage] = useState(1);
	const [dateFrom, setDateFrom] = useState("2015-02-02");
	const [dateTo, setDateTo] = useState("2026-02-02");

	const filteredRows = summaryContainerDetentionRows.filter((row) => {
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
						"container-charges-pagination-page-button" +
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
		setDateFrom("2015-02-02");
		setDateTo("2026-02-02");
		setPage(1);
	};

	return (
		<div className="container-charges-root">
			<NavBar />
			<main className="container-charges-content">
				<header className="container-charges-header">
					<h1 className="container-charges-title">
						Summary of Container Detention
					</h1>
					<p className="container-charges-subtitle">
						View and search container detention summaries. Use the filters
						below to refine your results.
					</p>
				</header>

				<section
					className="container-charges-toolbar"
					aria-label="Search and filter"
				>
					<div className="container-charges-search-group">
						<label htmlFor="searchBy" className="container-charges-label">
							Search By:
						</label>
						<select
							id="searchBy"
							value={searchBy}
							onChange={(e) => setSearchBy(e.target.value)}
							className="container-charges-select"
						>
							{summaryContainerDetentionColumns.map((col) => (
								<option key={col.key} value={col.key}>
									{col.label}
								</option>
							))}
						</select>
						<input
							type="text"
							className="container-charges-search"
							placeholder="Type to search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							aria-label="Search value"
						/>
					</div>

					<div className="container-charges-date-group">
						<label htmlFor="dateFrom" className="container-charges-label">
							From:
						</label>
						<input
							type="date"
							id="dateFrom"
							className="container-charges-date-input"
							value={dateFrom}
							onChange={(e) => setDateFrom(e.target.value)}
						/>
						<label htmlFor="dateTo" className="container-charges-label">
							To:
						</label>
						<input
							type="date"
							id="dateTo"
							className="container-charges-date-input"
							value={dateTo}
							onChange={(e) => setDateTo(e.target.value)}
						/>
						<button
							className="container-charges-refresh-btn"
							onClick={handleRefresh}
							title="Refresh filters"
						>
							Refresh
						</button>
					</div>
				</section>

				<div className="container-charges-info-section">
					<div className="container-charges-info-card">
						<h3 className="container-charges-info-title">
							Double click to print per record
						</h3>
						<a href="/inquiry" className="container-charges-info-link">
							Go to inquiries
						</a>
					</div>
				</div>

				<section
					className="container-charges-table-container"
					aria-label="Summary of container detention results"
				>
					<table className="container-charges-table">
						<thead>
							<tr>
								{summaryContainerDetentionColumns.map((col) => (
									<th key={col.key}>{col.label}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{paginatedRows.length === 0 ? (
								<tr>
									<td
										colSpan={summaryContainerDetentionColumns.length}
										className="container-charges-no-data"
									>
										No records found.
									</td>
								</tr>
							) : (
								paginatedRows.map((row, idx) => (
									<tr key={idx}>
										{summaryContainerDetentionColumns.map((col) => (
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
					className="container-charges-pagination"
					aria-label="Pagination"
				>
					<button
						className="container-charges-pagination-button"
						onClick={() => goToPage(page - 1)}
						disabled={page === 1}
					>
						Previous
					</button>
					<div className="container-charges-pagination-page-numbers">
						{renderPageNumbers()}
					</div>
					<button
						className="container-charges-pagination-button"
						onClick={() => goToPage(page + 1)}
						disabled={page === totalPages}
					>
						Next
					</button>
				</nav>

				<footer className="container-charges-footer">
					No. of Records: <b>{filteredRows.length}</b>
				</footer>
			</main>
		</div>
	);
};

export default SummaryContainerDetention;
