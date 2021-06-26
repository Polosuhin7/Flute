import React from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import Button from "../components/buttons/Button";
import IconButton from "../components/buttons/IconButton";
import { useStyles } from "../hooks/useStyles";
import BottomSheetStack from "../navigation/BottomSheetStack";
import { useTheme } from "../providers/ThemeProvider";
import { Theme } from "../types/ITheme";
import OrganizationMap from "../views/organization/OrganizationMap";

const { height } = Dimensions.get("window");
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.color.layout,
        },
        menuButton: {
            position: "absolute",
            top: 175,
            left: 15,
            zIndex: 100500,
        },
    });

const Main: React.FC<any> = () => {
    const styles = useStyles(createStyles);
    const { theme, setTheme } = useTheme();

    const barStyle = theme.id === "dark" ? "light-content" : "dark-content";
    return (
        <>
            <StatusBar barStyle={barStyle} />
            <OrganizationMap />
            <BottomSheetStack />
        </>
    );
};

export default Main;
