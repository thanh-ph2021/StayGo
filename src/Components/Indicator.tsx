import { View } from "react-native"
import { SharedValue } from "react-native-reanimated"

import Dot from "./Dot"
import { OnboardingData } from "@Screens/OnBoarding/types"


type Props = {
    data: OnboardingData[]
    x: SharedValue<number>
}

const Indicator = ({ data, x }: Props) => {

    return (
        <View style={{ flexDirection: 'row' }}>
            {data.map((_, index) => {
                return (
                    <Dot key={index} index={index} x={x} />
                )
            })}
        </View>
    )
}

export default Indicator