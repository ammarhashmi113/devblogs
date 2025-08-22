import { Skeleton, SVGSkeleton } from "./Skeleton";

const AuthorCardSkeleton = () => (
    <>
        <div className="p-4 shadow-sm transition-colors">
            <SVGSkeleton className="mx-auto rounded-full object-cover mb-4 border border-gray-300 dark:border-gray-700 w-20 h-20" />
            <h4>
                <Skeleton className="w-[88px] max-w-full" />
            </h4>
            <p>
                <Skeleton className="w-[144px] max-w-full" />
            </p>
            <p className="mt-1"></p>
        </div>
    </>
);

export default AuthorCardSkeleton;
