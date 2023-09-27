import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { foods } from "./foods";

export default function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState(null);
  const [calorie, setCalorie] = useState<number>(0);
  const [gram, setGram] = useState("");
  const [items, setItems] = useState(foods);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        style={styles.picker}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={"انتخاب مواد غذایی"}
        onChangeValue={(value) => setCalorie(value!)}
        zIndex={1000}
        dropDownContainerStyle={{
          backgroundColor: "white",
          zIndex: 1000,
          elevation: 1000,
        }}
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => setGram(value)}
        placeholder={"مقدار مواد غذایی (گرم)"}
        value={gram}
        keyboardType="numeric"
      />
      <Text style={styles.output}>{(+gram * calorie) / 100}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginRight: 15,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 25,
  },
  picker: {
    backgroundColor: "#b7e8ff6b",
    zIndex: 1000,
  },
  input: {
    backgroundColor: "#b7e8ff6b",
    width: "100%",
    borderColor: "#000000b5",
    borderWidth: 1,
    height: 50,
    borderRadius: 7,
    padding: 15,
    zIndex: 1,
  },
  output: {
    marginTop: 20,
    fontSize: 20,
  },
});
