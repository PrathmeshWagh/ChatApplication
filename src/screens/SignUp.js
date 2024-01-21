import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../component/CustomTextInput";
// import firestore from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";
import { firebase } from "../../config";

const SignUp = ({ navigation }) => {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const registerUser = () => {
    const userIdd = uuid.v4();
    firebase
      .firestore()
      .collection("users")
      .doc(userIdd)
      .set({
        name: detail.name,
        email: detail.email,
        password: detail.password,
        mobile: detail.mobile,
        userIdd: userIdd,
      })
      .then((res) => {
        console.log("d=successfully created");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const validate = () => {
    let isValid = true;
    if (detail.name == "") {
      isValid = false;
    }
    if (detail.email == "") {
      isValid = false;
    }
    if (detail.mobile == "") {
      isValid = false;
    }
    if (detail.password == "") {
      isValid = false;
    }
    if (detail.password != detail.confirmPassword) {
      isValid = false;
    }
    return isValid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <CustomTextInput
        title="Enter Name"
        value={detail.name}
        onChangeText={(txt) => setDetail({ ...detail, name: txt })}
      />
      <CustomTextInput
        title="Enter Email"
        value={detail.email}
        onChangeText={(txt) => setDetail({ ...detail, email: txt })}
      />
      <CustomTextInput
        title="Enter Mobile"
        keybType="number-pad"
        value={detail.mobile}
        onChangeText={(txt) => setDetail({ ...detail, mobile: txt })}
      />
      <CustomTextInput
        title="Enter Password"
        value={detail.password}
        onChangeText={(txt) => setDetail({ ...detail, password: txt })}
      />
      <CustomTextInput
        title="Enter Confirm Password"
        value={detail.confirmPassword}
        onChangeText={(txt) => setDetail({ ...detail, confirmPassword: txt })}
      />

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          if (validate()) {
            registerUser();
            setDetail({
              name: "",
              email: "",
              mobile: "",
              password: "",
              confirmPassword: "",
            });
          } else {
            Alert.alert("Please Enter Correct Details");
          }
        }}
      >
        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
          Sign Up
        </Text>
      </TouchableOpacity>

      <Text style={styles.orLogin} onPress={() => navigation.goBack()}>
        Or Login
      </Text>
    </View>
  );
};

export default SignUp;

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
