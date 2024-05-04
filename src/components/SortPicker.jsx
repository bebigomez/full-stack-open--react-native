import { Picker } from '@react-native-picker/picker'

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
    <Picker selectedValue={selectedPrinciple} onValueChange={handleChange}>
      <Picker.Item label='Latest' value={'latest'} />
      <Picker.Item label='Highest rated' value={'highestRated'} />
      <Picker.Item label='Lowest rated' value={'lowestRated'} />
    </Picker>
  )
}

export default SortPicker