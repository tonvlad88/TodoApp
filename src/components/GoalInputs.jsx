// Core Packages
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Packages
import { Ionicons } from "@expo/vector-icons";

// Imports

export default function GoalInputs({
  goalInputsContainerStyle,
  goalTextInputStyle,
  goalButtonStyle,
  goalIcon,
  goalTextPlaceholder,
  addTodo,
}) {
  const [enteredText, setEnteredText] = useState("");

  function onChangeTextHandler(enteredText) {
    setEnteredText(enteredText);
  }

  function addTodoHandler() {
    addTodo(enteredText);
    setEnteredText('');
  }

  return (
    <View style={goalInputsContainerStyle}>
      <TextInput
        style={goalTextInputStyle}
        placeholder={goalTextPlaceholder}
        onChangeText={onChangeTextHandler}
        value={enteredText}
      />
      <TouchableOpacity onPress={addTodoHandler}>
        <View style={goalButtonStyle}>
          <Ionicons
            name={goalIcon.name}
            size={goalIcon.size}
            color={goalIcon.color}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const componentStyles = StyleSheet.create({});
