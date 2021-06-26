import { observer } from "mobx-react";
import * as React from "react";
import NavBottomSheet from "../components/NavBottomSheet";
import OrganizationItem from "../views/organization/OrganizationItem";
import OrganizationList from "../views/organization/OrganizationList";

const BottomSheetStack = () => {
    return (
        <>
            <NavBottomSheet
                menu='organizationList'
                snapPoints={[120, 120, '90%', '90%']}
                hideClose
                Content={<OrganizationList />}
            />
            <NavBottomSheet
                menu='organizationItem'
                snapPoints={[-100, 0 , 150, '90%',]}
                Content={<OrganizationItem />}
            />
            {/* <NavBottomSheet menu='menu' snapPoints={[400, 400, 0, -1]} Content={<Menu />} /> */}
        </>
    );
};
export default observer(BottomSheetStack);
