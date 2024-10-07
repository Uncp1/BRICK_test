import React, { useEffect, useRef, useState } from 'react';
import SearchForm from '../../components/SearchForm';
import CharacterCard from '../../components/CharacterCard';
import CharacterDetails from '../../components/CharacterDetails';
import { Character } from '../../types';


const SearchPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (name: string, status: string, species: string, gender: string) => {
    setLoading(true);
    setError(null);
    setCharacters([]);

    let query = `https://rickandmortyapi.com/api/character?name=${name}`;
    if (status) query += `&status=${status}`;
    if (species) query += `&species=${species}`;
    if (gender) query += `&gender=${gender}`;

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

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseModal();
      }
    };

    if (selectedCharacter) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedCharacter]);

  return (
    <div className="p-6 font-mono text-white bg-black min-h-screen">
      <h1 className="text-4xl mb-6">Rick and Morty Universe</h1>
      <SearchForm onSearch={handleSearch} />

      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {error && <p className="text-red-500">{error}</p>}
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={() => setSelectedCharacter(character)}
            />
          ))}
        </div>
      )}

      {selectedCharacter && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-gray-800 text-white p-6 rounded shadow-lg relative w-full max-w-md">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-xl font-bold text-gray-400 hover:text-gray-200"
            >
              &times;
            </button>
            <CharacterDetails character={selectedCharacter} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
