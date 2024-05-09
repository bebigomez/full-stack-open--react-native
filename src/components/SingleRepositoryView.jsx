import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import { View } from 'react-native'
import RepositoryItem from './RepositoryItem'
import ReviewsList from './ReviewsList'

const SingleRepositoryView = () => {
  const { id } = useParams()

  const { repository, reviews, fetchMore, loading } = useRepository(id)

  return (
    !loading && (
      <View>
        <RepositoryItem item={repository} singleRepositoryView={true} />
        <ReviewsList reviews={reviews} fetchMore={fetchMore} />
      </View>
    )
  )
}

export default SingleRepositoryView
