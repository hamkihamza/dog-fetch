import React, { useState } from 'react';
import { searchDogs } from '../api/auth';
import { Dog } from '../api/models';
import "./css/search.css"

const Search = () => {
  const [dogs, setDogs] = useState<Dog[]>();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [size, setSize] = useState<number>(25);
  const [from, setFrom] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('breed');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const filters: any = {};
    if (breeds.length > 0) filters.breeds = breeds;
    if (zipCodes.length > 0) filters.zipCodes = zipCodes;
    if (ageMin) filters.ageMin = ageMin;
    if (ageMax) filters.ageMax = ageMax;
    if (from) filters.from = from;
    filters.size = size;
    filters.sort = `${sortField}:${sortDirection}`;
  
    try {
      const response = await searchDogs(filters);
  
      if (response.ok) {
        setDogs(response.data);
      } else {
        throw new Error('Search failed. Please try again.');
      }
    } catch (error) {
      console.error(error); 
      alert((error as Error).message); 
    }
  };

  return (
    <div className="search-container">
      <h1 className="title">Search</h1>
      <button onClick={() => setShowFilters(!showFilters)} className="toggle-filters-button">
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      {showFilters && (
        <form onSubmit={handleSubmit} className="filters-form">
          <label className="filter-label">
            Breeds:
            <input type="text" value={breeds} onChange={e => setBreeds(e.target.value.split(','))} className="filter-input" />
          </label>
          <label className="filter-label">
            Zip Codes:
            <input type="text" value={zipCodes} onChange={e => setZipCodes(e.target.value.split(','))} className="filter-input" />
          </label>
          <label className="filter-label">
            Minimum Age:
            <input type="number" value={ageMin || ''} onChange={e => setAgeMin(Number(e.target.value))} className="filter-input" />
          </label>
          <label className="filter-label">
            Maximum Age:
            <input type="number" value={ageMax || ''} onChange={e => setAgeMax(Number(e.target.value))} className="filter-input" />
          </label>
          <label className="filter-label">
            Size:
            <input type="number" value={size} onChange={e => setSize(Number(e.target.value))} className="filter-input" />
          </label>
          <label className="filter-label">
            From:
            <input type="text" value={from || ''} onChange={e => setFrom(e.target.value)} className="filter-input" />
          </label>
          <label className="filter-label">
            Sort By:
            <select value={sortField} onChange={e => setSortField(e.target.value)} className="filter-input">
              <option value="breed">Breed</option>
              <option value="age">Age</option>
            </select>
          </label>

          <label className="filter-label">
            Sort Direction:
            <select value={sortDirection} onChange={e => setSortDirection(e.target.value)} className="filter-input">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
          <input type="submit" value="Submit" className="submit-button" />
        </form>
      )}
      <button onClick={handleSubmit} className="search-button">Search</button>
      {dogs && dogs.map(dog => (
        <div key={dog.id} className="dog-card">
          <h2>{dog.name}</h2>
          <p>{dog.breed}</p>
        </div>
      ))}
    </div>
  );
};

export default Search;
