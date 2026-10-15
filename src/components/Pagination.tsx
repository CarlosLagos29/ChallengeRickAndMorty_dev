import useMediaQuery from '../hooks/useMediaQuery';
import { getPageNumbers } from '../utils/pagination';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonClassName =
  'h-10 min-w-10 rounded-lg px-2 transition duration-300 hover:bg-green-lime hover:text-background disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-white';

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  const renderArrow = (label: string, symbol: string, target: number, disabled: boolean) => (
    <button
      onClick={() => onPageChange(target)}
      disabled={disabled}
      aria-label={label}
      className={buttonClassName}
    >
      {symbol}
    </button>
  );

  return (
    <nav aria-label="Pagination" className="flex flex-wrap justify-center gap-2 p-3 text-xl">
      {renderArrow('First page', '<<', 1, isFirstPage)}
      {renderArrow('Previous page', '<', page - 1, isFirstPage)}
      {getPageNumbers(page, totalPages, isMobile ? 3 : 10).map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          aria-current={number === page ? 'page' : undefined}
          className={`${number === page ? 'bg-green-lime text-background' : ''} ${buttonClassName}`}
        >
          {number}
        </button>
      ))}
      {renderArrow('Next page', '>', page + 1, isLastPage)}
      {renderArrow('Last page', '>>', totalPages, isLastPage)}
    </nav>
  );
};

export default Pagination;
