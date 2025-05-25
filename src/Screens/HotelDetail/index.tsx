import React from 'react'
import { Image, View, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolation
} from 'react-native-reanimated'
import MapView from 'react-native-maps'

import { Colors, Fonts, Spacing } from '@Constants'
import { AppButton, Icons, TextComponent } from '@Components'
import { RootStackParamList } from '@Navigations'
import { UtilStyles } from '@Utils'
import { styles } from './styles'

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

const reviews = [
    {
        id: '1',
        name: 'Kim Borrdy',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Amazing! The room is good than the picture.\nThanks for amazing experience!',
        rating: 4.5,
    },
    {
        id: '2',
        name: 'Mirai Kamazuki',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'The service is on point, and I really like the facilities. Good job!',
        rating: 5.0,
    },
]

const HotelDetailScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const scrollY = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y
        },
    })

    const animatedHeaderStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolate(
            scrollY.value,
            [0, 150],
            [0, 1],
            Extrapolation.CLAMP
        )

        return {
            backgroundColor: `rgba(255,255,255,${backgroundColor})`,
            borderBottomWidth: backgroundColor > 0.1 ? 1 : 0,
            borderBottomColor: 'rgba(0,0,0,0.1)',
        }
    })

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <Animated.View style={[styles.headerContainer, animatedHeaderStyle]}>
                <View style={UtilStyles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Icons.ArrowLeft size={28} color={Colors.text} />
                    </TouchableOpacity>
                    <TextComponent text="Detail" style={Fonts.h2} upperCase />
                    <TouchableOpacity>
                        <Icons.More size={28} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                {/* Image */}
                <TouchableOpacity>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // dùng ảnh mẫu
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>


                {/* Info */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View>
                            <TextComponent text="The Aston Vill Hotel" style={Fonts.h2} />

                            <View style={styles.cardInfoRow}>
                                <View style={styles.row}>
                                    <Icons.LocationFill size={16} color={Colors.primary} />
                                    <TextComponent text="Veum Point, Michikoton" style={Fonts.body4} color={Colors.textSecondary} />
                                </View>

                                <View style={styles.row}>
                                    <Icons.Star color={Colors.warning} size={16} />
                                    <TextComponent text="4.6" style={Fonts.h4} />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.shareButton}>
                            <Icons.Share size={24} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>


                    {/* Facilities */}
                    <View style={styles.facilitiesHeader}>
                        <TextComponent text="Common Facilities" style={Fonts.h3} />
                        <TouchableOpacity>
                            <TextComponent text="See All" style={[Fonts.body4, { color: Colors.primary }]} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.facilityList}>
                        {[
                            { Icon: <Icons.Wind />, label: 'Ac' },
                            { Icon: <Icons.Building />, label: 'Restaurant' },
                            { Icon: <Icons.SwimmingPool />, label: 'Swimming Pool' },
                            { Icon: <Icons.Support24 />, label: '24-Hours Front Desk' },
                        ].map((item, index) => (
                            <View key={index} style={styles.facilityItem}>
                                <View style={styles.facilityIconWrapper}>
                                    {item.Icon}
                                </View>
                                <TextComponent text={item.label} style={{ ...Fonts.body4, textAlign: 'center' }} color={Colors.textSecondary} canExpand={false} />
                            </View>
                        ))}
                    </View>

                    {/* Description */}
                    <TextComponent text="Description" style={Fonts.h3} />
                    <TextComponent
                        text="Khách sạn Novotel Saigon Centre hiện đại này có hồ bơi ngoài trời, phòng xông hơi khô và các liệu pháp spa thư giãn. Các phòng máy lạnh tại đây đi kèm với cả Internet có dây miễn phí và Wi-Fi miễn phí. Chỗ ở này chỉ cách Ga Sài Gòn 2 km.

Các phòng hiện đại đều được trang bị TV màn hình phẳng, két an toàn cá nhân và minibar. Một số loại phòng có máy pha cà phê espresso và ổ cắm cho iPod. Các phòng tắm riêng đi kèm với vòi sen hoặc bồn tắm.

Cách Novotel Saigon Centre 5 phút đi bộ là các điểm tham quan như Nhà thờ Đức Bà, Nhà hát Lớn Sài Gòn và Bảo tàng Chứng tích Chiến tranh. Khách sạn cách Sân bay Tân Sơn Nhất 20 phút lái xe.

Khách có thể rèn luyện sức khoẻ tại trung tâm thể dục hoặc thư giãn với liệu pháp mát-xa tại Inbalance Spa. Khách sạn cũng cung cấp các phòng họp, dịch vụ giặt là và lễ tân 24 giờ.

Các bữa tiệc tự chọn quốc tế được phục vụ tại nhà hàng The Square. Quý khách có thể thưởng thức đồ uống cũng như đồ ăn nhẹ tại quầy bar 167 Faubourg ở sảnh đợi."
                        style={styles.textDescription}
                        canExpand
                    />

                    {/* Map Location */}
                    <View style={styles.facilitiesHeader}>
                        <TextComponent text="Location" style={Fonts.h3} />
                        <TouchableOpacity>
                            <TextComponent text="Open Map" style={Fonts.body4} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mapContainer}>
                        <View style={styles.mapWrapper}>
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
                        <View style={styles.mapTitleWrapper}>
                            <Icons.LocationFill size={16} color={Colors.primary} />
                            <TextComponent text="Veum Point, Michikoton" style={Fonts.body3} color={Colors.textSecondary} />
                        </View>
                    </View>

                    <View style={styles.facilitiesHeader}>
                        <TextComponent text="Reviews" style={Fonts.h3} />
                        <TouchableOpacity>
                            <TextComponent text="See All" style={Fonts.body4} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {reviews.map((review) => (
                        <View key={review.id} style={styles.reviewItem}>
                            <Image
                                source={{ uri: review.avatar }}
                                style={styles.avatar}
                            />
                            <View style={{ flex: 1 }}>
                                <View style={styles.reviewHeader}>
                                    <TextComponent text={review.name} style={Fonts.h4} />
                                    <View style={styles.ratingContainer}>
                                        <Icons.Star size={14} color={Colors.warning} />
                                        <TextComponent text={review.rating.toFixed(1)} style={Fonts.h4} />
                                    </View>
                                </View>
                                <TextComponent
                                    text={review.content}
                                    style={[Fonts.body4, { marginTop: Spacing.xs }]}
                                    color={Colors.textSecondary}
                                />
                            </View>
                        </View>
                    ))}

                    <View style={styles.facilitiesHeader}>
                        <TextComponent text="Recommendation" style={Fonts.h3} />
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
                                <View style={styles.recommendContent}>
                                    <TextComponent text={item.name} style={Fonts.h4} />
                                    <View style={styles.iconContainer}>
                                        <Icons.LocationFill size={14} color={Colors.textSecondary} />
                                        <TextComponent text={item.location} style={Fonts.body5} color={Colors.textSecondary} numberOfLines={1} />
                                    </View>

                                    <View style={styles.recomendContentFooter}>
                                        <View style={styles.iconContainer}>
                                            <Icons.Star size={14} color={Colors.warning} />
                                            <TextComponent text={`${item.rating}`} style={Fonts.body5} />
                                            <TextComponent text="(532)" style={Fonts.body5} color={Colors.textSecondary} />
                                        </View>
                                        <TextComponent text={`$${item.price}`} style={Fonts.h4} />
                                        <TextComponent text={`$199`} style={[Fonts.body5, styles.originalPrice]} color={Colors.accent} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Animated.ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={{ gap: Spacing.xs }}>
                    <TextComponent text="Price" style={Fonts.body4} color={Colors.textSecondary} />
                    <TextComponent text="$120.00" style={Fonts.h1} />
                </View>
                <AppButton
                    title='Booking now'
                    onPress={() => { }}
                    containerStyle={{ width: '50%' }}
                />
            </View>
        </View>
    )
}

export default HotelDetailScreen
