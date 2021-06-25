import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import IconButton from "../components/buttons/IconButton";
import { useStyles } from "../hooks/useStyles";
import BottomSheetStack from "../navigation/BottomSheetStack";
import { useTheme } from "../providers/ThemeProvider";
import stores from "../stores/stores";
import { ESheetState } from "../types/ESheetState";
import { Theme } from "../types/ITheme";
import OrganizationMap from "../views/organization/OrganizationMap";
const {navigation} = stores;
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.color.layout,
        },
        menutButton: {
            position: "absolute",
            top: 75,
            left: 15,
            zIndex: 500,
        },
    });

const Main: React.FC<any> = () => {
    const {navigate} = navigation
    const styles = useStyles(createStyles);
    const { setTheme } = useTheme();

    const openMenu = () => {
        navigate('menu')
    }
    return (
        <>
            <StatusBar />
            <View style={styles.container}>
                <IconButton
                    size='md'
                    variant='secondary'
                    style={styles.menutButton}
                    icon='list'
                    onPress={openMenu}
                />
                <OrganizationMap />
            </View>
            <BottomSheetStack />
        </>
    );
};

export default Main;
