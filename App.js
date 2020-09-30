import 'react-native-gesture-handler';
import React, { useState, useEffect} from 'react';
import { Button, StyleSheet } from 'react-native';
import UserContext from './UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from './screens/ScheduleScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import CourseEditScreen from './screens/CourseEditScreen';
import SignInScreen from './screens/SignInScreen';
import { firebase } from './utils/firebase';

const Stack = createStackNavigator();

const App = () => {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState({role: 'user'});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      setAuth(auth);
    });
  }, []);

  useEffect(() => {
    if (auth && auth.uid) {
      const db = firebase.database().ref('users').child(auth.uid);
      const handleData = snap => {
          const val = snap.val()
          setUser({uid: auth.uid, ...val});
      }
      db.on('value', handleData, error => alert(error));
      return () => { db.off('value', handleData); };
    }
    else {
      setUser(null);
    }
  }, [auth]);


  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ScheduleScreen"
            component={ScheduleScreen}
            options={({navigation}) => ({
            title: "Schedule",
            headerTitleStyle: { paddingLeft: '55px' },
            headerRight: () => (
              <SignInButton navigation={navigation} user={user} />
            ),
          })
        }
          />
          <Stack.Screen name="CourseDetailScreen"
              component={CourseDetailScreen}
              options={{ title: 'Course Details'}}
          />
          <Stack.Screen name="CourseEditScreen"
              component={CourseEditScreen}
              options={{ title: 'Course Editor'}}
          />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

const SignInButton = ({ navigation, user }) => (
  user && user.uid ?
  <Button
    title="Logout"
    onPress={() => firebase.auth().signOut()}
  /> :
  <Button
    title="Sign In"
    onPress={() => navigation.navigate('SignInScreen')}
  />
);

export default App;
