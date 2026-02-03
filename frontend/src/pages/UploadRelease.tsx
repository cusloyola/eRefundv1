import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import "../styles/ProcessedRefund.css";
import "../styles/UploadRelease.css";
import {
	uploadReleaseColumns,
	uploadReleaseRows,
  ROWS_PER_PAGE,
} from "../../dummy_data/uploadReleaseData";

const UploadRelease: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState("No file chosen");
	const [page, setPage] = useState(1);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const totalPages = Math.ceil(uploadReleaseRows.length / ROWS_PER_PAGE) || 1;
	const paginatedRows = uploadReleaseRows.slice(
		(page - 1) * ROWS_PER_PAGE,
		page * ROWS_PER_PAGE
	);

	const goToPage = (p: number) => {
		if (p < 1 || p > totalPages) return;
		setPage(p);
	};

	const renderPageNumbers = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<button
					key={i}
					className={"processed-refund-pagination-page-button" + (i === page ? " active" : "")}
					onClick={() => goToPage(i)}
					disabled={i === page}
				>
					{i}
				</button>
			);
		}
		return pages;
	};

	const handleChooseFile = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		setSelectedFile(file);
		setFileName(file ? file.name : "No file chosen");
	};

	const handleImport = () => {
		if (!selectedFile) return;
		toast.success("File imported successfully");
	};

	return (
		<div className="processed-refund-root">
			<NavBar />
			<main className="processed-refund-content">
				<header className="processed-refund-header">
					<h1 className="processed-refund-title">Upload Release</h1>
					<p className="processed-refund-subtitle">List of Records</p>
				</header>

				<section className="upload-release-upload-card">
					<div className="upload-release-upload-text">
						<h2 className="upload-release-upload-title">Import File</h2>
						<p className="upload-release-upload-desc">
							Upload a release file to populate the records list.
						</p>
					</div>
					<div className="upload-release-upload-actions">
						<input
							ref={fileInputRef}
							type="file"
							className="upload-release-file-input"
							onChange={handleFileChange}
							accept=".csv,.xlsx,.xls"
						/>
						<button
							type="button"
							className="upload-release-btn secondary"
							onClick={handleChooseFile}
						>
							Choose File
						</button>
						<span className="upload-release-file-name">{fileName}</span>
						<button
							type="button"
							className="upload-release-btn primary"
							onClick={handleImport}
							disabled={!selectedFile}
						>
							Import
						</button>
					</div>
				</section>

				<section
					className="processed-refund-table-container"
					aria-label="Upload release records"
				>
					<table className="processed-refund-table">
						<thead>
							<tr>
								{uploadReleaseColumns.map((col) => (
									<th key={col.key}>{col.label}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{paginatedRows.length === 0 ? (
								<tr>
									<td
										colSpan={uploadReleaseColumns.length}
										className="processed-refund-no-data"
									>
										No records found.
									</td>
								</tr>
							) : (
								paginatedRows.map((row, idx) => (
									<tr key={idx}>
										{uploadReleaseColumns.map((col) => (
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

				<nav className="processed-refund-pagination" aria-label="Pagination">
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

				<footer className="upload-release-footer">
					<div className="upload-release-records">
						No. of Records: <b>{uploadReleaseRows.length}</b>
					</div>
				</footer>
			</main>
		</div>
	);
};

export default UploadRelease;
