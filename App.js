import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { fetch } from "expo/fetch";
import { createEventSource } from "eventsource-client";

export default function App() {
  const [state, setState] = React.useState();

  React.useEffect(() => {
    const es = createEventSource({
      url: "https://stream.wikimedia.org/v2/stream/recentchange",
      fetch,
      onMessage: ({ data }) => {
        console.log("Received data:", data);
        setState(data);
      },
      onScheduleReconnect: (info) => {
        console.log("Reconnecting in", info.delay, "ms");
      },
      method: "GET",
      headers: {
        "User-Agent": "Expo Fetch Test App",
      },
    });
    return () => {
      es.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{state}</Text>
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
