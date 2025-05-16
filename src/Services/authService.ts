import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'

export const signInWithGoogle = async (): Promise<string | null> => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

        const userInfo = await GoogleSignin.signIn()
        const idToken = userInfo.data?.idToken

        if (!idToken) {
            console.warn('⚠️ Google Sign-In returned no idToken.')
            return null
        }

        return idToken
    } catch (error: any) {
        console.error('❌ Google Sign-in error:', error.message || error)
        throw new Error('Google Sign-in failed. Please try again.')
    }
}

export const signInWithFacebook = async (): Promise<string | null> => {
    try {
        const loginResult = await LoginManager.logInWithPermissions(['public_profile', 'email'])

        if (loginResult.isCancelled) {
            console.log('⚠️ Facebook login was cancelled by user.')
            return null
        }

        const data = await AccessToken.getCurrentAccessToken()
        if (!data?.accessToken) {
            console.warn('⚠️ Facebook login: missing access token.')
            return null
        }

        return data.accessToken.toString()
    } catch (error) {
        console.error('Facebook Sign-in error:', error)
        throw new Error('Facebook login failed. Please try again.')
    }
}