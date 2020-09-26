import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const Field = ({label, value}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.field}>{value}</Text>
    </View>
  );
};

const CourseDetailScreen = ({route}) => {
  const course = route.params.course;
  const termMap = { F: 'Fall', W: 'Winter', S: 'Spring'};

  const id = "COMP_SCI " + course.id.slice(1) + ":\n" + course.title;
  const meets = course.meets + "\n" + termMap[course.id.charAt(0)];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Field label="Selected Course" value= {id} />
        <Field label="Meeting Times" value={meets} />
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
  field: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    padding: 8,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontWeight: 'bold',
  }
});

export default CourseDetailScreen;
