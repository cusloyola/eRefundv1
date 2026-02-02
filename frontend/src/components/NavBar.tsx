// NavBar.tsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ← Changed from Link to NavLink
import "../styles/NavBar.css";
import LogoutModal from "./LogoutModal";
import { FaChevronDown } from "react-icons/fa";
import { useUserRole } from "../hooks/useUserRole";

const NavBar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);
    const closeMenu = () => setOpenDropdown(null);
    const toggleDropdown = (dropdown: string) => {
        setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
    };
    const navigate = useNavigate();

    // Get user role from localStorage
    const { isAccountingRole, isAdminRole, isCreditAndCollection } = useUserRole();


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    return (
        <>
            <nav className="navbar" ref={navbarRef}>
                <div className="navbar-container">
                    <NavLink to="/dashboard" className="navbar-logo" onClick={closeMenu}>
                        eRefund
                    </NavLink>

                    {/* Desktop links */}
                    <div className="navbar-links desktop-links">
                        <div className="navbar-dropdown">
                            <button
                                className="navbar-link dropdown-toggle"
                                onClick={() => toggleDropdown('operations')}
                                aria-expanded={openDropdown === 'operations'}
                            >
                                Operations <FaChevronDown className="dropdown-icon" />
                            </button>
                            {openDropdown === 'operations' && (
                                <div className="dropdown-menu">
                                    <NavLink
                                        to="/operations/request-process-refund"
                                        className={`dropdown-item${isCreditAndCollection ? ' disabled' : ''}`}
                                        onClick={(e) => {
                                            if (isCreditAndCollection) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        Request/Process Refund
                                    </NavLink>
                                    <NavLink
                                        to="/operations/hold"
                                        className={`dropdown-item${isAccountingRole || isAdminRole || isCreditAndCollection ? '' : ' disabled'}`}
                                        onClick={(e) => {
                                            if (!isAccountingRole && !isAdminRole && !isCreditAndCollection) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        Hold/Approve Refund
                                    </NavLink>
                                    <NavLink
                                        to="/operations/prepare-check"
                                        className={`dropdown-item${isAccountingRole || isAdminRole ? '' : ' disabled'}`}
                                        onClick={(e) => {
                                            if (!isAccountingRole && !isAdminRole) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        Prepare Check
                                    </NavLink>
                                    <NavLink
                                        to="/operations/release"
                                        className={`dropdown-item${isAccountingRole || isAdminRole ? '' : ' disabled'}`}
                                        onClick={(e) => {
                                            if (!isAccountingRole && !isAdminRole) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        Release (Batch Update)
                                    </NavLink>
                                    <NavLink
                                        to="/operations/import-files"
                                        className={`dropdown-item${isAccountingRole || isAdminRole ? '' : ' disabled'}`}
                                        onClick={(e) => {
                                            if (!isAccountingRole && !isAdminRole) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        Import Files for Update
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="navbar-dropdown">
                            <button
                                className="navbar-link dropdown-toggle"
                                onClick={() => toggleDropdown('inquiry')}
                                aria-expanded={openDropdown === 'inquiry'}
                            >
                                Inquiry <FaChevronDown className="dropdown-icon" />
                            </button>
                            {openDropdown === 'inquiry' && (
                                <div className="dropdown-menu">
                                    <NavLink
                                        to="/inquiry"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        List of Refund
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="navbar-dropdown">
                            <button
                                className="navbar-link dropdown-toggle"
                                onClick={() => toggleDropdown('reports')}
                                aria-expanded={openDropdown === 'reports'}
                            >
                                Reports <FaChevronDown className="dropdown-icon" />
                            </button>
                            {openDropdown === 'reports' && (
                                <div className="dropdown-menu">
                                    <NavLink
                                        to="/reports/processed-refund"
                                        className={`dropdown-item${isCreditAndCollection ? ' disabled' : ''}`}
                                        onClick={(e) => {
                                            if (isCreditAndCollection) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        Processed Refund
                                    </NavLink>
                                    <NavLink
                                        to="/reports/container-charges"
                                        className={`dropdown-item${isCreditAndCollection ? ' disabled' : ''}`}
                                        onClick={(e) => {
                                            if (isCreditAndCollection) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        Container Charges
                                    </NavLink>
                                    <NavLink
                                        to="/reports/check-preparation"
                                        className={`dropdown-item${isAccountingRole || isAdminRole || isCreditAndCollection ? '' : ' disabled'}`}
                                        onClick={(e) => {
                                            if (!isAccountingRole && !isAdminRole && !isCreditAndCollection) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        Check Preparation
                                    </NavLink>
                                    <NavLink
                                        to="/reports/for-export"
                                        className={`dropdown-item${isAccountingRole ? '' : ' disabled'}`}
                                        onClick={(e) => {
                                            if (!isAccountingRole) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        For Export
                                    </NavLink>
                                    <NavLink
                                        to="/reports/summary-container-detention"
                                        className={`dropdown-item${isCreditAndCollection ? ' disabled' : ''}`}
                                        onClick={(e) => {
                                            if (isCreditAndCollection) e.preventDefault();
                                            else closeMenu();
                                        }}
                                    >
                                        Summary of Container Detention
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="navbar-dropdown">
                            <button
                                className="navbar-link dropdown-toggle"
                                onClick={() => toggleDropdown('help')}
                                aria-expanded={openDropdown === 'help'}
                            >
                                Help <FaChevronDown className="dropdown-icon" />
                            </button>
                            {openDropdown === 'help' && (
                                <div className="dropdown-menu">
                                    <NavLink
                                        to="/help/topics"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Help Topics
                                    </NavLink>
                                    <NavLink
                                        to="/help/index"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Index
                                    </NavLink>
                                    <NavLink
                                        to="/help/about"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        About
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            className="navbar-link"
                            onClick={() => {
                                setIsLogoutModalOpen(true);
                                closeMenu();
                            }}
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </nav>
            <LogoutModal isOpen={isLogoutModalOpen} onConfirm={handleLogout} onCancel={() => setIsLogoutModalOpen(false)}
            />
        </>
    );
};

export default NavBar;