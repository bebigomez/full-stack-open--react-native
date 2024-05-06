import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'
import { useApolloClient } from '@apollo/client'

import { ME } from '../graphql/queries'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: ME, variables: { includeReviews: true } }],
  })
  const apolloClient = useApolloClient()

  const deleteReview = async (reviewId) => {
    const data = await mutate({ variables: { deleteReviewId: reviewId } })
    apolloClient.resetStore()
    return data
  }

  return [deleteReview, result]
}

export default useDeleteReview
