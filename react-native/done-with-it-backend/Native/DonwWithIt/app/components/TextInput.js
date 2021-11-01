import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { text, colors } from "../config/styles"

export default function AppTextInput({ icon, width = "100%", ...rest }) {
    return (
        <View style={[styles.container, { width: width }]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />}
            <TextInput
                placeholderTextColor={colors.medium}
                style={[text, styles.text]} {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        alignItems: "center",
    },
    text: {
        flex: 1
    },
    icon: {
        marginRight: 10,
    }
})