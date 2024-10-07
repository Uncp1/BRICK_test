import React, { useEffect, useState } from 'react';
import { Character } from '../../types';

interface SearchFormProps {
  onSearch: (name: string, status: string, species: string, episode: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [speciesList, setSpeciesList] = useState<string[]>([]);
  const [gender, SetGender] = useState('');

  // фетчим все виды при загрузке компонента
  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        let allCharacters: Character[] = [];
        let currentPage = 1;

        while (true) {
          const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
          const { results, info } = await response.json();

          allCharacters = [...allCharacters, ...results];

          if (!info.next) break;
          currentPage++;
        }

        const allSpecies = Array.from(new Set(allCharacters.map((char: Character) => char.species))) as string[];
        setSpeciesList(allSpecies);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchAllCharacters();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(name, status, species, gender);
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <label htmlFor="name" className="text-white">
        Character name
      </label>
      <input
        type="text"
        id="name"
        placeholder="Rick"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-400 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
  

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <label htmlFor="gender" className="text-white">
            Gender
          </label>
          <select
            id="gender"
            value={gender} 
            onChange={(e) => SetGender(e.target.value)} 
            className="border border-gray-400 p-2 rounded bg-gray-800 text-white w-full"
          >
            <option value="">Choose gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
    
        <div className="flex-1">
          <label htmlFor="status" className="text-white">
            Is alive?
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-400 p-2 rounded bg-gray-800 text-white w-full"
          >
            <option value="">Choose status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
    
        <div className="flex-1">
          <label htmlFor="species" className="text-white">
            Race
          </label>
          <select
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="border border-gray-400 p-2 rounded bg-gray-800 text-white w-full"
          >
            <option value="">Choose race</option>
            {speciesList.map((speciesItem) => (
              <option key={speciesItem} value={speciesItem}>
                {speciesItem}
              </option>
            ))}
          </select>
        </div>
      </div>
    
      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded shadow-md transition duration-300 ease-in-out hover:bg-green-500"
      >
        Find
      </button>
  </form>

  );
};

export default SearchForm;