import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Image } from "react-native-expo-image-cache";

import ListItem from '../components/lists/ListItem'
import Text from '../components/Text'
import colors from '../config/colors'

export default function ListingDetailsScreen({ route }) {
    const listing = route.params;

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <Image style={styles.image} tint="light" preview={{ uri: listing.images[0].thumbnailUrl }} uri={listing.images[0].url} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{listing.title}</Text>
                <Text style={styles.price}>${listing.price}</Text>

                <View style={styles.userContainer}>
                    <ListItem
                        image={require("../assets/IMG_20200103_144704_248.jpg")}
                        title="Knowledge"
                        subTitle="5 Listings"
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 300,
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
    },
    price: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
    },
    userContainer: {
        marginVertical: 40
    }

})
