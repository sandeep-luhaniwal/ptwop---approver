// context/LayoutContext.js
"use client";

import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    return (
        <LayoutContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};