import * as Location from 'expo-location';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import customStyle from '../../../assets/maps-style.json';
import IconButton from '../../components/buttons/IconButton';
import {useStyles} from '../../hooks/useStyles';
import {useTheme} from '../../providers/ThemeProvider';
import stores from '../../stores/stores';
import {ESheetState} from '../../types/ESheetState';
import {Theme} from '../../types/ITheme';
import {ICoordinate, IOrganization} from '../../types/organization/IOrganization';
import {debounce} from '../../utils/debounce';
const {width, height} = Dimensions.get('window');
const {organization, app} = stores;

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
        markerBox: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        marker: {
            width: 20,
            height: 20,
            backgroundColor: theme.color.primary,
            borderRadius: 20,
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: theme.color.border,
        },
        currentLocationButton: {
            position: 'absolute',
            top: 75,
            right: 15,
            zIndex: 500,
        },
        menuButton: {
            position: 'absolute',
            top: 75,
            left: 15,
            zIndex: 500,
        },
    });

interface ICustomMarkerProps {
    onOrganizationSelect: (val: IOrganization) => void;
    organization: IOrganization;
}
const CustomMarker: React.FC<ICustomMarkerProps> = observer(
    ({organization: _organization, onOrganizationSelect}) => {
        const styles = useStyles(createStyle);
        const {theme} = useTheme();
        const MarkerRef = useRef<any>();
        useEffect(() => {
            MarkerRef.current?.redraw();
        }, [organization.activeOrganization?.id, theme.id]);
        return (
            <Marker
                ref={MarkerRef}
                onPress={() => {
                    organization.setActiveOrganization(_organization);
                    onOrganizationSelect(_organization);
                }}
                tracksViewChanges={false}
                key={_organization.title + _organization.id}
                {...{coordinate: _organization.coordinate}}>
                <View>
                    {organization.activeOrganization?.id === _organization.id ? (
                        <View style={styles.markerBox}>
                            <IconButton size='sm' onPress={() => null} active icon='cocktail' />
                            {/* <Image onLoad={() => MarkerRef.current?.redraw()} style={{ width: 40, height: 40, borderRadius: 40 }} source={require('../../../assets/icon.png')} /> */}
                        </View>
                    ) : (
                        <View style={styles.markerBox}>
                            <View
                                style={[
                                    styles.marker,
                                    {
                                        backgroundColor: theme.color.primary,
                                    },
                                ]}
                            />
                        </View>
                    )}
                </View>
            </Marker>
        );
    }
);

interface IOrganizationMapProps {
    onOrganizationSelect(val: IOrganization): void;
}
let _mapView: MapView | null;
const OrganizationMap: React.FC<IOrganizationMapProps> = ({onOrganizationSelect}) => {
    const {theme, setTheme} = useTheme();
    const colorScheme = theme.id;
    const styles = useStyles(createStyle);
    const {activeOrganization, list} = organization;
    const {
        location: {coords},
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

    const moveTo = ({longitude, latitude}: ICoordinate) => {
        if (_mapView) {
            _mapView.animateCamera({center: {...mapRegion, longitude, latitude}}, {duration: 300});
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
            {theme.id === 'dark' ? (
                <IconButton
                    size='md'
                    variant='secondary'
                    style={styles.menuButton}
                    icon='sun'
                    onPress={() => setTheme('light')}
                />
            ) : (
                <IconButton
                    size='md'
                    variant='secondary'
                    style={styles.menuButton}
                    icon='moon'
                    onPress={() => setTheme('dark')}
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
                customMapStyle={colorScheme === 'dark' ? customStyle : []}>
                {list.map((organization) => {
                    return (
                        <CustomMarker
                            {...{key: organization.title, organization, onOrganizationSelect}}
                        />
                    );
                })}
            </MapView>
        </View>
    );
};

export default observer(OrganizationMap);
