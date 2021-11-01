import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from './Icon'
import Text from './Text'

export default function CategoryPickerItem({ item, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Icon backgroundColor={item.backgroundColor} name={item.icon} size={50} />
            <Text style={styles.label}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: "center",
        width: "33.3333%",
    },
    label: {
        marginTop: 5,
        textAlign: "center"
    }
})
