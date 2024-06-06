import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //Login & Register Styles
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
    height: "100%",
  },
  //Home Styles
  homeScreenContainer: {
    height: "100%",
  },
  headerRightView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 80,
    marginRight: 10,
  },
  //Chat Styles
  chatScreenContainer: { flex: 1 },
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
    paddingBottom: 10,
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
    marginLeft: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "#2B68E6",
  },
});

export default styles;
