import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { View } from 'react-native';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { useStyles } from '../../hooks/useStyles';
import { Theme } from '../../types/ITheme';
import { IOrganization } from '../../types/organization/IOrganization';
import OrganizationItem from './OrganizationItem';
import OrganizationList from './OrganizationList';
import OrganizationMap from './OrganizationMap';
const {height, width} = Dimensions.get('window');
const isDesktop = width > 1024;
const listSnapPoints = isDesktop ? [height, height] : [120, 120, height - 200];
const itemSnapPoints = isDesktop ? [-100, 0, height - 100, height - 100] : [-100, 0, 160, height - 100];

const createStyles = (theme: Theme) => StyleSheet.create({
    box: {
        flex: 1, 
        flexDirection: 'row' 
    },
    map: {
        flex: 3
    },
    list: {
        flex: 1.5,
        backgroundColor: theme.color.layout,
        borderLeftWidth: 1,
        borderLeftColor: theme.color.border
    }
})

const Organizations: React.FC<any> = () => {
    const styles = useStyles(createStyles)
    const [listState, setListState] = useState(0);
    const [itemState, setItemState] = useState(0);

    const onOrganizationSelect = useCallback(
        (val: IOrganization) => {
            setItemState((listState > 1 || listState === 0) ? 3 : 2);
        },
        [listState]
    );
    if(isDesktop) {
        return (
            <View style={styles.box}>
                <View style={styles.list}>
                <BottomSheet state={listState} snapPoints={listSnapPoints} onChange={setListState}>
                    <OrganizationList onOrganizationSelect={onOrganizationSelect} />
                </BottomSheet>
                </View>
                <View style={styles.map}>
                    <OrganizationMap onOrganizationSelect={onOrganizationSelect} />
                    <BottomSheet state={itemState} onChange={setItemState} snapPoints={itemSnapPoints}>
                        <OrganizationItem />
                    </BottomSheet>
                </View>
            </View>
        );
    }
    return (
        <View style={{ height }}>
            <OrganizationMap onOrganizationSelect={onOrganizationSelect} />
            <BottomSheet state={listState} snapPoints={listSnapPoints} onChange={setListState}>
                <OrganizationList onOrganizationSelect={onOrganizationSelect} />
            </BottomSheet>
            <BottomSheet state={itemState} onChange={setItemState} snapPoints={itemSnapPoints}>
                <OrganizationItem />
            </BottomSheet>
        </View>
    );
};

export default observer(Organizations);
