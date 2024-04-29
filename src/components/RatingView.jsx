import { StyleSheet, View } from "react-native"
import Text from "./Text"

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
})

const RatingView = ({ count, label }) => {
  return (
    <View style={styles.itemContainer}>
      {count > 1000 ? (
        <Text fontWeight={"bold"}>{(count / 1000).toFixed(1)}k</Text>
      ) : (
        <Text fontWeight={"bold"}>{count}</Text>
      )}

      <Text color={"textSecondary"}>{label}</Text>
    </View>
  )
}

export default RatingView
