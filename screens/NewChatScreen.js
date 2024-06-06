import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { db } from "../database_config/firebase";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../styles";

const NewChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Chat",
      headerTitleStyle: { alignSelf: "center" },
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Input
        placeholder="Enter a chat name"
        value={input}
        onSubmitEditing={createChat}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon
            name="group"
            size={24}
            color="#2C6BED"
            style={{ marginRight: 5 }}
          />
        }
      />
      <Button
        disabled={!input}
        onPress={createChat}
        containerStyle={styles.button}
        title="Let's create"
      />
    </SafeAreaView>
  );
};

export default NewChatScreen;

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    height: "100%",
  },
  button: {
    width: 200,
    marginTop: 20,
  },
}); */
