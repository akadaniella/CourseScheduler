import React, { useState, useEffect } from 'react';
import CourseList from './components/CourseList';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const schedule = {
  "title": "CS Courses for 2018-19"
};

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });

  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule =  async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </SafeAreaView>
  );
};

const Banner = ({title}) => (
  <Text style={styles.bannerStyle}>{title || '[loading...]'}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerStyle: {
    color: '#888',
    fontSize: 32,
  },
});

export default App;
