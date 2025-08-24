const Skeleton = ({ className }) => (
    <div aria-live="polite" aria-busy="true" className={className}>
        <span className="inline-flex w-full h-full animate-pulse select-none rounded-md bg-gray-300 dark:bg-gray-700 leading-none">
            ‌
        </span>
        <br />
    </div>
);

const SVGSkeleton = ({ className }) => (
    <svg
        className={
            className + " animate-pulse rounded bg-gray-300 dark:bg-gray-700"
        }
        fill="currentColor"
    />
);

export { Skeleton, SVGSkeleton };
