import { View, Pressable, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#e1e4e8',
  },
  activeButton: {
    backgroundColor: '#0366d6',
  },
  buttonText: {
    fontSize: 14,
    color: '#24292e',
  },
  activeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
})

const SortPicker = ({selectedPrinciple, setSelectedPrinciple, setVariables}) => {
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

  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.button, selectedPrinciple === 'latest' && styles.activeButton]}
        onPress={() => handleChange('latest')}
      >
        <Text style={[styles.buttonText, selectedPrinciple === 'latest' && styles.activeButtonText]}>
          Latest
        </Text>
      </Pressable>
      
      <Pressable 
        style={[styles.button, selectedPrinciple === 'highestRated' && styles.activeButton]}
        onPress={() => handleChange('highestRated')}
      >
        <Text style={[styles.buttonText, selectedPrinciple === 'highestRated' && styles.activeButtonText]}>
          Highest Rated
        </Text>
      </Pressable>
      
      <Pressable 
        style={[styles.button, selectedPrinciple === 'lowestRated' && styles.activeButton]}
        onPress={() => handleChange('lowestRated')}
      >
        <Text style={[styles.buttonText, selectedPrinciple === 'lowestRated' && styles.activeButtonText]}>
          Lowest Rated
        </Text>
      </Pressable>
    </View>
  )
}

export default SortPicker