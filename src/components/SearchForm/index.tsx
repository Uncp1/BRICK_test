import React, { useEffect, useState } from 'react';
import { Character } from '../../types';

interface SearchFormProps {
  onSearch: (name: string, status: string, species: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [speciesList, setSpeciesList] = useState<string[]>([]);

  //const [isLoading, setIsLoading] = useState(true);
 // const [error, setError] = useState(null);

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
       // setIsLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
      //  setError('Failed to load character data');
        //setIsLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  console.log(speciesList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(name, status, species);
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Character Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Alive?</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Species</option>
        {speciesList.map((speciesItem) => (
          <option key={speciesItem} value={speciesItem}>
            {speciesItem}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchForm;