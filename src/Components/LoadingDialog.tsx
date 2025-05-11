import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'

import TextComponent from './TextComponent'
import { Colors, Spacing } from '@Constants'

type Props = {
    description: string,
    visible: boolean,
}

const LoadingDialog = (props: Props) => {

    const { description, visible } = props

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { backgroundColor: Colors.surface }]}>
                    <ActivityIndicator size={30} />
                    <TextComponent text={`${description} ...`} style={styles.modalText} />
                </View>
            </View>
        </Modal>
    )
}

export default LoadingDialog

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalView: {
        margin: Spacing.l,
        borderRadius: 20,
        width: '80%',
        padding: Spacing.l,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})