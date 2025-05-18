import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { useAppDispatch, useAppSelector } from '@Hooks'
import { userProfile, logout as logoutAction } from '@Store/authSlice'
import { AppButton, Container, Icons, TextComponent } from '@Components'
import { Colors, Fonts, Radius, Spacing } from '@Constants'
import { RootStackParamList, ROUTES } from '@/Navigations'
import { UtilStyles } from '@/Utils'
import { MMKV_KEYS, setItem } from '@/Storage'

const ProfileScreen = () => {
  const user = useAppSelector(userProfile)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useAppDispatch()

  useEffect(() => { }, [])

  const logout = async () => {
    await setItem(MMKV_KEYS.ACCESS_TOKEN, "")

    dispatch(logoutAction())
  }

  return (
    <Container>
      {user ? (
        <>
          <View style={UtilStyles.header}>
            <TextComponent text={'Profile'} style={styles.headerText} />
          </View>

          <View style={styles.userInfoContainer}>
            <View style={styles.userInfo}>
              {user.avatar ? <Image source={{ uri: user.avatar }} resizeMode='cover' style={styles.avatar} /> : <Icons.Profile size={60} color={Colors.textSecondary} />}
              <View style={styles.userDetails}>
                <TextComponent text={user.fullName} style={Fonts.h3} />
                <TextComponent text={user.email} style={Fonts.body5} color={Colors.textSecondary} />
              </View>
            </View>

            <TouchableOpacity>
              <Icons.Edit size={25} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingsContainer}>
            <TextComponent text={'Settings'} style={Fonts.h3} color={Colors.textSecondary} />

            <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
              {[
                { label: 'Your Card', icon: <Icons.Card size={25} color={Colors.text} />, onPress: () => { } },
                { label: 'Security', icon: <Icons.Shield size={25} color={Colors.text} />, onPress: () => { } },
                { label: 'Notification', icon: <Icons.Bell size={25} color={Colors.text} />, onPress: () => { } },
                { label: 'Languages', icon: <Icons.Globe size={25} color={Colors.text} />, onPress: () => { } },
                { label: 'Help and Support', icon: <Icons.Help size={25} color={Colors.text} />, onPress: () => { } },
              ].map((item, index) => (
                <TouchableOpacity key={index} onPress={item.onPress} style={styles.settingItem}>
                  {item.icon}
                  <TextComponent text={item.label} style={Fonts.body3} />
                </TouchableOpacity>
              ))}

              <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </>
      ) : (
        <View style={styles.loggedOutContainer}>
          <Icons.Profile color={Colors.text} size={80} />
          <TextComponent
            text={'Log in to manage your bookings and enjoy up to 10% off on selected hotels.'}
            style={styles.loggedOutText}
          />
          <AppButton
            title={'Log In or Register'}
            backgroundColor={Colors.primaryLight}
            onPress={() => navigation.navigate(ROUTES.SIGN_IN)}
          />
        </View>
      )}
    </Container>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  headerText: {
    ...Fonts.h2,
    width: '100%',
    textAlign: 'center',
  },
  userInfoContainer: {
    padding: Spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userInfo: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: Spacing.l
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: Radius.circle,
  },
  userDetails: {
    flexShrink: 1,
  },
  settingsContainer: {
    paddingHorizontal: Spacing.l,
  },
  scrollArea: {
    marginTop: Spacing.m,
  },
  scrollContent: {
    gap: Spacing.l,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
    paddingVertical: Spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textSecondary,
  },
  logoutBtn: {
    marginTop: Spacing.l,
  },
  logoutText: {
    color: Colors.accent,
    textAlign: 'center',
    ...Fonts.h3,
  },
  loggedOutContainer: {
    alignItems: 'center',
    padding: Spacing.l,
    paddingTop: Spacing.xxl,
    gap: Spacing.l,
  },
  loggedOutText: {
    ...Fonts.body3,
    textAlign: 'center',
  },
})
