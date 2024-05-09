import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useRepository = (repoId) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { first: 2, repositoryId: repoId },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: 2, 
        repositoryId: repoId
      },
    });
  };

  return { repository: data?.repository,
    reviews: data?.repository.reviews.edges, 
    fetchMore: handleFetchMore,
    loading,
    ...result
   };
};

export default useRepository;
