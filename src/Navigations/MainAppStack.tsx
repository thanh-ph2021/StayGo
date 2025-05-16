import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ROUTES } from './routes'
import BottomTabsNavigator from './BottomTabsNavigator'
import { NearbyHotelsScreen } from '@Screens'


const Stack = createNativeStackNavigator()

export default function MainAppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.TABS} component={BottomTabsNavigator} />
            <Stack.Screen name={ROUTES.NEARBY_HOTEL} component={NearbyHotelsScreen} />
        </Stack.Navigator>
    )
}