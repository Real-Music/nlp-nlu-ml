import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

export default function Button({ title, onPress, color = "primary" }) {

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color] }]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        color: colors.white,
        padding: 15,
        backgroundColor: colors.primary,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginVertical: 10,
    },

    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
        textTransform: "uppercase"
    }
})
