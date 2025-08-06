// src/hooks/useClickOutside.js

import { useEffect } from "react";

/**
 * This hook detects if user clicks outside a given element.
 *
 * @param {React.RefObject} ref - the element to watch for outside clicks
 * @param {Function} handler - function to run when outside click happens
 */
export function useClickOutside(ref, handler) {
    useEffect(() => {
        // This function checks if the click was outside the element
        function handleClickOutside(event) {
            // if ref exists AND click is NOT inside the element
            if (ref.current && !ref.current.contains(event.target)) {
                handler(); // run the provided function (usually setOpen(false))
            }
        }

        // Listen to both mouse and touch events (for mobile support)
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        // Clean up when component unmounts or rerenders
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [ref, handler]); // re-run effect if ref or handler changes
}
