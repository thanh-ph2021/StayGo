import React, { useEffect, useRef, useState } from 'react'
import { View, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolation, useDerivedValue, runOnJS, withTiming } from 'react-native-reanimated'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CommonActions } from '@react-navigation/native'

import { Images } from '@Assets'
import { Colors, Fonts, Sizes, Spacing } from '@Constants'
import { OnboardingData } from './types'
import { TextComponent } from '@Components'
import { Indicator } from '@Components'
import { AppButton } from '@Components'
import { ROUTES } from '@Navigations'



const data: OnboardingData[] = [
    {
        id: '1',
        image: Images.Onboarding1,
        title: 'Luxury and Comfort, Just a Tap Away',
        description: 'Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet id sem .'
    },
    {
        id: '2',
        image: Images.Onboarding2,
        title: 'Book with Ease, Stay with Style',
        description: 'Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet id sem .'
    },
    {
        id: '3',
        image: Images.Onboarding3,
        title: 'Discover Your Dream Hotel, Effortlessly',
        description: 'Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet id sem .'
    },
]

const RenderItem = ({ item }: { item: OnboardingData }) => {
    return (
        <View style={{ width: Sizes.width }}>
            <View style={{
                justifyContent: 'center'
            }}>
                <Image
                    source={item.image}
                    style={[
                        {
                            width: Sizes.width,
                            height: Sizes.height,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            top: 0
                        },
                    ]}
                />
            </View>
            <View style={{ position: 'absolute', bottom: Sizes.height * 0.18, padding: Spacing.xxl, gap: Spacing.m }}>
                <TextComponent text={item.title} style={{ ...Fonts.h1, textAlign: 'center' }} color='white' />
                <TextComponent text={item.description} style={{ ...Fonts.body4, textAlign: 'center' }} color='white' />
            </View>
        </View>
    )
}

const OnBoardingScreen = ({ navigation }: NativeStackScreenProps<any>) => {

    const x = useSharedValue(0)
    const flatListRef = useAnimatedRef<FlatList<OnboardingData>>()
    const flatListIndex = useSharedValue(0)
    const opacity = useSharedValue(0)
    const indicatorOpacity = useSharedValue(1)
    const buttonOpacity = useSharedValue(1)

    const [isLast, setIsLast] = useState(false)

    useEffect(() => {
        opacity.value = withTiming(isLast ? 1 : 0, { duration: 400 })
        indicatorOpacity.value = withTiming(isLast ? 0 : 1, { duration: 400 })
        buttonOpacity.value = withTiming(1, { duration: 400 })
    }, [isLast])

    const completeOnboarding = (route: string) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: ROUTES.AUTH, params: { screen: route } }],
            })
        )
    }

    useDerivedValue(() => {
        runOnJS(setIsLast)(flatListIndex.value === data.length - 1)
        return flatListIndex.value
    }, [flatListIndex])

    const scrollToNextSlide = () => {
        if (flatListIndex.value < data.length - 1) {
            flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 })
        } else {
            completeOnboarding(ROUTES.SIGN_IN)
        }
    }

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems && viewableItems[0] && viewableItems[0].index !== null) {
            flatListIndex.value = viewableItems[0].index
        }
    })

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                {
                    translateY: interpolate(
                        opacity.value,
                        [0, 1],
                        [20, 0],
                        Extrapolation.CLAMP
                    )
                }
            ],
        }
    })

    const indicatorStyle = useAnimatedStyle(() => {
        return {
            opacity: indicatorOpacity.value,
            transform: [
                {
                    scale: interpolate(
                        indicatorOpacity.value,
                        [0, 1],
                        [0.95, 1],
                        Extrapolation.CLAMP
                    )
                }
            ],
        }
    })

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar hidden />
            <Animated.FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={item => item.id}
                horizontal
                scrollEventThrottle={16}
                onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{
                    minimumViewTime: 300,
                    viewAreaCoveragePercentThreshold: 10
                }}
                renderItem={({ item }) => {
                    return (
                        <RenderItem item={item} />
                    )
                }}
            />
            <View style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                left: Spacing.xl,
                right: Spacing.xl,
                bottom: Sizes.height * 0.03,
                gap: Spacing.m
            }}>
                <Animated.View style={indicatorStyle}>
                    <Indicator x={x} data={data} />
                </Animated.View>

                <AppButton
                    title={isLast ? 'Get Started' : 'Continue'}
                    onPress={scrollToNextSlide}
                />

                <Animated.View style={[{ flexDirection: 'row', marginTop: Spacing.m }, animatedStyle]}>
                    <TextComponent text="Don't have an account? " style={Fonts.body4} color='white' />
                    <TouchableOpacity onPress={() => completeOnboarding(ROUTES.SIGN_UP)}>
                        <TextComponent text="Register" style={Fonts.body4} color={Colors.primary} />
                    </TouchableOpacity>
                </Animated.View>

            </View>
        </View>

    )
}

export default OnBoardingScreen