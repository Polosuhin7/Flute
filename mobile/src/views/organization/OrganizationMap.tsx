import * as Location from "expo-location";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, useColorScheme, View } from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import customStyle from "../../../assets/maps-style.json";
import IconButton from "../../components/buttons/IconButton";
import { useStyles } from "../../hooks/useStyles";
import { useTheme } from "../../providers/ThemeProvider";
import stores from "../../stores/stores";
import { ESheetState } from "../../types/ESheetState";
import { Theme } from "../../types/ITheme";
import { ICoordinate } from "../../types/organization/IOrganization";
import { debounce } from "../../utils/debounce";
const { width, height } = Dimensions.get("window");
const { organization, navigation, app } = stores;

const createStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.layout,
        },
        map: {
            backgroundColor: theme.color.layout,
            width,
            height,
        },
        marker: {
            width: 20,
            height: 20,
            backgroundColor: theme.color.primary,
            borderRadius: 20,
            borderWidth: 3,
            borderStyle: "solid",
            borderColor: theme.color.border,
        },
        currentLocationButton: {
            position: "absolute",
            top: 75,
            right: 15,
            zIndex: 500,
        },
        menuButton: {
            position: "absolute",
            top: 75,
            left: 15,
            zIndex: 500,
        },
    });

const CustomMarker: React.FC<any> = observer(({ organization: _organization }) => {
    const styles = useStyles(createStyle);
    const { theme } = useTheme();
    const MarkerRef = useRef<any>();
    useEffect(() => {
        MarkerRef.current?.redraw();
    }, [organization.activeOrganization?.id]);
    return (
        <Marker
            ref={MarkerRef}
            onPress={() => {
                organization.setActiveOrganization(_organization);
                navigation.navigate("organizationItem", ESheetState.HALF);
            }}
            tracksViewChanges={false}
            key={_organization.title + _organization.id}
            {...{ coordinate: _organization.coordinate }}>
            <View
                style={[
                    styles.marker,
                    {
                        backgroundColor:
                            organization.activeOrganization?.id === _organization.id
                                ? theme.color.active
                                : theme.color.primary,
                    },
                ]}
            />
        </Marker>
    );
});

let _mapView: MapView | null;
const OrganizationMap: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const colorScheme = theme.id;
    const styles = useStyles(createStyle);
    const { activeOrganization, list } = organization;
    const {
        location: { coords },
        setLocation,
    } = app;

    const [mapRegion, setMapRegion] = useState<Region>({
        ...coords,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    });

    useEffect(() => {
        if (activeOrganization?.coordinate.latitude) {
            moveTo(activeOrganization.coordinate);
        }
    }, [activeOrganization?.id]);

    const moveTo = ({ longitude, latitude }: ICoordinate) => {
        if (_mapView) {
            _mapView.animateCamera({ center: { ...mapRegion, longitude, latitude } }, { duration: 300 });
        }
    };

    const setUserCurrentLocation = async () => {
        try {
            moveTo(app.location.coords);
            setLocation(await Location.getCurrentPositionAsync({}));
        } catch (error) {}
    };

    return (
        <View style={styles.container}>
            {theme.id === "dark" ? (
                <IconButton
                    size='md'
                    variant='secondary'
                    style={styles.menuButton}
                    icon='sun'
                    onPress={() => setTheme("light")}
                />
            ) : (
                <IconButton
                    size='md'
                    variant='secondary'
                    style={styles.menuButton}
                    icon='moon'
                    onPress={() => setTheme("dark")}
                />
            )}
            <IconButton
                variant='secondary'
                style={styles.currentLocationButton}
                icon='compass'
                onPress={setUserCurrentLocation}
            />
            <MapView
                ref={(ref) => {
                    _mapView = ref;
                }}
                onRegionChange={debounce(setMapRegion, 500)}
                initialRegion={mapRegion}
                minZoomLevel={3}
                zoomEnabled
                showsUserLocation
                showsCompass={false}
                showsMyLocationButton={false}
                zoomControlEnabled
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={colorScheme === "dark" ? customStyle : []}>
                {list.map((organization) => {
                    return (
                        <CustomMarker {...{ key: organization.title, organization }} />
                        // <Marker
                        //     onPress={() => {
                        //         setActiveOrganization(organization);
                        //         navigation.navigate("organizationItem", ESheetState.HALF);
                        //         setActive(true);
                        //     }}
                        //     tracksViewChanges={false}
                        //     key={organization.title + organization.id}
                        //     {...{ coordinate: organization.coordinate }}>
                        //     <View
                        //         style={[
                        //             styles.marker,
                        //             {
                        //                 backgroundColor: active ? theme.color.active : theme.color.primary,
                        //             },
                        //         ]}
                        //     />
                        // </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

export default observer(OrganizationMap);
