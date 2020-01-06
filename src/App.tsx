import React, { useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react'

const App: React.FC = () => {

  useEffect(() => {
    axios.get(`https://www.reddit.com/new.json`)
      .then(res => {
        console.log(res.data.data.children);
      })
  })

  return (
    <React.Fragment>

    </React.Fragment>
  );
}

export default App;
