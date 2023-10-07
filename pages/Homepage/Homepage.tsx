import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {data} from "../../data";

function Homepage({navigation}: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState(null);
  const [calorie, setCalorie] = useState<number>(0);
  const [gram, setGram] = useState("");
  const [items, setItems] = useState(data);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.input}
        onPress={() => navigation.navigate("foods", {name: "Jane"})}
      >
        <Text style={styles.text}>برای انتخاب مواد غذایی کلیک کنید  --&gt;</Text>
      </Pressable>
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
    marginTop: 50,
    marginRight: 15,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 25,
  },
  text: {
    color: "#0000006b",
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

export default Homepage;
