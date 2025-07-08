import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, onSubmit, isFiltering, onExplore }) => {
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && onSubmit) {
            onSubmit();
        }
    };

    return (
        <section className="search-section">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    placeholder="Search for an anime..."
                    className="search-input"
                    value={value}
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                />
                {!isFiltering && (
                    <button className="search-button" onClick={onSubmit}>
                        <Search color="white" size={24} />
                    </button>
                )}
            </div>
            {!isFiltering && onExplore && (
                 <div className="explore-link-wrapper">
                    <button onClick={onExplore} className="explore-link-button">
                        or explore all series!
                    </button>
                </div>
            )}
        </section>
    );
};

export default SearchBar;
