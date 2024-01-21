import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      CheckLoginStatus();
      // navigation.navigate("Login");
    }, 3000);
  }, []);

  const CheckLoginStatus = async () => {
    const Id = await AsyncStorage.getItem("UserIdd");
    console.log("Id", Id);
    if (Id !== null) {
      navigation.navigate("MainTabNavigator", { screen: "Main" });
    } else {
      navigation.navigate("Login");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{`Firebase Chat\nApp`}</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
