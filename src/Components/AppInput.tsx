import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native'

import { Colors, Fonts, Radius, Spacing } from '@Constants'

interface AppInputProps extends TextInputProps {
  label?: string
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
}

const AppInput = ({
  label,
  containerStyle,
  inputStyle,
  ...textInputProps
}: AppInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={Colors.placeholder}
        {...textInputProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.m,
  },
  label: {
    ...Fonts.h4,
    color: Colors.text,
    marginBottom: Spacing.s,
  },
  input: {
    backgroundColor: Colors.button,
    paddingVertical: Spacing.l,
    paddingHorizontal: Spacing.l,
    borderRadius: Radius.m,
    color: Colors.text,
    ...Fonts.body3
  },
})

export default AppInput
