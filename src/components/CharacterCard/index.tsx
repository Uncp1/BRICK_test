import React from 'react';
import { Character } from '../../types';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  return (
    <div
      className="p-4 border rounded cursor-pointer hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
      onClick={() => onSelect(character)}
    >
      <div className="flex justify-between text-gray-400">
        <h2 className="text-lg md:text-xl font-bold text-white mb-2">{character.name}</h2>
        <div className="flex flex-col text-right">
          <p className="text-sm md:text-base">Status: <span className="text-white">{character.status}</span></p>
          <p className="text-sm md:text-base">Species: <span className="text-white">{character.species}</span></p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
