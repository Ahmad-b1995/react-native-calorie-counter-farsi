import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatISO, startOfDay } from "date-fns";
import { ProgressChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

function Homepage({ navigation, route }: any) {
  const params = route?.params;
  const [gram, setGram] = useState("");
  const [calorieList, setCalorieList] = useState<{ [key: string]: { title: string; calories: number }[] }>({});
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [weights, setWeights] = useState<number[]>([]);
  const [weight, setWeight] = useState("");

  const today = formatISO(startOfDay(new Date())); // Get the start of today in ISO format

  useEffect(() => {
    const loadCalories = async () => {
      try {
        const storedCalories = await AsyncStorage.getItem("calorieList");
        const userData = await AsyncStorage.getItem("userData");
        if (storedCalories) {
          setCalorieList(JSON.parse(storedCalories));
        }
        if (userData) {
          const parsedData = JSON.parse(userData);
          setCalorieGoal(parsedData.calorieGoal);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadCalories();
  }, []);

  const addCalories = async () => {
    const newCalories = params ? (+gram * params.value) / 100 : 0;
    const newEntry = { title: params?.title, calories: newCalories };
    const updatedCalorieList = {
      ...calorieList,
      [today]: calorieList[today] ? [...calorieList[today], newEntry] : [newEntry],
    };
    setCalorieList(updatedCalorieList);
    await AsyncStorage.setItem("calorieList", JSON.stringify(updatedCalorieList));
  };

  const removeCalories = async (date: string, index: number) => {
    const updatedDayCalories = calorieList[date].filter((_, i) => i !== index);
    const updatedCalorieList = {
      ...calorieList,
      [date]: updatedDayCalories,
    };
    setCalorieList(updatedCalorieList);
    await AsyncStorage.setItem("calorieList", JSON.stringify(updatedCalorieList));
  };

  const calculateTotalCalories = () => {
    return calorieList[today]?.reduce((total, item) => total + item.calories, 0) || 0;
  };

  const totalCalories = calculateTotalCalories();
  const progress = totalCalories / calorieGoal;

  const data = {
    data: [progress],
  };

  const handleWeightSubmit = async () => {
    const newWeight = parseFloat(weight);
    const updatedWeights = [...weights, newWeight];
    setWeights(updatedWeights);
    await AsyncStorage.setItem("weights", JSON.stringify(updatedWeights));
    setWeight("");
  };

  useEffect(() => {
    const loadWeights = async () => {
      const storedWeights = await AsyncStorage.getItem("weights");
      if (storedWeights) {
        setWeights(JSON.parse(storedWeights));
      }
    };
    loadWeights();
  }, []);

  useEffect(() => {
    const checkWeightProgress = async () => {
      if (weights.length >= 7) {
        const initialWeight = weights[weights.length - 7];
        const currentWeight = weights[weights.length - 1];
        const weightDiff = initialWeight - currentWeight;

        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          if (parsedData.goal === "cutting" && weightDiff < 0.5) {
            parsedData.calorieGoal -= 70;
          }
          await AsyncStorage.setItem("userData", JSON.stringify(parsedData));
          setCalorieGoal(parsedData.calorieGoal);
        }
      }
    };
    checkWeightProgress();
  }, [weights]);

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
      {params && <Button title="افزودن کالری" onPress={addCalories} />}
      <FlatList
        data={calorieList[today] || []}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatlist}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text>{item.title}: {item.calories.toFixed(2)}</Text>
            <Button title="حذف" onPress={() => removeCalories(today, index)} />
          </View>
        )}
      />
      <View style={styles.graphContainer}>
        <ProgressChart
          data={data}
          width={screenWidth}
          height={110}
          strokeWidth={15}
          radius={47}
          chartConfig={{
            backgroundGradientFrom: "rgba(0, 0, 0, 0)",
            backgroundGradientTo: "rgba(0, 0, 0, 0)",
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          }}
          hideLegend={true}
        />
        <Text style={styles.total}>
          مجموع کالری مصرفی: {totalCalories.toFixed(2)} / {calorieGoal}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setWeight(value)}
        placeholder={"وزن (کیلوگرم)"}
        value={weight}
        keyboardType="numeric"
      />
      <Button title="ثبت وزن" onPress={handleWeightSubmit} />
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
    marginBottom: 15,
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
  flatlist: {
    width: "100%",
  },
  listItem: {
    backgroundColor: "#accdee4a",
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  graphContainer: {
    alignItems: 'center',
  },
  total: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default Homepage;
