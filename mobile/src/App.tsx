import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Button, Dimensions, View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import customStyle from "../assets/maps-style.json";
import Navigator from './navigation/BottomSheetStack';
import stores from "./stores/stores";
import { ESheetState } from "./types/ESheetState";
const { width, height } = Dimensions.get("window");

const { organization, navigation } = stores;

const App = () => {
    const colorScheme = useColorScheme();
    const { activeOrganization, fetchData, list: data, setActiveOrganization } = organization;
    React.useEffect(() => {fetchData();}, []);
    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "papayawhip",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <View style={{ backgroundColor: 'red', position: 'absolute', top: 50, left: 50, zIndex: 100500 }}>
                        <Button title="123123sasr" onPress={() => {
                            navigation.setNavigationState('menu', ESheetState.HALF)
                            navigation.setNavigationState('organizationList', ESheetState.HIDE)
                        }}></Button>
                    </View>
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
                                <Marker onPress={() => {
                                    setActiveOrganization(organization);
                                    navigation.setNavigationState('organizationItem', ESheetState.HALF);
                                }} key={title + id} {...{ coordinate, pinColor: "#000" }}>
                                    <View style={{
                                        width: 20,
                                        height: 20,
                                        backgroundColor: activeOrganization ? 'red' :'#000',
                                        borderRadius: 20,
    
                                    }}/>
                                </Marker>
                            )
                        })}
                    </MapView>
                </View>
            </View>
           <Navigator />
        </>
    );
};

export default observer(App);
