import './App.css';
import React, { useContext, createContext, useState, useEffect } from 'react';
import {
  GameProvider,
  GameContext,
  GameFlagProvider,
  GameFlagContext,
  GameTypingProvider,
  GameTypingContext
} from './Contexts';

export const ProgressBar = ({ label }) => {
  const { health, gold, healthMax, goldMax } = useContext(GameContext);

  const getPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  const amount = label === "Health" ? health : gold;
  const max = label === "Health" ? healthMax : goldMax;
  const percentage = getPercentage(amount, max);

  return (
    <div className="progress-bar">
      <div className="progress-bar__label">{label}</div>
      <div className="progress-bar__bar">
        <div className="progress-bar__fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="progress-bar__value">{amount}/{max}</div>
    </div>
  );
}
