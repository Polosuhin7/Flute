export interface Theme {
    id: string;
    color: {
        primary: string;
        secondary: string;
        active: string;
        text: string;
        border: string;
        layout: string;
    };
    spacing: {
        base: number;
        double: number;
        triple: number;
        quadro: number;
    };
    radius: {
        base: number;
        double: number;
        triple: number;
    };
    fontSize: {
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
    };
}
