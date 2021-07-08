import * as Linking from 'expo-linking';
import I18n from 'i18n-js';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { Image, Platform, Share, StyleSheet, View } from 'react-native';
import BottomSheetScrollView from '../../components/BottomSheet/BottomSheetScrollView';
import Button from '../../components/buttons/Button';
import IconButton from '../../components/buttons/IconButton';
import Divider from '../../components/divider/Divider';
import Typography from '../../components/typograpy/Typography';
import config from '../../config';
import { useStyles } from '../../hooks/useStyles';
import { useTheme } from '../../providers/ThemeProvider';
import stores from '../../stores/stores';
import { Theme } from '../../types/ITheme';
import { IOrganizationShedule } from '../../types/organization/IOrganization';
import { getGeoDistance } from '../../utils/getGeoDistance';
import { isToday, textToOrganizationClosed } from '../../utils/orgnizationSheduleHelper';

const {organization, app} = stores;

const createStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            paddingHorizontal: theme.spacing.double,
        },
        titleBox: {
            alignItems: 'center',
            flexDirection: 'row',
        },
        title: {
            color: theme.color.text,
        },
        floatHeader: {
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 2000,
            backgroundColor: theme.color.layout,
            paddingVertical: theme.spacing.double,
        },
        destinatioText: {
            color: theme.color.active,
        },
        subtitleBox: {
            flexDirection: 'row',
            paddingTop: theme.spacing.base,
        },
        secondaryText: {
            color: theme.color.secondary,
        },
        buttonGroupBox: {
            flexDirection: 'row',
            paddingTop: theme.spacing.double,
            justifyContent: 'space-between',
        },
        buttonLike: {
            marginLeft: theme.spacing.base,
        },
        buttonPhone: {
            marginLeft: theme.spacing.base,
        },
        descriptionBox: {
            paddingTop: theme.spacing.double,
        },
        imageBox: {
            flexDirection: 'row',
            paddingTop: theme.spacing.double,
        },
        image: {
            flex: 2,
            height: 200,
        },
        previewBox: {
            flex: 1,
            marginLeft: theme.spacing.small,
        },
        preview: {
            height: 100,
        },
        section: {
            paddingBottom: theme.spacing.quadro,
        },
        groupBox: {
            paddingBottom: theme.spacing.double,
        },
        priceBox: {},
        sectionTitle: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: theme.spacing.double,
        },
        groupTitle: {
            paddingBottom: theme.spacing.base,
        },

        workHours: {
            paddingBottom: theme.spacing.base,
            textTransform: 'capitalize',
        },
    });

interface SheduleProps {
    shedule: IOrganizationShedule;
}

const Shedule: React.FC<SheduleProps> = ({shedule}) => {
    const styles = useStyles(createStyle);
    const {theme} = useTheme();
    const {id, ...weekDays} = shedule;
    return (
        <View>
            {Object.entries(weekDays).map(([day, {time_from = '', time_to = ''}]) => {
                return (
                    <Typography
                        style={[
                            styles.workHours,
                            {color: isToday(day) ? theme.color.active : theme.color.text},
                        ]}
                        key={`index-${day}`}>
                        {I18n.t(day)}: {time_from.split(':').slice(0, 2).join(':')} -{' '}
                        {time_to.split(':').slice(0, 2).join(':')}
                    </Typography>
                );
            })}
        </View>
    );
};

const OrganizationItem: React.FC<any> = () => {
    const {activeOrganization, toggleLike, isLiked} = organization;
    const {location} = app;
    const styles = useStyles(createStyle);
    const {theme} = useTheme();
    const ScrollViewRef = useRef<any>();

    useEffect(() => {
        ScrollViewRef?.current?.scrollTo({y: 0});
    }, [activeOrganization?.id]);

    if (!activeOrganization) return null;

    const callPhone = () => {
        Linking.openURL(`tel:${activeOrganization?.phone}`);
    };

    const onDirection = () => {
        const {latitude: lt, longitude: lg} = activeOrganization.coordinate!;
        const {latitude, longitude} = app.location.coords;
        if (Platform.OS === 'web') {
            return window.open(
                `https://www.google.com/maps/dir/?api=1&origin=${latitude}, ${longitude}&destination=${lt}, ${lg}`,
                '_blank'
            );
        }
        //open  ya maps
        // Linking.openURL(`yandexmaps://maps.yandex.com/?rtt=auto&rtext=${lt}, ${lg}~${latitude}, ${longitude}, &z=12`);
        // open native maps
        const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        const url = scheme + `saddr=${lt}, ${lg}&daddr=${latitude}, ${longitude}, &z=12`;
        Linking.openURL(url);
    };
    const onShare = () => {
        // TODO: Подумать как нормально сделать
        let url = `${config.baseUrl}/web?organization_id=${activeOrganization.id}`
        if(Platform.OS === 'web') {
            navigator?.share({title: activeOrganization.title, url})
            return;
        } 
        if(Platform.OS === 'ios') {
            return Share.share({url, message: ''});
        }

        if(Platform.OS === 'android') {
            return Share.share({title: url, message: url});
        }

    };

    return (
        <BottomSheetScrollView
            style={styles.container}
            ref={ScrollViewRef}
            snapToInterval={50}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.titleBox}>
                <Typography style={styles.title} variant='h3'>
                    {activeOrganization?.title}
                </Typography>
                {(Platform.OS !== 'web' || navigator?.share) && (
                    <IconButton size='sm' variant='link' icon='share-alt' onPress={onShare} />
                )}
            </View>
            <View style={styles.subtitleBox}>
                <Typography style={styles.destinatioText}>
                    {getGeoDistance(location, activeOrganization.coordinate)} км
                </Typography>
                <Divider variant='dot' />
                {activeOrganization.shedule && (
                    <Typography style={styles.secondaryText}>
                        {textToOrganizationClosed(activeOrganization.shedule)}
                    </Typography>
                )}
            </View>

            <View style={styles.buttonGroupBox}>
                <Button variant='outlined' fluid text={I18n.t('Route')} onPress={onDirection} />
                <IconButton
                    active={isLiked}
                    style={styles.buttonLike}
                    icon={isLiked ? 'heartbeat' : 'heart'}
                    onPress={toggleLike}
                />
                <IconButton style={styles.buttonPhone} icon='phone' onPress={callPhone} />
            </View>
            <Divider />
            <Typography numberOfLines={4} style={styles.secondaryText}>
                {activeOrganization.description}
            </Typography>
            {activeOrganization.images.length ? (
                <>
                    <View style={styles.imageBox}>
                        <Image
                            style={styles.image}
                            source={{uri: activeOrganization.images[0].url}}
                        />
                        <View style={styles.previewBox}>
                            {activeOrganization.images.slice(1, 3).map((image, index) => {
                                return (
                                    <Image
                                        key={image.id}
                                        style={[
                                            styles.preview,
                                            {marginBottom: !index ? theme.spacing.small : 0},
                                        ]}
                                        source={{uri: image.url}}
                                    />
                                );
                            })}
                        </View>
                    </View>
                    <Divider />
                </>
            ) : null}

            <View style={styles.section}>
                <View style={styles.sectionTitle}>
                    <Typography style={styles.title} variant='h5'>
                        {I18n.t('Cocktails')}
                    </Typography>
                    <Divider variant='dot' />
                    <Typography>
                        {I18n.t('average check')} ~ {activeOrganization.average_check} р.
                    </Typography>
                </View>

                <Typography bold variant='subtitle' style={styles.groupTitle}>
                    {I18n.t('Styles')}
                </Typography>
                <Typography>{activeOrganization.bar_style}</Typography>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionTitle}>
                    <Typography style={styles.title} variant='h5'>
                        {I18n.t('Bar')}
                    </Typography>
                </View>
                {activeOrganization.shedule ? (
                    <View style={styles.groupBox}>
                        <Typography bold variant='subtitle' style={styles.groupTitle}>
                            {I18n.t('Work hours')}
                        </Typography>
                        <Shedule shedule={activeOrganization.shedule} />
                    </View>
                ) : null}

                <Typography bold variant='subtitle' style={styles.groupTitle}>
                    {I18n.t('Address')}
                </Typography>
                <Typography>
                    {activeOrganization?.address?.city}, {activeOrganization?.address?.street},
                    {activeOrganization?.address?.building}
                </Typography>
            </View>
        </BottomSheetScrollView>
    );
};

export default observer(OrganizationItem);
