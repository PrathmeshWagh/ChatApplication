import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

let id = "";

const Users = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    id = await AsyncStorage.getItem("UserIdd");
    let tempData = [];
    const email = await AsyncStorage.getItem("Email");
    firebase
      .firestore()
      .collection("users")
      .where("email", "!=", email)
      .get()
      .then((res) => {
        if (res.docs != []) {
          res.docs.map((item) => {
            tempData.push(item.data());
          });
          setUsers(tempData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rederData = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.userItemContainer}
        onPress={() => navigation.navigate("Chat", { data: item, id: id })}
      >
        <FontAwesome5 name="user-astronaut" size={24} color="black" />
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            marginLeft: 20,
            fontSize: 20,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.header}>
        <Text style={styles.headerText}>All User</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={rederData}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                No User Found
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  userItemContainer: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 50,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: "center",
    paddingLeft: 10,
  },
});
