import { Button } from "./ui";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button variant="secondary" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </Button>
      <span className="text-sm text-slate-600">
        {currentPage} / {totalPages}
      </span>
      <Button variant="secondary" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </Button>
    </div>
  );
}

export default Pagination;
