import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavBottomSheet from "../components/NavBottomSheet";
import Typography from "../components/typograpy/Typography";
import { useStyles } from "../hooks/useStyles";
import Menu from "../screens/menu/Menu";
import OrganizationItem from "../screens/organization/OrganizationItem";
import OrganizationList from "../screens/organization/OrganizationList";
import stores from "../stores/stores";
import { Theme } from "../types/ITheme";

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
                hideClose
                fixedHeader
                Header={<Typography style={styles.text} variant="h4">Бары</Typography>}
                Content={<OrganizationList />}
            />
            <NavBottomSheet
                menu='organizationItem'
                Header={<Typography style={styles.text}>{activeOrganization?.title}</Typography>}
                Content={<OrganizationItem />}
            />
            <NavBottomSheet
                menu='menu'
                Content={<Menu />}
            />
        </>
    );
};
export default observer(BottomSheetStack);
