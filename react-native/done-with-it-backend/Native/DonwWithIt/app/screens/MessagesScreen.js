import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../components/lists/ListItem';
import Screen from '../components/Screen';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import ListItemDeleteAction from '../components/lists/ListItemDeleteAction';

const initialMessages = [
    { id: 1, title: 'Fedjio Raymond', description: "Hey! Is this item still available?", image: require("../assets/IMG_20200103_144704_248.jpg") },
    { id: 2, title: 'Fedjio Raymond', description: "I'm interested in this item. When will you be able to post it?", image: require("../assets/IMG_20200103_144704_248.jpg") }
];

export default function MessagesScreen() {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = message => {
        // Delete the message from messages
        setMessages(messages.filter(m => m.id !== message.id));
    }
    return (
        <Screen style={styles.screen}>
            <FlatList
                data={messages}
                keyExtractor={message => message.id.toString()}
                renderItem={({ item }) =>
                    <ListItem
                        title={item.title}
                        subTitle={item.description}
                        image={item.image}
                        onPress={() => console.log("Message Selected", item)}
                        renderRightActions={() =>
                            <ListItemDeleteAction onPress={() => handleDelete(item)} />}
                    />}

                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                    setMessages([
                        { id: 2, title: 'T2', description: "D2", image: require("../assets/IMG_20200103_144704_248.jpg") }
                    ])
                }}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});