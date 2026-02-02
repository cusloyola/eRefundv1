import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import "../styles/UserAccount.css";
import { demoUserAccounts, columns, ROWS_PER_PAGE } from "../../dummy_data/userAccountData";
import { FaPlus } from "react-icons/fa";

const UserAccount: React.FC = () => {
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("empId");
    const [page, setPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddModalClosing, setIsAddModalClosing] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditModalClosing, setIsEditModalClosing] = useState(false);
    const [formData, setFormData] = useState({
        empId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        accessLevel: "Accounting",
    });

    const filteredRows = demoUserAccounts.filter((row) => {
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

    // Modal handlers
    const openAddModal = () => {
        setIsAddModalOpen(true);
        setIsAddModalClosing(false);
    };

    const closeAddModal = () => {
        setIsAddModalClosing(true);
        setTimeout(() => {
            setIsAddModalOpen(false);
            setIsAddModalClosing(false);
            setFormData({
                empId: "",
                firstName: "",
                middleName: "",
                lastName: "",
                username: "",
                password: "",
                confirmPassword: "",
                accessLevel: "Accounting",
            });
        }, 300);
    };

    const handleAddChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const handleSaveNewUser = () => {
        // Validation is now handled in AddUserModal
        // This is called after successful validation and API call
        closeAddModal();
    };
    const openEditModal = (row: typeof demoUserAccounts[0]) => {
        setFormData({
            empId: row.empId,
            firstName: row.employeeName.split(' ')[0] || '',
            middleName: row.employeeName.split(' ').slice(1, -1).join(' ') || '',
            lastName: row.employeeName.split(' ').pop() || '',
            username: row.username,
            password: '',
            confirmPassword: '',
            accessLevel: row.accessLevel,
        });
        setIsEditModalOpen(true);
        setIsEditModalClosing(false);
    };

    const closeEditModal = () => {
        setIsEditModalClosing(true);
        setTimeout(() => {
            setIsEditModalOpen(false);
            setIsEditModalClosing(false);
            setFormData({
                empId: "",
                firstName: "",
                middleName: "",
                lastName: "",
                username: "",
                password: "",
                confirmPassword: "",
                accessLevel: "Accounting",
            });
        }, 300);
    };

    const handleSaveEditUser = () => {
        // Validation is now handled in EditUserModal
        // This is called after successful validation and API call
        closeEditModal();
    };

    // 

    // Pagination page numbers
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={"user-account-pagination-page-button" + (i === page ? " active" : "")}
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
        <div className="user-account-root">
            <NavBar />
            {/* Backdrop for add modal - only render when modal is open */}
            {isAddModalOpen && (
                <div
                    className={`add-user-modal-backdrop ${isAddModalClosing ? 'closing' : ''}`}
                    onClick={() => !isAddModalClosing && closeAddModal()}
                />
            )}
            {/* Add User Modal */}
            <AddUserModal
                isOpen={isAddModalOpen}
                isClosing={isAddModalClosing}
                formData={formData}
                onClose={closeAddModal}
                onChange={handleAddChange}
                onSave={handleSaveNewUser}
            />
            {/* Backdrop for edit modal - only render when modal is open */}
            {isEditModalOpen && (
                <div
                    className={`add-user-modal-backdrop ${isEditModalClosing ? 'closing' : ''}`}
                    onClick={() => !isEditModalClosing && closeEditModal()}
                />
            )}
            {/* Edit User Modal */}
            <EditUserModal
                isOpen={isEditModalOpen}
                isClosing={isEditModalClosing}
                formData={formData}
                onClose={closeEditModal}
                onChange={handleAddChange}
                onSave={handleSaveEditUser}
            />
            <main className="user-account-content">
                <header className="user-account-header">
                    <h1 className="user-account-title">User Account</h1>
                    <p className="user-account-subtitle">
                        Manage user accounts and access levels. Search, add, update, or delete user information.
                    </p>
                </header>
                <section className="user-account-toolbar" aria-label="Search and filter">
                    <label htmlFor="searchBy" className="user-account-label">Search By:</label>
                    <select
                        id="searchBy"
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                        className="user-account-select"
                    >
                        {columns.map((col) => (
                            <option key={col.key} value={col.key}>
                                {col.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="user-account-search"
                        placeholder="Type to search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search value"
                    />
                    <button className="user-account-refresh-btn" onClick={() => setSearch("")}>
                        Refresh
                    </button>
                    <button className="user-account-add-btn" onClick={openAddModal}>
                        <FaPlus /> Add
                    </button>
                </section>
                <section className="user-account-table-container" aria-label="User account results">
                    <table className="user-account-table">
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
                                    <td colSpan={columns.length} className="user-account-no-data">
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedRows.map((row, idx) => (
                                    <tr key={idx} onClick={() => openEditModal(row)} style={{ cursor: 'pointer' }}>
                                        {columns.map((col) => (
                                            <td key={col.key}>{row[col.key as keyof typeof row]}</td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>

                <nav className="user-account-pagination" aria-label="Pagination">
                    <button
                        className="user-account-pagination-button"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <div className="user-account-pagination-page-numbers">
                        {renderPageNumbers()}
                    </div>
                    <button
                        className="user-account-pagination-button"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </nav>
                <footer className="user-account-footer">
                    No. of Records: <b>{filteredRows.length}</b>
                </footer>

                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </main>
        </div>
    );
};

export default UserAccount;
