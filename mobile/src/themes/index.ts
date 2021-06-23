import { LightTheme } from './LightTheme';
import { DarkTheme } from './DarkTheme';
export const Themes = {
    dark: DarkTheme,
    light: LightTheme
}

export type AvailableThemes = keyof typeof Themes;