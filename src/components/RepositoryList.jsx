import React, { useState } from 'react'

import { FlatList, View, StyleSheet } from 'react-native'

import { useDebounce } from 'use-debounce'
import useRepositories from '../hooks/useRepositories'

import RepositoryItem from './RepositoryItem'
import { Searchbar } from 'react-native-paper'
import SortPicker from './SortPicker'

import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 7,
    backgroundColor: theme.colors.lightGray,
  },
})

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPrinciple: 'latest',
    }
  }

  handleSearchBar = (value) => {
    this.props.setSearchQuery(value)
  }

  RepositoryListHeader = () => {
    return (
      <>
        <Searchbar
          placeholder='Search'
          onChangeText={this.handleSearchBar}
          value={this.props.searchQuery}
        />
        <SortPicker
          selectedPrinciple={this.state.selectedPrinciple}
          setSelectedPrinciple={(selectedPrinciple) =>
            this.setState({ selectedPrinciple })
          }
          setVariables={this.props.setVariables}
        />
      </>
    )
  }

  render() {
    const { repositories } = this.props
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []

    const ItemSeparator = () => <View style={styles.separator} />

    return (
      <>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <RepositoryItem item={item} />}
          ListHeaderComponent={this.RepositoryListHeader}
          onEndReached={this.props.onEndReach}
        />
      </>
    )
  }
}

const RepositoryList = () => {
  const [variables, setVariables] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [value] = useDebounce(searchQuery, 500)

  const { repositories, fetchMore } = useRepositories(
    {
      first: 3,
      orderBy: variables.orderBy,
      orderDirection: variables.orderDirection,
      searchKeyword: value
    }
  )

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      setVariables={setVariables}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
