import { View, StyleSheet, ScrollView } from "react-native"
import Constants from "expo-constants"

import theme from "../theme"
import AppBarTab from "./AppBarTab"

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingBottom: 20,
    paddingLeft: 10,
    height: 70,
    backgroundColor: theme.colors.appBarBG,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label={"Repositories"} link={"/"} />
        <AppBarTab label={"Sign in"} link={"/signin"} />
      </ScrollView>
    </View>
  )
}

export default AppBar
