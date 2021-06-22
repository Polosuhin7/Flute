import { observer } from "mobx-react";
import React from "react";
import { Text, View } from "react-native";
import NavBottomSheet from "../components/NavBottomSheet";
import OrganizationItem from "../screens/organization/OrganizationItem";
import OrganizationList from "../screens/organization/OrganizationList";
import stores from "../stores/stores";

const { navigation } = stores;
const BottomSheetStack = () => {
    const { state } = navigation;
    return (
        <>
            <NavBottomSheet
                menu='organizationList'
                hideClose
                fixedHeader
                Header={<Text>organization list</Text>}
                Content={<OrganizationList />}
            />
            <NavBottomSheet
                menu='organizationItem'
                Header={<Text>organization item</Text>}
                Content={<OrganizationItem />}
            />
            <NavBottomSheet
                menu='menu'
                // Header={<Text>Menu</Text>}
                Content={
                    <View>
                        <Text>Hello</Text>
                    </View>
                }
            />
        </>
    );
};
export default observer(BottomSheetStack);
