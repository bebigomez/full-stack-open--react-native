import { FlatList, View, StyleSheet } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'
import theme from '../theme'

import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'

const styles = StyleSheet.create({
  separator: {
    height: 7,
    backgroundColor: theme.colors.lightGray,
  },
})

export const RepositoryListContainer = ({ repositories, setVariables }) => {
  const [selectedPrinciple, setSelectedPrinciple] = useState('latest')

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const ItemSeparator = () => <View style={styles.separator} />

  const handleChange = (itemValue) => {
    setSelectedPrinciple(itemValue)

    if (itemValue === 'latest') {
      setVariables({
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      })
    } else if (itemValue === 'highestRated') {
      setVariables({
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      })
    } else if (itemValue === 'lowestRated') {
      setVariables({
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      })
    }
  }

  const sortPicker = () => {
    return (
      <Picker selectedValue={selectedPrinciple} onValueChange={handleChange}>
        <Picker.Item label='Latest' value={'latest'} />
        <Picker.Item label='Highest rated' value={'highestRated'} />
        <Picker.Item label='Lowest rated' value={'lowestRated'} />
      </Picker>
    )
  }

  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={sortPicker}
      />
    </>
  )
}

const RepositoryList = () => {
  const [variables, setVariables] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  })

  const { repositories } = useRepositories(variables)

  return (
    <RepositoryListContainer
      repositories={repositories}
      setVariables={setVariables}
    />
  )
}

export default RepositoryList
