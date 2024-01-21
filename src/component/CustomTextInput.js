import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const CustomTextInput = ({ title, keybType, value, onChangeText }) => {
  return (
    <View>
      <TextInput
        placeholder={title}
        keyboardType={keybType}
        style={styles.inputContainer}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    alignSelf: "center",
    height: 50,
    borderWidth: 0.5,
    width: "80%",
    marginTop: 20,
    paddingLeft: 10,
  },
});
