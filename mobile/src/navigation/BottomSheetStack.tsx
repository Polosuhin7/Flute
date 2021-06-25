import { observer } from "mobx-react";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import NavBottomSheet from "../components/NavBottomSheet";
import Typography from "../components/typograpy/Typography";
import { useStyles } from "../hooks/useStyles";
import Menu from "../views/menu/Menu";
import OrganizationItem from "../views/organization/OrganizationItem";
import OrganizationList from "../views/organization/OrganizationList";
import stores from "../stores/stores";
import { Theme } from "../types/ITheme";
const {height} = Dimensions.get('window');
const createStyle = (theme: Theme) => StyleSheet.create({
    text: {
        color: theme.color.secondary
    }
})
const {navigation, organization} = stores;
const BottomSheetStack = () => {
    const {state} = navigation;
    const {list} = organization;
    const {activeOrganization} = organization;
    const styles = useStyles(createStyle)
    return (
        <>
            <NavBottomSheet
                menu='organizationList'
                snapPoints={[height - 75, height - 75, 100, 100]}
                hideClose
                Header={<Typography style={styles.text} variant="h4">Бары</Typography>}
                Content={<OrganizationList />}
            />
            <NavBottomSheet
                menu='organizationItem'
                snapPoints={[height - 75, 190, 0, -1]}
                // snapPoints={[height - 75, height - 76, 0, -10]}
                Content={<OrganizationItem />}
            />
            <NavBottomSheet
                menu='menu'
                snapPoints={[400, 400, 0, -1]}
                Content={<Menu />}
            />
        </>
    );
};
export default observer(BottomSheetStack);
