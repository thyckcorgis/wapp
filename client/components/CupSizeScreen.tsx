import React from "react";
<<<<<<< HEAD
import { Text, StyleSheet, View, TouchableOpacity, TextInput} from "react-native";
=======
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
>>>>>>> aee3e9f6b88d2764bdd305f30255a1dd90cc95ed
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState, useEffect } from "react";

interface CupSizeScreenProps {
<<<<<<< HEAD
    navigation: StackNavigationHelpers;
  }
  
  interface Cup {
      name: string,
      size: string
  }

  const textField = (
    placeholder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    numberPad: boolean
  ) => (
    <TextInput
      //style={{ ...Styles.inputField, ...styles.inputField }}
      placeholder={placeholder}
     // placeholderTextColor={Colours.medBlue}
      onChangeText={(text) => setValue(text)}
      value={value}
      keyboardType={numberPad ? "decimal-pad" : "default"}
    />
  );

  const input = (
    placeholder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    numberPad: boolean
    //style?:
  ) => (
    <View>
      <Text>
        {placeholder + ":"}
      </Text>
      {textField(placeholder, value, setValue, numberPad)}
    </View>
  );

export default function CupSizeScreen({ navigation }: CupSizeScreenProps) {
    const [cups, setCups] = useState<Cup[]>([]);
    const [name, setName] = useState('');
    const [size, setSize] = useState('');

   
    // function addFriend(friend: string) {
    //     return () => {
    //       (async () => {
    //         const data = await sendFriendRequest(username, friend);
    //         console.log(data);
    //       })();
    //     };
    //   }

    
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={{padding:50}}>This is the cup size screen</Text>
            </TouchableOpacity>    
            {input("Name", name, setName, false)}
            {input("Size", size, setSize, true)}
            <TouchableOpacity onPress={() => setCups([name, size])}>
                <Text style={{padding:50}}>Add new cup</Text>
            </TouchableOpacity> 
            {cups.map(({ name, size }) => (
          <View style={{padding:50}} key={name}>
            <Text>
              {name}: {size} mL
            </Text>
            {/* <TouchableOpacity onPress={() => addCup(name)()}>
              <Text>Add Friend</Text>
            </TouchableOpacity> */}
          </View>
        ))}
        </View>
    )
=======
  navigation: StackNavigationHelpers;
}

const cup = (number: number) => (
  <Text style={{ padding: 50 }}>Cup number {number}</Text>
);
let array: JSX.Element[] = [];

export default function CupSizeScreen({ navigation }: CupSizeScreenProps) {
  const [newCup, setNewCup] = useState(0);

  useEffect(() => {
    array.push(cup(newCup));
    console.log(array);
  });

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ padding: 50 }}>This is the cup size screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setNewCup(newCup + 1)}>
        <Text style={{ padding: 50 }}>Add cup</Text>
      </TouchableOpacity>
      {array}
    </View>
  );
>>>>>>> aee3e9f6b88d2764bdd305f30255a1dd90cc95ed
}
