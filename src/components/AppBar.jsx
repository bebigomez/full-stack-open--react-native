import { View, StyleSheet, ScrollView } from 'react-native'

import Constants from 'expo-constants'
import theme from '../theme'

import AppBarTab from './AppBarTab'

import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingBottom: 20,
    paddingLeft: 10,
    height: 70,
    backgroundColor: theme.colors.appBarBG,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
})

const AppBar = () => {
  const { loading, data } = useQuery(ME)

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label={'Repositories'} link={'/'} />
        {!loading && !data.me ? (
          <> 
            <AppBarTab label={'Sign in'} link={'/signin'} />
            <AppBarTab label={'Sign Up'} link={'/signup'} />
          </>
        ) : (
          <>
            <AppBarTab label={'Create a review'} link={'/create-review'} />
            <AppBarTab label={'My reviews'} link={'/myreviews'} />
            <AppBarTab label={'Sign out'} />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
