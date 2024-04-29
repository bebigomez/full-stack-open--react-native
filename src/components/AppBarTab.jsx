import { Text, StyleSheet } from "react-native"
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "700",
  },
})

const AppBarTab = ({ label, link }) => {
  return (
    <Link to={link} style={{ marginRight: 25 }}>
      <Text style={styles.text}>{label}</Text>
    </Link>
  )
}

export default AppBarTab
