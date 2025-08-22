import { Skeleton, SVGSkeleton } from "./Skeleton";

const BlogItemSkeleton = () => (
    <li>
        <a className="flex items-start gap-4 p-4 transition-colors">
            <SVGSkeleton className="rounded object-cover flex-shrink-0 w-32 h-21" />
            <div className="flex flex-col justify-between w-[100%]">
                <h4 className="line-clamp-3">
                    <Skeleton className="w-[90%] max-w-full" />
                </h4>
                <p className="mt-1">
                    <Skeleton className="w-[70%] max-w-full" />
                </p>
            </div>
        </a>
    </li>
);

const RecentBlogsSkeleton = () => (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6 p-4 shadow-sm transition-colors">
        <h3 className="pl-4 border-l-4 border-blue-500 h-[28px]">
            <Skeleton className="w-[96px] max-w-full" />
        </h3>
        <ul className="space-y-5 mb-[19px]">
            {Array.from({ length: 5 }).map((_, i) => (
                <BlogItemSkeleton key={i} />
            ))}
        </ul>
    </div>
);

export default RecentBlogsSkeleton;
