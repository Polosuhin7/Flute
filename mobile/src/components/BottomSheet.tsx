import * as React from "react";
import { ReactNode, useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Bottom from "@gorhom/bottom-sheet";
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
        content: {
            backgroundColor: theme.color.layout,
            paddingHorizontal: theme.spacing.double,
            borderTopRightRadius: theme.radius.double,
            borderTopLeftRadius: theme.radius.double,
        },
        lineContainer: {
            paddingTop: theme.spacing.small,
            paddingBottom: theme.spacing.small,
            justifyContent: 'center',
            alignItems: 'center'
        },
        line: {
            width: 50,
            height: 3,
            backgroundColor: theme.color.border,
            borderRadius: theme.radius.double,
            marginVertical: theme.spacing.double,
            marginHorizontal: 'auto'
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
    hideClose?: boolean;
    onChange?(state: number): void;
    snapPoints: (string|number)[];
}

const BottomSheet: React.FC<IBottomSheetProps> = ({
    Content,
    state,
    hideClose,
    snapPoints: _snapPoints,
    onChange,
}) => {
    const styles = useStyles(createStyle);
    const ref = useRef<Bottom>(null);
    const snapPoints = React.useMemo(() => _snapPoints, []);

    useEffect(() => {
        ref.current?.snapTo(state)
    }, [state]);
    const _onChange = (state: number) => {
        onChange && onChange(state);
    }
    

    return (
        <Bottom
            handleComponent={() => <View style={styles.lineContainer}><View style={styles.line}/></View>}
            backgroundComponent={() => <View  />}
            style={styles.content}
            onChange={_onChange}
            {...{ ref, index: state, snapPoints }}>
            {Content}
        </Bottom>
    );
};
export default BottomSheet;
