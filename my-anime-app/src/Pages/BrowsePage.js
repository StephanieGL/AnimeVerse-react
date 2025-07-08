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

    // This effect debounces the search input. It waits 500ms after the user stops
    // typing before updating the debouncedQuery, which triggers the API call.
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        // Cleanup function to reset the timer if the user types again
        return () => clearTimeout(handler);
    }, [query]);

    // This is the main data fetching function. It's now smart enough to handle
    // both browsing and searching, and loading more pages for either.
    const fetchAnime = useCallback(async (page, isLoadMore = false) => {
        if (!isLoadMore) {
            setInitialLoading(true); // Show main spinner for a new search/browse
        } else {
            setLoading(true); // Show button spinner for "Load More"
        }
        setError(null);

        const endpoint = debouncedQuery
            ? `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&page=${page}&limit=25`
            : `https://api.jikan.moe/v4/anime?page=${page}&limit=25&order_by=popularity`;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Failed to fetch anime list. The API may be busy.');
            const data = await response.json();

            // If loading more, add to the list. Otherwise, replace the list.
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
    }, [debouncedQuery]); // This function rebuilds if the debounced query changes

    // This effect triggers a new search whenever the debounced query changes.
    useEffect(() => {
        // When a new search is triggered, always start from page 1.
        fetchAnime(1, false);
    }, [debouncedQuery, fetchAnime]);

    // Handles the "Load More" button click
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
