import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Pusher from 'pusher-js/react-native';

import ActivityIndicator from '../components/ActivityIndicator'
import Card from '../components/Card';
import colors from '../config/colors';
import listingsApi from '../api/listings';
import routes from '../navigation/routes';
import Screen from '../components/Screen'
import AppText from '../components/Text';
import Button from '../components/Button';
import useApi from '../hooks/useApi';

Pusher.logToConsole = true;
const pusher = new Pusher('f2986feae831076c3a3d', {
    cluster: 'eu',
    authEndpoint: 'http://localhost:1337/pusher/auth'
});
export default function ListingScreen({ navigation }) {
    const { data: listings, error, loading, request: loadListings } = useApi(listingsApi.getListings);
    useEffect(() => {
        loadListings();
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function (data) {
            console.log(JSON.stringify(data));
            alert(JSON.stringify(data));
        });
    }, [])

    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen style={styles.screen}>
                {error && <>
                    <AppText>Couldn't retrieve the listings.</AppText>
                    <Button title='Retry' onPress={loadListings} />
                </>}

                <FlatList
                    data={listings}
                    keyExtractor={listing => listing.id.toString()}
                    renderItem={({ item }) =>
                        <Card
                            title={item.title}
                            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                            subTitle={"$" + item.price}
                            imageUrl={item.images[0].url}
                            thumbnailUrl={item.images[0].thumbnailUrl}
                        />
                    }
                />
            </Screen>
        </>
    )
}

const styles = StyleSheet.create({
    screen: {
        padding: 5,
        backgroundColor: colors.light,
    }
})
