import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
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
                placeholder="وزن (کیلوگرم)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="قد (سانتی‌متر)"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="سن"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={styles.input}
            />
            <Text style={styles.label}>سطح فعالیت</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={activityLevel}
                    onValueChange={(itemValue) => setActivityLevel(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="نشسته" value="sedentary" />
                    <Picker.Item label="کم تحرک" value="light" />
                    <Picker.Item label="متوسط" value="moderate" />
                    <Picker.Item label="خیلی فعال" value="very active" />
                    <Picker.Item label="بسیار فعال" value="extra active" />
                </Picker>
            </View>
            <Text style={styles.label}>هدف</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={goal}
                    onValueChange={(itemValue) => setGoal(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="کاهش وزن" value="cutting" />
                    <Picker.Item label="افزایش وزن" value="bulking" />
                </Picker>
            </View>
            <Button title="ذخیره" onPress={handleSave} />
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
        textAlign: "right", 
    },
    pickerContainer: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        justifyContent: "center",
    },
    picker: {
        height: 40,
        width: "100%",
    },
    label: {
        textAlign: "right", 
        marginBottom: 5,
    },
});

export default Setup;
