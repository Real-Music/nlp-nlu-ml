import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from "../config/styles"
import Text from './Text';
import Screen from './Screen';
import PickerItem from './PickerItem';
import Button from './Button';

export default function Picker({ icon, items, numberOfColumns = 1, selectedItem, onSelectItem, PickerItemComponent = PickerItem, placeholder, width = "100%" }) {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { width }]}>
                    {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />}
                    {selectedItem ? <Text style={styles.text}>{selectedItem.name}</Text> : <Text style={styles.placeholder}>{placeholder}</Text>}

                    <MaterialCommunityIcons name="chevron-down" size={20} color={colors.medium} />
                </View>
            </TouchableWithoutFeedback>

            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                    <FlatList
                        data={items}
                        numColumns={numberOfColumns}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <PickerItemComponent
                                label={item.name}
                                item={item}
                                onPress={() => {
                                    setModalVisible(false);
                                    onSelectItem(item)
                                }} />
                        }
                    />
                </Screen>
            </Modal>
        </>
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
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
    },
    placeholder: {
        color: colors.medium,
        flex: 1,
    }
})