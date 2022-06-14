// Core Packages
import { StatusBar } from "expo-status-bar";
import { useState, useReducer, useRef } from "react";
import { StyleSheet, Text, View, FlatList, Animated } from "react-native";

// Packages
import { FontAwesome5 } from "@expo/vector-icons";

// Actions
import { addTodo, removeTodo } from "./src/actions/actionsTodos";

// Reducers
import todosReducer, { initialState } from "./src/reducers/todos";

// Imports
import GoalInputs from "./src/components/GoalInputs";
import GoalItem from "./src/components/GoalItem";

export default function App() {
  const [todos, setTodos] = useReducer(todosReducer, initialState);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const iconProps = {
    name: "add-circle-outline",
    size: 34,
    color: "#000",
  };

  function addTodoHandler(enteredGoal) {
    if (enteredGoal != "") {
      setTodos(addTodo(enteredGoal));
    }
  }

  function deleteItemHandler(key) {
    setTodos(removeTodo(key));
  }

  return (
    <View style={componentStyles.container}>
      <StatusBar style="auto" />
      <GoalInputs
        goalInputsContainerStyle={[
          componentStyles.goalInputsContainer,
          componentStyles.shadow,
        ]}
        goalTextInputStyle={componentStyles.goalTextInput}
        goalTextPlaceholder="Add todo here..."
        goalButtonStyle={componentStyles.goalButton}
        goalIcon={iconProps}
        addTodo={addTodoHandler}
      />
      <View style={componentStyles.goalItems}>
        {!todos.items.length ? (
          <View style={componentStyles.goalItemsEmptyContainer}>
            <FontAwesome5 name="sad-cry" size={40} color="black" />
            <Text>No record found</Text>
          </View>
        ) : (
          <FlatList
            data={todos.items}
            renderItem={({ item }) => (
              <GoalItem item={item} deleteItem={deleteItemHandler} />
            )}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyExtractor={(item) => item.title.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            viewabilityConfig={viewConfig}
            scrollEventThrottle={32}
          />
        )}
      </View>
    </View>
  );
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9EAEE",
    marginTop: 30,
    padding: 14,
  },
  goalInputsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
  },
  goalTextInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  goalButton: {
    borderRadius: 22,
    marginRight: 4,
    backgroundColor: "#fff",
  },
  goalItems: {
    flex: 1,
    marginTop: 10,
  },
  goalItemsEmptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
