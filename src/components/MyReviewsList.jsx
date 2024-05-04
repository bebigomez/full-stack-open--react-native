import { FlatList } from 'react-native'
import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'
import { useEffect, useState } from 'react'
import ReviewItem from './ReviewItem'

const MyReviewsList = () => {
  const [reviews, setReviews] = useState([])
  const { loading, data } = useQuery(ME, {
    variables: { includeReviews: true },
  })

  useEffect(() => {
    if (!loading && data) {
      const fetchedReviews = data.me
        ? data.me.reviews.edges.map((edge) => edge.node)
        : []

      setReviews(fetchedReviews)
    }
  }, [])

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  )
}

export default MyReviewsList
