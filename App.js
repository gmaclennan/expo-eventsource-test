import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { fetch } from "expo/fetch";

export default function App() {
  const [lcState, setLcState] = React.useState({ status: "loading" });
  const [urlState, setUrlState] = React.useState({ status: "loading" });

  React.useEffect(() => {
    fetch("https://httpbin.org/json", { method: "get" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Response data:", data);
        setLcState({ status: "success", data });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLcState({ status: "error", error });
      });
  }, []);

  React.useEffect(() => {
    fetch(new URL("https://httpbin.org/get"))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Response data:", data);
        setUrlState({ status: "success", data });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setUrlState({ status: "error", error });
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Fetch lowercase method: {lcState.status}</Text>

      {lcState.status === "error" && (
        <Text>Error: {lcState.error.message}</Text>
      )}

      <Text>Fetch URL method: {urlState.status}</Text>

      {urlState.status === "error" && (
        <Text>Error: {urlState.error.message}</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
