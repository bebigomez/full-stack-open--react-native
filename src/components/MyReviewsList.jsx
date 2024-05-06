import { useEffect, useState } from 'react'

import theme from '../theme'

import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

import ReviewItem from './ReviewItem'

import {
  FlatList,
  View,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from 'react-native'

import { useNavigate } from 'react-router-native'

import useDeleteReview from '../hooks/useDeleteReview'

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
  }, [data])

  const MyReviewsButtons = ({ review }) => {
    const styles = StyleSheet.create({
      buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
      },
      button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
      },
      viewButton: {
        backgroundColor: theme.colors.primary,
      },
      deleteButton: {
        backgroundColor: theme.colors.error,
      },
    })

    const [deleteReview] = useDeleteReview()

    const navigate = useNavigate()

    const handleViewRepository = () => {
      navigate(`/${review.repository.id}`)
    }

    const handleDeleteReview = () => {
      const alertButtons = [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteReview(review.id)
          },
          style: 'destructive',
        },
      ]

      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        alertButtons
      )
    }

    return (
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={handleViewRepository}
        >
          <Text style={{ color: 'white' }}>View Repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeleteReview}
        >
          <Text style={{ color: 'white' }}>Delete Review</Text>
        </Pressable>
      </View>
    )
  }

  const MyReviewItem = ({ item }) => {
    return (
      <>
        <ReviewItem review={item} />
        <MyReviewsButtons review={item} />
      </>
    )
  }

  const ItemSeparator = () => (
    <View
      style={{
        height: 7,
        backgroundColor: theme.colors.lightGray,
      }}
    />
  )

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <MyReviewItem item={item} />}
    />
  )
}

export default MyReviewsList
