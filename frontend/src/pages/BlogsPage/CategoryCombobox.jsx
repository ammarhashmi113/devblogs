import { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

function CategoryCombobox({
    filters,
    setFilters,
    categoryQuery,
    setCategoryQuery,
    filteredCategories,
}) {
    return (
        <Combobox
            value={filters.category}
            onChange={(val) =>
                setFilters((prev) => ({ ...prev, category: val }))
            }
        >
            <div className="relative w-38 sm:w-48">
                <div className="relative cursor-default overflow-hidden rounded-md bg-white dark:bg-gray-900 text-left focus:outline-none text-sm">
                    <Combobox.Input
                        className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        displayValue={(cat) => cat}
                        placeholder="Select Category"
                        onChange={(e) => setCategoryQuery(e.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                        <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                    </Combobox.Button>
                </div>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                        {filteredCategories.map((cat) => (
                            <Combobox.Option
                                key={cat}
                                value={cat}
                                className={({ active }) =>
                                    `cursor-pointer select-none relative px-4 py-2 ${
                                        active
                                            ? "bg-blue-500 text-white"
                                            : "text-gray-900 dark:text-gray-200"
                                    }`
                                }
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {cat}
                                        </span>
                                        {selected && (
                                            <span
                                                className={`absolute inset-y-0 right-3 flex items-center pl-3 text-blue-600 dark:text-blue-300 ${
                                                    active &&
                                                    "text-white dark:text-white"
                                                }`}
                                            >
                                                <Check className="w-5 h-5" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}

export default CategoryCombobox;
