import React, { useState } from 'react';
import SearchForm from '../../components/SearchForm';
import CharacterCard from '../../components/CharacterCard';
import CharacterDetails from '../../components/CharacterDetails ';
import { Character } from '../../types';

const SearchPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleSearch = async (name: string, status: string, species: string) => {
    let query = `https://rickandmortyapi.com/api/character?name=${name}`;

    if (status) query += `&status=${status}`;
    if (species) query += `&species=${species}`;

    const response = await fetch(query);
    const data = await response.json();
    setCharacters(data.results || []);
    setSelectedCharacter(null);
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Universe</h1>
      <SearchForm onSearch={handleSearch} />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
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
    </div>
  );
};

export default SearchPage;