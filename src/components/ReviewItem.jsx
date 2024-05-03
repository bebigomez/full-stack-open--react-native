import { View, StyleSheet } from 'react-native'
import Text from './Text'
import { format } from 'date-fns'
import theme from '../theme'

const styles = StyleSheet.create({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 20,
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text fontWeight={'bold'} color={'primary'}>
          {review.rating}
        </Text>
      </View>
      <View style={{ gap: 7 }}>
        <Text fontWeight={'bold'}>{review.user.username}</Text>
        <Text color={'textSecondary'}>
          {format(review.createdAt, 'MM.dd.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem
