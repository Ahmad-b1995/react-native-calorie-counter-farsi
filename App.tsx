import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Homepage from "./pages/Homepage/Homepage";
import Food from "./pages/Food/Food";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{title: "کالری شمار"}}
        />
        <Stack.Screen name="foods" component={Food} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
