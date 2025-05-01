import React from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native'

import { Colors, Fonts, Radius, Spacing } from '@Constants'
import TextComponent from './TextComponent'

interface AppButtonProps {
    title: string
    onPress: () => void
    containerStyle?: ViewStyle
    textStyle?: TextStyle
}

const AppButton = ({ title, onPress, containerStyle, textStyle }: AppButtonProps) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress} activeOpacity={0.8}>
            <TextComponent text={title} style={[Fonts.h3, textStyle]} color='white'/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        padding: Spacing.l,
        borderRadius: Radius.l,
    },
})

export default AppButton
