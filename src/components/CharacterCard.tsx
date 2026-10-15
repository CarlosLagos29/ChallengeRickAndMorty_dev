import { Link } from 'react-router';
import type { CharacterSummary } from '../types/character';

interface CharacterCardProps {
  character: CharacterSummary;
  index: number;
}

const CharacterCard = ({ character, index }: CharacterCardProps) => (
  <div
    className={`${index % 2 !== 0 ? 'border-portal' : 'border-green-lime'} max-h-96 max-w-80 overflow-hidden rounded-2xl border-8 p-2 text-center transition-transform hover:scale-105`}
  >
    <Link to={`/detail/${character.id}`}>
      <img className="rounded-2xl" src={character.image} alt={character.name} />
      <h2 className="pt-2 text-2xl">{character.name}</h2>
    </Link>
  </div>
);

export default CharacterCard;
