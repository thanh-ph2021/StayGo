import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ROUTES } from './routes'
import BottomTabsNavigator from './BottomTabsNavigator'


const Stack = createNativeStackNavigator()

export default function MainAppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.TABS} component={BottomTabsNavigator} />
        </Stack.Navigator>
    )
}