import React, { useContext } from 'react';
import { GameContext, GameFlagContext, GameTypingContext } from './Contexts';

export const Player = (props) => {
    const { health, gold } = useContext(GameContext);

    return (
        <div className="player">
            <div className="player__avatar"></div>
            <div className="player__info">
                <div className="player__name">Player Name</div>
                <div className="player__stats">
                    <div className="player__stat">
                        <span className="player__stat-label">Health:</span>
                        <span className="player__stat-value">{health}</span>
                    </div>
                    <div className="player__stat">
                        <span className="player__stat-label">Gold:</span>
                        <span className="player__stat-value">{gold}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};