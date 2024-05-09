import { FlatList } from 'react-native'
import ReviewItem from './ReviewItem'

const ReviewsList = ({ reviews, fetchMore }) => {

  const fetchedReviews = reviews.map((edge) => edge.node)

  const onEndReached = () => {
    fetchMore()
  }
        
  return (
    <>
      <FlatList
        data={fetchedReviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        onEndReached={onEndReached}
      />
    </>
  )
}

export default ReviewsList
