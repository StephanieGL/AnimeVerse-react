import React from 'react';
import { Star } from 'lucide-react';
import './AnimeCard.css';

const AnimeCard = ({ anime, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button className="anime-card" onClick={handleClick}>
            <img 
                src={anime.images.webp.large_image_url} 
                alt={anime.title} 
                className="anime-card-image"
                onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/300x400/1f2937/ffffff?text=${anime.title.replace(/\s/g, '+')}`; }}
            />
            <div className="anime-card-body">
                <h3 className="anime-card-title">{anime.title}</h3>
                
                {anime.score && (
                    <div className="anime-card-score">
                        <Star color="#facc15" size={20} style={{ marginRight: '0.25rem' }} />
                        <span>{anime.score}</span>
                    </div>
                )}
            </div>
        </button>
    );
};

export default AnimeCard;
