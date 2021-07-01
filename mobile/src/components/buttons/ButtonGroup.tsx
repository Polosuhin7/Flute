import * as React from 'react';
import {useState} from 'react';
import {LayoutChangeEvent, Pressable, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {useStyles} from '../../hooks/useStyles';
import {Theme} from '../../types/ITheme';
import Typography from '../typograpy/Typography';

const createStyle = (theme: Theme) => ({
    box: {
        borderWidth: 1,
        borderColor: theme.color.border,
        borderRadius: theme.radius.double,
        flexDirection: 'row',
        paddingVertical: theme.spacing.double,
    },
    button: {
        flex: 1,
    },
    buttonText: {
        textAlign: 'center',
    },
    cursror: {
        position: 'absolute',
        top: -1,
        left: 0,
        borderWidth: 3,
        borderColor: theme.color.active,
        borderRadius: theme.radius.double,
    },
});
export interface ButtonGroupButton {
    title: string;
    value: any;
}
interface ButtonGroupProps {
    selectedIndex: number;
    buttons: ButtonGroupButton[];
    onChange(val: ButtonGroupButton): void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({selectedIndex, buttons, onChange}) => {
    const styles = useStyles(createStyle);
    const cursorOffset = useSharedValue(0);
    const [cursorWidth, setCursorWidth] = useState(0);
    const [cursorHeight, setCursorHeight] = useState(0);

    const animateCursor = useAnimatedStyle(() => ({
        left: cursorOffset.value,
    }));

    const onLayout = (e: LayoutChangeEvent) => {
        const {width, height} = e.nativeEvent.layout;
        setCursorHeight(height);
        setCursorWidth(width / buttons.length);
        setActive(selectedIndex);
    };

    const setActive = (index: number) => {
        cursorOffset.value = withSpring(index * cursorWidth, {damping: 17});
    };
    const onPress = (val: any, index: number) => {
        setActive(index);
        onChange(val);
    };

    return (
        <View onLayout={onLayout} style={styles.box as any}>
            {buttons.map(({title, value}, index) => {
                return (
                    <Pressable
                        key={`${title}-${index}`}
                        onPress={() => onPress(value, index)}
                        style={styles.button}>
                        <Typography style={styles.buttonText as any}>{title}</Typography>
                    </Pressable>
                );
            })}
            <Animated.View
                style={[animateCursor, styles.cursror, {width: cursorWidth, height: cursorHeight}]}
            />
        </View>
    );
};
export default ButtonGroup;
