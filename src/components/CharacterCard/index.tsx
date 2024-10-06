import React from 'react';
import { Character } from '../../types';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

const CharacterCard : React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  return (
    <div 
      className="p-4 border rounded cursor-pointer hover:bg-gray-200"
      onClick={() => onSelect(character)}
    >
      <h2 className="text-lg font-bold">{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
    </div>
  );
};

export default CharacterCard;
