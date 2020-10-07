import React from 'react';

import './App.css';
import { Game } from './components/Game';

export default function App() {
  return (
    <div className="container">
      <div className="game-title">
        <span>Color </span>
        <span>Shuffle </span>
      </div>
      <Game />
    </div>
  );
}
