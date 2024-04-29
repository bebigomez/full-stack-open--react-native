import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import theme from '../theme'

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
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
})

const initialValues = {
  username: '',
  password: '',
}

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.touched.username && formik.errors.username ? styles.errorBorder : null]}
        placeholder='username'
        value={formik.values.username}
        autoCapitalize='none'
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, formik.touched.password && formik.errors.password ? styles.errorBorder : null]}
        placeholder='password'
        value={formik.values.password}
        autoCapitalize='none'
        secureTextEntry
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={{ color: 'white' }}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return <SignInForm onSubmit={onSubmit} />
}

export default SignIn
