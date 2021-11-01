import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Alert, Image } from 'react-native'
import * as ImagePicker from "expo-image-picker";

import Icon from './Icon';
import colors from '../config/colors';
import uuid from '../config/uuid';

export default function ImageInput({ imageUri, onChangeImage }) {
    useEffect(() => {
        requestPermission();
    }, [])

    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library.")
    }

    const handlePress = () => {
        if (!imageUri) selectImage();
        else Alert.alert("Delete", "Are you sure you want to delete this image?", [
            { text: "Yes", onPress: () => onChangeImage(null) },
            { text: "No" },
        ])
    }

    const selectImage = async () => {
        try {
            const { cancelled, uri, type } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
                // allowsEditing: true,
                // aspect: [4, 3],
            })
            if (!cancelled) onChangeImage({ uri, type: type + "/" + uri.substr(uri.lastIndexOf("/") + 1).split(".")[1], name: uri.substr(uri.lastIndexOf("/") + 1) })
        } catch (error) {
            console.log("Error reading image", error);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri && <Icon name="camera" size={70} iconColor={colors.medium} backgroundColor={colors.light} />}
                {imageUri && <Image style={styles.image} source={{ uri: imageUri.uri }} />}
            </View>
        </TouchableWithoutFeedback>)
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 100,
        backgroundColor: colors.light,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%"
    }
})