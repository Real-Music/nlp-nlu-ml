import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import Screen from '../components/Screen'
import ListItem from '../components/lists/ListItem'
import colors from '../config/colors'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import Icon from '../components/Icon'
import useAuth from '../auth/useAuth'

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
    },
    {
        title: "My Messages",
        targetScreen: "Messages",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.secondary,
        },
    },
]

export default function AccountScreen({ navigation }) {
    const { user, logOut } = useAuth();

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user.name}
                    subTitle={user.email}
                    image={require("../assets/IMG_20200103_144704_248.jpg")}
                />
            </View>

            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    renderItem={({ item }) =>
                        <ListItem
                            title={item.title}
                            IconComponent={<Icon {...item.icon} />}
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />}

                    ItemSeparatorComponent={ListItemSeparator}
                />
            </View>

            <ListItem
                title="Log Out"
                IconComponent={<Icon name="logout" backgroundColor={colors.yellow} />}
                onPress={() => logOut()}
            />

        </Screen>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
    },
    container: {
        marginVertical: 20,
    }
})
