import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import { Dimensions, useColorScheme, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import stores from "../../stores/stores";
import { ESheetState } from "../../types/ESheetState";
import customStyle from "../../../assets/maps-style.json";
const { width, height } = Dimensions.get("window");

const { organization, navigation } = stores;

const OrganizationMap: React.FC = () => {
    const colorScheme = useColorScheme();
    const { activeOrganization, fetchData, list: data, setActiveOrganization } = organization;
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <MapView
                initialRegion={{
                    latitude: 50.2,
                    longitude: 50.21,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                zoomEnabled
                zoomControlEnabled
                provider={PROVIDER_GOOGLE}
                style={{ width, height }}
                customMapStyle={colorScheme === "dark" ? customStyle : []}>
                {toJS(data).map((organization) => {
                    const { coordinate, title, id } = organization;
                    return (
                        <Marker
                            onPress={() => {
                                setActiveOrganization(organization);
                                navigation.setNavigationState("organizationItem", ESheetState.HALF);
                            }}
                            key={title + id}
                            {...{ coordinate, pinColor: "#000" }}>
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: activeOrganization ? "red" : "#000",
                                    borderRadius: 20,
                                }}
                            />
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

export default observer(OrganizationMap);
