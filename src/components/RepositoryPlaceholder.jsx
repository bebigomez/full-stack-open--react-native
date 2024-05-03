import { View, Text } from 'react-native'
import { useParams } from 'react-router-native';

const RepositoryPlacheholder = () => {

  let params = useParams();
  console.log('params -> ', params)

  // hacer query a partir del param recibido

  // y esa será item.

  // if params render button.

  return (
    <View>
      <Text>Single Repository View</Text>
    </View>
  )
}

export default RepositoryPlacheholder
