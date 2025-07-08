import React, { useState } from 'react';
import './App.css';
import Navbar from './components/NavBar';
import HomePage from './Pages/HomePage';
import BrowsePage from './Pages/BrowsePage';
import DetailsPage from './Pages/DetailsPage';
import Footer from './components/Footer';
import StarAnimation from './components/StarAnimation';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAnimeId, setSelectedAnimeId] = useState(null);

    const navigate = (page, id = null) => {
        setCurrentPage(page);
        setSelectedAnimeId(id);
        if (page !== 'browse') {
            setSearchQuery('');
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage('browse');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onSearch={handleSearch} onCardClick={(id) => navigate('details', id)} />;
            case 'browse':
                return <BrowsePage initialQuery={searchQuery} onCardClick={(id) => navigate('details', id)} />;
            case 'details':
                return <DetailsPage key={selectedAnimeId} animeId={selectedAnimeId} onCardClick={(id) => navigate('details', id)} onBack={() => navigate('browse')} />;
            default:
                return <HomePage onSearch={handleSearch} onCardClick={(id) => navigate('details', id)} />;
        }
    };

    return (
        <div className="app-container">
            <Navbar navigate={navigate} />
            <div className="main-content">
                {renderPage()}
            </div>
            <Footer />
            <StarAnimation />
        </div>
    );
}
