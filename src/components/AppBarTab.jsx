import { Pressable, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "700",
  },
})

const AppBarTab = ({ label }) => {
  return (
    <Pressable>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  )
}

export default AppBarTab
