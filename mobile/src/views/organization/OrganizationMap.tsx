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
            top: 25,
            right: 15,
            zIndex: 500,
        },
        menuButton: {
            position: 'absolute',
            top: 25,
            left: 15,
            zIndex: 500,
        },
    });

interface IOrganizationMapProps {
    onOrganizationSelect(val: IOrganization): void;
}
let map: google.maps.Map;
const OrganizationMap: React.FC<IOrganizationMapProps> = ({onOrganizationSelect}) => {
    const {location: {coords}} = app;
    const {theme, setTheme} = useTheme();
    const [mapRegion, setMapRegion] = useState({
        center: {lat: coords.latitude, lng: coords.longitude},
        zoom: 8
    })
    const colorScheme = theme.id;
    const styles = useStyles(createStyle);
    const {activeOrganization, list} = organization;

    useEffect(() => {
        if (activeOrganization?.coordinate.latitude) {
            moveTo(activeOrganization.coordinate);
        }
    }, [activeOrganization?.id]);

    const moveTo = ({longitude, latitude}: ICoordinate) => {
        if (map) {
            map.moveCamera({center: {lat: latitude, lng: longitude}});
        }
    };

    const setUserCurrentLocation =  () => {
        initMap();
    };

    useEffect(() => {
        initMap();
    }, [list, theme.id]);

    function initMap() {
        map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            {
                ...mapRegion,
                backgroundColor: theme.color.layout,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                panControl: true,
                gestureHandling: 'greedy',
                styles: theme.id === 'dark' ? customStyle : [],
            }
        );
        
        const icon = {
            path: " M25, 50a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0",
            fillColor: theme.color.secondary,
            fillOpacity: 1,
            strokeColor: theme.color.primary,
            strokeWeight: 2,
            rotation: 0,
            scale: 0.25,
            translateX: '-50%',
            translateY: '-50%',
            anchor: new google.maps.Point(15, 30),
          };
        list.forEach((_organization) => {

            const marker = new google.maps.Marker({
                position: {
                    lat: _organization.coordinate.latitude,
                    lng: _organization.coordinate.longitude,
                },
                map,
                icon,
            });

            marker.addListener('click', () => {
                organization.setActiveOrganization(_organization);
                onOrganizationSelect(_organization);
            });
        });

        map.addListener('bounds_changed', debounce(() => {
            setMapRegion({
                center: {lat: map?.getCenter()?.lat() || 0, lng: map?.getCenter()?.lng() || 0},
                zoom: map?.getZoom() || 8
            })

        }, 500))
    }

    return (
        <View>
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
            <div style={{height: '100vh', width: '100%'}} id='map' />
        </View>
    );
};

export default observer(OrganizationMap);
