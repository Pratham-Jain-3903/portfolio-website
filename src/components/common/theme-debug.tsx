"use client";

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeDebug() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    console.log('[ThemeDebug] theme:', theme, 'resolved:', resolvedTheme);
  }, [theme, resolvedTheme]);

  return null;
}
