import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { AppButton, Container, Icons, OtpInput, TextComponent } from "@Components"
import { showNotification, UtilStyles } from "@Utils"
import { RootStackParamList, ROUTES } from "@Navigations"
import { Colors, Fonts, Spacing } from "@Constants"
import ResendOTPNotice from "./ResendOTPNotice"
import { authApi } from "@Apis"
import { MMKV_KEYS, setItem } from "@/Storage"
import { useAppDispatch } from "@Hooks"
import { loginSuccess } from "@Store/authSlice"

const OTPScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const route = useRoute<RouteProp<RootStackParamList, 'OTP'>>()
    const { email } = route.params
    const [otp, setOtp] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const verifyEmail = async () => {
        if (!otp) return

        try {
            setLoading(true)
            const result = await authApi.verifyOtp({ email, otpCode: otp })
            const { value } = result
            if (result.isSuccess && value && value.userProfile && value.token) {
                dispatch(loginSuccess(value.userProfile))
                await setItem(MMKV_KEYS.ACCESS_TOKEN, value.token)
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: ROUTES.MAIN }],
                    })
                )
            } else {
                const message = result.error || 'Incorrect OTP. Please try again.'
                showNotification(message, () => <Icons.Danger size={30} />)
            }
        } catch (error: any) {
            const message =
                error?.message ||
                error?.error ||
                'The OTP you entered is incorrect. Please try again.'
            showNotification(message, () => <Icons.Danger size={30} />)
        }
        setLoading(false)
    }

    const resendOtp = async () => {
        let message = ''
        try {
            setLoading(true)
            const result = await authApi.generateOtp({ email })

            if (result.isSuccess) {
                message = result.value || 'OTP sent your email!'
                showNotification(message, () => <Icons.Success size={30} />)
            } else {
                message = result.error || 'Unable to send OTP. Please try again.'
                showNotification(message, () => <Icons.Danger size={30} />)
            }
        } catch (error: any) {
            message =
                error?.message ||
                error?.error ||
                'An error occurred while sending the OTP. Please try again later.';
            showNotification(message, () => <Icons.Danger size={30} />)
        }
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
                <TextComponent text={"Confirm your email address"} style={Fonts.h1} />
                <TextComponent
                    text={`We’ve sent a verification code to ${email}. Please enter the code to continue.`}
                    style={Fonts.body4}
                    color={Colors.textSecondary}
                />
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    length={4}
                />
                <AppButton
                    title="Verify email"
                    onPress={verifyEmail}
                    loading={loading}
                    disabled={!otp}
                />
                <ResendOTPNotice
                    onResend={resendOtp}
                />
            </View>
        </Container>
    )
}

export default OTPScreen