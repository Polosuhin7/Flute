import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { useStyles } from '../../hooks/useStyles';
import { Theme } from '../../types/ITheme';

const createContainerStyles = (theme: Theme) =>
    StyleSheet.create({
        base: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        primary: {
            backgroundColor: theme.color.primary,
        },
        secondary: {
            backgroundColor: theme.color.secondary,
        },
        active: {
            backgroundColor: theme.color.active,
        },
    });

const createTextStyles = (theme: Theme) =>
    StyleSheet.create({
        primary: {
            color: theme.color.secondary,
        },
        secondary: {
            color: theme.color.primary,
        },
        active: {
            color: theme.color.active,
        },
    });

const createButtonSizeStyles = (theme: Theme) =>
    StyleSheet.create({
        xs: {
            width: 20,
            height: 20,
            borderRadius: 20,
        },
        sm: {
            width: 40,
            height: 40,
            borderRadius: 40,
        },
        md: {
            width: 50,
            height: 50,
            borderRadius: 50,
        },
        lg: {
            width: 70,
            height: 70,
            borderRadius: 70,
        },
    });

const createTextSizeStyles = (theme: Theme) =>
    StyleSheet.create({
        xs: {
            fontSize: theme.fontSize.small,
        },
        sm: {
            fontSize: theme.fontSize.body,
        },
        md: {
            fontSize: theme.fontSize.large,
        },
        lg: {
            fontSize: theme.fontSize.h5,
        },
    });

type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';
type ButtonVariant = 'primary' | 'secondary' | 'active';

export interface ButtonProps {
    onPress(e: any): void;
    style?: ViewStyle;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    active?: boolean;
}
const IconButton: React.FC<ButtonProps> = ({
    onPress,
    icon,
    style,
    variant = 'primary',
    size = 'md',
    active,
}) => {
    const containerStyles = useStyles(createContainerStyles);
    const textStyles = useStyles(createTextStyles);
    const buttonSizeStyle = useStyles(createButtonSizeStyles);
    const textSizeStyle = useStyles(createTextSizeStyles);

    const scaleValue = useSharedValue(1);

    const scaleStyles = useAnimatedStyle(() => ({
        transform: [{scale: scaleValue.value}],
    }));

    const iconStyles = [textStyles[variant], textSizeStyle[size]];
    if (active) {
        iconStyles.push(textStyles.active);
    }

    const onPressIn = () => {
        scaleValue.value = withSpring(0.95);
    };
    const onPressOut = () => {
        scaleValue.value = withSpring(1);
    };

    return (
        <Pressable style={style} onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
            <Animated.View
                style={[
                    scaleStyles,
                    buttonSizeStyle[size],
                    containerStyles.base,
                    containerStyles[variant],
                ]}>
                <FontAwesome5 style={iconStyles} name={icon} />
            </Animated.View>
        </Pressable>
    );
};

export default IconButton;
