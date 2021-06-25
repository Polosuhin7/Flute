import React, { ReactNode, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Bottom from "reanimated-bottom-sheet";
import { useStyles } from "../hooks/useStyles";
import { ESheetState } from "../types/ESheetState";
import { Theme } from "../types/ITheme";
import IconButton from "./buttons/IconButton";

const { width, height } = Dimensions.get("window");

const HEADER_HEIGHT = 85;
const createStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.color.layout,
        },
        header: {
            backgroundColor: theme.color.layout,
            // backgroundColor: 'red',
            height: HEADER_HEIGHT,
            paddingVertical: theme.spacing.double,
            paddingHorizontal: theme.spacing.triple,
        },
        headerText: {
            color: theme.color.secondary,
        },
        content: {
            minHeight: height,
            paddingHorizontal: theme.spacing.triple,
        },
        line: {
            position: "absolute",
            top: 10,
            left: width / 2 - 25,
            width: 50,
            height: 3,
            backgroundColor: theme.color.border,
            borderRadius: theme.radius.double,
        },
        closeButton: {
            position: "absolute",
            top: theme.spacing.double,
            right: theme.spacing.double,
        },
    });
export interface IBottomSheetProps {
    Content: ReactNode;
    state: ESheetState;
    Header?: ReactNode;
    hideClose?: boolean;
    onClose?(): void;
    snapPoints?: [ESheetState.OPEN, ESheetState.HALF, ESheetState.HIDE, ESheetState.CLOSE];
}

const BottomSheet: React.FC<IBottomSheetProps> = ({
    Header,
    Content,
    state,
    hideClose,
    snapPoints: _snapPoints,
    onClose,
}) => {
    const styles = useStyles(createStyle);
    const ref = React.useRef<any>(null);
    const snapPoints = React.useMemo(() => {
        if(_snapPoints) {
            return _snapPoints
        }
        return Header ? [height - 50, height / 2, HEADER_HEIGHT, -1] : [height - 50, height / 2, 0, -1]
    }, []);
    useEffect(() => {
        ref.current.snapTo(state);
    });

    const _onClose = () => {
        onClose && onClose();
    };
    const renderHeader = () =>
     (
        <View style={[styles.header, {height: !Header ? 25 : styles.header.height}]}>
        {!hideClose && state !== ESheetState.HIDE && (
            <IconButton
                style={styles.closeButton}
                icon='times'
                variant='secondary'
                size='xs'
                onPress={_onClose}
            />
        )}
        <View style={styles.line} />
        {Header}
    </View>
     )

    const renderContent = () => (
        <View style={[styles.container, styles.content]}>
            {Content}
        </View>
    );

    return <Bottom {...{ ref, snapPoints, renderContent, renderHeader, onCloseEnd: _onClose }} />;
};
export default BottomSheet;
