import React, { ReactNode, useEffect } from "react";
import { Dimensions, TouchableOpacity, View, Text } from "react-native";
import Bottom from "reanimated-bottom-sheet";
import { ESheetState } from "../types/ESheetState";

const { width, height } = Dimensions.get("window");

interface IBottomSheetProps {
    Content: ReactNode;
    state: ESheetState;
    Header?: ReactNode;
    hideClose?: boolean;
    fixedHeader?: boolean
    onClose?(): void;
}

const BottomSheet: React.FC<IBottomSheetProps> = ({ Header, Content, state, hideClose, fixedHeader, onClose }) => {
    const ref = React.useRef<any>(null);
    
    const snapPoints = React.useMemo(() => Header ? [height - 50, height / 2, 100, -1] : [height - 50, height / 2, 0, -1], []);
    useEffect(() => {
        ref.current.snapTo(state);
    });

    const _onClose = () => {
        onClose && onClose();
        if(fixedHeader) {
            ref.current.snapTo(ESheetState.HIDE)
        }
    };
    const renderHeader = () =>
        Header ? (
            <View
                style={{
                    backgroundColor: "tomato",
                    padding: 16,
                    height: 100,
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
export default BottomSheet;
