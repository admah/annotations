import React, { Component } from 'react';
import './App.css';
import Contents from './components/contents.js';
import ContentsList from './components/contents-list.js';

class App extends Component {
  render() {
    return (
      <div className="annotations-app container">
        <ContentsList></ContentsList>
        <Contents></Contents>
      </div>
    );
  }
}

export default App;
