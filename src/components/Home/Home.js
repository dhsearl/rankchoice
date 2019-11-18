import React from 'react';
import { useHistory } from "react-router-dom";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function createButton() {
    let history = useHistory();
  
    function handleClick() {
      history.push("/make");
    }}

const Home = () => (
  <div>
    <div>
      <p>
        HOME
        <button onClick={createButton}>Make Poll</button>
      </p>
    </div>
  </div>
);

export default Home;