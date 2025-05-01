import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SigInScreen, SignUpScreen } from '@Screens/Auth'
import { ROUTES } from './routes'

const Stack = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.SIGN_IN} component={SigInScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP} component={SignUpScreen} />
    </Stack.Navigator>
  )
}