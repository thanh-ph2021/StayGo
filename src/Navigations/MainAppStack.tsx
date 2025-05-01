import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '@Screens/Home'
import { ROUTES } from './routes'


const Stack = createNativeStackNavigator()

export default function MainAppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
        </Stack.Navigator>
    )
}