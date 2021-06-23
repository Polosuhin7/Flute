import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { useStyles } from "../../hooks/useStyles";
import { Theme } from "../../types/ITheme";

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        base: {
            fontFamily: "Gilroy",
        },
        small: {
            fontSize: theme.fontSize.small,
        },
        body: {
            fontSize: theme.fontSize.body,
        },
        large: {
            fontSize: theme.fontSize.large,
        },
        h1: {
            fontSize: theme.fontSize.h1,
            fontFamily: 'GilroySemibold'
        },
        h2: {
            fontSize: theme.fontSize.h2,
            fontFamily: 'GilroySemibold'
        },
        h3: {
            fontSize: theme.fontSize.h3,
            fontFamily: 'GilroySemibold'
        },
        h4: {
            fontSize: theme.fontSize.h4,
            fontFamily: 'GilroySemibold'
        },
        h5: {
            fontSize: theme.fontSize.h5,
            fontFamily: 'GilroySemibold'
        },
        h6: {
            fontSize: theme.fontSize.h6,
            fontFamily: 'GilroySemibold'
        },
        subtitle: {
            fontSize: theme.fontSize.subtitle,
        },
    });

type TextVariant = "small" | "body" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle";

export interface TypographyProps {
    style?: TextStyle | TextStyle[];
    variant?: TextVariant
}
const Typography: React.FC<TypographyProps> = ({ style = {}, variant = 'body', children }) => {
    const styles = useStyles(createStyles);

    return <Text style={[styles.base, styles[variant],  style]}>{children}</Text>;
};

export default Typography;
