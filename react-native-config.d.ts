declare module 'react-native-config' {
    export interface NativeConfig {
        FACEBOOK_APP_ID?: string
        webClientId?: string
        API_VERSION?: string
    }

    export const Config: NativeConfig
    export default Config
}