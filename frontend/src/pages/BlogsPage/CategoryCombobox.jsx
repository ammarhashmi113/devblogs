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
            <div className="relative w-48">
                <div className="relative cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
                    <Combobox.Input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        displayValue={(cat) => cat}
                        placeholder="Select Category"
                        onChange={(e) => setCategoryQuery(e.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                        {filteredCategories.map((cat) => (
                            <Combobox.Option
                                key={cat}
                                value={cat}
                                className={({ active }) =>
                                    `cursor-default select-none relative px-4 py-2 ${
                                        active
                                            ? "bg-blue-500 text-white"
                                            : "text-gray-900"
                                    }`
                                }
                            >
                                {({ selected }) => (
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
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
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
