import React, { memo, useState } from 'react'
import { StyleProp, TextStyle, Text, Platform, TextLayoutEventData, NativeSyntheticEvent } from "react-native"

import { Colors } from '@Constants'

interface Props {
    text?: string,
    color?: string,
    size?: number,
    flex?: number,
    style?: StyleProp<TextStyle>,
    title?: boolean,
    numberOfLines?: number,
    showFullLine?: boolean,
    canExpand?: boolean,
    upperCase?: boolean
}
const TextComponent = (props: Props) => {

    const { text, color, size, flex, style, title, numberOfLines, showFullLine, canExpand = true, upperCase } = props
    const [textShown, setTextShown] = useState(false)
    const [lengthMore, setLengthMore] = useState(false)

    const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14

    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }

    const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        setLengthMore(event.nativeEvent.lines.length > (numberOfLines ?? 3))
    }

    return (
        <>
            <Text
                numberOfLines={textShown || showFullLine ? undefined : (numberOfLines ?? 3)}
                style={[
                    {
                        color: color ?? Colors.text,
                        flex: flex ?? 0,
                        fontSize: size ? size : title ? 18 : fontSizeDefault,
                        lineHeight: 21,
                        fontFamily: 'Roboto-Regular'
                    },
                    style,
                ]}
                onTextLayout={onTextLayout}
            >
                {upperCase ? text!.toUpperCase() : text}
            </Text>

            {canExpand && lengthMore && !showFullLine ? <Text
                onPress={toggleNumberOfLines}
                style={{ lineHeight: 21, marginTop: 10, color: Colors.primary }}
            >{textShown ? 'Read less' : 'Read more'}</Text> : <></>}
        </>


    )
}

export default memo(TextComponent)