import { Skeleton, SVGSkeleton } from "./Skeleton";

const RecentBlogsSkeleton = () => (
    <>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6 p-4 shadow-sm transition-colors">
            <h3 className="pl-4 border-l-4 border-blue-500 h-[28px]">
                <Skeleton className="w-[96px] max-w-full" />
            </h3>
            <ul className="space-y-4">
                <li>
                    <a className="flex items-start gap-4 p-4 transition-colors">
                        <SVGSkeleton className="rounded object-cover flex-shrink-0 w-32 h-21" />
                        <div className="flex flex-col justify-between">
                            <h4 className="line-clamp-3">
                                <Skeleton className="w-[232px] max-w-full" />
                            </h4>
                            <p className="mt-1">
                                <Skeleton className="w-[128px] max-w-full" />
                            </p>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="flex items-start gap-4 p-4 transition-colors">
                        <SVGSkeleton className="rounded object-cover flex-shrink-0 w-32 h-21" />
                        <div className="flex flex-col justify-between">
                            <h4 className="line-clamp-3">
                                <Skeleton className="w-[232px] max-w-full" />
                            </h4>
                            <p className="mt-1">
                                <Skeleton className="w-[128px] max-w-full" />
                            </p>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="flex items-start gap-4 p-4 transition-colors">
                        <SVGSkeleton className="rounded object-cover flex-shrink-0 w-32 h-21" />
                        <div className="flex flex-col justify-between">
                            <h4 className="line-clamp-3">
                                <Skeleton className="w-[232px] max-w-full" />
                            </h4>
                            <p className="mt-1">
                                <Skeleton className="w-[128px] max-w-full" />
                            </p>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="flex items-start gap-4 p-4 transition-colors">
                        <SVGSkeleton className="rounded object-cover flex-shrink-0 w-32 h-21" />
                        <div className="flex flex-col justify-between">
                            <h4 className="line-clamp-3">
                                <Skeleton className="w-[232px] max-w-full" />
                            </h4>
                            <p className="mt-1">
                                <Skeleton className="w-[128px] max-w-full" />
                            </p>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="flex items-start gap-4 p-4 transition-colors">
                        <SVGSkeleton className="rounded object-cover flex-shrink-0 w-32 h-21" />
                        <div className="flex flex-col justify-between">
                            <h4 className="line-clamp-3">
                                <Skeleton className="w-[232px] max-w-full" />
                            </h4>
                            <p className="mt-1">
                                <Skeleton className="w-[128px] max-w-full" />
                            </p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </>
);

export default RecentBlogsSkeleton;
