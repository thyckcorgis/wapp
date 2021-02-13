import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Colours, Styles } from "../../styles";

import {
  getPendingRequests,
  sendFriendRequest,
  acceptFriendRequest,
  getNonFriends,
} from "../../api";
import { getData } from "../../storage";

import Navbar from "../Navbar";
import SafeGradient from "../SafeGradient";
import ScreenProps from "./ScreenProps";
import { TextInput } from "react-native-gesture-handler";

interface User {
  username: string;
  name: string;
}

export default function AddFriendsScreen({ navigation }: ScreenProps) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  console.log(users)

  function fetchAllData() {
    (async () => {
      const user = (await getData("user")) as User;
      if (user == null) return;
      const { username } = user;

      setUsername(username);
      let users = await getNonFriends(username);
      setUsers(users);
      let pending = await getPendingRequests(username);
      console.log({ users, pending });
      setPendingRequests(pending);
    })();
  }

  useEffect(() => {
    fetchAllData();
  }, [setUsername, setUsers, setPendingRequests]);

  function addFriend(friend: string) {
    return () => {
      (async () => {
        const data = await sendFriendRequest(username, friend);
        console.log(data);
      })();
    };
  }

  function acceptFriend(friend: string) {
    return () => {
      (async () => {
        const data = await acceptFriendRequest(username, friend);
        console.log(data);
      })();
    };
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchAllData();
    setRefreshing(false);
  }, []);

  return (
    <SafeGradient>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={{ ...Styles.title, ...styles.title }}>
          Add New Friends
        </Text>
        <Text>Search</Text>
        <TextInput
              //style={styles.}
              placeholder="search friends..."
              onChangeText={(text) => setSearch(text)}
              value={search}
            />        
        <TouchableOpacity
          onPress={() => 1+1}
          style={{ ...Styles.buttonShape, /*...styles.searchButton*/ }}
        >
          <Text style={{ ...Styles.body, /* ...styles.searchText */}}>Search</Text>
        </TouchableOpacity>
        <View style={styles.friendsBox}>
          <Text style={{ ...Styles.body, ...styles.title }}>Other Users:</Text>
          {users?.map(({ username, name }) => (
            <View style={styles.friendBox} key={username}>
              <View style={styles.name}>
                <Text style={{ ...Styles.body, ...styles.headerText }}>
                  Name:{" "}
                </Text>
                <Text style={{ ...Styles.body, ...styles.friendText }}>
                  {name}
                </Text>
              </View>
              <View style={styles.name}>
                <Text style={{ ...Styles.body, ...styles.headerText }}>
                  Username:{" "}
                </Text>
                <Text style={{ ...Styles.body, ...styles.friendText }}>
                  {username}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => addFriend(username)()}
              >
                <Text style={{ ...Styles.body, ...styles.buttonText }}>
                  Add Friend
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.friendsBox}>
          <Text style={{ ...Styles.body, ...styles.title }}>
            Pending requests:
          </Text>
          {pendingRequests?.map(({ username, name }) => (
            <View style={styles.friendBox} key={username}>
              <View style={styles.name}>
                <Text style={{ ...Styles.body, ...styles.headerText }}>
                  Name:{" "}
                </Text>
                <Text style={{ ...Styles.body, ...styles.friendText }}>
                  {name}
                </Text>
              </View>
              <View style={styles.name}>
                <Text style={{ ...Styles.body, ...styles.headerText }}>
                  Username:{" "}
                </Text>
                <Text style={{ ...Styles.body, ...styles.friendText }}>
                  {username}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => acceptFriend(username)()}
              >
                <Text style={{ ...Styles.body, ...styles.buttonText }}>
                  Accept Friend
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Navbar navigation={navigation} right="Friends" />
    </SafeGradient>
  );
}

const styles = StyleSheet.create({
  friendsBox: {
    flex: 1,
    margin: 20,
    // borderWidth: 1,
  },
  friendBox: {
    width: "100%",
    backgroundColor: Colours.yellow,
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  navBar: {
    justifyContent: "flex-end",
    bottom: 0,
  },
  title: {
    textAlign: "center",
    color: Colours.yellow,
    marginTop: 30,
  },
  smallButton: {
    borderRadius: 20,
    backgroundColor: Colours.lightBlue,
    margin: 10,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
    alignSelf: "center",
    width: "50%",
  },
  buttonText: {
    color: Colours.darkBlue,
    textAlign: "center",
  },
  headerText: {
    fontSize: 20,
    color: Colours.darkBlue,
  },
  friendText: {
    textAlignVertical: "center",
    fontSize: 18,
    color: Colours.medBlue,
  },
});
