import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList, ScrollView, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Container, Divider, Icons, TextComponent } from '@Components'
import { UtilStyles } from '@Utils'
import { RootStackParamList } from '@Navigations'
import { Colors, Fonts, Radius, Spacing } from '@Constants'

const datas = [
    {
        id: '1',
        name: 'The Aston Vill Hotel',
        location: 'Veum Point, Michikoton',
        price: 120,
        rating: 4.7,
        dates: '12 - 14 Nov 2024',
        guests: '2 Guests(1 Room)',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: '2',
        name: 'The Aston Vill Hotel',
        location: 'Veum Point, Michikoton',
        price: 120,
        rating: 4.7,
        dates: '12 - 14 Nov 2024',
        guests: '2 Guests(1 Room)',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: '3',
        name: 'The Aston Vill Hotel',
        location: 'Veum Point, Michikoton',
        price: 120,
        rating: 4.7,
        dates: '12 - 14 Nov 2024',
        guests: '2 Guests(1 Room)',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
]

export default function MyBookingScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [searchText, setSearchText] = useState('')
    const bottomSheetRef = useRef<any>(null)

    const showBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.snapTo(0)
        }
    }

    useEffect(() => {
    }, [])

    return (
        <Container>
            {/* Header */}
            <View style={UtilStyles.header}>
                <TextComponent text="My Booking" style={{ ...Fonts.h2, textAlign: 'center', width: '100%' }} upperCase />
            </View>

            <View style={styles.searchBox}>
                <Icons.Search size={20} />
                <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor={Colors.textSecondary}
                />
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                    onPress={() => {}}
                    style={{ borderLeftColor: Colors.textSecondary, borderLeftWidth: 1, paddingLeft: Spacing.s }}
                >
                    <Icons.Filter size={20} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={datas}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    contentContainerStyle={styles.contentContainerStyle}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.infoContainer}>
                                    <View style={styles.metaContainer}>
                                        <View style={styles.headerRow}>
                                            <TextComponent text={item.name} style={Fonts.h3} />
                                            <View style={styles.ratingContainer}>
                                                <Icons.Star size={16} color={Colors.warning} />
                                                <TextComponent text={item.rating.toString()} style={Fonts.body4} />
                                            </View>
                                        </View>

                                        <View style={styles.locationContainer}>
                                            <Icons.Location size={16} color={Colors.textSecondary} />
                                            <TextComponent text={item.location} style={Fonts.body4} color={Colors.textSecondary} />
                                        </View>

                                        <Text><TextComponent text={`$${item.price}`} style={Fonts.h2} color={Colors.primary} /> /night</Text>

                                    </View>

                                    <Divider style={{ marginVertical: Spacing.s }} />

                                    <View style={styles.metaContainer}>
                                        <View style={styles.metaItem}>
                                            <View style={styles.iconContainer}>
                                                <Icons.Calendar size={20} />
                                                <TextComponent text={'Dates'} style={Fonts.body4} />
                                            </View>
                                            <TextComponent text={item.dates} style={Fonts.body4} />
                                        </View>
                                        <View style={styles.metaItem}>
                                            <View style={styles.iconContainer}>
                                                <Icons.User size={20} />
                                                <TextComponent text={'Guest'} style={Fonts.body4} />
                                            </View>
                                            <TextComponent text={item.guests} style={Fonts.body4} />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <View style={{ height: 60 }} />
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        margin: Spacing.l,
        backgroundColor: '#fff',
        borderRadius: Radius.circle,
        paddingHorizontal: Spacing.l,
        paddingVertical: Spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },
    input: {
        width: '75%',
        marginLeft: Spacing.s,
        color: Colors.text,
        ...Fonts.body4
    },
    contentContainerStyle: {
        paddingHorizontal: Spacing.l,
        gap: Spacing.l
    },
    card: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        backgroundColor: '#fff',
        overflow: 'hidden',
        padding: 10,
        gap: 10,
    },
    image: {
        width: 96,
        height: 152,
        borderRadius: Radius.l,
    },
    infoContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
    },
    price: {
        fontSize: 13,
        marginVertical: 2,
    },
    metaContainer: {
        gap: Spacing.s,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.m,
    },
})
