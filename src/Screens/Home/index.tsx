import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

const HomeScreen = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

export default HomeScreen