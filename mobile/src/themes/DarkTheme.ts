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
    border: '#424242'
  },
};