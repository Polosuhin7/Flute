import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import mapLightStyle from '../../../assets/map-light.json';
import mapDarkStyle from '../../../assets/map-dark.json';
import IconButton from '../../components/buttons/IconButton';
import { useStyles } from '../../hooks/useStyles';
import { useTheme } from '../../providers/ThemeProvider';
import stores from '../../stores/stores';
import { Theme } from '../../types/ITheme';
import { ICoordinate, IOrganization } from '../../types/organization/IOrganization';
import { debounce } from '../../utils/debounce';
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
        }
    });

interface IOrganizationMapProps {
    onOrganizationSelect(val: IOrganization): void;
}
let map: google.maps.Map;
const OrganizationMap: React.FC<IOrganizationMapProps> = ({onOrganizationSelect}) => {
    const {location: {coords}} = app;
    const {theme} = useTheme();
    const styles = useStyles(createStyle);
    const {activeOrganization, list} = organization;

    useEffect(() => {
        if (activeOrganization?.coordinate.latitude) {
            moveTo(activeOrganization.coordinate);
        }
    }, [activeOrganization?.id]);

    const moveTo = ({longitude, latitude}: ICoordinate) => {
        if (map) {
            map.panTo({lat: latitude, lng: longitude});
        }
    };

    const setUserCurrentLocation = () => {
        moveTo(coords);
    };

    useEffect(() => {
        initMap();
    }, [list, theme.id]);

    function initMap() {
        map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            {
                center: {lat: coords.latitude, lng: coords.longitude},
                zoom: 12,
                backgroundColor: theme.color.layout,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                panControl: true,
                gestureHandling: 'greedy',
                styles: theme.id === 'dark' ? mapDarkStyle : mapLightStyle,
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
        list.forEach((_organization, index) => {

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
    }

    return (
        <View>
            <IconButton
                variant='secondary'
                style={styles.currentLocationButton}
                icon='location-arrow'
                onPress={setUserCurrentLocation}
            />
            <div style={{height: '100vh', width: '100%'}} id='map' />
        </View>
    );
};

export default observer(OrganizationMap);
