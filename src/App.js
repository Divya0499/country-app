import React from 'react';
import CountrySearch from './components/CountrySearch';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Country Info Application</h1>
      <CountrySearch />
      <CountryList />
      <CountryDetail />
    </div>
  );
}

export default App;
