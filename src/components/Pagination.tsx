import { getPageNumbers } from '../utils/pagination';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonClassName = 'rounded-xl px-2 transition duration-500 hover:bg-green-lime';

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex max-w-screen flex-wrap justify-center gap-3 p-3 text-xl"
    >
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
        className={`${isFirstPage ? 'text-slate-500' : ''} ${buttonClassName}`}
      >
        {'<'}
      </button>
      {getPageNumbers(page, totalPages).map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          aria-current={number === page ? 'page' : undefined}
          className={`${number === page ? 'bg-green-lime' : ''} ${buttonClassName}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={isLastPage}
        aria-label="Next page"
        className={`${isLastPage ? 'text-slate-500' : ''} ${buttonClassName}`}
      >
        {'>'}
      </button>
    </nav>
  );
};

export default Pagination;
