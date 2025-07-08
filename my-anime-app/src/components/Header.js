import React from 'react';
import { Star } from 'lucide-react'; // Import the Star icon
import './Header.css'; // Import component-specific styles

// Logo Component nested within Header
const Logo = () => (
    <div className="logo-container">
        <div className="logo">
            {/* Replaced the SVG with the Star icon */}
            <Star size={50} color="#f87171" fill="#f87171" />
            <h1 className="logo-text">AnimeVerse</h1>
        </div>
        {/* Added the description */}
        <p className="logo-description">Your gateway to the world of anime.</p>
    </div>
);

// Header Component
const Header = () => (
    <header className="header">
        <Logo />
    </header>
);

export default Header;
