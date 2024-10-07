import React, { useState } from 'react';
import SearchForm from '../../components/SearchForm';
import CharacterCard from '../../components/CharacterCard';
import CharacterDetails from '../../components/CharacterDetails ';
import { Character } from '../../types';

const SearchPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const handleSearch = async (name: string, status: string, species: string) => {
    setLoading(true);
    setError(null);
    setCharacters([]);

    let query = `https://rickandmortyapi.com/api/character?name=${name}`;

    if (status) query += `&status=${status}`;
    if (species) query += `&species=${species}`;

    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCharacters(data.results || []);
    } catch (error) {
      setError('No characters found or something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Universe</h1>
      <SearchForm onSearch={handleSearch} />


      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"/>
        </div>
      ) : (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {characters.length === 0 && <p>No characters found. Try adjusting your search!</p>}
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={handleSelectCharacter}
            />
          ))}
        </div>

        {selectedCharacter && (
          <CharacterDetails character={selectedCharacter} />
        )}
      </div>
          )}
    </div>
  );
};

export default SearchPage;