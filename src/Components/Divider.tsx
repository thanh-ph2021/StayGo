import { Spacing } from '@/Constants'
import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

type DividerProps = {
    color?: string
    thickness?: number
    marginVertical?: number
    width?: string | number
    style?: StyleProp<ViewStyle>
}

const Divider: React.FC<DividerProps> = ({
    color = '#E0E0E0',
    thickness = 1,
    marginVertical = Spacing.m,
    width = '100%',
    style
}) => {
    return (
        <View
            style={[
                styles.divider,
                {
                    backgroundColor: color,
                    height: thickness,
                    marginVertical: marginVertical,
                    width: width as any,
                },
                style
            ]}
        />
    )
}

const styles = StyleSheet.create({
    divider: {
        alignSelf: 'center',
    },
})

export default Divider
