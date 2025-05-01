import { useEffect, useState } from "react"
import SplashScreen from "react-native-splash-screen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

import AuthStack from "./AuthStack"
import MainAppStack from "./MainAppStack"
import { getItem, MMKV_KEYS } from "@Storage"
import { ROUTES } from "./routes"
import { OnBoardingScreen } from "@Screens"

const Stack = createNativeStackNavigator()

const RootNavigator = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const loggedIn = getItem(MMKV_KEYS.IS_LOGGED_IN)
            setIsLoggedIn(loggedIn === 'true')
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
                initialRouteName={!isLoggedIn ? ROUTES.ONBOARDING : ROUTES.MAIN}
                screenOptions={{
                    headerShown: false,
                    statusBarAnimation: 'slide',
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name={ROUTES.ONBOARDING} component={OnBoardingScreen} />
                {!isLoggedIn ? <Stack.Screen name={ROUTES.AUTH} component={AuthStack} /> : <Stack.Screen name={ROUTES.MAIN} component={MainAppStack} />}
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default RootNavigator