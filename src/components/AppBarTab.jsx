import { Text, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: '700',
  },
})

const AppBarTab = ({ label, link }) => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const handlePress = () => {
    if (label === 'Sign out') {
      authStorage.removeAccessToken()
      apolloClient.resetStore()
    }
  }

  return (
    <Link to={link} onPress={handlePress} style={{ marginRight: 25 }}>
      <Text style={styles.text}>{label}</Text>
    </Link>
  )
}

export default AppBarTab
