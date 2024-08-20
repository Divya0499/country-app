import React, { useState, useEffect } from 'react';
import './CountryList.css';
import { useSelector } from 'react-redux';
import CountryCard from './CountryCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorNotification from './ErrorNotification';
import Pagination from './Pagination';

const CountryList = () => {
  const { countries, loading, error, searchQuery } = useSelector((state) => state.country);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle search and pagination
  const getFilteredCountries = () => {
    const query = searchQuery.toLowerCase(); // Ensure search query is in lowercase
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(query)
    );
  };

  const filteredCountries = getFilteredCountries();
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const currentCountries = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page on search query change
  }, [searchQuery]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorNotification message={error} />;

  return (
    <div className="country-list-container">
      <div className="country-list">
        {currentCountries.length > 0 ? (
          currentCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
      {filteredCountries.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CountryList;
