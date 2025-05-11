
import { ReactNode } from "react"
import { StatusBar, StyleProp, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Colors, Spacing } from "@Constants"

interface ContainerProps {
    children: ReactNode
    style?: StyleProp<ViewStyle>
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: Colors.background, paddingTop: Spacing.m }, style]}>
            <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
            {children}
        </SafeAreaView>
    )
}

export default Container