// NavBar.tsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ← Changed from Link to NavLink
import "../styles/NavBar.css";
import LogoutModal from "./LogoutModal";
import { FaChevronDown } from "react-icons/fa";

const NavBar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);
    const closeMenu = () => setOpenDropdown(null);
    const toggleDropdown = (dropdown: string) => {
        setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
    };
    const navigate = useNavigate();

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
                                        to="/operations/request"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Request/Process Refund
                                    </NavLink>
                                    <NavLink
                                        to="/operations/hold"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Hold/Approve Refund
                                    </NavLink>
                                    <NavLink
                                        to="/operations/prepare-check"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Prepare Check
                                    </NavLink>
                                    <NavLink
                                        to="/operations/release"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Release (Batch Update)
                                    </NavLink>
                                    <NavLink
                                        to="/operations/import-files"
                                        className="dropdown-item"
                                        onClick={closeMenu}
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
                                        to="/reports"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Processed Refund
                                    </NavLink>
                                    <NavLink
                                        to="/reports"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Container Charges
                                    </NavLink>
                                    <NavLink
                                        to="/reports"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Check Preparation
                                    </NavLink>
                                    <NavLink
                                        to="/reports"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        For Export
                                    </NavLink>
                                    <NavLink
                                        to="/reports"
                                        className="dropdown-item"
                                        onClick={closeMenu}
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
                                        to="/help"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Help Topics
                                    </NavLink>
                                    <NavLink
                                        to="/help"
                                        className="dropdown-item"
                                        onClick={closeMenu}
                                    >
                                        Index
                                    </NavLink>
                                    <NavLink
                                        to="/help"
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