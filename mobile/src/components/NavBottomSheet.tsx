import * as React from "react";
import { observer } from "mobx-react";
import { ReactNode, useEffect } from "react";
import { Dimensions, TouchableOpacity, View, Text } from "react-native";
import Bottom from "reanimated-bottom-sheet";
import { INavigationState } from "../stores/Navigation.store";
import stores from "../stores/stores";
import { ESheetState } from "../types/ESheetState";
import BottomSheet from "./BottomSheet";

interface INavBottomSheetProps {
    menu: keyof INavigationState;
    Content: ReactNode;
    hideClose?: boolean;
    snapPoints?: any[]
    onClose?(): void;
}

const { navigation } = stores;
const NavBottomSheet: React.FC<INavBottomSheetProps> = ({
    menu,
    Content,
    hideClose,
    snapPoints,
    onClose,
}) => {
    const {state} = navigation;
    const _onChange = (value: number) => {
        if (onClose) {
            onClose();
        } else {
            navigation.navigate(menu, value);
        }
    };
    return (
        <BottomSheet
            {...{ state: state[menu], Content, onChange: _onChange, hideClose, snapPoints }}
        />
    );
};
export default observer(NavBottomSheet);
