import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS_COUNT, GET_SPECIES } from '../graphql/queries';

const useSpecies = (): string[] => {
  const { data: countData } = useQuery(GET_CHARACTERS_COUNT);
  const count = countData?.characters?.info.count ?? 0;

  const ids = useMemo(() => Array.from({ length: count }, (_, i) => String(i + 1)), [count]);

  const { data } = useQuery(GET_SPECIES, { variables: { ids }, skip: count === 0 });

  return useMemo(
    () => [...new Set(data?.charactersByIds.map(({ species }) => species))].sort(),
    [data],
  );
};

export default useSpecies;
