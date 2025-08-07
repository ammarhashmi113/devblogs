// src/hooks/useClickOutside.js

import { useEffect } from "react";

/**
 * Detects click outside the given element (and ignores the exceptionRef if provided)
 * @param {React.RefObject} ref - the main element to watch
 * @param {Function} handler - function to run when clicked outside
 * @param {React.RefObject} exceptionRef - optional ref to ignore (like toggle button)
 */
export function useClickOutside(ref, handler, exceptionRef = null) {
    useEffect(() => {
        function handleClickOutside(event) {
            // If click is outside both the target element and the exceptionRef (if any)
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                (!exceptionRef || !exceptionRef.current.contains(event.target))
            ) {
                handler();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [ref, handler, exceptionRef]);
}
