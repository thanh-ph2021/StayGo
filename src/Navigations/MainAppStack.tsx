import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ROUTES } from './routes'
import BottomTabsNavigator from './BottomTabsNavigator'
import { HotelDetailScreen, NearbyHotelsScreen, SearchScreen } from '@Screens'

const Stack = createNativeStackNavigator()

export default function MainAppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.TABS} component={BottomTabsNavigator} />
            <Stack.Screen name={ROUTES.NEARBY_HOTEL} component={NearbyHotelsScreen} />
            <Stack.Screen name={ROUTES.SEARCH} component={SearchScreen} />
            <Stack.Screen name={ROUTES.HOTEL_DETAIL} component={HotelDetailScreen} />
        </Stack.Navigator>
    )
}