import { Skeleton, SVGSkeleton } from "./Skeleton";

const AuthorCardSkeleton = () => (
    <>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
            <SVGSkeleton className="mx-auto rounded-full object-cover mb-4 border border-gray-300 dark:border-gray-700 w-20 h-20" />
            <h4>
                <Skeleton className="w-[88px] max-w-full mx-auto" />
            </h4>
            <p>
                <Skeleton className="w-[144px] max-w-full mx-auto" />
            </p>
            <p className="mt-1"></p>
        </div>
    </>
);

export default AuthorCardSkeleton;
