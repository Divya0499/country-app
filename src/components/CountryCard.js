import React from 'react';
import './CountryCard.css';
import { useDispatch } from 'react-redux';
import { fetchCountryDetail } from '../slices/countrySlice';

const CountryCard = ({ country }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchCountryDetail(country.cca3));
  };

  return (
    <div className='country-card' onClick={handleClick}>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h3>{country.name.common}</h3>
      <p>Population: {country.population.toLocaleString()}</p>
    </div>
  );
};

export default CountryCard;
