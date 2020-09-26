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

  const id = "COMP_SCI " + course.id.slice(1) + ":\n" + course.title;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Field label="Selected Course" value= {id} />
        <Field label="Meeting Times" value={course.meets} />
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
