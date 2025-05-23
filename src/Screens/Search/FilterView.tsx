import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView
} from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { Colors, Spacing, Radius, Fonts } from '@Constants'
import { TextComponent, Icons, AppButton } from '@Components'
import { FilterViewProps } from './type'
import GuestSelectorModal from './GuestSelectorModal'

const cities = ['San Diego', 'New York', 'Amsterdam']
const facilities = ['Free Wifi', 'Swimming Pool', 'Tv', 'Laundry']
const ratings = [5, 4, 3, 2, 1]

const FilterView: React.FC<FilterViewProps> = ({ onApply }) => {
    const [selectedCity, setSelectedCity] = useState('San Diego')
    const [instantBook, setInstantBook] = useState(false)
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>(['Free Wifi', 'Laundry'])
    const [selectedRating, setSelectedRating] = useState(4)
    const [range, setRange] = useState<number[]>([20, 50])
    const [guestModalVisible, setGuestModalVisible] = useState(false)
    const [guests, setGuests] = useState({ adults: 2, children: 0 })

    const toggleFacility = (facility: string) => {
        setSelectedFacilities(prev =>
            prev.includes(facility)
                ? prev.filter(f => f !== facility)
                : [...prev, facility]
        )
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
            <TextComponent text="Filter By" style={{ ...Fonts.h2, textAlign: 'center' }} />

            {/* Placeholder */}
            <TextComponent text='Placeholder' style={styles.label} />
            <TouchableOpacity
                onPress={() => setGuestModalVisible(true)}
                style={styles.dropdown}
            >
                <TextComponent
                    text={`${guests.adults + guests.children} Guest${(guests.adults + guests.children) > 1 ? 's' : ''} (${guests.adults} Adult${guests.adults > 1 ? 's' : ''}, ${guests.children} Children${guests.children > 1 ? 's' : ''})`}
                    style={Fonts.body4}
                />
                <Icons.ArrowDown size={16} color={Colors.text} />
            </TouchableOpacity>

            {/* Price */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextComponent text='Price' style={styles.label} />
                <TextComponent text={`$${range[0]} - $${range[1]}`} style={Fonts.body3} />
            </View>

            <MultiSlider
                values={range}
                min={0}
                max={80}
                step={1}
                onValuesChange={(values) => setRange(values)}
                sliderLength={300}
                selectedStyle={{ backgroundColor: Colors.primary }}
                unselectedStyle={{ backgroundColor: Colors.divider }}
                markerStyle={styles.thumb}
                containerStyle={{ alignSelf: 'center' }}
            />

            {/* Instant Book */}
            <View style={styles.switchRow}>
                <View>
                    <TextComponent text='Instant Book' style={styles.label} />
                    <TextComponent
                        text="Book without waiting for the host to respond"
                        style={Fonts.body5}
                        color={Colors.textSecondary}
                    />
                </View>

                <Switch
                    value={instantBook}
                    onValueChange={setInstantBook}
                    trackColor={{ false: '#ccc', true: Colors.primary }}
                    thumbColor={instantBook ? Colors.primaryLight : Colors.background}
                />
            </View>

            {/* Location */}
            <TextComponent text='Location' style={styles.label} />
            <View style={styles.chipRow}>
                {cities.map(city => (
                    <TouchableOpacity
                        key={city}
                        onPress={() => setSelectedCity(city)}
                        style={[
                            styles.chip,
                            selectedCity === city && styles.chipSelected
                        ]}
                    >
                        <TextComponent
                            text={city}
                            color={selectedCity === city ? Colors.background : Colors.text}
                            style={Fonts.body4}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Facilities */}
            <TextComponent text='Facilities' style={styles.label} />
            {facilities.map(facility => (
                <TouchableOpacity
                    key={facility}
                    style={styles.checkRow}
                    onPress={() => toggleFacility(facility)}
                >
                    <TextComponent text={facility} style={Fonts.body4} />
                    <View style={[styles.checkbox, selectedFacilities.includes(facility) && styles.checkedBox]}>
                        {selectedFacilities.includes(facility) && <Icons.Checkbox size={24} color={Colors.primary} />}
                    </View>
                </TouchableOpacity>
            ))}

            {/* Ratings */}
            <TextComponent text='Ratings' style={styles.label} />
            <View style={styles.ratingRow}>
                {ratings.map(rating => (
                    <TouchableOpacity
                        key={rating}
                        style={[
                            styles.star,
                            selectedRating === rating && styles.starSelected
                        ]}
                        onPress={() => setSelectedRating(rating)}
                    >
                        <Icons.Star size={16} color={Colors.warning} />
                        <TextComponent text={`${rating}`} style={Fonts.body4} />
                    </TouchableOpacity>
                ))}
            </View>

            <AppButton
                title='Apply Filter'
                containerStyle={{ marginVertical: Spacing.l }}
                backgroundColor={Colors.primary}
                onPress={() => onApply({
                    city: selectedCity,
                    instantBook,
                    facilities: selectedFacilities,
                    rating: selectedRating,
                    priceRange: range,
                    guests
                })}
            />
            <GuestSelectorModal
                visible={guestModalVisible}
                onClose={() => setGuestModalVisible(false)}
                onConfirm={(adults, children) => setGuests({ adults, children })}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Spacing.l,
        backgroundColor: Colors.background,
    },
    label: {
        marginTop: Spacing.l,
        marginBottom: Spacing.s,
        ...Fonts.h3,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.m,
        borderRadius: Radius.m,
        borderWidth: 1,
        borderColor: Colors.divider,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chipRow: {
        flexDirection: 'row',
        gap: Spacing.m,
    },
    chip: {
        paddingHorizontal: Spacing.m,
        paddingVertical: Spacing.s,
        borderRadius: Radius.l,
        borderWidth: 1,
        borderColor: Colors.divider,
    },
    chipSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    checkRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.s,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: Colors.divider,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedBox: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.s,
    },
    star: {
        padding: Spacing.s,
        borderRadius: Radius.m,
        borderWidth: 1,
        borderColor: Colors.divider,
        alignItems: 'center',
        flexDirection: 'row',
        gap: Spacing.xs
    },
    starSelected: {
        borderColor: Colors.primary,
    },
    thumb: {
        height: 20,
        width: 20,
        borderRadius: Radius.circle,
        backgroundColor: Colors.background,
        borderWidth: 3,
        borderColor: Colors.primary,
    },
})

export default FilterView
