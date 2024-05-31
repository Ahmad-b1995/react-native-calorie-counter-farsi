import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./pages/Homepage";
import Food from "./pages/Food";
import Setup from "./pages/Setup";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstLaunch ? (
          <>
            <Stack.Screen
              name="Setup"
              component={Setup}
              options={{ title: "Setup" }}
            />
            <Stack.Screen
              name="Home"
              component={Homepage}
              // options={{ title: "کالری شمار" }}
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
            <Stack.Screen
              name="Home"
              component={Homepage}
              options={{ title: "کالری شمار" }}
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
