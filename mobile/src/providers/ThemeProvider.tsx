import React, { useEffect } from 'react';
import { Appearance } from 'react-native-appearance';
import { AvailableThemes, Themes } from '../themes';
import { LightTheme } from '../themes/LightTheme';
import { Theme } from '../types/ITheme';

interface ProvidedValue {
  theme: Theme;
  setTheme: (theme: AvailableThemes) => void;
}

const Context = React.createContext<ProvidedValue>({
  theme: LightTheme,
  setTheme: () => {
    console.log('ThemeProvider is not rendered!');
  },
});

export interface Props {
  theme: AvailableThemes;
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = React.useState<AvailableThemes>(props.theme);

  const SetThemeCallback = React.useCallback((newTheme: AvailableThemes) => {
    setTheme((currentTheme: AvailableThemes) => {
      if (currentTheme === newTheme) {
        return currentTheme;
      }

      return newTheme;
    });
  }, []);

  useEffect(() => {
    let subscription = Appearance.addChangeListener(({ colorScheme }) => {
        if (colorScheme === "no-preference") return;
        setTheme(colorScheme);
    });

    return () => subscription.remove();
}, []);


  const MemoizedValue = React.useMemo(() => ({
    theme: Themes[theme],
    setTheme: SetThemeCallback,
  }), [theme, SetThemeCallback]);

  return <Context.Provider value={MemoizedValue}>{props.children}</Context.Provider>;
});

export const useTheme = () => React.useContext(Context);