import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables, searchKeyword) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {...variables, searchKeyword}
  })
  const [repositories, setRepositories] = useState()

  useEffect(() => {
    if (error) {
      console.log(error.message)
    } else if (data && !loading) {
      setRepositories(data.repositories)
    }
  }, [data, loading, error])

  return { repositories, refetch }
}

export default useRepositories
