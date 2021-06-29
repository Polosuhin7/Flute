import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { observer } from "mobx-react";
import * as React from "react";
import { ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../../components/buttons/Button";
import Divider from "../../components/divider/Divider";
import Typography from "../../components/typograpy/Typography";
import { useStyles } from "../../hooks/useStyles";
import stores from "../../stores/stores";
import { ESheetState } from "../../types/ESheetState";
import { Theme } from "../../types/ITheme";
import { IOrganization } from "../../types/organization/IOrganization";
import { getGeoDistance } from "../../utils/getGeoDistance";
import { textToOrganizationClosed } from "../../utils/orgnizationSheduleHelper";

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {},
        title: {
            paddingBottom: theme.spacing.double,
        },
        filterGroup: {
            flexDirection: "row",
            // height: 50,
            paddingBottom: theme.spacing.triple,
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
    const { list, fetchData, loading, filter, toogleFileter } = organization;
    const { location } = app;
    return (
        <>
            <Typography style={styles.title} variant='h4'>
                Бары
            </Typography>
            <View style={styles.filterGroup}>
                <Button
                    style={styles.filterItem}
                    size='sm'
                    variant={filter === "favorite" ? "outlined-active" : "outlined-secondary"}
                    text='Избраные'
                    icon='heart'
                    onPress={() => toogleFileter("favorite")}
                />
                <Button
                    style={styles.filterItem}
                    size='sm'
                    variant={filter === "open-now" ? "outlined-active" : "outlined-secondary"}
                    text='Открыто сейчас'
                    icon='clock'
                    onPress={() => toogleFileter("open-now")}
                />
            </View>

            <BottomSheetFlatList
                data={list}
                refreshing={loading}
                onRefresh={fetchData}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(card) => card.title}
                renderItem={({ item }: ListRenderItemInfo<IOrganization>) => (
                    <TouchableOpacity
                        onPress={() => {
                            organization.setActiveOrganization(item);
                            navigation.navigate("organizationItem", ESheetState.HALF);
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
