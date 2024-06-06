import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../database_config/firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import styles from "../styles";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const setting = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return setting;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "EnoChat",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "#2C6BED", alignSelf: "center" },
      headerTintColor: "#2C6BED",
      headerLeft: () => (
        <View style={{ marginLeft: 15 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRightView}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="#2C6BED" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="#2C6BED" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView style={styles.homeScreenContainer}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

/* const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  headerRightView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 80,
    marginRight: 10,
  },
}); */
