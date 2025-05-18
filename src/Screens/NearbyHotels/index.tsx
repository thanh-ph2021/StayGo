import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import MapView, { Callout, Marker, MapMarker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { AppButton, Icons, TextComponent } from '@Components'
import { UtilStyles } from '@Utils'
import { RootStackParamList } from '@Navigations'
import { Colors, Fonts, Radius, Spacing } from '@Constants'

const hotels = [
    {
        id: 1,
        title: 'Elysian Suites',
        rating: 4.7,
        price: 320,
        coordinate: { latitude: 37.78825, longitude: -122.4324 },
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // thay bằng ảnh phù hợp
        address: 'San Diego, CA',
    },
    {
        id: 2,
        title: 'Elysian Suites',
        rating: 4.5,
        price: 320,
        address: 'San Diego, CA',
        coordinate: { latitude: 37.78865, longitude: -122.4334 },
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 3,
        title: 'Elysian Suites',
        rating: 4.0,
        price: 320,
        address: 'San Diego, CA',
        coordinate: { latitude: 37.78845, longitude: -122.4314 },
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
]

export default function NearbyHotelsScreen() {
    const [selectedHotel, setSelectedHotel] = useState(hotels[0])
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const markerRefs = useRef<Record<number, MapMarker>>({})

    useEffect(() => {
        if (selectedHotel) {
            const timeout = setTimeout(() => {
                markerRefs.current[selectedHotel.id]?.showCallout()
            }, 500)

            return () => clearTimeout(timeout)
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={UtilStyles.header}>
                    <TouchableOpacity
                        style={{ backgroundColor: Colors.background, borderRadius: Radius.circle, padding: Spacing.s }}
                        onPress={() => navigation.goBack()}
                    >
                        <Icons.ArrowLeft size={28} color={Colors.text} />
                    </TouchableOpacity>
                    <TextComponent text="Nearby Hotel" style={Fonts.h2} upperCase />
                    <TouchableOpacity>
                        <Icons.Sort size={28} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBox}>
                    <Icons.Search size={20} />
                    <TextComponent text={'Search...'} style={[Fonts.body4, { marginLeft: Spacing.s }]} color={Colors.placeholder} />
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={{ borderLeftColor: Colors.textSecondary, borderLeftWidth: 1, paddingLeft: Spacing.s }}>
                        <Icons.Filter size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Map */}
            <MapView
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {hotels.map((hotel) => (
                    <Marker
                        key={hotel.id}
                        coordinate={hotel.coordinate}
                        onPress={() => {
                            setSelectedHotel(hotel)
                        }}
                        pinColor={Colors.primary}
                        ref={(ref) => {
                            if (ref) markerRefs.current[hotel.id] = ref
                        }}
                    >
                        <Callout tooltip>
                            <View style={styles.calloutWrapper}>
                                <View style={styles.calloutContainer}>
                                    <TextComponent text={`$${hotel.price}`} style={Fonts.body3} color={Colors.primary}/>
                                </View>
                                <View style={styles.arrow} />
                            </View>

                        </Callout>
                    </Marker>
                ))}
            </MapView>

            {/* Hotel Info Card */}
            {selectedHotel && (
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', gap: Spacing.l, alignItems: 'center' }}>
                        <Image source={{ uri: selectedHotel.image }} style={styles.cardImage} />
                        <View style={{ flex: 1, gap: Spacing.m }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextComponent text={selectedHotel.title} style={Fonts.h3} />
                                <View style={styles.iconContainer}>
                                    <Icons.Star size={18} color={Colors.warning} />
                                    <TextComponent text={selectedHotel.rating.toFixed(1)} style={Fonts.body4} />
                                </View>
                            </View>

                            <View style={styles.iconContainer}>
                                <Icons.Location size={15} color={Colors.textSecondary} />
                                <TextComponent text={selectedHotel.address} style={Fonts.body5} color={Colors.textSecondary} />
                            </View>
                            <Text><TextComponent text={`$${selectedHotel.price}`} style={Fonts.h3} color={Colors.primary} />/night</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: Spacing.l, justifyContent: 'space-between' }}>
                        <AppButton
                            title='Booking Now'
                            onPress={() => { }}
                            containerStyle={{ width: '70%' }}
                        />
                        <TouchableOpacity style={styles.chatButton}>
                            <Icons.Messages size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    calloutWrapper: {
        alignItems: 'center',
    },
    calloutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.s,
        backgroundColor: Colors.background,
        padding: Spacing.s,
        borderRadius: Radius.circle,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 6,
        borderTopEndRadius: Radius.s,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: Colors.background,
        marginTop: -1,
    },
    headerContainer: {
        position: 'absolute',
        top: Spacing.xxl,
        left: Spacing.xs,
        right: Spacing.xs,
        zIndex: 10,
    },
    searchBox: {
        margin: Spacing.l,
        backgroundColor: '#fff',
        borderRadius: Radius.circle,
        padding: Spacing.l,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },
    marker: {
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs
    },
    card: {
        position: 'absolute',
        bottom: Spacing.xl,
        left: Spacing.l,
        right: Spacing.l,
        backgroundColor: '#fff',
        borderRadius: Radius.l,
        padding: Spacing.xl,
        elevation: 5,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: Radius.l,
    },
    chatButton: {
        borderColor: Colors.placeholder,
        borderWidth: 1,
        borderRadius: Radius.circle,
        padding: Spacing.l,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
