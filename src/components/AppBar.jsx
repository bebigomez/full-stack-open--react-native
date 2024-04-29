import { View, StyleSheet } from "react-native"
import Constants from "expo-constants"

import theme from "../theme"
import AppBarTab from "./AppBarTab"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    paddingLeft: 10,
    height: 70,
    backgroundColor: theme.colors.appBarBG,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label={"Repositories"} />
    </View>
  )
}

export default AppBar
