import React, { ReactNode, useEffect } from "react";
import { Dimensions, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import Bottom from "reanimated-bottom-sheet";
import { useStyles } from "../hooks/useStyles";
import { ESheetState } from "../types/ESheetState";
import { Theme } from "../types/ITheme";

const { width, height } = Dimensions.get("window");

const HEADER_HEIGHT = 100;
const createStyle = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.color.layout,
    },
    header: {
        backgroundColor: theme.color.layout,
        height: HEADER_HEIGHT,
        padding: theme.spacing.triple
    },
    headerText: {
        color: theme.color.secondary
    },
    content: {
        height: height - 50,
    },
    line: {
        position: 'absolute',
        top: 10,
        left: width / 2 - 25,
        width: 50,
        height: 3,
        backgroundColor: theme.color.border,
        borderRadius: theme.radius.double
    }
})
export interface IBottomSheetProps {
    Content: ReactNode;
    state: ESheetState;
    Header?: ReactNode;
    hideClose?: boolean;
    fixedHeader?: boolean
    onClose?(): void;
}

const BottomSheet: React.FC<IBottomSheetProps> = ({ Header, Content, state, hideClose, fixedHeader, onClose }) => {
    const styles = useStyles(createStyle);
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
            <View style={styles.header}>
                <View style={styles.line} />
                {Header}
            </View>
        ) : null;

    const renderContent = () => (
        <View
            style={[styles.container, styles.content]}>
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
