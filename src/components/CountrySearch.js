import React, { useState } from 'react';
import './CountrySearch.css';
import { useDispatch } from 'react-redux';
import { fetchCountries } from '../slices/countrySlice';

const CountrySearch = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim() === '') {
      setError('Please enter a country name.');
    } else if (query.trim().length < 2) {
      setError('Please enter at least 2 characters.');
    } else {
      setError('');
      dispatch(fetchCountries(query));
      setQuery("")
    }
  };

  return (
    <>
    <div className='search-container'>
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
    {error && <div className='error-message'>{error}</div>}
    </>
    
  );
};

export default CountrySearch;
