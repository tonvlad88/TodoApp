// Core Packages
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Packages
import { Feather } from '@expo/vector-icons'; 

// Imports

export default function GoalItem({item, deleteItem}) {
    function deleteItemHandler() {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => deleteItem(item.key) }
            ]
          );
    }
    return (
       <View style={[componentStyles.container]}>
            <View style={[componentStyles.shadow, componentStyles.itemContainer]}>
                <Text style={componentStyles.itemText}>{item.title}</Text>
                <TouchableOpacity onPress={deleteItemHandler}>
                    <Feather name="trash" size={24} color="black" />
                </TouchableOpacity>
                
            </View>          
       </View>
    )
}

const componentStyles = StyleSheet.create({
    container: {
       backgroundColor: '#fff',
       padding: 10,
       borderRadius: 4,
       marginVertical: 4,
    },
    itemText: {
        color: '#000',
        flex: 1
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
    itemContainer: {
        flexDirection: 'row'
    }
});