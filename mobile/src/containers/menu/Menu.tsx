import I18n from 'i18n-js';
import React, {useMemo} from 'react';
import { StyleSheet } from 'react-native';
import {View, Text} from 'react-native';
import ButtonGroup from '../../components/buttons/ButtonGroup';
import IconButton from '../../components/buttons/IconButton';
import Divider from '../../components/divider/Divider';
import Typography from '../../components/typograpy/Typography';
import { useStyles } from '../../hooks/useStyles';
import {useTheme} from '../../providers/ThemeProvider';
import { Theme } from '../../types/ITheme';

const createStyle = (theme: Theme) => StyleSheet.create({
    box: {
        flex: 1,
        paddingHorizontal: theme.spacing.double
    },
    title: {
        paddingBottom: theme.spacing.base
    },
    item: {
        marginVertical: theme.spacing.double
    },
    version: {
        ...StyleSheet.absoluteFillObject,
        bottom: 10,
        right: 10
    },
    socialBox: {
        paddingTop: theme.spacing.double,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
const Menu: React.FC = () => {
    const {theme, setTheme} = useTheme();
    const styles = useStyles(createStyle)
    const buttons = useMemo(
        () => [
            {
                title: I18n.t('Dark'),
                value: 'dark',
            },
            {
                title: I18n.t('Light'),
                value: 'light',
            },
        ],
        []
    );
    const selectedIndex = buttons.findIndex(({value}) => value === theme.id);
    return (
        <View style={styles.box}>
            <Typography style={styles.title} variant="h6">{I18n.t('Menu')}</Typography>
            <ButtonGroup onChange={val => setTimeout(() => setTheme(val as any), 300)} selectedIndex={selectedIndex} buttons={buttons} />
            <Divider />
            <Typography style={styles.item} bold variant="subtitle">{I18n.t('Report bug')}</Typography>
            <Typography style={styles.item} bold variant="subtitle">{I18n.t('About project')}</Typography>
            <Divider />
            <Typography style={[styles.title, styles.title]}  variant="h6">{I18n.t('Connect us')}</Typography>
            <View style={styles.socialBox}>
                <IconButton 
                    icon="instagram"
                    onPress={() => null}
                />
                <IconButton 
                    icon="facebook"
                    onPress={() => null}
                />
                <IconButton 
                    icon="vk"
                    onPress={() => null}
                />
            </View>
        </View>
    );
};

export default Menu;
