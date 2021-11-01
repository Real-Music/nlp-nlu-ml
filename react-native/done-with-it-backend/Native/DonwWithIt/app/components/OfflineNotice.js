import React from 'react'
import { View, StyleSheet } from 'react-native';
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

import Text from './Text'
import colors from '../config/colors';

export default function OfflineNotice() {
    const netInfo = useNetInfo();

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No Internet Connection</Text>
            </View>
        )

    return null;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: 50,
        width: "100%",
        position: "absolute",
        top: Constants.statusBarHeight,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: colors.white
    }
});