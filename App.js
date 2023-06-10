import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Scorecard from "./src/components/Scorecard";
import StartForm from "./src/components/StartForm";

export default function App() {
  const [formData, setFormData] = useState(null);

  return (
    <View style={styles.container}>
      {formData ? (
        <Scorecard numPlayers={formData.numPlayers} club={formData.club} />
      ) : (
        <StartForm onSubmit={setFormData} />
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
