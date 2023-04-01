import React, { createContext, useState} from 'react';

export const GameFlagContext = createContext();
export const GameTypingContext = createContext();
export const GameContext = createContext();

export const GameProvider = (props) => {
  const [health, setHealth] = useState(100);
  const [gold, setGold] = useState(0);
  const [healthMax, setHealthMax] = useState(100);
  const [goldMax, setGoldMax] = useState(100);
  const [inventory, setInventory] = useState([]);

  return (
    <GameContext.Provider value={{
      health, setHealth, gold, setGold, inventory, setInventory,
      healthMax, setHealthMax,
      goldMax, setGoldMax,
    }}>
      {props.children}
    </GameContext.Provider>
  );
};

export const GameFlagProvider = (props) => {
  const [hasMineAccess, setHasMineAccess] = useState(true);
  return (
    <GameFlagContext.Provider value={{
      hasMineAccess,
    }}>
      {props.children}
    </GameFlagContext.Provider>
  );
};

export const GameTypingProvider = (props) => {
  const [words, setWords] = useState({});
  return (
    <GameTypingContext.Provider value={{
      words, setWords
    }}>
      {props.children}
    </GameTypingContext.Provider>
  );
};