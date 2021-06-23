import { observer } from "mobx-react";
import React, { ReactNode, useEffect } from "react";
import { Dimensions, TouchableOpacity, View, Text } from "react-native";
import Bottom from "reanimated-bottom-sheet";
import { INavigationState } from "../stores/Navigation.store";
import stores from "../stores/stores";
import { ESheetState } from "../types/ESheetState";
import BottomSheet from "./BottomSheet";


interface INavBottomSheetProps {
    menu: keyof INavigationState;
    Content: ReactNode;
    Header?: ReactNode;
    hideClose?: boolean;
    fixedHeader?: boolean
    onClose?(): void;
}

const {navigation} = stores;
const NavBottomSheet: React.FC<INavBottomSheetProps> = ({ menu, Header, Content, hideClose, fixedHeader, onClose }) => {
    
    const _onClose = () => {
        if(onClose) {
            onClose()
        } else {
            navigation.setNavigationState(menu, fixedHeader ? ESheetState.HIDE : ESheetState.CLOSE);
            
        }
    }; 
   

    return <BottomSheet {...{ state: navigation.state[menu], Content, Header, onClose: _onClose, fixedHeader }} />;
};
export default observer(NavBottomSheet);
