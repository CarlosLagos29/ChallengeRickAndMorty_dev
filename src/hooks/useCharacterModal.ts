import { useLocation, useNavigate, useSearchParams } from 'react-router';

interface ModalLocationState {
  fromList?: boolean;
}

const PARAM = 'character';

const useCharacterModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const value = searchParams.get(PARAM);
  const characterId = value && /^\d+$/.test(value) ? value : null;
  const openedFromList = (location.state as ModalLocationState | null)?.fromList === true;

  const getCharacterHref = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(PARAM, id);
    return `?${params}`;
  };

  const showCharacter = (id: string) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set(PARAM, id);
        return params;
      },
      { replace: true, state: location.state },
    );
  };

  const closeCharacter = () => {
    if (openedFromList) {
      navigate(-1);
      return;
    }
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.delete(PARAM);
        return params;
      },
      { replace: true },
    );
  };

  return { characterId, getCharacterHref, showCharacter, closeCharacter };
};

export default useCharacterModal;
