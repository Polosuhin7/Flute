import * as Location from 'expo-location';
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, useColorScheme, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import customStyle from "../../../assets/maps-style.json";
import IconButton from "../../components/buttons/IconButton";
import { useStyles } from "../../hooks/useStyles";
import { useTheme } from "../../providers/ThemeProvider";
import stores from "../../stores/stores";
import { ESheetState } from "../../types/ESheetState";
import { Theme } from "../../types/ITheme";
import { ICoordinate } from "../../types/organization/IOrganization";
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

let _mapView: MapView | null;
const OrganizationMap: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const colorScheme = theme.id;
    const styles = useStyles(createStyle);
    const { activeOrganization, fetchData, list, setActiveOrganization } = organization;
    const {
        location: { coords: initialCoords },
        setLocation
    } = app;
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (activeOrganization?.coordinate.latitude) {
            moveTo(activeOrganization.coordinate);
        }
    }, [activeOrganization?.id]);

    const moveTo = ({longitude, latitude}: ICoordinate) => {
        if (_mapView) {
            _mapView.animateToRegion({ longitude, latitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
        }
    }

    const setUserCurrentLocation = async () => {
        try {
            moveTo(app.location.coords);
            setLocation(await Location.getCurrentPositionAsync({}));
            // navigation.closeAll();
        } catch(error) {
            
        }
    }

    
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
                variant="secondary"
                style={styles.currentLocationButton}
                icon="compass"
                onPress={setUserCurrentLocation}
            />
            <MapView
                ref={(ref) => {
                    _mapView = ref;
                }}
                region={{ ...initialCoords, latitudeDelta: 0.922, longitudeDelta: 0.421 }}
                minZoomLevel={2}
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
                        <Marker
                            onPress={() => {
                                setActiveOrganization(organization);
                                navigation.navigate("organizationItem", ESheetState.HALF);
                            }}
                            key={organization.title + organization.id}
                            {...{ coordinate: organization.coordinate }}>
                            <View
                                style={[
                                    styles.marker,
                                    {
                                        backgroundColor: activeOrganization?.id === organization.id
                                            ? theme.color.active
                                            : theme.color.primary,
                                    },
                                ]}
                            />
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

export default observer(OrganizationMap);
