import React, { useEffect } from "react"
import { PortalProvider } from '@gorhom/portal'
import { Provider } from "react-redux"
import { NotifierWrapper } from "react-native-notifier"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import Config from "react-native-config"
import { Settings } from 'react-native-fbsdk-next'

import { store } from "./Store"
import { RootNavigator } from "./Navigations"


function App() {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: Config.webClientId
        })
        Settings.setAppID(Config.FACEBOOK_APP_ID!)
        Settings.initializeSDK()
    }, [])

    return (
        <Provider store={store}>
            <GestureHandlerRootView>
                <PortalProvider>
                    <NotifierWrapper>
                        <RootNavigator />
                    </NotifierWrapper>
                </PortalProvider>
            </GestureHandlerRootView>
        </Provider>
    )
}

export default App