import React from 'react';
import AnimeCard from './AnimeCard';
import './AnimeGrid.css';

const AnimeGrid = ({ loading, error, animeList, title, onCardClick }) => {
    return (
        <section>
            {title && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="section-title">{title}</h2>
                </div>
            )}
            
            {loading && <p style={{ textAlign: 'center' }}>Loading... Please wait.</p>}
            {error && <p style={{ textAlign: 'center', color: '#f87171' }}>Error: {error}</p>}
            
            <div className="anime-grid">
                {!loading && !error && animeList && animeList.map(anime => (
                    <AnimeCard 
                        key={anime.mal_id} 
                        anime={anime} 
                        onClick={() => onCardClick(anime.mal_id)} 
                    />
                ))}
            </div>

            {!loading && !error && (!animeList || animeList.length === 0) && (
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>No anime found.</p>
            )}
        </section>
    );
};

export default AnimeGrid;
