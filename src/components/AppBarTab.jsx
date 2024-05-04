import { Text, StyleSheet } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
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
  const navigate = useNavigate()

  const handlePress = async () => {
    if (label === 'Sign out') {
      try {
        await authStorage.removeAccessToken()
        await apolloClient.resetStore()
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Link to={link} onPress={handlePress} style={{ marginRight: 25 }}>
      <Text style={styles.text}>{label}</Text>
    </Link>
  )
}

export default AppBarTab
