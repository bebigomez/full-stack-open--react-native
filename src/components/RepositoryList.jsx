import { FlatList, View, StyleSheet } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 7,
    backgroundColor: theme.colors.lightGray,
  },
})

const RepositoryList = () => {
  const { repositories } = useRepositories()

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const ItemSeparator = () => <View style={styles.separator} />

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  )
}

export default RepositoryList
