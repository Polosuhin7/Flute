import I18n from 'i18n-js';
import React, {useMemo} from 'react';
import {useState} from 'react';
import {Animated, StyleSheet, Text, TextStyle, View} from 'react-native';
import {useStyles} from '../../hooks/useStyles';
import {Theme} from '../../types/ITheme';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        base: {
            fontFamily: 'Gilroy',
            color: theme.color.text,
        },
        elipsisButton: {
            color: theme.color.active,
            fontFamily: 'GilroySemibold',
        },
        bold: {
            fontFamily: 'GilroySemibold',
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
            fontFamily: 'GilroySemibold',
        },
        h2: {
            fontSize: theme.fontSize.h2,
            fontFamily: 'GilroySemibold',
        },
        h3: {
            fontSize: theme.fontSize.h3,
            fontFamily: 'GilroySemibold',
        },
        h4: {
            fontSize: theme.fontSize.h4,
            fontFamily: 'GilroySemibold',
        },
        h5: {
            fontSize: theme.fontSize.h5,
            fontFamily: 'GilroySemibold',
        },
        h6: {
            fontSize: theme.fontSize.h6,
            fontFamily: 'GilroySemibold',
        },
        subtitle: {
            fontSize: theme.fontSize.subtitle,
        },
    });

type TextVariant = 'small' | 'body' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle';

export interface TypographyProps {
    numberOfLines?: number;
    style?: TextStyle | TextStyle[];
    variant?: TextVariant;
    bold?: boolean;
}
const Typography: React.FC<TypographyProps> = ({
    numberOfLines = 0,
    style = {},
    variant = 'body',
    bold,
    children,
}) => {
    const styles = useStyles(createStyles);
    const [lines, setLines] = useState(numberOfLines);
    const textSyles = useMemo(() => {
        const _styles = [styles.base, styles[variant], style];
        if (bold) {
            _styles.push(styles.bold);
        }
        return _styles;
    }, [style]);

    return (
        <>
            <Animated.Text numberOfLines={lines} style={textSyles}>{children}</Animated.Text>
            {lines ? <Text onPress={() => setLines(0)} style={styles.elipsisButton} numberOfLines={lines} >{I18n.t('more')}</Text> : null}
            {/* <Text style={styles.elipsisButton} onPress={() => setLines(0)}>{I18n.t('more')}</Text> */}
        </>
    );
};

export default Typography;
