import React from 'react';
import { Star } from 'lucide-react'; // Import the Star icon
import './Header.css'; 

const Logo = () => (
    <div className="logo-container">
        <div className="logo">
            <Star size={50} color="#f87171" fill="#f87171" />
            <h1 className="logo-text">AnimeVerse</h1>
        </div>
        <p className="logo-description">Your gateway to the world of anime.</p>
    </div>
);

const Header = () => (
    <header className="header">
        <Logo />
    </header>
);

export default Header;
