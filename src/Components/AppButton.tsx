import React from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native'

import { Colors, Fonts, Radius, Spacing } from '@Constants'
import TextComponent from './TextComponent'

interface AppButtonProps {
    title: string;
    onPress: () => void
    containerStyle?: ViewStyle
    textStyle?: TextStyle
    Icon?: () => React.ReactElement
    textColor?: string
    backgroundColor?: string
    disabled?: boolean
    loading?: boolean
}

const AppButton = ({ title,
    onPress,
    containerStyle,
    textStyle,
    Icon,
    textColor = 'white',
    backgroundColor = Colors.primary,
    disabled,
    loading = false
}: AppButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor },
                containerStyle,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            {loading ? (
                <ActivityIndicator size="small" color={textColor} />
            ) : (
                <>
                    {Icon && <Icon />}
                    <TextComponent text={title} style={[Fonts.h3, textStyle]} color={textColor} />
                </>
            )}
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
        flexDirection: 'row',
        gap: Spacing.s
    },
})

export default AppButton
