import { StyleSheet, View, TextInput, Pressable } from 'react-native'
import Text from './Text'
import { useFormik } from 'formik'
import * as yup from 'yup'

import theme from '../theme'

import { useNavigate } from 'react-router-native'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'

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

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'username must be greater or equal to 5')
    .max(30, 'username must be lesser or equal to 30')
    .required('username is required'),

  password: yup
    .string()
    .min(5, 'password must be greater or equal to 5')
    .max(50, 'password must be lesser or equal to 50')
    .required('password is required'),

  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
})

const SignUpForm = ({ onSubmit }) => {
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
          formik.touched.username && formik.errors.username
            ? styles.errorBorder
            : null,
        ]}
        placeholder='Username'
        value={formik.values.username}
        autoCapitalize='none'
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password
            ? styles.errorBorder
            : null,
        ]}
        placeholder='Password'
        value={formik.values.password}
        secureTextEntry
        autoCapitalize='none'
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
            ? styles.errorBorder
            : null,
        ]}
        placeholder='Password confirmation'
        value={formik.values.passwordConfirmation}
        secureTextEntry
        autoCapitalize='none'
        onChangeText={formik.handleChange('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={{ color: 'white' }}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const signUpData = await signUp({ username, password })
      if (signUpData.createUser) {
        const signInData = await signIn({ username, password })
        if (signInData.authenticate) {
          navigate('/')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpForm onSubmit={onSubmit} />
}

export default SignUp
