import { Platform } from 'react-native';

import color from './colors';

export const text = {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: color.dark,
}

export const colors = color;