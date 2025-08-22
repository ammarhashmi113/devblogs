import { Skeleton } from "./Skeleton";

const TagsListSkeleton = () => (
    <>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6 p-4 shadow-sm transition-colors">
            <h3 className="pl-4 border-l-4 border-blue-500 h-[28px]">
                <Skeleton className="w-[32px] max-w-full" />
            </h3>
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1">
                    <Skeleton className="w-[40px] max-w-full" />
                </span>
                <span className="px-3 py-1">
                    <Skeleton className="w-[64px] max-w-full" />
                </span>
                <span className="px-3 py-1">
                    <Skeleton className="w-[40px] max-w-full" />
                </span>
                <span className="px-3 py-1">
                    <Skeleton className="w-[64px] max-w-full" />
                </span>
            </div>
        </div>
    </>
);

export default TagsListSkeleton;
