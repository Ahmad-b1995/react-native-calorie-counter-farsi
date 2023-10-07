import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {data} from "../../data";

const Item = ({item}: any) => {
  return (
    <TouchableOpacity onPress={() => console.log(item)}>
      <View style={styles.item}>
        <Text>{item.title}</Text>
        <Text>{item.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Food() {
  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={Item} />
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
    backgroundColor: "#accdee4a",
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    fontSize: 18,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
  },
});
