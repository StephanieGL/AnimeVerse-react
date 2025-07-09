import React, { useState } from 'react';
import { Star, Menu, X } from 'lucide-react'; 
import './NavBar.css';

const Navbar = ({ navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = (page) => {
        navigate(page);
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-left">
                        <div className="navbar-logo" onClick={() => handleLinkClick('home')}>
                            <Star size={32} color="#f87171" fill="#f87171" />
                            <span className="navbar-logo-text">AnimeVerse</span>
                        </div>
                        <ul className="navbar-links-desktop">
                            <li><button onClick={() => handleLinkClick('browse')}>Browse</button></li>
                            <li><button>Manga</button></li>
                            <li><button>Games</button></li>
                            <li><button>News</button></li>
                        </ul>
                    </div>
                    <div className="navbar-right">
                        <button className="mobile-menu-button" onClick={toggleMenu}>
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <span className="sidebar-title">Menu</span>
                    <button onClick={toggleMenu} className="sidebar-close-button">
                        <X size={28} />
                    </button>
                </div>
                <ul className="sidebar-links">
                    <li><button onClick={() => handleLinkClick('browse')}>Browse</button></li>
                    <li><button>Manga</button></li>
                    <li><button>Games</button></li>
                    <li><button>News</button></li>
                </ul>
            </div>
            {isMenuOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}
        </>
    );
};

export default Navbar;
