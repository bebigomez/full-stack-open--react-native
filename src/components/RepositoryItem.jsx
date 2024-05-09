import { View, Image, StyleSheet, Pressable } from 'react-native'
import Text from './Text'
import theme from '../theme'
import RatingView from './RatingView'

import { useNavigate } from 'react-router-native'
import * as Linking from 'expo-linking'

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
  separator: {
    height: 7,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 5,
  },
})

const RepositoryItem = ({ item, singleRepositoryView }) => {
  const handleOpenInGitHub = () => {
    Linking.openURL(item.url)
  }

  const navigate = useNavigate()

  const handlePress = () => {
    navigate(`/${item.id}`)
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.repositoryContainer} testID={'repositoryItem'}>
        <View style={styles.generalInfoContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />

          <View>
            <Text fontWeight={'bold'} marginBottom={7}>
              {item.fullName}
            </Text>
            <Text color={'textSecondary'} marginBottom={7}>
              {item.description}
            </Text>
            <View style={styles.languageLabelContainer}>
              <View style={styles.languageLabel}>
                <Text style={{ color: 'white' }}>{item.language}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ratingsContainer}>
          <RatingView count={item.stargazersCount} label={'Stars'} />
          <RatingView count={item.forksCount} label={'Forks'} />
          <RatingView count={item.reviewCount} label={'Reviews'} />
          <RatingView count={item.ratingAverage} label={'Rating'} />
        </View>
        
          {singleRepositoryView && (
            <>
              <Pressable onPress={handleOpenInGitHub} style={styles.button}>
                <Text fontWeight={'bold'} style={{ color: 'white' }}>
                  Open in Github
                </Text>
              </Pressable>
            </>
          )}
      </View>
    </Pressable>
  )
}

export default RepositoryItem
