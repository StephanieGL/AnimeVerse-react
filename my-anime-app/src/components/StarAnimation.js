import React from 'react';
import './StarAnimation.css';

const StarAnimation = () => {
    const starCount = 100;
    const stars = Array.from({ length: starCount });

    return (
        <div className="stars-container">
            {stars.map((_, index) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                    animationDelay: `${Math.random() * 7}s`,
                };
                return <div key={index} className="star" style={style}></div>;
            })}
        </div>
    );
};

export default StarAnimation;
