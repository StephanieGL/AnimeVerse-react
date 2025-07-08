import React from 'react';
import { Star } from 'lucide-react';
import './NavBar.css';

const Navbar = ({ navigate }) => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    <div className="navbar-logo" onClick={() => navigate('home')}>
                        <Star size={32} color="#f87171" fill="#f87171" />
                        <span className="navbar-logo-text">AnimeVerse</span>
                    </div>
                    <ul className="navbar-links">
                        {/* Using buttons for navigation to work with our state-based router */}
                        <li><button onClick={() => navigate('browse')}>Browse</button></li>
                        <li><button>Manga</button></li>
                        <li><button>Games</button></li>
                        <li><button>News</button></li>
                    </ul>
                </div>
                <div className="navbar-right">
                    {/* Placeholder for future features */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
