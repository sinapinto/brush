import React, { useState } from 'react';
import './App.css';

export default function App() {
  let [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setCount(count+1)}>click</button>
        <p>Count: {count}</p>
      </header>
    </div>
  );
};
