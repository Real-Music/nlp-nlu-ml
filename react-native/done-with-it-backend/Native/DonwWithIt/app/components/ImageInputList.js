import React, { useRef } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import ImageInput from './ImageInput'

export default function ImageInputList({ imageUris = [], onAddImage, onRemoveImage }) {
    const scrollView = useRef()
    return (
        <View>
            <ScrollView ref={scrollView} horizontal={true} onContentSizeChange={() => scrollView.current.scrollToEnd()}>
                <View style={styles.container}>
                    {imageUris.map(image => <View key={Math.random()} style={styles.image}><ImageInput imageUri={image} onChangeImage={() => onRemoveImage(image)} /></View>)}
                    <ImageInput onChangeImage={onAddImage} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    image: {
        marginRight: 10,
    }
})