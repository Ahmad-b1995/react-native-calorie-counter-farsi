import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calculateBMR } from "../../utils/BMR";
import { calculateTDEE } from "../../utils/TDEE";

function Setup({ navigation }: any) {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [activityLevel, setActivityLevel] = useState("");
    const [goal, setGoal] = useState("");

    const handleSave = async () => {
        const bmr = calculateBMR(Number(weight), Number(height), Number(age));
        const tdee = calculateTDEE(bmr, activityLevel as any);
        const calorieGoal = Math.floor(goal === "cutting" ? tdee * 0.75 : tdee * 1.1);

        await AsyncStorage.setItem("userData", JSON.stringify({
            weight,
            height,
            age,
            activityLevel,
            goal,
            bmr,
            tdee,
            calorieGoal,
        }));

        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Weight (kg)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Height (cm)"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Activity Level (sedentary, light, moderate, very active, extra active)"
                value={activityLevel}
                onChangeText={setActivityLevel}
                style={styles.input}
            />
            <TextInput
                placeholder="Goal (cutting, bulking)"
                value={goal}
                onChangeText={setGoal}
                style={styles.input}
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default Setup;
