import { useFonts } from "expo-font";
import { observer, Provider } from "mobx-react";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Appearance, AppearanceProvider } from "react-native-appearance";
import Button from "./src/components/buttons/Button";
import { useStyles } from "./src/hooks/useStyles";
import { API } from "./src/models";
import BottomSheetStack from "./src/navigation/BottomSheetStack";
import ApiProvider from "./src/providers/ApiProvider";
import { ThemeProvider } from "./src/providers/ThemeProvider";
import OrganizationMap from "./src/screens/organization/OrganizationMap";
import stores from "./src/stores/stores";
import { Theme } from "./src/types/ITheme";

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.color.layout,
        },
    });

function App() {
    const styles = useStyles(createStyles);

    const [loaded] = useFonts({
        Gilroy: require("./assets/fonts/Gilroy-Regular.ttf"),
        GilroyLight: require("./assets/fonts/Gilroy-Light.ttf"),
        GilroyMedium: require("./assets/fonts/Gilroy-Medium.ttf"),
        GilroySemibold: require("./assets/fonts/Gilroy-Semibold.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <AppearanceProvider>
            <ApiProvider api={API}>
                <Provider {...stores}>
                    <ThemeProvider theme={Appearance.getColorScheme() === "dark" ? "dark" : "light"}>
                        <StatusBar />
                        <View style={styles.container}>
                            <Button
                                size="md"
                                variant="outlined"
                                style={{ position: "absolute", top: 150, left: 50, zIndex: 500 }}
                                text='click'
                                onPress={() => console.log("none")}
                            />
                            <OrganizationMap />
                        </View>
                        <BottomSheetStack />
                    </ThemeProvider>
                </Provider>
            </ApiProvider>
        </AppearanceProvider>
    );
}
export default observer(App);
