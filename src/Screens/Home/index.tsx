import { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView, Text } from 'react-native'
import MapView from 'react-native-maps'

import { useAppSelector } from '@Hooks'
import { userProfile } from '@Store/authSlice'
import { Container, Divider, Icons, TextComponent } from '@Components'
import { Colors, Fonts, Radius, Spacing } from '@Constants'
import { UtilStyles } from '@Utils'

// Sample Data
const popularVillas = [
  {
    id: '1',
    name: 'The Horizon Retreat',
    location: 'Los Angeles, CA',
    price: 480,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Opal Grove Inn',
    location: 'San Diego, CA',
    price: 190,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5,
  },
]

const recommendedVillas = [
  {
    id: '3',
    name: 'Serenity Sands',
    location: 'Honolulu, HI',
    price: 270,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.0,
  },
  {
    id: '4',
    name: 'Serenity Sands',
    location: 'Honolulu, HI',
    price: 270,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.0,
  },
]

const filterTabs = [
  {
    title: 'All',
    Icon: undefined
  },
  {
    title: 'Villas',
    Icon: <Icons.Villa size={16} />
  },
  {
    title: 'Hotels',
    Icon: <Icons.Hotel size={16} />
  },
  {
    title: 'Apartments',
    Icon: <Icons.Residential size={16} />
  },
]

const HomeScreen = () => {
  const user = useAppSelector(userProfile)
  const [filter, setFilter] = useState(filterTabs[0])

  useEffect(() => {
  }, [])

  return (
    <Container style={styles.container}>
      {user ? (
        <View style={styles.userRow}>
          <Image
            source={{ uri: user?.avatar }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <TextComponent text={user?.fullName || 'Guest'} style={Fonts.h3} />
            {user.country ? <View style={styles.iconContainer}>
              <Icons.Location size={14} color={Colors.textSecondary} />
              <TextComponent
                text={user.country}
                style={Fonts.body5}
                color={Colors.textSecondary}
              />
            </View> : <></>}
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Icons.Search size={22} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icons.Bell size={22} color={Colors.text} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={UtilStyles.header}>
          <TextComponent text={'StayGo'} style={Fonts.h2} />
          <TouchableOpacity style={styles.iconBtn}>
            <Icons.Search size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Change Location Box */}
        <TouchableOpacity style={styles.locationBox}>
          <Icons.LocationFill size={24} color={Colors.primary} />
          <TextComponent
            text={'You Can Change Your Location to show nearby villas'}
            style={{ ...Fonts.body4, flexShrink: 1 }}
            color={Colors.text}
          />
          <Icons.ChevronRight size={18} color={Colors.text} />
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <TextComponent text="Most Popular" style={Fonts.h3} />
          <TouchableOpacity>
            <TextComponent text="See All" style={Fonts.body4} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={popularVillas}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.popularCard}>
              <Image source={{ uri: item.image }} style={styles.popularImage} />
              <View style={styles.popularOverlay}>
                <View style={styles.heartIcon}>
                  <Icons.HeartFill size={18} color={Colors.accent} />
                </View>
                <View style={styles.popularCardTextContainer}>
                  <TextComponent text={item.name} style={[Fonts.h4]} color={Colors.background} />
                  <TextComponent text={item.location} style={Fonts.body5} color={Colors.background} />
                  <View style={styles.cardFooter}>
                    <TextComponent text={`$${item.price}/night`} style={Fonts.h4} color={Colors.background} />
                    <View style={styles.popularCardRating}>
                      <Icons.Star size={15} color={Colors.warning} />
                      <TextComponent text={item.rating.toString()} style={Fonts.body5} color={Colors.background} />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Recommended Section */}
        <View style={styles.sectionHeader}>
          <TextComponent text="Recommended for you" style={Fonts.h3} />
          <TouchableOpacity>
            <TextComponent text="See All" style={Fonts.body4} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Filter tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabs}>
          {filterTabs.map((item, index) => (
            <TouchableOpacity key={index} style={styles.filterBtn}>
              {item.Icon ? <View style={styles.filterIconContainer}>
                {item.Icon}
              </View> : <></>}
              <TextComponent text={item.title} style={Fonts.body4} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended List */}
        <FlatList
          data={recommendedVillas}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: Spacing.l, paddingHorizontal: Spacing.l }}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recommendCard}>
              <Image source={{ uri: item.image }} style={styles.recommendImage} />
              <View style={{ flex: 1, gap: Spacing.m }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextComponent text={item.name} style={Fonts.h4} />
                  <View style={styles.iconContainer}>
                    <Icons.Star size={16} color={Colors.warning} />
                    <TextComponent text={item.rating.toFixed(1)} style={Fonts.body4} />
                  </View>
                </View>

                <View style={styles.iconContainer}>
                  <Icons.Location size={15} color={Colors.textSecondary} />
                  <TextComponent text={item.location} style={Fonts.body5} color={Colors.textSecondary} />
                </View>
                <Text><TextComponent text={`$${item.price}`} style={Fonts.h3} color={Colors.primary} />/night</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={styles.sectionHeader}>
          <TextComponent text="Hotel Near You" style={Fonts.h3} />
          <TouchableOpacity>
            <TextComponent text="Open Map" style={Fonts.body4} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: Spacing.l, borderRadius: Radius.m, overflow: 'hidden', height: 167 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 10.762622,
              longitude: 106.660172,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          />
        </View>

        <View style={styles.sectionHeader}>
          <TextComponent text="Best Today 🔥" style={Fonts.h3} />
          <TouchableOpacity>
            <TextComponent text="See All" style={Fonts.body4} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={popularVillas}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bestTodayCard}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.recommendImage}
                resizeMode="cover"
              />
              <View style={{ padding: Spacing.m, gap: Spacing.m }}>
                <TextComponent text={item.name} style={Fonts.h4} />
                <View style={styles.iconContainer}>
                  <Icons.LocationFill size={14} color={Colors.textSecondary} />
                  <TextComponent text={item.location} style={Fonts.body5} color={Colors.textSecondary} numberOfLines={1} />
                </View>

                <View style={{ flexDirection: 'row', gap: Spacing.m, alignItems: 'center' }}>
                  <View style={styles.iconContainer}>
                    <Icons.Star size={14} color={Colors.warning} />
                    <TextComponent text={`${item.rating}`} style={Fonts.body5} />
                    <TextComponent text="(532)" style={Fonts.body5} color={Colors.textSecondary} />
                  </View>
                  <TextComponent text={`$${item.price}`} style={Fonts.h4} />
                  <TextComponent text={`$199`} style={[Fonts.body5, { textDecorationLine: 'line-through', color: Colors.accent }]} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={{ height: 100 }} />
      </ScrollView>
    </Container>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: undefined
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
    padding: Spacing.l,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: Radius.circle,
  },
  iconBtn: {
    padding: Spacing.s,
    marginLeft: Spacing.s,
    borderColor: Colors.textSecondary,
    borderWidth: 1,
    borderRadius: Radius.circle
  },
  badge: {
    width: 8,
    height: 8,
    backgroundColor: Colors.accent,
    borderRadius: Radius.circle,
    position: 'absolute',
    top: 8,
    right: 10,
  },
  locationBox: {
    backgroundColor: Colors.primaryLight + '20',
    padding: Spacing.m,
    marginHorizontal: Spacing.l,
    borderRadius: Radius.l,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
    marginTop: Spacing.m,
  },
  sectionHeader: {
    margin: Spacing.l,
    marginHorizontal: Spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularCard: {
    width: 180,
    height: 220,
    backgroundColor: Colors.background,
    borderRadius: Radius.m,
    overflow: 'hidden',
  },
  popularImage: {
    width: '100%',
    height: '100%',
    borderRadius: Radius.m
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.background,
    padding: Spacing.xs,
    borderRadius: Radius.circle,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  filterTabs: {
    paddingHorizontal: Spacing.l,
    gap: Spacing.m,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s,
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: Radius.m,
  },
  recommendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
    backgroundColor: Colors.background,
  },
  recommendImage: {
    width: 80,
    height: 80,
    borderRadius: Radius.m,
  },
  popularOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  popularCardTextContainer: {
    position: 'absolute',
    bottom: Spacing.l,
    paddingHorizontal: Spacing.l,
    gap: Spacing.xs,
  },
  popularCardRating: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  filterIconContainer: {
    width: 24,
    height: 24,
    borderRadius: Radius.circle,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs
  },
  contentContainerStyle: {
    paddingHorizontal: Spacing.l,
    gap: Spacing.m
  },
  bestTodayCard: {
    width: 280,
    backgroundColor: Colors.background,
    borderRadius: Radius.m,
    borderWidth: 0.3,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.l,
  }
})