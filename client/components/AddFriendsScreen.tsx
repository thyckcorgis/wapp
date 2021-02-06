import React from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";


interface AddFriendsScreenProps {
    navigation: StackNavigationHelpers;
  }
  

export default function AddFriendsScreen({ navigation }: AddFriendsScreenProps) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("AddFriends")}>
                <Text style={{padding:50}}>This is the add friends screen</Text>
            </TouchableOpacity>        
        </View>

    )
}

