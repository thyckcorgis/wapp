import React from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface FriendsScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function FriendsScreen({ navigation }: FriendsScreenProps) {
    return (
        <View>
            <Text style={{padding:50}}>This is the friends screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddFriends")}>
                <Text style={{padding:50}}>Go to add friends screen</Text>
            </TouchableOpacity>        
        </View>

    )
}

