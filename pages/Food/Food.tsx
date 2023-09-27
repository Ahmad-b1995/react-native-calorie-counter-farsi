import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";

export default function Food() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: "Devin"},
          {key: "Dan"},
          {key: "Dominic"},
          {key: "Jackson"},
          {key: "James"},
          {key: "Joel"},
          {key: "John"},
          {key: "Jillian"},
          {key: "Jimmy"},
          {key: "Julie"},
        ]}
        renderItem={({item}) => <Text style={styles.item} onPress={()=> console.log(item)}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
    justifyContent: "flex-start",
  },
  item: {
    fontSize: 25,
    padding: 5
  },
});
