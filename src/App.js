import './App.css';
import React, { useCallback, useContext, createContext, useState, useEffect } from 'react';
import mineIcon from './images/mine-icon.png';
import { Player } from './Player';
import { Header } from './Header';
import { ProgressBar } from './ProgressBar';
import { ALLWORDS } from './10kwords'
import {
  GameProvider,
  GameContext,
  GameFlagProvider,
  GameFlagContext,
  GameTypingProvider,
  GameTypingContext
} from './Contexts';

function delete_key(d, key) {
  if(d.hasOwnProperty(key)) {
     delete d[key];
     return true;
  }
  return false;
}

function TypingInput() {
  const [inputValue, setInputValue] = useState('');

  const { words , setWords} = useContext(GameTypingContext);
  const wordsList = Object.keys(words);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    for (let i = 0; i < wordsList.length; i++) {
      if (inputValue === wordsList[i]) {
        words[inputValue]();
        setInputValue('')
        delete_key(words, inputValue)
        setWords(words)
        break;
      }
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setInputValue('');
    }
  };

  return (
    <input
      type="text"
      className="typing-input"
      placeholder="Type here..."
      value={inputValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}

function generateRandomWord() {
  const randomIndex = Math.floor(Math.random() * ALLWORDS.length);
  return ALLWORDS[randomIndex];
}

function Mine() {
  const { hasMineAccess } = useContext(GameFlagContext);
  const { gold, setGold } = useContext(GameContext);
  const [goldPerTick, setGoldPerTick] = useState(1)
  const { setWords } = useContext(GameTypingContext);
  const [matchingWord, setMatchingWord] = useState(null);
  const [nextWords, setNextWords] = useState([])

  const runMineTick = useCallback(() => {
    setGold(gold + goldPerTick);
    setMatchingWord(null)
  }, [gold, goldPerTick, setGold, setMatchingWord]);

  useEffect(
    () => {
      if(nextWords.length < 4){
        setNextWords(oldNext => (
          [...oldNext, generateRandomWord()]
        ));
      }
      if (matchingWord == null) {
        const newWord = nextWords.shift();
        setMatchingWord(newWord);
        const newValue = { [newWord]: runMineTick, };
        setWords(oldWords => ({ ...oldWords, ...newValue }));
        // TODO check for if words already has this...
      }
    }, [generateRandomWord, matchingWord]
  )

  if (!hasMineAccess) return null;

  return (
    <div className="mine">
      <div className="mine__header">
        <img
          src={mineIcon}
          alt="Mine Icon"
          className="mine__header-icon"
        />
        <h2 className="mine__header-title">Gold Mine</h2>
      </div>
      <div className="mine__content">
        <p className="mine__text">{matchingWord}</p>
        <p className="mine__subtext">{nextWords[0]}</p>
        <p className="mine__info">Type this word to mine gold!</p>
      </div>
    </div>
  );
}

function World() {
  return (
    <Mine />
  );
};

function App() {
  return (
    <GameTypingProvider>
      <GameFlagProvider>
        <GameProvider>
          <div className="App">
            <Header />
            <div className="game-container">
              <div className="game-left">
                <Player />
                <ProgressBar label="Health" />
                <ProgressBar label="Gold" />
              </div>
              <div className="game-right">
                <TypingInput />
                <World />
              </div>
            </div>
          </div>
        </GameProvider>
      </GameFlagProvider>
    </GameTypingProvider>
  );
}

export default App;
