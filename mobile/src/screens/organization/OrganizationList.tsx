import { observer } from "mobx-react";
import React from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import stores from "../../stores/stores";
import { IOrganization } from "../../types/organization/IOrganization";
const { organization, navigation} = stores;
const OrganizationList: React.FC<any> = () => {
    const { activeOrganization, list, fetchData, loading } = organization;

    return (
        <>
            <Text>{activeOrganization?.title}</Text>
            <FlatList
                data={list}
                // onEndReached={fetchDataMore}
                // onEndReachedThreshold={0.5}
                refreshing={loading}
                onRefresh={fetchData}
                keyExtractor={(card) => card.title}
                renderItem={({ item }: ListRenderItemInfo<IOrganization>) => (
                    <View key={item.id + item.title}>
                        <Text>{item.title}</Text>
                    </View>
                )}
            />
        </>
    );
};

export default observer(OrganizationList);
