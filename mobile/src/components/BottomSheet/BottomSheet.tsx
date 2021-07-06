import * as React from 'react';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Bottom from 'reanimated-bottom-sheet';
import { useStyles } from '../../hooks/useStyles';
import { ESheetState } from '../../types/ESheetState';
import { Theme } from '../../types/ITheme';

const createStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.color.layout,
            borderTopRightRadius: theme.radius.double,
            borderTopLeftRadius: theme.radius.double,
        },
        content: {
            flex: 1,
            backgroundColor: theme.color.layout,
            borderTopRightRadius: theme.radius.double,
            borderTopLeftRadius: theme.radius.double,
        },
        lineContainer: {
            paddingTop: theme.spacing.small,
            paddingBottom: theme.spacing.small,
            justifyContent: 'center',
            alignItems: 'center',
        },
        line: {
            width: 50,
            height: 3,
            backgroundColor: theme.color.border,
            borderRadius: theme.radius.double,
            marginVertical: theme.spacing.small,
            marginHorizontal: 'auto',
        },
        closeButton: {
            position: 'absolute',
            top: theme.spacing.double,
            right: theme.spacing.double,
        },
    });
export interface IBottomSheetProps {
    state: ESheetState;
    hideClose?: boolean;
    onChange?(state: number): void;
    snapPoints: (string | number)[];
}

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };


const BottomSheet: React.FC<IBottomSheetProps> = ({
    children,
    state,
    snapPoints: _snapPoints,
    onChange,
}) => {
    const styles = useStyles(createStyle);
    const ref = useRef<Bottom>(null);
    const snapPoints = React.useMemo(() => _snapPoints, []);
    const closeState = 0;
    const openState: any = snapPoints.length - 1;

    useEffect(() => {
        ref.current?.snapTo(state);
    }, [state]);

    const _onChange = (state: number) => {
        onChange && onChange(state);
    };

    const renderContent = () => (
        <GestureRecognizer
        onSwipeUp={() => _onChange(openState)}
        onSwipeDown={() => _onChange(closeState)}
        config={config}
        style={[styles.container, {height: snapPoints[state]}]}
        >
        <View style={styles.content}>
        <View style={styles.line} />
            {children}
        </View>
      </GestureRecognizer>
        
    );
    return (
        <Bottom
            onOpenEnd={() => _onChange(openState)}
            onCloseEnd={() => _onChange(closeState)}
            renderContent={renderContent}
            {...{ref, snapPoints}}
        />
    );
};
export default BottomSheet;
