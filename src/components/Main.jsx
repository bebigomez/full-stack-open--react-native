import RepositoryList from "./RepositoryList"

import { Constants, View, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  )
}

export default Main
