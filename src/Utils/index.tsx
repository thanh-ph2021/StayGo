import { StyleSheet, View } from "react-native"
import { Notifier } from "react-native-notifier"

export { default as UtilStyles } from "./UtilStyles"
import { Colors, Fonts, Spacing } from "@Constants"
import { TextComponent } from "@Components"

export const showNotification = (title: string, Icon: () => React.ReactElement) => {
  Notifier.showNotification({
    duration: 2000,
    title: title,
    Component: (props) => {
      return (
        <View style={styles.container}>
          <Icon />
          <TextComponent text={props.title} style={Fonts.body3} />
        </View>
      )
    }
  })
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    padding: Spacing.s,
    marginHorizontal: Spacing.s,
    marginVertical: Spacing.xxl,
    borderRadius: Spacing.s,
    alignItems: 'center',
    gap: Spacing.s,
    elevation: 6
  },
})