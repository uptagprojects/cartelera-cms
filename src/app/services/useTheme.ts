import { useEffect, useState } from "react";

function calculateThemeFromSystem() {
    const localStorageTheme = globalThis.localStorage.getItem("theme") ?? null;
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return "dark";
    }

    return "light";
}

export function useTheme(): { theme: string; toggleTheme: () => void } {
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        setTheme(calculateThemeFromSystem());
    }, []);

    useEffect(() => {
        document.body.dataset.theme = theme;
        globalThis.localStorage.setItem("theme", theme);
    }, [theme]);

    return {
        theme,
        toggleTheme: () => setTheme(t => (t === "light" ? "dark" : "light"))
    };
}
