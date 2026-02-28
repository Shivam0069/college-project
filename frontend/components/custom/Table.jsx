export const Table = ({ children, className = '' }) => (
  <div className={`w-full overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
    <table className="w-full text-sm text-left text-gray-700">
      {children}
    </table>
  </div>
);

export const TableHead = ({ children, className = '' }) => (
  <thead className={`bg-gray-50 border-b border-gray-200 ${className}`}>
    {children}
  </thead>
);

export const TableBody = ({ children, className = '' }) => (
  <tbody className={className}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = '', hover = false }) => {
  const hoverClass = hover ? 'hover:bg-gray-50 transition-colors duration-150' : '';
  return (
    <tr className={`border-b border-gray-200 ${hoverClass} ${className}`}>
      {children}
    </tr>
  );
};

export const TableHeader = ({ children, className = '' }) => (
  <th className={`px-6 py-3 font-semibold text-gray-900 bg-gray-50 ${className}`}>
    {children}
  </th>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-3 text-gray-700 ${className}`}>
    {children}
  </td>
);

export const TablePagination = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => (
  <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
    <span className="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <div className="flex gap-2">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 transition-colors"
      >
        Previous
      </button>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 transition-colors"
      >
        Next
      </button>
    </div>
  </div>
);
