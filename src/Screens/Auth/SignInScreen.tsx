import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { AppButton, Container, Icons, TextComponent, LoadingDialog } from "@Components"
import { Colors, Fonts, Spacing } from "@Constants"
import { showNotification, UtilStyles } from "@Utils"
import { RootStackParamList, ROUTES } from "@Navigations"
import { signInWithGoogle, signInWithFacebook } from "@Services"
import { useAppDispatch } from "@Hooks"
import { authApi } from "@Apis"
import { MMKV_KEYS, setItem } from "@Storage"
import { loginSuccess } from "@Store/authSlice"

const SignInScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const handleGoogleLogin = async () => {
        try {
            const idToken = await signInWithGoogle()
            setLoading(true)
            const response = await authApi.loginWithGoogle({ idToken })

            const { value } = response
            if (response.isSuccess && value && value.userProfile && value.token) {
                await setItem(MMKV_KEYS.ACCESS_TOKEN, value.token)
                dispatch(loginSuccess(value.userProfile))
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: ROUTES.MAIN }],
                    })
                )
            }
        } catch (err) {
            showNotification("Login failed.", () => <Icons.Danger size={30} />)
        }
        setLoading(false)
    }

    const handleFacebookLogin = async () => {
    try {
        setLoading(true)
        const accessToken = await signInWithFacebook()
        const response = await authApi.loginWithFacebook({ accessToken })

        const { value } = response
        if (response.isSuccess && value && value.userProfile && value.token) {
            await setItem(MMKV_KEYS.ACCESS_TOKEN, value.token)
            dispatch(loginSuccess(value.userProfile))
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: ROUTES.MAIN }],
                })
            )
        }
    } catch (err) {
        showNotification("Facebook login failed.", () => <Icons.Danger size={30} />)
    } finally {
        setLoading(false)
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
                <TextComponent text={"Sign in to easily access your trip information"} style={Fonts.h1} />
                <AppButton
                    Icon={() => <Icons.Google size={30} />}
                    title="Continue with Google account"
                    onPress={handleGoogleLogin}
                    backgroundColor={Colors.button}
                    textColor={Colors.text}
                />
                <AppButton
                    Icon={() => <Icons.Facebook size={30} />}
                    title="Continue with Facebook account"
                    onPress={handleFacebookLogin}
                    backgroundColor={Colors.button}
                    textColor={Colors.text}
                />
                <AppButton
                    title="Continue with email"
                    onPress={() => navigation.navigate(ROUTES.EMAIL_INPUT)}
                />
            </View>

            <View style={{ position: 'absolute', bottom: Spacing.xl, left: Spacing.l, right: Spacing.l }}>
                <Text style={styles.text}>
                    By signing up and creating an account, you agree to our{' '}
                    <Text style={styles.link} onPress={() => { }}>
                        Terms and Conditions
                    </Text>{' '}
                    as well as our{' '}
                    <Text style={styles.link} onPress={() => { }}>
                        Safety and Security Policy
                    </Text>.
                </Text>
            </View>
            <LoadingDialog
                description={'Please wait'}
                visible={loading}
            />
        </Container>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: Colors.textSecondary,
        ...Fonts.body4
    },
    link: {
        fontWeight: 'bold',
        color: Colors.text,
    },
})