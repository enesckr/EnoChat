import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { db, auth } from "../database_config/firebase";
import firebase from "firebase";
import styles from "../styles";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: "center",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            marginLeft: -25,
            alignItems: "center",
            headerTitleStyle: { color: "#2C6BED", alignSelf: "center" },
          }}
        >
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoUrl || "../assets/default-avatar.png",
            }}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRightView}>
          <TouchableOpacity>
            <AntDesign name="phone" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="videocamera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    if (input != "") {
      db.collection("chats").doc(route.params.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoUrl: auth.currentUser.photoURL,
      });
    }
    setInput("");
  };

  useLayoutEffect(() => {
    const setting = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return setting;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="inverted" />
      <KeyboardAvoidingView style={styles.chatScreenContainer}>
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.sender}>
                  <Avatar
                    position="absolute"
                    rounded
                    bottom={-10}
                    right={-8}
                    size={30}
                    containerStyle={{
                      position: "absolute",
                      bottom: -10,
                      right: -8,
                    }}
                    source={{ uri: data.photoUrl }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.receiver}>
                  <Avatar
                    position="absolute"
                    rounded
                    bottom={-10}
                    right={-8}
                    size={30}
                    containerStyle={{
                      position: "absolute",
                      bottom: -10,
                      left: -8,
                    }}
                    source={{ uri: data.photoUrl }}
                  />
                  <Text style={styles.receiverText}>{data.message}</Text>
                  <Text style={styles.receiverName}>{data.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={sendMessage}
              style={styles.textInput}
              placeholder="Let's text something ..."
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <Ionicons
                disabled={!input}
                name="send-outline"
                size={30}
                color="#2B68E6"
              />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

/* const styles = StyleSheet.create({
  headerRightView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 80,
    marginRight: 10,
  },
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 15,
    maxWidth: "80%",
    position: "relative",
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginRight: 10,
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  receiverName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
}); */
