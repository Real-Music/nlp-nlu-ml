import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from '../config/colors'

export default function NewListingButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons name="plus-circle" color={colors.white} size={30} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        alignItems: "center",
        borderColor: colors.white,
        borderWidth: 10,
        borderRadius: 40,
        justifyContent: "center",
        height: 70,
        width: 70,
        bottom: 20,
    }
})