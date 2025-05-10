"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  attribute = "data-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window?.document?.documentElement;
    const initialColorValue = root.classList.contains("dark") ? "dark" : "light";
    
    // Get stored theme or set default
    const storedTheme = localStorage?.getItem(storageKey) as Theme || initialColorValue;
    setTheme(storedTheme);
  }, [storageKey]);

  useEffect(() => {
    const root = window?.document?.documentElement;
    
    // Handle theme transitions
    if (disableTransitionOnChange) {
      root.classList.add("disable-transitions");
      window.setTimeout(() => {
        root.classList.remove("disable-transitions");
      }, 0);
    }

    // Apply theme
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.toggle("dark", systemTheme === "dark");
      root.style.colorScheme = systemTheme;
      root.setAttribute(attribute, systemTheme);
    } else {
      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
      root.setAttribute(attribute, theme);
    }

    // Store theme preference
    localStorage?.setItem(storageKey, theme);
  }, [theme, storageKey, attribute, disableTransitionOnChange, enableSystem]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mqListener = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const isDark = e.matches;
        const root = window?.document?.documentElement;
        root.classList.toggle("dark", isDark);
        root.style.colorScheme = isDark ? "dark" : "light";
        root.setAttribute(attribute, isDark ? "dark" : "light");
      }
    };

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", mqListener);
    return () => mq.removeEventListener("change", mqListener);
  }, [theme, attribute, enableSystem]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}