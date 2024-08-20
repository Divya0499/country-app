import React from 'react';
import { useSelector } from 'react-redux';
import ErrorNotification from './ErrorNotification';

const CountryDetail = () => {
  const { countryDetail, error } = useSelector((state) => state.country);

  if (error) return <ErrorNotification message={error} />;
  if (!countryDetail) return null;

  return (
    <div className='country-detail'>
      <h2>{countryDetail.name.common}</h2>
      <p>Capital: {countryDetail.capital}</p>
      <p>Region: {countryDetail.region}</p>
      <p>Subregion: {countryDetail.subregion}</p>
      <p>Languages: {Object.values(countryDetail.languages).join(', ')}</p>
    </div>
  );
};

export default CountryDetail;
