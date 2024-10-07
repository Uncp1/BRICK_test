import React from 'react';
import { Character } from '../../types';

interface CharacterDetailsProps {
  character: Character | null;
}

const CharacterDetails : React.FC<CharacterDetailsProps> = ({ character }) => {
  if (!character) return null;

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="text-lg font-bold">{character.name}</h2>
      <img src={character.image} alt={character.name} className="w-32 h-32 rounded-full" />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
    </div>
  );
};

export default CharacterDetails;