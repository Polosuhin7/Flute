import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyles } from '../../hooks/useStyles';
import { Theme } from '../../types/ITheme';
import Typography from '../typograpy/Typography';


const createSyles = (theme: Theme) => StyleSheet.create({
    dot: {
        marginHorizontal: theme.spacing.base,
        color: theme.color.secondary,
    },
    line: {
        flexDirection: 'row',
        width: '100%',
        height: 1,
        backgroundColor: theme.color.border,
        marginVertical: theme.spacing.double
    }
});
interface DividerProps {
    variant?: DividerVariant;
}

type DividerVariant = 'dot' | 'line';

const Divider: React.FC<DividerProps> = ({variant = 'line'}) => {
    const styles = useStyles(createSyles);

    if(variant === 'dot') {
        return <Typography style={styles.dot}>•</Typography>
    }
    return <View style={styles.line} />
}

export default Divider;