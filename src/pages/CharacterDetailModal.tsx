import { useQuery } from '@apollo/client/react';
import CharacterModal from '../components/CharacterModal';
import { GET_CHARACTER } from '../graphql/queries';

interface CharacterDetailModalProps {
  characterId: string;
  characterIds: string[];
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const CharacterDetailModal = ({
  characterId,
  characterIds,
  onClose,
  onNavigate,
}: CharacterDetailModalProps) => {
  const { data, loading, error } = useQuery(GET_CHARACTER, { variables: { id: characterId } });

  const index = characterIds.indexOf(characterId);
  const previousId = index > 0 ? characterIds[index - 1] : undefined;
  const nextId = index >= 0 ? characterIds[index + 1] : undefined;

  return (
    <CharacterModal
      character={data?.character ?? null}
      loading={loading}
      error={Boolean(error)}
      onClose={onClose}
      showNavigation={index >= 0}
      onPrevious={previousId ? () => onNavigate(previousId) : undefined}
      onNext={nextId ? () => onNavigate(nextId) : undefined}
    />
  );
};

export default CharacterDetailModal;
