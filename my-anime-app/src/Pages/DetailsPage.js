import React, { useState, useEffect } from 'react';
import AnimeGrid from '../components/AnimeGrid';
import { Star, Tv, Film, Calendar, BookOpen, ArrowLeft } from 'lucide-react';
import './DetailsPage.css';

const DetailsPage = ({ animeId, onCardClick, onBack }) => {
    const [anime, setAnime] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            window.scrollTo(0, 0); 
            try {
                // Fetch main anime data
                const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
                if (!animeResponse.ok) throw new Error('Failed to fetch anime details.');
                const animeData = await animeResponse.json();
                setAnime(animeData.data);

                // Fetch recommendations
                const recResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`);
                if (recResponse.ok) {
                    const recData = await recResponse.json();
                    setRecommendations(recData.data.slice(0, 5).map(rec => rec.entry));
                }

            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        if (animeId) {
            fetchDetails();
        }
    }, [animeId]);

    if (loading) {
        return <div className="container"><p className="loading-text">Loading Details...</p></div>;
    }

    if (error) {
        return <div className="container"><p className="error-text">Error: {error}</p></div>;
    }

    if (!anime) {
        return null;
    }

    const InfoItem = ({ icon, label, value }) => (
        <div className="info-item">
            {icon}
            <span className="info-label">{label}:</span>
            <span className="info-value">{value || 'N/A'}</span>
        </div>
    );

    return (
        <div className="details-page-container">
            <button onClick={onBack} className="back-button">
                <ArrowLeft size={24} />
                <span>Back to Browse</span>
            </button>

            <div className="details-header">
                <img src={anime.images.webp.large_image_url} alt={anime.title} className="details-image" />
                <div className="details-info">
                    <h1 className="details-title">{anime.title_english || anime.title}</h1>
                    <h2 className="details-title-japanese">{anime.title_japanese}</h2>
                    <div className="info-grid">
                        <InfoItem icon={<Star size={20} className="info-icon" />} label="Score" value={`${anime.score} (by ${anime.scored_by?.toLocaleString()} users)`} />
                        <InfoItem icon={<Tv size={20} className="info-icon" />} label="Type" value={anime.type} />
                        <InfoItem icon={<Film size={20} className="info-icon" />} label="Episodes" value={anime.episodes} />
                        <InfoItem icon={<Calendar size={20} className="info-icon" />} label="Aired" value={anime.aired.string} />
                        <InfoItem icon={<BookOpen size={20} className="info-icon" />} label="Source" value={anime.source} />
                    </div>
                    <div className="genres">
                        {anime.genres.map(genre => <span key={genre.mal_id} className="genre-tag">{genre.name}</span>)}
                    </div>
                </div>
            </div>

            <div className="details-body">
                <h3>Synopsis</h3>
                <p className="synopsis">{anime.synopsis || 'No synopsis available.'}</p>
            </div>

            <div className="recommendations-section">
                <h3>Recommended Anime</h3>
                <AnimeGrid 
                    animeList={recommendations} 
                    onCardClick={onCardClick} 
                />
            </div>
        </div>
    );
};

export default DetailsPage;
