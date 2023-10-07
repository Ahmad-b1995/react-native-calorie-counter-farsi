import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function Homepage({navigation, route}: any) {
  const params = route?.params;
  const [gram, setGram] = useState("");

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.input}
        onPress={() => navigation.navigate("foods")}
      >
        <Text style={styles.text}>
          {params ? params.title : "برای انتخاب مواد غذایی کلیک کنید -->"}
        </Text>
      </Pressable>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setGram(value)}
        placeholder={"مقدار مواد غذایی (گرم)"}
        value={gram}
        keyboardType="numeric"
      />
      <Text style={styles.output}>
        {params ? (+gram * params.value) / 100 : 0}
      </Text>
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
    color: "#000000b1",
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
