import React from 'react';
import './Footer.css';

const Footer = () => {
    const categories = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Sci-Fi', 'Slice of Life'];

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-categories">
                    <h3 className="footer-heading">Explore more categories!</h3>
                    <ul className="category-list">
                        {categories.map(category => (
                            <li key={category}><a href="#" className="category-link">{category}</a></li>
                        ))}
                    </ul>
                </div>
                <div className="footer-copyright">
                    <p>&copy; 2025 AnimeVerse. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
