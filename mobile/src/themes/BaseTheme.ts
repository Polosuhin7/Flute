import { Theme } from "../types/ITheme";

export const BaseTheme: Theme = {
    id: "base",
    color: {
        primary: "#000",
        secondary: "#fff",
        layout: "#121212",
        text: "#fff",
        active: "#ff3f80",
        border: "#424242",
    },
    spacing: {
        base: 8,
        double: 16,
        triple: 24,
        quadro: 32,
    },
    radius: {
        base: 10,
        double: 20,
        triple: 30,
    },
    fontSize: {
        small: 14,
        body: 16,
        large: 20,
        h1: 52,
        h2: 46,
        h3: 40,
        h4: 36,
        h5: 30,
        h6: 24,
        subtitle: 22,
    },
};
