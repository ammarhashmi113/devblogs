import { Skeleton, SVGSkeleton } from "./Skeleton";

const CommentSkeleton = () => (
    <>
        <li className="p-4 flex flex-col gap-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <div className="flex gap-4">
                <SVGSkeleton className="sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600 w-10 h-10" />
                <div className="flex-1">
                    <div>
                        <Skeleton className="w-[176px] max-w-full" />
                    </div>
                    <div>
                        <Skeleton className="w-[120px] max-w-full" />
                    </div>
                </div>
            </div>
            <div>
                <Skeleton className="w-[1560px] max-w-full" />
                <Skeleton className="w-[560px] max-w-full" />
            </div>
            <div>
                <Skeleton className="w-[128px] max-w-full" />
            </div>
        </li>
    </>
);

export default CommentSkeleton;
