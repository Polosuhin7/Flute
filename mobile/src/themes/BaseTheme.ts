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
        small: 4,
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
        h1: 46,
        h2: 42,
        h3: 38,
        h4: 34,
        h5: 30,
        h6: 22,
        subtitle: 18,
    },
};
