import { observer } from "mobx-react";
import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import BottomSheet from "../../components/BottomSheet";
import { IOrganization } from "../../types/organization/IOrganization";
import OrganizationItem from "./OrganizationItem";
import OrganizationList from "./OrganizationList";
import OrganizationMap from "./OrganizationMap";

const listSnapPoints = [120, 120, '90%'];
const itemSnapPoints = [-100, 0 , 150, '90%'];

const Organizations: React.FC<any> = () => {
    const [listState, setListState] = useState(0);
    const [itemState, setItemState] = useState(0);

    const onOrganizationSelect = useCallback((val: IOrganization) => {
        setListState(1);
        setItemState(2);
    },[],
    )
    return (
        <>
            <OrganizationMap onOrganizationSelect={onOrganizationSelect} />
            <BottomSheet
                state={listState}
                snapPoints={listSnapPoints}
                onChange={setListState}
            >
                <OrganizationList onOrganizationSelect={onOrganizationSelect}/>
            </BottomSheet>
            <BottomSheet
                state={itemState}
                onChange={setItemState}
                snapPoints={itemSnapPoints}
            >
                <OrganizationItem />
            </BottomSheet>
        </>
    );
};

export default observer(Organizations);
