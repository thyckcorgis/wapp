import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";


interface SignInScreen {
    navigation: StackNavigationHelpers;
  }
  

export default function SignInScreen({ navigation }: SignInScreen) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');

    return (
        <View>
            <Text style={{padding:50}}>This is the sign in screen</Text>
            <TextInput
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
                <Text style={{padding:50}}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{padding:50}}>Don't have an account? Sign UP!</Text>
            </TouchableOpacity>
        </View>
    )
}

