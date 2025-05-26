import React from 'react'
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TouchableOpacity, View } from 'react-native'

import { ROUTES } from "./routes"
import { BottomTabParamList } from './types'
import { Icons, TextComponent } from '@Components'
import { Colors, Fonts, Spacing } from '@Constants'
import { HomeScreen, MyBookingScreen, ProfileScreen } from '@/Screens'

const Tab = createBottomTabNavigator<BottomTabParamList>()

const AppTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {

    const renderTabItem = (route: string, isFocused: boolean) => {
        let icon
        let label

        switch (route) {
            case ROUTES.HOME:
                icon = isFocused ? <Icons.HomeFill color={Colors.primary} size={24} /> : <Icons.Home color={Colors.textSecondary} size={24} />
                label = "Home"
                break
            case ROUTES.MY_BOOKING:
                icon = isFocused ? <Icons.DocumentFill color={Colors.primary} size={24} /> : <Icons.Document color={Colors.textSecondary} size={24} />
                label = "My Booking"
                break
            case ROUTES.MESSAGE:
                icon = isFocused ? <Icons.MessagesFill color={Colors.primary} size={24} /> : <Icons.Messages color={Colors.textSecondary} size={24} />
                label = "Messages"
                break
            case ROUTES.PROFILE:
                icon = isFocused ? <Icons.ProfileFill color={Colors.primary} size={24} /> : <Icons.Profile color={Colors.textSecondary} size={24} />
                label = "Profile"
                break
            default:
                return null
        }

        return (
            <View style={{ alignItems: "center" }}>
                {icon}
                <TextComponent text={label} style={{ color: isFocused ? Colors.primary : Colors.textSecondary, ...Fonts.body4 }} />
            </View>
        )
    }

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            elevation: 6,
            backgroundColor: Colors.background,
        }}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index

                const onPress = () => {
                    switch (route.name) {
                        case ROUTES.HOME:
                        case ROUTES.MY_BOOKING:
                        case ROUTES.MESSAGE:
                        case ROUTES.PROFILE:
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key,
                                canPreventDefault: true,
                            })
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name)
                            }
                            break
                    }
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            margin: Spacing.s
                        }}
                    >
                        {renderTabItem(route.name, isFocused)}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const BottomTabsNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={ROUTES.HOME}
            tabBar={props => <AppTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                lazy: true
            }}

        >
            <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
            <Tab.Screen name={ROUTES.MY_BOOKING} component={MyBookingScreen} />
            <Tab.Screen name={ROUTES.MESSAGE} component={HomeScreen} />
            <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default BottomTabsNavigator