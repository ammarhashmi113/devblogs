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
            <div className="mt-6 flex flex-wrap justify-center gap-4 items-center">
                {/* My Blogs Toggle */}
                {user && (
                    <label className="inline-flex relative items-center cursor-pointer">
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
                        <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-all duration-300"></div>
                        <span className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
                            My Blogs
                        </span>
                    </label>
                )}

                {/* Category Combobox */}
                <CategoryCombobox
                    filters={filters}
                    setFilters={setFilters}
                    categoryQuery={categoryQuery}
                    setCategoryQuery={setCategoryQuery}
                    filteredCategories={filteredCategories}
                />

                {/* Tag Input */}
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
                    className="rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            {/* Active Filter Chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
                {filters.category && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                        {filters.category}
                        <button
                            onClick={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    category: "",
                                }))
                            }
                        >
                            ✕
                        </button>
                    </span>
                )}
                {filters.tag && (
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1">
                        {filters.tag}
                        <button
                            onClick={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    tag: "",
                                }))
                            }
                        >
                            ✕
                        </button>
                    </span>
                )}
                {filters.mine && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                        My Blogs
                        <button
                            onClick={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    mine: false,
                                }))
                            }
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
