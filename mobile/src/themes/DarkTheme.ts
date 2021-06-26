import { Theme } from "../types/ITheme";
import { BaseTheme } from "./BaseTheme";


export const DarkTheme: Theme = {
  ...BaseTheme,
  id: 'dark',
  color: {
    primary: '#000',
    secondary: '#fff',
    layout: '#121212',
    text: '#fff',
    active: '#ff3f80',
    activeBlur: 'rgba(255, 63, 128, 0.3)',
    border: '#424242'
  },
};