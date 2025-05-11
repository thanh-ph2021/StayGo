import React, { useRef } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native'

import { Colors, Fonts, Radius, Spacing } from '@Constants'

interface OtpInputProps {
    length?: number
    value: string
    onChange: (value: string) => void
    containerStyle?: ViewStyle
    inputStyle?: TextStyle
}

const OtpInput = ({
    length = 4,
    value,
    onChange,
    containerStyle,
    inputStyle,
}: OtpInputProps) => {
    const inputsRef = useRef<Array<TextInput | null>>([])

    const handleChange = (text: string, index: number) => {
        if (/^\d*$/.test(text)) {
            const newValue =
                value.substring(0, index) + text + value.substring(index + 1)
            onChange(newValue)

            if (text && index < length - 1) {
                inputsRef.current[index + 1]?.focus()
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {Array(length)
                .fill(0)
                .map((_, index) => {
                    const isFocused = value.length === index;
                    return (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputsRef.current[index] = ref
                              }}
                            style={[
                                styles.input,
                                isFocused && styles.inputFocused,
                                inputStyle,
                            ]}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={value[index] || ''}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            returnKeyType="done"
                            autoFocus={index === 0}
                        />
                    )
                })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.m,
    },
    input: {
        width: 56,
        height: 56,
        borderRadius: Radius.l,
        backgroundColor: Colors.button,
        textAlign: 'center',
        ...Fonts.h1,
    },
    inputFocused: {
        borderWidth: 1.5,
        borderColor: '#2563EB',
    },
})

export default OtpInput;
