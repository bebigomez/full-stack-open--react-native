// import { useNavigate } from 'react-router-native'
import { Pressable, TextInput, View, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text'
import { useFormik } from 'formik'
import * as yup from 'yup'
import useCreateReview from '../hooks/useCreateReview'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    backgroundColor: 'white',
    gap: 10,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    borderRadius: 5,
  },
  errorBorder: {
    borderColor: theme.colors.error,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
})

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be greater or equal to 0')
    .max(100, 'Rating must be lesser or equal to 100')
    .required('Rating is required'),
  review: yup.string(),
})

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: '',
  review: '',
}

export const CreateReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryOwner && formik.errors.repositoryOwner
            ? styles.errorBorder
            : null,
        ]}
        placeholder='Repository owner name'
        value={formik.values.repositoryOwner}
        autoCapitalize='none'
        onChangeText={formik.handleChange('repositoryOwner')}
      />
      {formik.touched.repositoryOwner && formik.errors.repositoryOwner && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.repositoryOwner}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName
            ? styles.errorBorder
            : null,
        ]}
        placeholder='Repository name'
        value={formik.values.repositoryName}
        autoCapitalize='none'
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.repositoryName}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating
            ? styles.errorBorder
            : null,
        ]}
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        autoCapitalize='none'
        onChangeText={formik.handleChange('rating')}
        keyboardType='numeric'
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.rating}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.review && formik.errors.review
            ? styles.errorBorder
            : null,
        ]}
        placeholder='Review'
        value={formik.values.review}
        autoCapitalize='none'
        onChangeText={formik.handleChange('review')}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.review}
        </Text>
      )}

      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={{ color: 'white' }}>Create a Review</Text>
      </Pressable>
    </View>
  )
}

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { repositoryOwner, repositoryName, rating, review } = values

    const ratingAsNumber = Number(rating)

    try {
      const data = await createReview({
        ownerName: repositoryOwner,
        repositoryName,
        rating: ratingAsNumber,
        text: review,
      })
      if (data) {
        console.log(data)
        navigate(`/${data.createReview.repositoryId}`)
      }
    } catch (e) {
      console.log(e)
    }

    // console.log('Review created')
  }

  return <CreateReviewForm onSubmit={onSubmit} />
}

export default CreateReview
