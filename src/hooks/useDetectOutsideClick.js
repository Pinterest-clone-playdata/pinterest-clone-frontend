import { useState, useEffect } from "react";

/**
 * @param {React.node} el
 * @param {boolean} initialState
 */ // dropdownRef, false
export const useDetectOutsideClick = (el, initialState) => {
    const [isActive, setIsActive] = useState(initialState);

    useEffect(() => {
        const onClick = (e) => {
            if (el.current !== null && !el.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        };
        if (isActive) {
            window.addEventListener("click", onClick);
        }
        return () => {
            window.removeEventListener("click", onClick);
        };
    }, [isActive, el]);

    return [isActive, setIsActive];
};
