import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
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

const DRAG_CLOSE_THRESHOLD = 100;

const STATUS_CLASS_NAMES: Record<Status, string> = {
  Alive: 'bg-green-lime text-background',
  Dead: 'bg-red-500 text-white',
  unknown: 'bg-slate-400 text-background',
};

const chipClassName = 'rounded-full px-3 py-1 max-sm:py-0.5 max-sm:text-sm';

const navigationButtonClassName =
  'rounded-lg px-3 py-1 transition duration-300 hover:bg-portal hover:text-background disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-white max-sm:h-10 max-sm:text-base max-sm:active:bg-portal max-sm:active:text-background';

const EpisodeCard = ({ label, episode }: { label: string; episode: Episode }) => (
  <div className="min-w-0 rounded-xl border border-white/15 p-3 max-sm:px-3 max-sm:py-2">
    <p className="text-white/60 max-sm:text-sm">{label}</p>
    <p className="truncate max-sm:text-base" title={episode.name}>
      #{episode.id} · {episode.name}
    </p>
  </div>
);

const Detail = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="min-w-0 max-sm:contents">
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
  const dragStartRef = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
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

  const handlerDragStart = (event: PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = event.clientY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlerDragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) return;
    setDragOffset(Math.max(0, event.clientY - dragStartRef.current));
  };

  const handlerDragEnd = () => {
    if (dragStartRef.current === null) return;
    dragStartRef.current = null;
    setIsDragging(false);
    if (dragOffset > DRAG_CLOSE_THRESHOLD) onClose();
    else setDragOffset(0);
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
        <div className="flex flex-col gap-5 sm:flex-row max-sm:gap-4 max-sm:pt-8">
          <img
            className="rounded-xl object-cover sm:size-48 sm:shrink-0 max-sm:mx-auto max-sm:size-48"
            src={character.image}
            alt={character.name}
          />
          <div className="min-w-0 flex-1 max-sm:flex max-sm:flex-col max-sm:gap-4">
            <h2
              id={titleId}
              className="pr-10 text-3xl leading-tight text-green-lime max-sm:text-2xl"
            >
              {character.name}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 text-base max-sm:mt-0">
              <span
                className={`${chipClassName} max-sm:inline-flex max-sm:items-center max-sm:gap-1.5 ${STATUS_CLASS_NAMES[character.status]}`}
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-current sm:hidden" />
                {character.status === 'unknown' ? 'Unknown' : character.status}
              </span>
              <span className={`${chipClassName} border border-white/25`}>{character.species}</span>
              <span className={`${chipClassName} border border-white/25`}>{character.gender}</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-base max-sm:mt-0 max-sm:grid-cols-[auto_1fr] max-sm:gap-y-1">
              {character.type !== '' && <Detail label="Subspecies" value={character.type} />}
              <Detail label="Origin" value={character.origin?.name ?? 'Unknown'} />
              <Detail label="Location" value={character.location?.name ?? 'Unknown'} />
            </dl>
          </div>
        </div>
        {firstEpisode && lastEpisode && (
          <div className="mt-5 grid gap-3 text-base sm:grid-cols-2 max-sm:mt-4 max-sm:gap-2">
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
      style={
        dragOffset > 0
          ? {
              transform: `translateY(${dragOffset}px)`,
              transition: isDragging ? 'none' : undefined,
            }
          : undefined
      }
      className="overflow-y-auto border-green-lime bg-background p-0 text-white backdrop:bg-background/70 backdrop:backdrop-blur-sm motion-reduce:animate-none sm:m-auto sm:max-h-[90dvh] sm:w-[min(36rem,calc(100%-2rem))] sm:max-w-none sm:animate-[pop-in_200ms_ease-out] sm:rounded-2xl sm:border-8 sm:shadow-[0_0_28px_rgb(22_238_101/0.35)] max-sm:mx-0 max-sm:mt-auto max-sm:mb-0 max-sm:max-h-[88dvh] max-sm:w-full max-sm:max-w-none max-sm:animate-[sheet-up_250ms_ease-out] max-sm:rounded-t-3xl max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-t-4 max-sm:border-b-0 max-sm:transition-transform max-sm:duration-200 max-sm:backdrop:animate-[fade-in_250ms_ease-out] motion-reduce:backdrop:animate-none"
    >
      <div className="relative sm:p-6 max-sm:p-4 max-sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div
          aria-hidden="true"
          onPointerDown={handlerDragStart}
          onPointerMove={handlerDragMove}
          onPointerUp={handlerDragEnd}
          onPointerCancel={handlerDragEnd}
          className="-mx-4 -mt-2 cursor-grab touch-none pt-2 pb-3 active:cursor-grabbing sm:hidden"
        >
          <div className="mx-auto h-1 w-10 rounded-full bg-white/30" />
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full border border-white/25 bg-background/80 transition duration-300 hover:bg-portal hover:text-background max-sm:top-4 max-sm:right-4 max-sm:bg-background max-sm:active:bg-portal max-sm:active:text-background"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-4.5 max-sm:size-4"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        {renderContent()}
        {showNavigation && (
          <div className="mt-5 flex justify-between border-t border-white/10 pt-4 max-sm:mt-4 max-sm:pt-3">
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
