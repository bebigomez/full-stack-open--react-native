import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    backgroundColor: 'white',
    gap: 10
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    borderRadius: 5
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  }
})

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={formik.values.username}
        autoCapitalize='none'
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={formik.values.password}
        autoCapitalize='none'
        secureTextEntry
        onChangeText={formik.handleChange('password')}
      />
      <Pressable  style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={{ color: 'white' }}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;