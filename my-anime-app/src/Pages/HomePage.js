import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AnimeGrid from '../components/AnimeGrid';

const HomePage = ({ onSearch, onCardClick }) => {
    const [topAnime, setTopAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchTopAnime = async () => {
            try {
                // sfw=true to the endpoint to filter out adult content
                const response = await fetch('https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&limit=10&sfw=true');
                if (!response.ok) throw new Error('Failed to fetch top anime');
                const data = await response.json();

                // This logic removes any duplicates from the API response.
                const uniqueAnime = Array.from(new Map(data.data.map(anime => [anime.mal_id, anime])).values());
                
                setTopAnime(uniqueAnime);

            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTopAnime();
    }, []);

    const handleSearchSubmit = () => {
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <div className="container">
            <Header />
            <SearchBar 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onSubmit={handleSearchSubmit}
                onExplore={() => onSearch('')}
            />
            <AnimeGrid 
                loading={loading} 
                error={error} 
                animeList={topAnime} 
                title="Top Airing Anime"
                onCardClick={onCardClick}
            />
        </div>
    );
};

export default HomePage;
