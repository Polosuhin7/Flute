import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, Text, ViewStyle, Pressable } from "react-native";
import { useStyles } from "../../hooks/useStyles";
import { Theme } from "../../types/ITheme";
import Typography from "../typograpy/Typography";
import { FontAwesome5 } from "@expo/vector-icons";

const createContainerStyles = (theme: Theme) =>
    StyleSheet.create({
        base: {
            borderRadius: theme.radius.base,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        fluid: {
            flex: 1
        },
        icon: {
            paddingLeft: theme.spacing.base,
        },
        filled: {
            backgroundColor: theme.color.primary,
        },
        outlined: {
            borderStyle: "solid",
            borderColor: theme.color.active,
            borderWidth: 1,
        },
        'outlined-secondary': {
            borderStyle: "solid",
            borderColor: theme.color.border,
            borderWidth: 1,
        },
        'outlined-active': {
            borderStyle: "solid",
            borderColor: theme.color.border,
            backgroundColor: theme.color.activeBlur,
            borderWidth: 1,
        },
    });

const createTextStyles = (theme: Theme) =>
    StyleSheet.create({
        filled: {
            color: theme.color.secondary,
        },
        outlined: {
            color: theme.color.active,
        },
        'outlined-secondary': {
            color: theme.color.text,
        },
        'outlined-active': {
            color: theme.color.active,
        }
    });

const createButtonSizeStyles = (theme: Theme) =>
    StyleSheet.create({
        sm: {
            paddingVertical: theme.spacing.base,
            paddingHorizontal: theme.spacing.double,
        },
        md: {
            paddingVertical: theme.spacing.double,
            paddingHorizontal: theme.spacing.quadro,
        },
        lg: {
            paddingVertical: theme.spacing.double,
            paddingHorizontal: theme.spacing.quadro * 1.5,
        },
    });

const createTextSizeStyles = (theme: Theme) =>
    StyleSheet.create({
        sm: {
            fontSize: theme.fontSize.small,
        },
        md: {
            fontSize: theme.fontSize.body,
        },
        lg: {
            fontSize: theme.fontSize.large,
        },
    });

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "filled" | "outlined" | "outlined-secondary" | "outlined-active";

export interface ButtonProps {
    onPress(e: any): void;
    text?: string;
    style?: ViewStyle;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    fluid?: boolean
}
const Button: React.FC<ButtonProps> = ({ onPress, text, icon, fluid, style, variant = "filled", size = "md" }) => {
    const containerStyles = useStyles(createContainerStyles);
    const textStyles = useStyles(createTextStyles);
    const buttonSizeStyle = useStyles(createButtonSizeStyles);
    const textSizeStyle = useStyles(createTextSizeStyles);

    const containerStyle = useMemo(() => {
        const containerStyle = [buttonSizeStyle[size], containerStyles.base, containerStyles[variant], style]
        if(fluid) {
            containerStyle.push(containerStyles.fluid)
        }
        return containerStyle
    }, [variant, style])

    const _onPress = () => {
        onPress({});
    }
    return (
        <Pressable
            // activeOpacity={0.7}
            style={containerStyle}
            onPress={_onPress}>
            {text && <Typography style={[textSizeStyle[size], textStyles[variant]]}>{text}</Typography>}
            {icon && (
                <FontAwesome5
                    style={[containerStyles.icon, textStyles[variant], textSizeStyle[size]]}
                    name={icon}
                />
            )}
        </Pressable>
    );
};

export default Button;
