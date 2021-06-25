import { observer } from "mobx-react";
import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Typography from "../../components/typograpy/Typography";
import { useStyles } from "../../hooks/useStyles";
import stores from "../../stores/stores";
import { ESheetState } from "../../types/ESheetState";
import { Theme } from "../../types/ITheme";
import { IOrganization } from "../../types/organization/IOrganization";
import {getDistance} from 'geolib';
import { getGeoDistance } from "../../utils/getGeoDistance";
import Divider from "../../components/divider/Divider";
import { textToOrganizationClosed } from "../../utils/orgnizationSheduleHelper";

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {},
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
            flexDirection: "row",
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
const { organization, navigation, app } = stores;
const OrganizationList: React.FC<any> = () => {
    const styles = useStyles(createStyles);
    const { list, fetchData, loading } = organization;
    const {location} = app;
    return (
        <FlatList
            data={list}
            refreshing={loading}
            onRefresh={fetchData}
            keyExtractor={(card) => card.title}
            renderItem={({ item }: ListRenderItemInfo<IOrganization>) => (
                <TouchableOpacity onPress={() => {
                    organization.setActiveOrganization(item);
                    navigation.navigate('organizationItem', ESheetState.HALF);
                }}>
                    <View style={styles.item} key={item.id + item.title}>
                        <View style={styles.titleContainer}>
                            <Typography variant='h5' style={styles.itemText}>
                                {item.title}
                            </Typography>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <View>
                                <Typography style={styles.destinatioText}>{getGeoDistance(location, item.coordinate)} км</Typography>
                            </View>
                            <Divider variant="dot" />
                            <View>
                            {item.shedule && <Typography style={styles.workhoursText}>{textToOrganizationClosed(item.shedule)}</Typography>}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default observer(OrganizationList);
