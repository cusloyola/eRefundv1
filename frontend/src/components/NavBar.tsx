// NavBar.tsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // ← Changed from Link to NavLink
import "../styles/NavBar.css";

// Optional: Use react-icons (npm install react-icons)
import { FiMenu, FiX } from "react-icons/fi";

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/dashboard" className="navbar-logo" onClick={closeMenu}>
                    eRefund
                </NavLink>

                {/* Desktop links */}
                <div className="navbar-links desktop-links">
                    <NavLink
                        to="/operations"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        Operations
                    </NavLink>

                    <NavLink
                        to="/inquiry"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        Inquiry
                    </NavLink>

                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        Reports
                    </NavLink>

                    <NavLink
                        to="/help"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        Help
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        Logout
                    </NavLink>
                </div>

                {/* Hamburger button - visible on mobile/tablet */}
                <button
                    className="hamburger"
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>

            {/* Mobile menu (slides in / dropdown) */}
            <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
                <div className="mobile-links">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        Profile
                    </NavLink>

                    <NavLink
                        to="/logout"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        Logout
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;