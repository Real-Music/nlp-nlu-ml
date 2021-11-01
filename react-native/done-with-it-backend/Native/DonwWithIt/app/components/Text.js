import React from 'react'
import { Text } from 'react-native'

import { text } from "../config/styles";

export default function AppText({ children, style, ...rest }) {
    return (
        <Text numberOfLines={2} style={[text, style]} {...rest}>{children}</Text>
    )
}
