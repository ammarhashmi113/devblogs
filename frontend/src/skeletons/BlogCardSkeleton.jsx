import { Skeleton, SVGSkeleton } from "./Skeleton";

const BlogCardSkeleton = () => (
    <>
        <article className="flex flex-col justify-between p-6 pb-5 max-w-[100%] mx-auto">
            <div className="relative">
                <SVGSkeleton className="object-cover rounded-xl mb-4 w-full h-48" />
                <div className="absolute top-0 left-0 w-full h-48"></div>
            </div>
            <div className="flex items-center gap-x-2 mb-2">
                <span>
                    <Skeleton className="w-[95px] max-w-full" />
                </span>
                <span className="inline-block px-3 py-1">
                    <Skeleton className="w-[45px] max-w-full" />
                </span>
            </div>
            <div className="flex flex-col grow">
                <h3 className="transition-colors line-clamp-2">
                    <a>
                        <Skeleton className="w-[432px] max-w-full" />
                    </a>
                </h3>
                <h3 className="transition-colors mb-2 line-clamp-2">
                    <a>
                        <Skeleton className="w-[232px] max-w-full" />
                    </a>
                </h3>
                <div className="line-clamp-3">
                    <Skeleton className="w-[1512px] max-w-full" />
                </div>
                <div className="line-clamp-3">
                    <Skeleton className="w-[1512px] max-w-full" />
                </div>
                <div className="line-clamp-3 mb-[5px]">
                    <Skeleton className="w-[1512px] max-w-full" />
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="py-0.5">
                        <Skeleton className="w-[48px] max-w-full" />
                    </span>
                    <span className="py-0.5">
                        <Skeleton className="w-[64px] max-w-full" />
                    </span>
                    <span className="py-0.5">
                        <Skeleton className="w-[72px] max-w-full" />
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-x-3 mt-[19px] pt-3 border-t border-gray-100 dark:border-gray-700">
                <SVGSkeleton className="rounded-full object-cover border border-gray-300 dark:border-gray-700 w-10 h-10" />
                <div>
                    <div>
                        <Skeleton className="w-[88px] max-w-full" />
                    </div>
                    <div>
                        <Skeleton className="w-[144px] max-w-full" />
                    </div>
                </div>
            </div>
        </article>
    </>
);

export default BlogCardSkeleton;
