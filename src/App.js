import React, { useEffect, useState } from "react";
import "./App.css";
import FirstQuestion from "./firstQ.js";
import SecondQuestion from "./secondQ";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <FirstQuestion></FirstQuestion>
      <SecondQuestion></SecondQuestion>
    </div>
  );
}

export default App;
