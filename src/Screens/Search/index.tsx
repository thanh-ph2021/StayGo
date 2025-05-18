import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList, ScrollView, TextInput } from 'react-native'
import MapView, { Callout, Marker, MapMarker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { AppButton, Container, Divider, Icons, TextComponent } from '@Components'
import { UtilStyles } from '@Utils'
import { RootStackParamList } from '@Navigations'
import { Colors, Fonts, Radius, Spacing } from '@Constants'

const datas = [
    {
        id: '3',
        name: 'Serenity Sands',
        location: 'Honolulu, HI',
        price: 270,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.0,
        bedroom: 1,
        bathroom: 3
    },
    {
        id: '4',
        name: 'Serenity Sands',
        location: 'Honolulu, HI',
        price: 270,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 4.0,
        bedroom: 3,
        bathroom: 3
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

export default function SearchScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
    }, [])

    return (
        <Container>
            {/* Header */}
            <View style={UtilStyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icons.ArrowLeft size={28} color={Colors.text} />
                </TouchableOpacity>
                <TextComponent text="Search" style={Fonts.h2} upperCase />
                <TouchableOpacity style={styles.iconBtn}>
                    <Icons.Bell size={22} color={Colors.text} />
                    <View style={styles.badge} />
                </TouchableOpacity>
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
                <TouchableOpacity style={{ borderLeftColor: Colors.textSecondary, borderLeftWidth: 1, paddingLeft: Spacing.s }}>
                    <Icons.Filter size={20} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {searchText ? (
                    <>
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

                        <FlatList
                            data={datas}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                            contentContainerStyle={{ paddingTop: Spacing.l, paddingHorizontal: Spacing.l, gap: Spacing.l }}
                            renderItem={({ item }) => {
                                const infoItems = [
                                    {
                                        icon: <Icons.DoubleBed size={20} />,
                                        text: `${item.bedroom} beds`,
                                    },
                                    {
                                        icon: <Icons.BathRoom size={20} />,
                                        text: `${item.bathroom} bathrooms`,
                                    },
                                ]

                                return (
                                    <TouchableOpacity style={styles.card}>
                                        <View style={styles.imageContainer}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={styles.image}
                                            />
                                            <View style={styles.imageOverlay}>
                                                <View style={styles.ratingBox}>
                                                    <Icons.Star size={20} color={Colors.warning} />
                                                    <TextComponent
                                                        text={item.rating.toFixed(1)}
                                                        style={Fonts.body4}
                                                        color={Colors.background}
                                                    />
                                                </View>
                                                <TouchableOpacity style={styles.heartButton}>
                                                    <Icons.Heart size={20} color={Colors.background} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={styles.namePriceRow}>
                                                <TextComponent text={item.name} style={Fonts.h3} />
                                                <TextComponent text={`$${item.price}`} style={Fonts.h2} color={Colors.primary} />
                                            </View>

                                            <View style={styles.locationRow}>
                                                <TextComponent text={item.location} style={Fonts.body4} color={Colors.textSecondary} />
                                                <TextComponent text={`Per Night`} style={Fonts.body4} color={Colors.textSecondary} />
                                            </View>

                                            <View style={styles.infoRow}>
                                                {infoItems.map((info, index) => (
                                                    <React.Fragment key={index}>
                                                        <View style={styles.infoItem}>
                                                            {info.icon}
                                                            <TextComponent
                                                                text={info.text}
                                                                style={[Fonts.body4, styles.infoText]}
                                                                color={Colors.textSecondary}
                                                            />
                                                        </View>
                                                        {index < infoItems.length - 1 && <View style={styles.dot} />}
                                                    </React.Fragment>
                                                ))}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <View style={{ height: 60 }} />
                    </>
                ) : (
                    <>
                        <FlatList
                            data={datas}
                            keyExtractor={item => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                            contentContainerStyle={{ paddingHorizontal: Spacing.l, gap: Spacing.l }}
                            ListHeaderComponent={() => (
                                <View style={[styles.sectionHeader, { paddingTop: Spacing.l }]}>
                                    <TextComponent text="Recent Searches" style={Fonts.h3} />
                                    <TouchableOpacity>
                                        <TextComponent text="Clear All" style={Fonts.body4} color={Colors.accent} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.l }}>
                                    <Icons.Clock size={24} color={Colors.textSecondary} />
                                    <View style={{ gap: Spacing.xs }}>
                                        <TextComponent text={item.name} style={[Fonts.h4]} />
                                        <TextComponent text={item.location} style={Fonts.body5} color={Colors.textSecondary} />
                                    </View>
                                </TouchableOpacity>
                            )}

                        />

                        <FlatList
                            data={datas}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                            contentContainerStyle={{ padding: Spacing.l }}
                            ItemSeparatorComponent={() => <Divider />}
                            ListHeaderComponent={() => (
                                <View style={[styles.sectionHeader, { paddingBottom: Spacing.l }]}>
                                    <TextComponent text="Recently Viewed" style={Fonts.h3} />
                                    <TouchableOpacity>
                                        <TextComponent text="See All" style={Fonts.body4} color={Colors.primary} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.recentViewCard}>
                                    <Image source={{ uri: item.image }} style={styles.recentViewImage} />
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
                    </>
                )}
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
    iconBtn: {
        padding: Spacing.s,
        marginLeft: Spacing.s,
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    recentViewCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.m,
        backgroundColor: Colors.background,
    },
    card: {
        gap: Spacing.m,
        backgroundColor: Colors.background,
    },
    recentViewImage: {
        width: 80,
        height: 80,
        borderRadius: Radius.m,
    },
    imageContainer: {
        width: '100%',
        height: 180
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs
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
    filterIconContainer: {
        width: 24,
        height: 24,
        borderRadius: Radius.circle,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: Radius.l,
    },
    imageOverlay: {
        position: 'absolute',
        top: Spacing.l,
        left: Spacing.l,
        right: Spacing.l,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: Radius.l,
        padding: Spacing.xs,
    },
    heartButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: Radius.l,
        padding: Spacing.xs,
    },
    namePriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: Spacing.s,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        marginLeft: Spacing.xs,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.textSecondary,
        marginHorizontal: Spacing.s,
    },
})
