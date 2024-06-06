import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image, Icon } from "react-native-elements";
import { auth } from "../database_config/firebase";
import styles from "../styles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const setting = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return setting;
  }, [navigation]);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 150, height: 150 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          leftIcon={
            <Icon
              name="email"
              size={24}
              color="#2C6BED"
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={(mail) => setEmail(mail)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
          leftIcon={
            <Icon
              name="lock"
              size={24}
              color="#2C6BED"
              style={{ marginRight: 5 }}
            />
          }
          value={password}
          onChangeText={(pass) => setPassword(pass)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button
        raised
        containerStyle={styles.button}
        onPress={signIn}
        title="Login"
      />
      <Button
        raised
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
/* 
const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
}); */
