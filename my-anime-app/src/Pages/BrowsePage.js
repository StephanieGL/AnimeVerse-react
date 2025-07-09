import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import AnimeGrid from '../components/AnimeGrid';
import './BrowsePage.css';

const BrowsePage = ({ initialQuery, onCardClick }) => {
    const [allAnime, setAllAnime] = useState([]); // Stores all anime loaded from the API
    const [loading, setLoading] = useState(false); // For the "Load More" button specifically
    const [initialLoading, setInitialLoading] = useState(true); // For new searches or the first page load
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(initialQuery || ''); // The live search query from the input
    const [debouncedQuery, setDebouncedQuery] = useState(query); // The query used for API calls, updated after a delay
    const [currentPage, setCurrentPage] = useState(1); // Tracks the page number for the API
    const [hasNextPage, setHasNextPage] = useState(true); // Tracks if the API has more pages

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(handler);
    }, [query]);

    const fetchAnime = useCallback(async (page, isLoadMore = false) => {
        if (!isLoadMore) {
            setInitialLoading(true);
        } else {
            setLoading(true);
        }
        setError(null);

        // sfw=true to the endpoint to filter out adult content
        const endpoint = debouncedQuery
            ? `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&page=${page}&limit=25&sfw=true`
            : `https://api.jikan.moe/v4/anime?page=${page}&limit=25&order_by=popularity&sfw=true`;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Failed to fetch anime list. The API may be busy.');
            const data = await response.json();

            if (isLoadMore) {
                setAllAnime(prev => [...prev, ...data.data]);
            } else {
                setAllAnime(data.data);
            }
            
            setHasNextPage(data.pagination.has_next_page);
            setCurrentPage(page);

        } catch (e) {
            setError(e.message);
        } finally {
            setInitialLoading(false);
            setLoading(false);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        fetchAnime(1, false);
    }, [debouncedQuery, fetchAnime]);

    const handleLoadMore = () => {
        if (hasNextPage && !loading) {
            fetchAnime(currentPage + 1, true);
        }
    };

    return (
        <div className="container">
            <h1 className="browse-page-title">Explore all the Anime Series!</h1>
            <SearchBar 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                isFiltering={true}
            />
            <AnimeGrid 
                loading={initialLoading} 
                error={error} 
                animeList={allAnime} 
                onCardClick={onCardClick}
            />
            <div className="load-more-container">
                {hasNextPage && (
                    <button onClick={handleLoadMore} disabled={loading} className="load-more-button">
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default BrowsePage;
