import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Colours, Styles } from "../../../styles";

import {
  getPendingRequests,
  sendFriendRequest,
  acceptFriendRequest,
  getNonFriends,
} from "../../../api";
import { getData } from "../../../storage";

import Navbar from "../../Navbar";
import SafeGradient from "../../SafeGradient";
import ScreenProps from "../ScreenProps";
import UserList from "../../UserList";
import { User } from "../../UserArray";

export default function AddFriendsScreen({ navigation }: ScreenProps) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

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

  function searchFriends(text: string) {
    if (text === "") {
      setSearchResults([])
      return
    }
    setSearchResults(
      users.filter(
        (u) => u.name.startsWith(text) || u.username.startsWith(text)
      )
    );
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchAllData();
    setRefreshing(false);
  }, []);

  let displayResults
  if (searchResults.length != 0) {
    displayResults = <UserList
    title="Search results:"
    list={searchResults}
    label="Add Friend"
    onPress={addFriend(username)}
  />
  } else if (!search) {
    displayResults = null
  }
  else {
    displayResults = <Text style={{ ...Styles.title, ...styles.title }}>No users found &#x1F62D;</Text>
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeGradient>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyboardDismissMode="on-drag"
        >
          <Text style={{ ...Styles.title, ...styles.title }}>
            Add New Friends
          </Text>
          <TextInput
            placeholder="Search friends..."
            placeholderTextColor={Colours.yellow}
            onChangeText={(text) => {
              setSearch(text);
              searchFriends(text);
            }}
            value={search}
            style={{ ...Styles.inputField, ...styles.searchBar }}
          />

          {displayResults}
          <UserList
            title="Pending requests:"
            list={pendingRequests}
            label="Accept Friend"
            onPress={acceptFriend(username)}
          />
        </ScrollView>
        <Navbar navigation={navigation} right="Friends" />
      </SafeGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: Colours.yellow,
    marginTop: 30,
  },
  searchBar: {
    borderColor: Colours.yellow,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginVertical: 30,
    fontSize: 18,
    color: Colours.yellow,
  },
});
