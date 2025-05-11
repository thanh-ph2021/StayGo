import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { AppButton, AppInput, Container, Icons, TextComponent } from "@Components"
import { showNotification, UtilStyles } from "@Utils"
import { RootStackParamList, ROUTES } from "@Navigations"
import { Colors, Fonts, Spacing } from "@Constants"
import { authApi } from "@Apis"

const EmailInputScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [email, setEmail] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    const toOTPScreen = async () => {
        if (!email) return

        try {
            setLoading(true)
            const result = await authApi.generateOtp({ email })

            if (result.isSuccess) {
                navigation.navigate(ROUTES.OTP, { email })
            } else {
                const message = result.error || 'Unable to send OTP. Please try again.'
                showNotification(message, () => <Icons.Danger size={30} />)
            }
        } catch (error: any) {
            console.log(JSON.stringify(error))
            const message =
                error?.message ||
                error?.error ||
                'An error occurred while sending the OTP. Please try again later.'
            showNotification(message, () => <Icons.Danger size={30} />)
        }
        setLoading(false)
    }

    return (
        <Container>
            {/* Header */}
            <View style={UtilStyles.header}>
                <TouchableOpacity onPress={() => navigation.replace(ROUTES.MAIN)}>
                    <Icons.Close size={30} color={Colors.text} />
                </TouchableOpacity>
                <TextComponent text={"Stay Go"} style={Fonts.h2} upperCase />
                <View style={UtilStyles.headerSpacer} />
            </View>

            <View style={{ paddingHorizontal: Spacing.l, marginTop: Spacing.xl, gap: Spacing.l }}>
                <TextComponent text={"Enter your email address"} style={Fonts.h1} />
                <TextComponent
                    text={"We will use this information to help you sign in or create an account if you don’t already have one. "}
                    style={Fonts.body4}
                    color={Colors.textSecondary}
                />
                <AppInput
                    label="Email Address"
                    placeholder="Enter your email address"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <AppButton
                    title="Continue"
                    onPress={toOTPScreen}
                    disabled={!email}
                    loading={loading}
                />
            </View>
        </Container>
    )
}

export default EmailInputScreen