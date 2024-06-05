import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { data, food } from "../../data";

const Item = ({ item, navigation }: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Home", item)}>
      <View style={styles.item}>
        <Text>{item.title}</Text>
        <Text>{item.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Food({ navigation }: any) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const updateSearch = (searchText: string) => {
    setSearch(searchText);
    if (searchText) {
      const newData = data.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="جستجوی مواد غذایی..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item) => item.title}
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
    backgroundColor: "#accdee4a",
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    fontSize: 18,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
  },
});
