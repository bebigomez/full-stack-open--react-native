import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import { ME } from '../graphql/queries'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{ query: ME, variables: { includeReviews: true } }],
  })

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({
      variables: { review: { repositoryName, ownerName, rating, text } },
    })
    return data
  }

  return [createReview, result]
}

export default useCreateReview
