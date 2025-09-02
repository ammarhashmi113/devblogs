import { MessageSquare } from "lucide-react";
import CommentSkeleton from "./CommentSkeleton";

const CommentsListSkeleton = () => {
    return (
        <div className="mt-10 space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Comments
                </h2>
            </div>

            {/* Comments List */}
            <ul className="space-y-6">
                <CommentSkeleton />
            </ul>
        </div>
    );
};

export default CommentsListSkeleton;
