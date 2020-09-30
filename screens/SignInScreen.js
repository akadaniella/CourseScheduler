import React, { useState } from 'react';
import Form from '../components/Form';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { firebase } from '../utils/firebase';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirm: Yup.string()
    .nullable()
    .oneOf([Yup.ref('password'), ''], 'Confirmation password must match password'),
});

const SignInScreen = ({ navigation }) => {
  const [signInError, setSignInError] = useState('')

  const handleOnSubmit = (values) => {
      if (values.confirm) {
          firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
          .then(function(firebaseUser) {
              navigation.navigate("ScheduleScreen");
          })
          .catch(function(error) {
            if (error.code === 'auth/email-already-in-use'){
               setSignInError("Account already exists.");
             }
            else {
              setSignInError(error.message);
            }
          });
      }
      else {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
           .then(function(firebaseUser) {
               navigation.navigate("ScheduleScreen");
           })
          .catch(function(error) {
            if (error.code === 'auth/user-not-found'){
               setSignInError("Account not found. Confirm password to sign up.");
             }
            else if (error.code === 'auth/wrong-password'){
              setSignInError("Wrong password.");
            }
            else {
              setSignInError(error.message);
            }
          });
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            email: '',
            password: '',
            confirm: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="confirm"
            leftIcon="lock"
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Button title={(values) => values.confirm ? 'Sign up' : 'Log in'} />
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
});

export default SignInScreen;
