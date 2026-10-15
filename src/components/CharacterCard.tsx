import { Link } from 'react-router';
import type { CharacterSummary } from '../types/character';

interface CharacterCardProps {
  character: CharacterSummary;
  index: number;
  href: string;
}

const CharacterCard = ({ character, index, href }: CharacterCardProps) => {
  const borderClassName =
    index % 2 !== 0
      ? 'border-portal hover:shadow-[0_0_24px_var(--color-portal)]'
      : 'border-green-lime hover:shadow-[0_0_24px_var(--color-green-lime)]';

  return (
    <Link
      to={href}
      state={{ fromList: true }}
      className={`${borderClassName} block rounded-2xl border-4 p-2 text-center transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:border-8`}
    >
      <img
        className="aspect-square w-full rounded-xl object-cover"
        src={character.image}
        alt={character.name}
        loading="lazy"
      />
      <h2 className="line-clamp-2 pt-2 text-lg sm:text-2xl">{character.name}</h2>
    </Link>
  );
};

export default CharacterCard;
