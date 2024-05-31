// WeightInput.tsx
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const WeightInput = () => {
  const [weight, setWeight] = useState("");
  const [weights, setWeights] = useState<number[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadWeights = async () => {
      const storedWeights = await AsyncStorage.getItem("weights");
      if (storedWeights) {
        setWeights(JSON.parse(storedWeights));
      }
    };
    loadWeights();
  }, []);

  const handleWeightSubmit = async () => {
    const newWeight = parseFloat(weight);
    const updatedWeights = [...weights, newWeight];
    setWeights(updatedWeights);
    await AsyncStorage.setItem("weights", JSON.stringify(updatedWeights));
    setWeight("");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setWeight(value)}
        placeholder={"وزن (کیلوگرم)"}
        value={weight}
        keyboardType="numeric"
      />
      <Button title="ثبت وزن" onPress={handleWeightSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default WeightInput;
