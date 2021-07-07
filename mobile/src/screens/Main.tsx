import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import {useStyles} from '../hooks/useStyles';
import {Theme} from '../types/ITheme';
import {IOrganization} from '../types/organization/IOrganization';
import OrganizationItem from '../containers/organization/OrganizationItem';
import OrganizationList from '../containers/organization/OrganizationList';
import OrganizationMap from '../containers/organization/OrganizationMap';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import IconButton from '../components/buttons/IconButton';
import Menu from '../containers/menu/Menu';
import * as Linking from 'expo-linking';
import stores from '../stores/stores';

const {organization} = stores;
const {height, width} = Dimensions.get('window');
const isDesktop = width > 1024;
const listSnapPoints = isDesktop ? [height, height] : [120, 120, height - 200];
const menuSnapPoints = [-100, 0, 400, 400];
const itemSnapPoints = isDesktop
    ? [-100, 0, height - 100, height - 100]
    : [-100, 0, 160, height - 100];

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        box: {
            flex: 1,
            flexDirection: 'row',
        },
        map: {
            flex: 3,
        },
        list: {
            flex: 1.5,
            backgroundColor: theme.color.layout,
            borderRightWidth: 1,
            borderRightColor: theme.color.border,
        },
        menuButton: {
            ...StyleSheet.absoluteFillObject,
            top: 25,
            left: 20,
            width: 50,
            height: 50,
            zIndex: 100500,
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

const Organizations: React.FC<any> = () => {
    const styles = useStyles(createStyles);
    const [listState, setListState] = useState(0);
    const [itemState, setItemState] = useState(0);
    const [menuState, setMenuState] = useState(0);

    const opacityValue = useSharedValue(0);

    const opacityStyle = useAnimatedStyle(
        () => ({
            opacity: withSpring(opacityValue.value),
        }),
        [opacityValue.value, menuState]
    );

    const openMenu = () => {
        setListState(0);
        setItemState(0);
        setMenuState(3);
    };

    useEffect(() => {
        opacityValue.value = menuState > 0 ? 0.5 : 0;
    }, [menuState]);

    const onOrganizationSelect = useCallback(
        (val: IOrganization) => {
            setItemState(listState > 1 || listState === 0 ? 3 : 2);
            history.pushState({}, '', `?organization_id=${val.id}`)
        },
        [listState]
    );

    useEffect(() => {
        Linking.addEventListener('url', ({url}) => {
            const {queryParams, path} = Linking.parse(url);
            if(queryParams.organization_id) {
                const targetOragnization = organization.list.find(({id}) => id == queryParams.organization_id)
                console.log('targetOragnization', targetOragnization);
                console.log('organization.list', organization.list);
                if(targetOragnization) {
                    organization.setActiveOrganization(targetOragnization);
                    onOrganizationSelect(targetOragnization);
                }
            }
        });
    }, []);

    if (isDesktop) {
        return (
            <View style={styles.box}>
                <View style={styles.list}>
                    <BottomSheet
                        state={listState}
                        snapPoints={listSnapPoints}
                        onChange={setListState}>
                        <OrganizationList onOrganizationSelect={onOrganizationSelect} />
                    </BottomSheet>
                </View>
                <View style={styles.map}>
                    <OrganizationMap onOrganizationSelect={onOrganizationSelect} />

                    <IconButton
                        size='md'
                        variant='secondary'
                        style={styles.menuButton}
                        icon='bars'
                        onPress={openMenu}
                    />

                    <BottomSheet
                        state={itemState}
                        onChange={setItemState}
                        snapPoints={itemSnapPoints}>
                        <OrganizationItem />
                    </BottomSheet>

                    <Pressable
                        onPress={() => setMenuState(0)}
                        style={[styles.backdropBox, {display: menuState > 0 ? 'flex' : 'none'}]}>
                        <Animated.View style={[styles.backdrop, opacityStyle]} />
                    </Pressable>

                    <BottomSheet
                        state={menuState}
                        onChange={setMenuState}
                        snapPoints={menuSnapPoints}>
                        <Menu />
                    </BottomSheet>
                </View>
            </View>
        );
    }
    return (
        <View style={{height}}>
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

            <Pressable
                onPress={() => setMenuState(0)}
                style={[styles.backdropBox, {display: menuState > 0 ? 'flex' : 'none'}]}>
                <Animated.View style={[styles.backdrop, opacityStyle]} />
            </Pressable>

            <BottomSheet state={menuState} onChange={setMenuState} snapPoints={menuSnapPoints}>
                <Menu />
            </BottomSheet>
        </View>
    );
};

export default observer(Organizations);
