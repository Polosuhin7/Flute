import React from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { Theme } from '../types/ITheme';

type Generator<T extends {}> = (theme: Theme) => T;

export const useStyles = <T extends {}>(fn: Generator<T>) => {
  const { theme } = useTheme();

  const ThemeAwareObject = React.useMemo(() => fn(theme), [fn, theme]);
  return ThemeAwareObject;
};