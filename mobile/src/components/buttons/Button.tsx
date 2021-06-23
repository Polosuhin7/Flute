import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle} from 'react-native'
import { useStyles } from '../../hooks/useStyles';
import { Theme } from '../../types/ITheme';
import Typography from '../typograpy/Typography';


const createContainerStyles = (theme: Theme) => StyleSheet.create({
    base: {
        borderRadius: theme.radius.base,
    },
    filled: {
        backgroundColor: theme.color.primary,
    },
    outlined: {
        borderStyle: 'solid',
        borderColor: theme.color.active,
        borderWidth: 1
    }
});

const createTextStyles = (theme: Theme) => StyleSheet.create({
    filled: {
        color: theme.color.secondary
    },
    outlined: {
        color: theme.color.active,

    }
});

const createButtonSizeStyles = (theme: Theme) => StyleSheet.create({
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


const createTextSizeStyles = (theme: Theme) => StyleSheet.create({
    sm: {
        fontSize: theme.fontSize.small
    },
    md: {
        fontSize: theme.fontSize.body
    },
    lg: {
        fontSize: theme.fontSize.large
    },

});

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = 'filled' | 'outlined';

export interface ButtonProps {
    onPress(e: any): void;
    text: string;
    style?: ViewStyle;
    variant?: ButtonVariant;
    size?: ButtonSize;
}
const Button: React.FC<ButtonProps> = ({onPress, text, style, variant = 'filled', size = "md"}) => {

    const containerStyles = useStyles(createContainerStyles);
    const textStyles = useStyles(createTextStyles);
    const buttonSizeStyle = useStyles(createButtonSizeStyles);
    const textSizeStyle = useStyles(createTextSizeStyles);

    return (
        <TouchableOpacity activeOpacity={0.7}  style={[buttonSizeStyle[size], containerStyles.base, containerStyles[variant], style]} onPress={onPress}>
            <Typography style={[textSizeStyle[size], textStyles[variant]]}>{text}</Typography>
        </TouchableOpacity>
    )
}

export default Button;