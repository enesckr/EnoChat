import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useLayoutEffect } from "react";
import { View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Input, Icon, Text, Button } from "react-native-elements";
import { auth } from "../database_config/firebase";
import { AntDesign } from "@expo/vector-icons";
import styles from "../styles";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
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

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: photoUrl || "../assets/default-avatar.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h4 style={{ marginBottom: 50 }}>
        Let's create an account.
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full name"
          autoFocus
          textContentType="name"
          value={name}
          onChangeText={(text) => setName(text)}
          leftIcon={
            <Icon
              name="person"
              size={24}
              color="#2C6BED"
              style={{ marginRight: 5 }}
            />
          }
        />
        <Input
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={
            <Icon
              name="email"
              size={24}
              color="#2C6BED"
              style={{ marginRight: 5 }}
            />
          }
        />
        <Input
          placeholder="Password"
          textContentType="name"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          leftIcon={
            <Icon
              name="lock"
              size={24}
              color="#2C6BED"
              style={{ marginRight: 5 }}
            />
          }
        />
        <Input
          placeholder="Profile picture URL (optional)"
          textContentType="URL"
          value={photoUrl}
          onChangeText={(text) => setPhotoUrl(text)}
          leftIcon={
            <Icon
              name="image"
              size={24}
              color="#2C6BED"
              style={{ marginRight: 5 }}
            />
          }
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
