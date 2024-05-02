import { View, Image, StyleSheet } from "react-native"
import Text from "./Text"
import RatingView from "./RatingView"
import theme from "../theme"

const styles = StyleSheet.create({
  generalInfoContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 13,
    paddingBottom: 0
  },
  ratingsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  languageLabelContainer: {
    alignSelf: "flex-start",
  },
  languageLabel: {
    backgroundColor: theme.colors.primary,
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 3,
  },
})

const RepositoryItem = ({ item }) => {
  return (
    <View testID={'repositoryItem'}>
      <View style={styles.generalInfoContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />

        <View>
          <Text fontWeight={"bold"} marginBottom={7}>
            {item.fullName}
          </Text>
          <Text color={"textSecondary"} marginBottom={7}>
            {item.description}
          </Text>
          <View style={styles.languageLabelContainer}>
            <View style={styles.languageLabel}>
              <Text style={{ color: "white" }}>{item.language}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ratingsContainer}>
        <RatingView count={item.stargazersCount} label={"Stars"} />
        <RatingView count={item.forksCount} label={"Forks"} />
        <RatingView count={item.reviewCount} label={"Reviews"} />
        <RatingView count={item.ratingAverage} label={"Rating"} />
      </View>
    </View>
  )
}

export default RepositoryItem
