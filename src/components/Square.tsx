import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";

interface Props {
  number;
  onChange: (number: number) => void;
  editable?: boolean;
  color?: string;
}

const Square: React.FC<Props> = ({
  number,
  onChange,
  editable = true,
  color = "lightgrey",
}) => {
  const [inputValue, setInputValue] = useState(number.toString());

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleFocus = () => {
    if (editable) {
      setInputValue("");
    }
  };

  const handleInputBlur = () => {
    // Keyboard.dismiss();
    onChange(parseInt(inputValue) || 0);
  };

  return (
    <View style={[styles.square, { backgroundColor: color }]}>
      {editable ? (
        <TextInput
          // clearButtonMode="always"
          value={inputValue}
          keyboardType="number-pad"
          style={styles.input}
          onFocus={handleFocus}
          onChangeText={handleInputChange}
          onBlur={handleInputBlur}
        />
      ) : (
        <Text>{number}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
});

export default Square;
