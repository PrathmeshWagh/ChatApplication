import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { firebase } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Chat = ({ navigation }) => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.data.name,
      headerTitleStyle: {
        marginLeft: -20,
      },
    });
    const subscriber = firebase
      .firestore()
      .collection("chats")
      .doc(route.params.id + route.params.data.userIdd)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querysnapshot) => {
        const allmessages = querysnapshot.docs.map((item) => {
          return {
            ...item.data(),
            createdAt: item?.data()?.createdAt,
          };
        });
        setMessages(allmessages);
      });

    return () => subscriber();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];

    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userIdd,
      createdAt: Date.parse(msg?.createdAt),
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );

    firebase
      .firestore()
      .collection("chats")
      .doc("" + route.params.id + route.params.data.userIdd)
      .collection("messages")
      .add(myMsg);

    firebase
      .firestore()
      .collection("chats")
      .doc("" + route.params.data.userIdd + route.params.id)
      .collection("messages")
      .add(myMsg);
  }, []);

  const renderSend = (props) => {
    // console.log("props", props);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="paperclip"
            size={24}
            color="blue"
            style={{
              marginRight: 20,
              // transform: [{ rotateY: "180deg" }],
            }}
          />
        </TouchableOpacity>
        <View>
          <Send {...props}>
            <Ionicons
              name="send"
              size={24}
              color="orange"
              style={{ marginBottom: 10, marginRight: 5 }}
            />
          </Send>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        renderSend={renderSend}
        user={{
          _id: route?.params.id,
          name: route?.params.data.name,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
