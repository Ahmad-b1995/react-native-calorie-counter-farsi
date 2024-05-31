// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./pages/Homepage";
import Food from "./pages/Food";
import Setup from "./pages/Setup";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatISO, startOfDay } from "date-fns";
import WeightInput from "./pages/Weight-input";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isLaunchedToday, setIsLaunchedToday] = useState(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        setIsFirstLaunch(false);
      }
    };

    const checkDailyLaunch = async () => {
      const today = formatISO(startOfDay(new Date()));
      const lastLaunchDate = await AsyncStorage.getItem("lastLaunchDate");

      if (lastLaunchDate !== today) {
        await AsyncStorage.setItem("lastLaunchDate", today);
        setIsLaunchedToday(false);
      } else {
        setIsLaunchedToday(true);
      }
    };

    checkFirstLaunch();
    checkDailyLaunch();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstLaunch ? (
          <>
            <Stack.Screen
              name="Setup"
              component={Setup}
              options={{ title: "مشخصات اولیه کاربر" }}
            />
            <Stack.Screen
              name="WeightInput"
              component={WeightInput}
              options={{ title: "وزن روزانه" }}
            />
            <Stack.Screen
              name="Home"
              component={Homepage}
              options={{ title: "کالری شمار", headerLeft: () => null }}
            />
            <Stack.Screen
              name="foods"
              component={Food}
              options={{ title: "مواد غذایی" }}
            />
          </>
        ) : (
          <>
            {!isLaunchedToday && (
              <Stack.Screen
                name="WeightInput"
                component={WeightInput}
                options={{ title: "وزن روزانه" }}
              />
            )}
            <Stack.Screen
              name="Home"
              component={Homepage}
              options={{ title: "کالری شمار", headerLeft: () => null }}
            />
            <Stack.Screen
              name="foods"
              component={Food}
              options={{ title: "مواد غذایی" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
