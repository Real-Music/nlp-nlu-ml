import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Image } from "react-native-expo-image-cache";

import Text from './Text'
import colors from '../config/colors'

export default function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Image uri={imageUrl} tint="light" preview={{ uri: thumbnailUrl }} style={styles.image} />

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden",
        borderRadius: 15,
    },
    detailsContainer: {
        padding: 20
    },
    image: {
        height: 200,
        width: "100%",
    },
    title: {
        marginBottom: 7
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold"
    }
})