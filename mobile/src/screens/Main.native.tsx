import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import IconButton from '../components/buttons/IconButton';
import {IOrganization} from '../types/organization/IOrganization';
import OrganizationItem from '../containers/organization/OrganizationItem';
import OrganizationList from '../containers/organization/OrganizationList';
import OrganizationMap from '../containers/organization/OrganizationMap';
import {Pressable, StyleSheet, View} from 'react-native';
import {useStyles} from '../hooks/useStyles';
import {Theme} from '../types/ITheme';
import Menu from '../containers/menu/Menu';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import * as Linking from 'expo-linking';
import stores from '../stores/stores';
const {organization} = stores;
const createStyle = (theme: Theme) =>
    StyleSheet.create({
        menuButton: {
            ...StyleSheet.absoluteFillObject,
            top: 50,
            left: 20,
            width: 50,
            height: 50,
        },
        backdrop: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: theme.color.layout,
            opacity: 0.5,
        },
        backdropBox: {
            ...StyleSheet.absoluteFillObject,
        },
    });

const listSnapPoints = [110, 110, '85%'];
const itemSnapPoints = [-100, 0, 150, '90%'];
const menuSnapPoints = [-100, 0, 150, 400];

const Main: React.FC<any> = () => {
    const styles = useStyles(createStyle);
    const [listState, setListState] = useState(0);
    const [itemState, setItemState] = useState(0);
    const [menuState, setMenuState] = useState(0);
    const opacityValue = useSharedValue(0);

    const opacityStyle = useAnimatedStyle(() => ({
        opacity: withSpring(opacityValue.value),
    }));

    const onOrganizationSelect =  (val: IOrganization) => {
        setItemState(listState > 1 ? 3 : 2);
    };

    const openMenu = () => {
        setListState(0);
        setItemState(0);
        setMenuState(3);
    };

    useEffect(() => {
        opacityValue.value = menuState > 2 ? 0.5 : 0;
    }, [menuState]);

    useEffect(() => {
        Linking.addEventListener('url', ({url}) => {
            const {queryParams, path} = Linking.parse(url);
            if (path?.includes('organization')) {
                const targetOragnization = organization.list.find(({id}) => id == queryParams.id);
                if (targetOragnization) {
                    organization.setActiveOrganization(targetOragnization);
                    onOrganizationSelect(targetOragnization);
                }
            }
        });
    }, []);

    return (
        <>
            <OrganizationMap onOrganizationSelect={onOrganizationSelect} />
            <IconButton
                size='md'
                variant='secondary'
                style={styles.menuButton}
                icon='bars'
                onPress={openMenu}
            />
            <BottomSheet state={listState} snapPoints={listSnapPoints} onChange={setListState}>
                <OrganizationList onOrganizationSelect={onOrganizationSelect} />
            </BottomSheet>
            <BottomSheet state={itemState} onChange={setItemState} snapPoints={itemSnapPoints}>
                <OrganizationItem />
            </BottomSheet>

            {menuState > 1 && (
                <Pressable
                    onPress={() => setMenuState(0)}
                    style={[styles.backdropBox, {display: menuState > 0 ? 'flex' : 'none'}]}>
                    <Animated.View style={[styles.backdrop, opacityStyle]} />
                </Pressable>
            )}

            <BottomSheet state={menuState} onChange={setMenuState} snapPoints={menuSnapPoints}>
                <Menu />
            </BottomSheet>
        </>
    );
};

export default observer(Main);
