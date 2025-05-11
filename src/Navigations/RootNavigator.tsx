import { useEffect, useState } from "react"
import SplashScreen from "react-native-splash-screen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

import MainAppStack from "./MainAppStack"
import { getItem, MMKV_KEYS } from "@Storage"
import { ROUTES } from "./routes"
import { EmailInputScreen, OnBoardingScreen, OTPScreen, SigInScreen } from "@Screens"

const Stack = createNativeStackNavigator()

const RootNavigator = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isFirstLaunch, setIsFirstLaunch] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const isFirstLaunch = getItem(MMKV_KEYS.IS_FIRST_LAUNCH)
            setIsFirstLaunch(isFirstLaunch === 'true')
            setIsLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hide()
        }
    }, [isLoading])

    if (isLoading) return null

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={!isFirstLaunch ? ROUTES.ONBOARDING : ROUTES.MAIN}
                screenOptions={{
                    headerShown: false,
                    statusBarAnimation: 'slide',
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name={ROUTES.ONBOARDING} component={OnBoardingScreen} />
                <Stack.Screen name={ROUTES.MAIN} component={MainAppStack} />
                <Stack.Screen name={ROUTES.SIGN_IN} component={SigInScreen} />
                <Stack.Screen name={ROUTES.EMAIL_INPUT} component={EmailInputScreen} />
                <Stack.Screen name={ROUTES.OTP} component={OTPScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator