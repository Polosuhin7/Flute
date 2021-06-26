export interface ThemeFontSize {
    small: number;
    body: number;
    large: number;
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
    subtitle: number;
}

export interface ThemeSpacing {
    small: number;
    base: number;
    double: number;
    triple: number;
    quadro: number;
}

export interface ThemeColors {
    primary: string;
    secondary: string;
    active: string;
    activeBlur: string;
    text: string;
    border: string;
    layout: string;
}
export interface ThemeRaduis {
    base: number;
    double: number;
    triple: number;
}

export interface Theme {
    id: string;
    color: ThemeColors;
    spacing: ThemeSpacing;
    radius: ThemeRaduis;
    fontSize: ThemeFontSize;
}
