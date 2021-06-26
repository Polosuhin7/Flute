import { Theme } from "../types/ITheme";
import { BaseTheme } from "./BaseTheme";


export const LightTheme: Theme = {
  ...BaseTheme,
  id: 'light',
  color: {
    primary: '#fff',
    secondary: '#000',
    layout: '#e7e7e7',
    text: '#000',
    active: '#ff3f80',
    activeBlur: 'rgba(255, 63, 128, 0.3)',
    border: '#424242'
  },
};