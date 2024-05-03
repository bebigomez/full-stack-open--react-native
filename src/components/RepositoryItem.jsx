import { View, Image, StyleSheet, Pressable } from 'react-native'
import Text from './Text'
import RatingView from './RatingView'
import theme from '../theme'
import { useNavigate, useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_SINGLE_REPOSITORY } from '../graphql/queries'
import { useEffect, useState } from 'react'

import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  repositoryContainer: {
    margin: 8,
  },
  generalInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 0,
  },
  ratingsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  languageLabelContainer: {
    alignSelf: 'flex-start',
  },
  languageLabel: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 3,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 13,
    borderRadius: 5,
  },
})

const RepositoryItem = ({ item }) => {
  const [repository, setRepository] = useState(item)
  let { id } = useParams()

  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { repositoryId: id }, // Aquí es donde se pasan las variables
  })

  useEffect(() => {
    if (data && !loading) {
      setRepository(data.repository)
    }
  }, [data, loading])

  const navigate = useNavigate()

  const handleOpenInGitHub = () => {
    console.log(`to github`)
    Linking.openURL(repository.url);
  }
  
  const handlePress = () => {
    navigate(`/${repository.id}`)
  }

  return repository ? (
    <Pressable onPress={handlePress}>
      <View style={styles.repositoryContainer} testID={'repositoryItem'}>
        <View style={styles.generalInfoContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: repository.ownerAvatarUrl,
            }}
          />

          <View>
            <Text fontWeight={'bold'} marginBottom={7}>
              {repository.fullName}
            </Text>
            <Text color={'textSecondary'} marginBottom={7}>
              {repository.description}
            </Text>
            <View style={styles.languageLabelContainer}>
              <View style={styles.languageLabel}>
                <Text style={{ color: 'white' }}>{repository.language}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ratingsContainer}>
          <RatingView count={repository.stargazersCount} label={'Stars'} />
          <RatingView count={repository.forksCount} label={'Forks'} />
          <RatingView count={repository.reviewCount} label={'Reviews'} />
          <RatingView count={repository.ratingAverage} label={'Rating'} />
        </View>

        {id && (
          <Pressable
            onPress={handleOpenInGitHub}
            style={styles.button}
          >
            <Text fontWeight={'bold'} style={{ color: 'white' }}>
              Open in Github
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

export default RepositoryItem
