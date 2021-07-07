import React, { useEffect } from 'react';
import { Appearance } from 'react-native-appearance';
import { AvailableThemes, Themes } from '../themes';
import { LightTheme } from '../themes/LightTheme';
import { Theme } from '../types/ITheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme } from '../themes/DarkTheme';
import { Platform } from 'react-native';
import { useStores } from '../hooks';
interface ProvidedValue {
  theme: Theme;
  setTheme: (theme: AvailableThemes) => void;
}

const Context = React.createContext<ProvidedValue>({
  theme: DarkTheme,
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
  const {app} = useStores()

  const SetThemeCallback = React.useCallback(async (newTheme: AvailableThemes) => {
    setTheme((currentTheme: AvailableThemes) => {
      if (currentTheme === newTheme) {
        return currentTheme;
      }
      if(Platform.OS === 'web') {
        document.documentElement.style.setProperty('--color-layout', Themes[newTheme].color.layout)
      }
      app.setTheme(newTheme);
      return newTheme;
    });
    try {
      await AsyncStorage.setItem('app-theme', newTheme);
    } catch(error) {
    }
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