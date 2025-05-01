import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { setItem } from "@Storage"
import { MMKV_KEYS } from "@Storage"
import { TextComponent } from "@Components"

const SignUpScreen = () => {
    const navigation = useNavigation();

    async function handleLoginSuccess() {
        setItem(MMKV_KEYS.IS_LOGGED_IN, 'true')

        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Home' }],
        // })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextComponent text="Sign Up Screen" />
        </View>
    );
}

export default SignUpScreen