import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Pressable,
  // StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatISO, startOfDay } from "date-fns";
import { ProgressChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;

function Homepage({ navigation, route }: any) {
  const params = route?.params;
  const [gram, setGram] = useState("");
  const [calorieList, setCalorieList] = useState<{ [key: string]: { title: string; calories: number }[] }>({});
  const [calorieGoal, setCalorieGoal] = useState(2000);

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

  return (
    <View className="bg-red-500 text-red-500 font-bold text-9xl">
      <Pressable
        
        onPress={() => navigation.navigate("foods")}
      >
        <Text className="bg-red-500" >
          {params ? params.title : "برای انتخاب مواد غذایی کلیک کنید -->"}
        </Text>
      </Pressable>
      <TextInput
        onChangeText={(value) => setGram(value)}
        // placeholder={"مقدار مواد غذایی (گرم)"}
        className="bg-red-500"
        placeholder="klklklkl"
        value={gram}
        keyboardType="numeric"
      />
      <View className="flex flex-row bg-red-500 text-red-400 items-center justify-center">
        <Text >
          {params ? (+gram * params.value) / 100 : 0}
        </Text>
        {params && <Button title="افزودن کالری" onPress={addCalories} />}
      </View>
      <FlatList
        data={calorieList[today] || []}
        keyExtractor={(item, index) => index.toString()}
        
        renderItem={({ item, index }) => (
          <View >
            <Text>{item.title}: {item.calories.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeCalories(today, index)}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View >
        <ProgressChart
          data={data}
          width={200}
          height={110}
          strokeWidth={15}
          radius={47}
          chartConfig={{
            backgroundGradientFrom: "transparent",
            backgroundGradientTo: "transparent",
            backgroundColor: "transparent",
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          }}
          hideLegend={true}
        />
        <Text >
          مجموع کالری مصرفی:
          {"\n"}
          {calorieGoal} / {totalCalories.toFixed(2)}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 50,
//     marginRight: 15,
//     marginLeft: 15,
//     marginBottom: 15,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     gap: 25,
//   },
//   text: {
//     color: "#000000b1",
//   },
//   input: {
//     backgroundColor: "#b7e8ff6b",
//     width: "100%",
//     borderColor: "#000000b5",
//     borderWidth: 1,
//     height: 50,
//     borderRadius: 7,
//     padding: 15,
//     zIndex: 1,
//   },
//   output: {
//     marginTop: 20,
//     fontSize: 20,
//   },
//   flatlist: {
//     width: "100%",
//   },
//   listItem: {
//     backgroundColor: "#accdee4a",
//     padding: 10,
//     fontSize: 18,
//     borderRadius: 10,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//     marginBottom: 10,
//   },
//   graphContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     width: '100%'
//   },
//   total: {
//     fontSize: 19,
//   },
// });

export default Homepage;
