import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../component/CustomTextInput";
import { firebase } from "../../config";
import Loader from "../component/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setVisible] = useState(false);

  const loginUser = () => {
    setVisible(true);
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", detail.email)
      .get()
      .then((res) => {
        setVisible(false);
        console.log("d=successfully created");
        // console.log("resp", JSON.stringify(res.docs[0].data()));
        goToNext(
          res.docs[0].data().name,
          res.docs[0].data().email,
          res.docs[0].data().userIdd
        );
      })
      .catch((error) => {
        setVisible(false);
        console.log("error", error);
        Alert.alert("User Not Found");
      });
  };

  const goToNext = async (name, email, userIdd) => {
    await AsyncStorage.setItem("Name", name);
    await AsyncStorage.setItem("Email", email);
    await AsyncStorage.setItem("UserIdd", userIdd);
    navigation.navigate("MainTabNavigator");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <CustomTextInput
        title="Enter Email"
        value={detail.email}
        onChangeText={(txt) => setDetail({ ...detail, email: txt })}
      />

      <CustomTextInput
        title="Enter Password"
        value={detail.password}
        onChangeText={(txt) => setDetail({ ...detail, password: txt })}
      />

      <TouchableOpacity style={styles.btnContainer} onPress={() => loginUser()}>
        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
          Sign Up
        </Text>
      </TouchableOpacity>

      <Text
        style={styles.orLogin}
        onPress={() => navigation.navigate("SignUp")}
      >
        Or SignUp
      </Text>
      <Loader visible={isVisible} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    color: "black",
    alignSelf: "center",
    marginTop: 100,
    marginBottom: 40,
    fontWeight: "bold",
  },
  btnContainer: {
    marginTop: 50,
    width: "80%",
    borderRadius: 10,
    paddingVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "purple",
  },
  orLogin: {
    alignSelf: "center",
    marginTop: 50,
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
    color: "black",
  },
});
