import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

interface RectangularButtonProps {
  title: string;
  onPress: () => string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const RectangularButton: React.FC<RectangularButtonProps> = ({
  title,
  onPress,
  containerStyle,
  titleStyle,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [output, setOutput] = useState("");

  const handlePress = () => {
    setOutput(onPress());
    setModalVisible(true);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={[styles.container, containerStyle]}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{output}</Text>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#3498db",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    color: "#ffffff",
    fontSize: 16,
    padding: 24,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RectangularButton;
