import { Skeleton, SVGSkeleton } from "./Skeleton";

const BlogMainContentSkeleton = () => (
    <>
        <div className="lg:col-span-2 space-y-9 sm:space-y-8">
            <SVGSkeleton className="aspect-[16/9] w-full rounded-lg mb-12" />
            <h1 className="leading-snug space-y-4">
                <Skeleton className="w-[432px] max-w-full" />
                <Skeleton className="w-[300px] max-w-full sm:hidden" />
                <Skeleton className="w-[232px] max-w-full sm:hidden" />
            </h1>
            <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex items-center gap-1 sm:gap-2">
                    <SVGSkeleton className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                        <Skeleton className="w-[64px] max-w-full" />
                    </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <SVGSkeleton className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                        <Skeleton className="w-[64px] max-w-full" />
                    </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <SVGSkeleton className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                        <Skeleton className="w-[64px] max-w-full" />
                    </span>
                </div>
            </div>
            <div className="max-w-none">
                <Skeleton className="w-[9640px] max-w-full" />
            </div>
        </div>
    </>
);

export default BlogMainContentSkeleton;
