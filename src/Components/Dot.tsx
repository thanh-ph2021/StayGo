import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedProps } from "react-native-reanimated"

import { Colors, Sizes } from "@Constants"

type Props = {
    index: number,
    x: SharedValue<number>
}

const Dot = ({ index, x }: Props) => {

    const animatedDotStyle = useAnimatedProps(() => {
        const inputRange = [(index - 1) * Sizes.width, index * Sizes.width, (index + 1) * Sizes.width]
        const widthAnimation = interpolate(
            x.value,
            inputRange,
            [10, 32, 10],
            Extrapolation.CLAMP
        )
        const opacityAnimation = interpolate(
            x.value,
            inputRange,
            [0.6, 0.9, 0.6],
            Extrapolation.CLAMP
        )
        return {
            width: widthAnimation,
            opacity: opacityAnimation,
        }
    })

    return (
        <Animated.View
            style={[
                {
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: Colors.primary,
                    margin: 10,
                },
                animatedDotStyle
            ]}
        />
    )
}

export default Dot