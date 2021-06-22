import { observer } from "mobx-react";
import React from "react";
import { Text } from "react-native";
import stores from "../../stores/stores";
const { organization } = stores;
const OrganizationList: React.FC<any> = () => {
    const { activeOrganization} = organization;

    return (
        <>
            <Text>{activeOrganization?.title}</Text>
        </>
    );
};

export default observer(OrganizationList);
