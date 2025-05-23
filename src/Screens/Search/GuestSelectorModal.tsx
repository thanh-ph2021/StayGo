import React, { useState } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import { Colors, Spacing, Radius, Fonts } from '@Constants'
import { TextComponent } from '@Components'
import { GuestSelectorModalProps } from './type'

const GuestSelectorModal: React.FC<GuestSelectorModalProps> = ({ visible, onClose, onConfirm }) => {
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)

    const handleChange = (type: 'adults' | 'children', delta: number) => {
        if (type === 'adults') {
            setAdults(prev => Math.max(1, prev + delta))
        } else {
            setChildren(prev => Math.max(0, prev + delta))
        }
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <TextComponent text={'Placeholder'} style={styles.title} />

                    <View style={styles.row}>
                        <TextComponent text={'Adults'} style={styles.label} />
                        <View style={styles.counter}>
                            <TouchableOpacity onPress={() => handleChange('adults', -1)}>
                                <TextComponent text={'−'} style={[styles.btn, adults <= 1 && styles.disabled]} />
                            </TouchableOpacity>
                            <TextComponent text={adults.toString()} style={styles.value} />
                            <TouchableOpacity onPress={() => handleChange('adults', 1)}>
                                <TextComponent text={'+'} style={styles.btn} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <TextComponent text={'Children'} style={styles.label} />
                        <View style={styles.counter}>
                            <TouchableOpacity onPress={() => handleChange('children', -1)} disabled={children <= 0}>
                                <TextComponent text={'−'} style={[styles.btn, children <= 0 && styles.disabled]} />
                            </TouchableOpacity>
                            <Text style={styles.value}>{children}</Text>
                            <TouchableOpacity onPress={() => handleChange('children', 1)}>
                                <TextComponent text={'+'} style={styles.btn} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={onClose} style={styles.cancel}>
                            <TextComponent text={'Cancel'} style={styles.cancelText} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                onConfirm(adults, children)
                                onClose()
                            }}
                            style={styles.confirm}
                        >
                            <TextComponent text={'Confirm'} style={styles.confirmText} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: Colors.background,
        padding: Spacing.l,
        borderRadius: Radius.l,
        width: '90%',
    },
    title: {
        ...Fonts.h3,
        marginBottom: Spacing.m,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: Spacing.s,
    },
    label: {
        ...Fonts.body3,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        ...Fonts.body2,
        color: Colors.primary,
        paddingHorizontal: Spacing.m,
    },
    disabled: {
        color: Colors.divider,
    },
    value: {
        minWidth: 30,
        textAlign: 'center',
        ...Fonts.body3,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: Spacing.l,
    },
    cancel: {
        paddingVertical: Spacing.s,
        paddingHorizontal: Spacing.m,
    },
    cancelText: {
        color: Colors.textSecondary,
    },
    confirm: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.s,
        paddingHorizontal: Spacing.l,
        borderRadius: Radius.m,
        marginLeft: Spacing.s,
    },
    confirmText: {
        color: Colors.background,
    },
})

export default GuestSelectorModal
