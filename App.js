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
          <Stack.Screen style={styles.header}
            name="ScheduleScreen"
            component={ScheduleScreen}
            options={({navigation}) => ({
            title: "Schedule",
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
  <Button title="Logout" color="#448aff"
    onPress={() => firebase.auth().signOut()}
  /> :
  <Button title="Sign In" color="#448aff"
    onPress={() => navigation.navigate('SignInScreen')}
  />
);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
