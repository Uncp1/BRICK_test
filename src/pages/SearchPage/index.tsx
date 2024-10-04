import React from 'react';
import SearchForm from '../../components/SearchForm';



const SearchPage: React.FC = () => {
  const handleSearch = (name: string, status: string, species: string) => {
    console.log('Search:', name, status, species);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Universe</h1>
      <SearchForm onSearch={handleSearch} />
    </div>
  );
};

export default SearchPage;