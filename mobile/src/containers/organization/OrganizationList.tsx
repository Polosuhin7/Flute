import I18n from 'i18n-js';
import {observer} from 'mobx-react';
import * as React from 'react';
import {ListRenderItemInfo, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BottomSheetFlatList from '../../components/BottomSheet/BottomSheetFlatList';
import Button from '../../components/buttons/Button';
import Divider from '../../components/divider/Divider';
import Typography from '../../components/typograpy/Typography';
import {useStyles} from '../../hooks/useStyles';
import { useTheme } from '../../providers/ThemeProvider';
import stores from '../../stores/stores';
import {ESheetState} from '../../types/ESheetState';
import {Theme} from '../../types/ITheme';
import {IOrganization} from '../../types/organization/IOrganization';
import {OrganizationFilterType} from '../../types/organization/OrganizationFilterType';
import {getGeoDistance} from '../../utils/getGeoDistance';
import {textToOrganizationClosed} from '../../utils/sheduleHelper';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        layout: {
            backgroundColor: theme.color.layout,
        },
        container: {
            paddingHorizontal: theme.spacing.double,
        },
        title: {
            paddingBottom: theme.spacing.double,
        },
        filterGroup: {
            flexDirection: 'row',
            maxHeight: 60,
            paddingBottom: theme.spacing.double,
            marginHorizontal: -theme.spacing.double,
            zIndex: 1000500,
        },
        filterItem: {
            marginRight: theme.spacing.base,
        },
        item: {
            // marginHorizontal: theme.spacing.triple,
            paddingVertical: theme.spacing.double,
            borderBottomWidth: 1,
            borderColor: theme.color.border,
        },
        itemText: {
            color: theme.color.text,
        },
        titleContainer: {
            paddingBottom: theme.spacing.base,
        },
        descriptionContainer: {
            flexDirection: 'row',
        },
        destinatioText: {
            color: theme.color.active,
        },
        workhoursText: {
            color: theme.color.secondary,
        },
        pricesText: {
            color: theme.color.secondary,
        },
        dot: {
            marginHorizontal: theme.spacing.base,
            color: theme.color.secondary,
        },
    });
const {organization, app} = stores;
interface IOrganizationListProps {
    onOrganizationSelect(val: IOrganization): void;
}

interface IFilterGroup {
    value: OrganizationFilterType;
    text: string;
    icon: string;
}
const filtersGroup: IFilterGroup[] = [
    {
        text: 'Favorites',
        value: 'favorite',
        icon: 'heart',
    },
    {
        text: 'Open now',
        value: 'open-now',
        icon: 'clock',
    },
    {
        text: 'To go',
        value: 'togo',
        icon: 'hand-spock',
    },
    {
        text: 'Veranda',
        value: 'veranda',
        icon: 'archway',
    },
];
const OrganizationList: React.FC<IOrganizationListProps> = ({onOrganizationSelect}) => {
    const styles = useStyles(createStyles);
    const {theme} = useTheme();
    const {list, fetchData, loading, filter, toogleFileter} = organization;
    const {location} = app;
    return (
        <>
            <View style={styles.container}>
                <Typography style={styles.title} variant='h4'>
                    {I18n.t('Bars')}
                </Typography>
                <View style={styles.filterGroup}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        {filtersGroup.map(({value, text, icon}, index) => {
                            return (
                                <Button
                                    key={value}
                                    style={[styles.filterItem, {marginLeft: !index ? theme.spacing.double : 0 }] as any}
                                    size='sm'
                                    variant={
                                        filter === value ? 'outlined-active' : 'outlined-secondary'
                                    }
                                    text={I18n.t(text)}
                                    icon={icon}
                                    onPress={() => toogleFileter(value)}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
            <BottomSheetFlatList
                style={styles.container}
                data={list}
                // refreshing={loading}
                // onRefresh={fetchData}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(card) => card.title}
                renderItem={({item}: ListRenderItemInfo<IOrganization>) => (
                    <TouchableOpacity
                        onPress={() => {
                            organization.setActiveOrganization(item);
                            onOrganizationSelect(item);
                        }}>
                        <View style={styles.item} key={item.id + item.title}>
                            <View style={styles.titleContainer}>
                                <Typography variant='h5' style={styles.itemText}>
                                    {item.title}
                                </Typography>
                            </View>
                            <View style={styles.descriptionContainer}>
                                <View>
                                    <Typography style={styles.destinatioText}>
                                        {getGeoDistance(location, item.coordinate)} км
                                    </Typography>
                                </View>
                                <Divider variant='dot' />
                                <View>
                                    {item.shedule && (
                                        <Typography style={styles.workhoursText}>
                                            {textToOrganizationClosed(item.shedule)}
                                        </Typography>
                                    )}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </>
    );
};

export default observer(OrganizationList);
