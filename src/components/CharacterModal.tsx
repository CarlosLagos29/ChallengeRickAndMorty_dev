import {
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import type { Character, Episode, Status } from '../types/character';
import Portal from './Portal';

interface CharacterModalProps {
  character: Character | null;
  loading: boolean;
  error: boolean;
  onClose: () => void;
  showNavigation: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

const STATUS_CLASS_NAMES: Record<Status, string> = {
  Alive: 'bg-green-lime text-background',
  Dead: 'bg-red-500 text-white',
  unknown: 'bg-slate-400 text-background',
};

const navigationButtonClassName =
  'rounded-lg px-3 py-1 transition duration-300 hover:bg-portal hover:text-background disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-white';

const EpisodeCard = ({ label, episode }: { label: string; episode: Episode }) => (
  <div className="min-w-0 rounded-xl border border-white/15 p-3">
    <p className="text-white/60">{label}</p>
    <p className="truncate" title={episode.name}>
      #{episode.id} · {episode.name}
    </p>
  </div>
);

const Detail = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="min-w-0">
    <dt className="text-white/60">{label}</dt>
    <dd className="break-words">{value}</dd>
  </div>
);

const CharacterModal = ({
  character,
  loading,
  error,
  onClose,
  showNavigation,
  onPrevious,
  onNext,
}: CharacterModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => dialog?.close();
  }, []);

  const handlerCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  const handlerBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const renderMessage = (message: string) => (
    <h2 id={titleId} className="py-10 pr-10 text-center text-2xl">
      {message}
    </h2>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div role="status" className="flex flex-col items-center gap-4 py-6">
          <Portal className="size-32" />
          <h2 id={titleId}>Loading...</h2>
        </div>
      );
    }
    if (error) return renderMessage('Something went wrong loading the character.');
    if (!character) return renderMessage("This character doesn't exist in this dimension.");

    const firstEpisode = character.episode[0];
    const lastEpisode = character.episode.at(-1);
    const hasSingleEpisode = firstEpisode?.id === lastEpisode?.id;

    return (
      <>
        <div className="flex flex-col gap-5 sm:flex-row">
          <img
            className="h-40 w-full rounded-xl object-cover sm:size-48 sm:shrink-0"
            src={character.image}
            alt={character.name}
          />
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="pr-10 text-3xl leading-tight text-green-lime">
              {character.name}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 text-base">
              <span className={`rounded-full px-3 py-1 ${STATUS_CLASS_NAMES[character.status]}`}>
                {character.status === 'unknown' ? 'Unknown' : character.status}
              </span>
              <span className="rounded-full border border-white/25 px-3 py-1">
                {character.species}
              </span>
              <span className="rounded-full border border-white/25 px-3 py-1">
                {character.gender}
              </span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-base">
              {character.type !== '' && <Detail label="Subspecies" value={character.type} />}
              <Detail label="Origin" value={character.origin?.name ?? 'Unknown'} />
              <Detail label="Location" value={character.location?.name ?? 'Unknown'} />
            </dl>
          </div>
        </div>
        {firstEpisode && lastEpisode && (
          <div className="mt-5 grid gap-3 text-base sm:grid-cols-2">
            {hasSingleEpisode ? (
              <EpisodeCard label="Episode" episode={firstEpisode} />
            ) : (
              <>
                <EpisodeCard label="First episode" episode={firstEpisode} />
                <EpisodeCard label="Last episode" episode={lastEpisode} />
              </>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handlerCancel}
      onClick={handlerBackdropClick}
      className="mt-auto mb-0 max-h-[88dvh] w-full max-w-none animate-[sheet-up_300ms_ease-out] overflow-y-auto rounded-t-3xl border-0 border-t-8 border-green-lime bg-background p-0 text-white backdrop:bg-background/70 backdrop:backdrop-blur-sm motion-reduce:animate-none sm:m-auto sm:max-h-[90dvh] sm:w-[min(36rem,calc(100%-2rem))] sm:animate-[pop-in_200ms_ease-out] sm:rounded-2xl sm:border-8 sm:shadow-[0_0_28px_rgb(22_238_101/0.35)]"
    >
      <div className="relative p-5 sm:p-6">
        <div
          aria-hidden="true"
          className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/30 sm:hidden"
        />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full border border-white/25 bg-background/80 transition duration-300 hover:bg-portal hover:text-background"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        {renderContent()}
        {showNavigation && (
          <div className="mt-5 flex justify-between border-t border-white/10 pt-4">
            <button
              onClick={onPrevious}
              disabled={!onPrevious}
              className={navigationButtonClassName}
            >
              Previous
            </button>
            <button onClick={onNext} disabled={!onNext} className={navigationButtonClassName}>
              Next
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default CharacterModal;
