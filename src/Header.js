import './App.css';
import React, { useContext, createContext, useState, useEffect } from 'react';
import cowboyHat from './images/cowboy-hat.png';

export const Header = () => {
    return (
        <header className="header">
            <img src={cowboyHat} alt="Cowboy Hat" className="header__logo" />
            <h1 className="header__title">Wild West Game</h1>
        </header>
    );
}
