import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Picker from "react-native-picker-select";
import PropTypes from "prop-types";

function StartForm({ onSubmit }) {
  const [numPlayers, setNumPlayers] = useState(4);
  const [club, setClub] = useState("");

  const incrementPlayers = () => {
    if (numPlayers < 5) {
      setNumPlayers(numPlayers + 1);
    }
  };

  const decrementPlayers = () => {
    if (numPlayers > 2) {
      setNumPlayers(numPlayers - 1);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={{ fontSize: 30, marginBottom: 10 }}>
        Número de Jugadores:
      </Text>
      <View style={styles.playersContainer}>
        <Button
          title="-"
          onPress={decrementPlayers}
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 30 }}>{numPlayers}</Text>
        <Button
          title="+"
          onPress={incrementPlayers}
          style={{ marginLeft: 10 }}
        />
      </View>
      <Text style={{ marginBottom: 10, fontSize: 30 }}>Club Name:</Text>
      <Picker
        // style={styles.picker}
        items={[
          { label: "Country Club La Planicie", value: "CCLP" },
          { label: "Asia Golf Club", value: "AGC" },
        ]}
        onValueChange={(value) => setClub(value)}
        value={club}
      />
      <Button
        title="Submit"
        onPress={() => onSubmit({ numPlayers, club })}
        disabled={!club}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  picker: {
    height: 50,
    width: 150,
    color: "#344953",
    paddingRight: 30,
    margin: 50,
    marginTop: 100,
    fontSize: 50,
  },
});

export default StartForm;
