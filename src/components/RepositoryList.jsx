import { FlatList, View, StyleSheet } from 'react-native'

import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import useRepositories from '../hooks/useRepositories'

import RepositoryItem from './RepositoryItem'
import SortPicker from './SortPicker'
import { Searchbar } from 'react-native-paper'

import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 7,
    backgroundColor: theme.colors.lightGray,
  },
})

// const RepositoryListHeader = ({
//   handleSearchBar,
//   searchQuery,
//   selectedPrinciple,
//   setSelectedPrinciple,
//   setVariables,
// }) => {
//   return (
//     <>
//       <Searchbar
//         placeholder='Search'
//         onChangeText={handleSearchBar}
//         value={searchQuery}
//       />
//       <SortPicker
//         selectedPrinciple={selectedPrinciple}
//         setSelectedPrinciple={setSelectedPrinciple}
//         setVariables={setVariables}
//       />
//     </>
//   )
// }

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPrinciple: 'latest'
    };
  }

  handleSearchBar = (value) => {
    this.props.setSearchQuery(value);
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
          setSelectedPrinciple={(selectedPrinciple) => this.setState({ selectedPrinciple })}
          setVariables={this.props.setVariables}
        />
      </>
    )
  }

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
      <>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <RepositoryItem item={item} />}
          ListHeaderComponent={this.RepositoryListHeader}
        />
      </>
    );
  }
}

// export const RepositoryListContainer = ({
//   repositories,
//   setVariables,
//   searchQuery,
//   setSearchQuery,
// }) => {
//   const [selectedPrinciple, setSelectedPrinciple] = useState('latest')

//   // Get the nodes from the edges array
//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : []

//   const ItemSeparator = () => <View style={styles.separator} />

//   const handleSearchBar = (value) => {
//     setSearchQuery(value)
//   }

//   const RepositoryListHeader = () => {
//     return (
//       <>
//         <Searchbar
//           placeholder='Search'
//           onChangeText={handleSearchBar}
//           value={searchQuery}
//         />
//         <SortPicker
//           selectedPrinciple={selectedPrinciple}
//           setSelectedPrinciple={setSelectedPrinciple}
//           setVariables={setVariables}
//         />
//       </>
//     )
//   }

//   return (
//     <>
//       <FlatList
//         data={repositoryNodes}
//         ItemSeparatorComponent={ItemSeparator}
//         renderItem={({ item }) => <RepositoryItem item={item} />}
//         ListHeaderComponent={RepositoryListHeader}
//       />
//     </>
//   )
// }

const RepositoryList = () => {
  const [variables, setVariables] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [value] = useDebounce(searchQuery, 500)

  const { repositories } = useRepositories(variables, value)

  return (
    <RepositoryListContainer
      repositories={repositories}
      setVariables={setVariables}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  )
}

export default RepositoryList
