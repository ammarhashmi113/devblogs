import { useState } from "react";
import { Heart } from "lucide-react";
import api from "../utils/axiosConfig";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

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

    const handleLike = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
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
        }
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition cursor-pointer ${
                liked
                    ? "text-pink-600"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
        >
            <Heart
                className={`w-5 h-5 ${liked ? "fill-pink-600" : "fill-none"}`}
            />
            <span>
                {count} Like{count > 1 && "s"}
            </span>
        </button>
    );
}

export default LikeButton;
