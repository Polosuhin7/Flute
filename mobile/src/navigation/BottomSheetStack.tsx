import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import NavBottomSheet from "../components/NavBottomSheet";
import Typography from "../components/typograpy/Typography";
import Menu from "../screens/menu/Menu";
import OrganizationItem from "../screens/organization/OrganizationItem";
import OrganizationList from "../screens/organization/OrganizationList";
import stores from "../stores/stores";


const {navigation} = stores;
const BottomSheetStack = () => {
    const {state} = navigation
    return (
        <>
            <NavBottomSheet
                menu='organizationList'
                hideClose
                fixedHeader
                Header={<Typography variant="h4">organization list</Typography>}
                Content={<OrganizationList />}
            />
            <NavBottomSheet
                menu='organizationItem'
                Header={<Text>organization item</Text>}
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
