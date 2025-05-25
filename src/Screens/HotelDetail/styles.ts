import { StyleSheet } from "react-native"

import { Colors, Fonts, Radius, Spacing } from "@Constants"

export const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        paddingTop: Spacing.xxl,
        paddingBottom: Spacing.l,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    image: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: Radius.l,
        borderBottomRightRadius: Radius.l,
    },
    card: {
        padding: Spacing.l,
        backgroundColor: Colors.background,
        borderTopLeftRadius: Radius.l,
        borderTopRightRadius: Radius.l,
        marginTop: -20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        marginTop: Spacing.m,
    },
    facilitiesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.l,
        marginBottom: Spacing.m,
    },
    facilityList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    facilityItem: {
        width: '20%',
        alignItems: 'center',
        gap: Spacing.xs,
        flexShrink: 1
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.m,
        borderWidth: 1,
        borderColor: Colors.divider,
        borderTopRightRadius: Radius.l,
        borderTopLeftRadius: Radius.l,
        backgroundColor: Colors.background,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs
    },
    contentContainerStyle: {
        gap: Spacing.m
    },
    recommendImage: {
        width: 80,
        height: 80,
        borderRadius: Radius.m,
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
    },
    reviewItem: {
        flexDirection: 'row',
        gap: Spacing.m,
        marginBottom: Spacing.l,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: Radius.circle,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    shareButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryLight2,
        borderRadius: Radius.circle
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardInfoRow: {
        gap: Spacing.l,
        flexDirection: 'row'
    },
    facilityIconWrapper: {
        width: 56,
        height: 56,
        borderRadius: Radius.circle,
        backgroundColor: Colors.primaryLight2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textDescription: {
        ...Fonts.body4,
        marginTop: Spacing.m
    },
    mapContainer: {
        borderColor: Colors.divider,
        borderRadius: Radius.l,
        borderWidth: 1
    },
    mapWrapper: {
        borderRadius: Radius.m,
        overflow: 'hidden',
        height: 173,
        margin: Spacing.xs
    },
    mapTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xs,
        padding: Spacing.m
    },
    recommendContent: {
        padding: Spacing.m,
        gap: Spacing.m
    },
    recomendContentFooter: {
        flexDirection: 'row',
        gap: Spacing.m,
        alignItems: 'center'
    },
    originalPrice: {
        textDecorationLine: 'line-through'
    }
})