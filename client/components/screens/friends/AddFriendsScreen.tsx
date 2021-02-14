import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TextInput,
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

interface User {
  username: string;
  name: string;
}

interface TextRowProps {
  title: string;
  text: string;
}
const TextRow = ({ title, text }: TextRowProps) => (
  <View style={styles.name}>
    <Text style={{ ...Styles.body, ...styles.headerText }}>{title + " "}</Text>
    <Text style={{ ...Styles.body, ...styles.friendText }}>{text}</Text>
  </View>
);

interface SmallButtonProps {
  label: string;
  onPress: () => void;
}

const SmallButton = ({ label, onPress }: SmallButtonProps) => (
  <TouchableOpacity style={styles.smallButton} onPress={onPress}>
    <Text style={{ ...Styles.body, ...styles.buttonText }}>{label}</Text>
  </TouchableOpacity>
);

interface UserListProps {
  title: string;
  list: User[];
  label: string;
  onPress: () => void;
}
const UserList = ({ title, list, label, onPress }: UserListProps) =>
  list.length > 0 ? (
    <View style={styles.friendsBox}>
      <Text style={{ ...Styles.body, ...styles.title }}>{title}</Text>
      {list?.map(({ username, name }) => (
        <View style={styles.friendBox} key={username}>
          <TextRow title="Name:" text={name} />
          <TextRow title="Username:" text={username} />
          <SmallButton label={label} onPress={onPress} />
        </View>
      ))}
    </View>
  ) : null;
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

  function searchFriends() {
    setSearchResults(
      users.filter(
        (u) => u.name.startsWith(search) || u.username.startsWith(search)
      )
    );
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
          placeholder="Search friends..."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <SmallButton label="Search" onPress={searchFriends} />

        <UserList
          title="Search results:"
          list={searchResults}
          label="Add Friend"
          onPress={addFriend(username)}
        />
        <UserList
          title="Other users:"
          list={users}
          label="Add Friend"
          onPress={addFriend(username)}
        />
        <UserList
          title="Pending requests:"
          list={pendingRequests}
          label="Accept Friend"
          onPress={acceptFriend(username)}
        />
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
