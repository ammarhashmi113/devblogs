function Pagination({ page, totalPages, setPage }) {
    return (
        <div className="mt-10 flex justify-center gap-2">
            <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
                Prev
            </button>
            <span className="px-4 py-2">
                {page} / {totalPages}
            </span>
            <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
