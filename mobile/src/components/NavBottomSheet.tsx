import { observer } from "mobx-react";
import React, { ReactNode, useEffect } from "react";
import { Dimensions, TouchableOpacity, View, Text } from "react-native";
import Bottom from "reanimated-bottom-sheet";
import { INavigationState } from "../stores/Navigation.store";
import stores from "../stores/stores";
import { ESheetState } from "../types/ESheetState";

const { width, height } = Dimensions.get("window");

interface IBottomSheetProps {
    menu: keyof INavigationState;
    Content: ReactNode;
    Header?: ReactNode;
    hideClose?: boolean;
    fixedHeader?: boolean
    onClose?(): void;
}

const HEADER_HEIGTH = 100;
const {navigation} = stores;
const NavBottomSheet: React.FC<IBottomSheetProps> = ({ menu, Header, Content, hideClose, fixedHeader, onClose }) => {
    const ref = React.useRef<any>(null);
    
    const snapPoints = React.useMemo(() => Header ? [height - 50, height / 2, HEADER_HEIGTH, -1] : [height - 50, height / 2, 0, -1], []);
    useEffect(() => {
        ref.current.snapTo(navigation.state[menu]);
    });

    const _onClose = () => {
        if(fixedHeader) {
            ref.current.snapTo(ESheetState.HIDE)
        }
        if(onClose) {
            onClose()
        } else {
            navigation.setNavigationState(menu, ESheetState.CLOSE)
        }
    }; 
    const renderHeader = () =>
        Header ? (
            <View 
                style={{
                    backgroundColor: "tomato",
                    padding: 16,
                    height: HEADER_HEIGTH,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }}>
                {Header}
            </View>
        ) : null;

    const renderContent = () => (
        <View
            style={{
                backgroundColor: "white",
                padding: 16,
                height: height - 50,
            }}>
            {!hideClose && (
                <TouchableOpacity onPress={_onClose} style={{ position: "absolute", top: 0, right: 10 }}>
                    <Text>X</Text>
                </TouchableOpacity>
            )}
            {Content}
        </View>
    );

    return <Bottom {...{ ref, snapPoints, renderContent, renderHeader, onCloseEnd: _onClose }} />;
};
export default observer(NavBottomSheet);
