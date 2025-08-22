import { useState } from "react";
import { Heart } from "lucide-react";
import api from "../utils/axiosConfig";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

function LikeButton({
    targetId, // blogId, commentId, etc.
    type = "posts", // "posts" | "comments" | "replies"
    initialLiked = false,
    initialCount = 0,
}) {
    const { user } = useUser();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);
    const [animating, setAnimating] = useState(false);

    const handleLike = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        setAnimating(true); // trigger animation

        try {
            if (liked) {
                await api.delete(`/${type}/${targetId}/likes`);
                setLiked(false);
                setCount((prev) => prev - 1);
            } else {
                await api.post(`/${type}/${targetId}/likes`);
                setLiked(true);
                setCount((prev) => prev + 1);
            }
        } catch (err) {
            console.error("Like/Unlike failed:", err);
        } finally {
            setTimeout(() => setAnimating(false), 300); // reset animation
        }
    };

    function formatCount(num) {
        if (num >= 1_000_000_000)
            return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
        if (num >= 1_000_000)
            return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
        if (num >= 1_000)
            return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
        return num;
    }

    return (
        <button
            onClick={handleLike}
            className={clsx(
                "flex items-center gap-1 sm:gap-3 font-medium transition-all duration-300 cursor-pointer",
                "focus:outline-none",
                liked
                    ? "text-pink-600"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
        >
            <Heart
                className={clsx(
                    "w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300",
                    liked && "fill-pink-600",
                    animating && "scale-125"
                )}
            />
            <span className="text-xs sm:text-base select-none">
                {formatCount(count)}
            </span>
        </button>
    );
}

export default LikeButton;
