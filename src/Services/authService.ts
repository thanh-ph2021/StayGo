import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'

export const signInWithGoogle = async (): Promise<string> => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

        const userInfo = await GoogleSignin.signIn()
        const idToken = userInfo.data?.idToken

        if (!idToken) {
            throw new Error('Google Sign-In failed: Missing idToken.')
        }

        return idToken
    } catch (error: any) {
        console.error('❌ Google Sign-in error:', error.message || error)
        throw new Error('Google Sign-in failed. Please try again.')
    }
}

export const signInWithFacebook = async (): Promise<string> => {
    try {
        const loginResult = await LoginManager.logInWithPermissions(['public_profile', 'email'])

        if (loginResult.isCancelled) {
            throw new Error('Facebook login was cancelled.')
        }

        const data = await AccessToken.getCurrentAccessToken()
        if (!data || !data.accessToken) {
            throw new Error('Failed to get Facebook access token.')
        }

        return data.accessToken.toString()
    } catch (error) {
        console.error('Facebook Sign-in error:', error)
        throw new Error('Facebook login failed. Please try again.')
    }
}