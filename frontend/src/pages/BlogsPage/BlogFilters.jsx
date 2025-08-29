import { useState } from "react";
import { useUser } from "../../contexts/userContext";
import CategoryCombobox from "./CategoryCombobox";

const CATEGORIES = [
    "javascript",
    "react",
    "nextjs",
    "nodejs",
    "express",
    "mongodb",
    "html",
    "css",
    "ui/ux",
    "tailwind",
    "devops",
    "testing",
    "ai",
    "ml",
    "data-science",
    "career",
    "other",
];

function BlogFilters({ filters, setFilters }) {
    const { user } = useUser();
    const [categoryQuery, setCategoryQuery] = useState("");
    const [tagInput, setTagInput] = useState("");

    const filteredCategories =
        categoryQuery === ""
            ? CATEGORIES
            : CATEGORIES.filter((cat) =>
                  cat.toLowerCase().includes(categoryQuery.toLowerCase())
              );

    return (
        <>
            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                {/* Left side */}
                {user ? (
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={filters.mine}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    mine: e.target.checked,
                                }))
                            }
                        />
                        <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-blue-600 transition-all duration-300" />
                        <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                            My Blogs
                        </span>
                    </label>
                ) : (
                    <div></div>
                )}

                {/* Right side */}
                <div className="flex gap-2 flex-wrap justify-between">
                    <CategoryCombobox
                        filters={filters}
                        setFilters={setFilters}
                        categoryQuery={categoryQuery}
                        setCategoryQuery={setCategoryQuery}
                        filteredCategories={filteredCategories}
                    />

                    <input
                        type="text"
                        placeholder="Filter by Tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && tagInput.trim() !== "") {
                                setFilters((prev) => ({
                                    ...prev,
                                    tag: tagInput.trim().toLowerCase(),
                                }));
                                setTagInput("");
                            }
                        }}
                        className="relative w-38 sm:w-48 rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            {/* Active Filter Chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-1.5 mb-1.5 sm:mt-2 sm:mb-2 text-sm">
                {filters.category && (
                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 mt-1 mb-1 sm:mt-2 sm:mb-2 rounded-full flex items-center gap-1 shadow-sm">
                        {filters.category}
                        <button
                            onClick={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    category: "",
                                }))
                            }
                            className="hover:text-red-500 transition-colors cursor-pointer"
                        >
                            ✕
                        </button>
                    </span>
                )}
                {filters.tag && (
                    <span className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1  mt-1 mb-1 sm:mt-2 sm:mb-2 rounded-full flex items-center gap-1 shadow-sm">
                        {filters.tag}
                        <button
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, tag: "" }))
                            }
                            className="hover:text-red-500 transition-colors cursor-pointer"
                        >
                            ✕
                        </button>
                    </span>
                )}
                {filters.mine && (
                    <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1  mt-1 mb-1 sm:mt-2 sm:mb-2 rounded-full flex items-center gap-1 shadow-sm">
                        My Blogs
                        <button
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, mine: false }))
                            }
                            className="hover:text-red-500 transition-colors cursor-pointer"
                        >
                            ✕
                        </button>
                    </span>
                )}
            </div>
        </>
    );
}

export default BlogFilters;
