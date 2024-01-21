import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const email = await AsyncStorage.getItem("Email");
    let tempData = [];
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get()
      .then((res) => {
        if (res.docs != []) {
          res.docs.map((item) => {
            tempData.push(item.data());
          });
          setUserData(tempData);
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <View style={styles.innercontainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Name: {userData[0]?.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Email: {userData[0]?.email}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Mobile Number: {userData[0]?.mobile}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },

  header: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "purple",
    fontSize: 30,
    fontWeight: "600",
  },
  innercontainer: {
    marginTop: 35,
    borderWidth: 0.2,
    height: 200,
    width: "90%",
    justifyContent: "space-evenly",
  },
  infoBox: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
