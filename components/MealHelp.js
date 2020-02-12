import React, { Component } from "react";
import {
  StyleSheet,
  Input,
  TextInputProps,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Picker,
  Modal
} from "react-native";

class MealHelp extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="slide"
        transparent={true}
      >
        <View style={style.container}>
          <Text style={{ color: "#fff", margin: 4 }}>
            Recommended for you to have:
          </Text>
          <Text style={{ color: "#fff", margin: 4 }}>
            Breakfast: 20% of your TDEE
          </Text>
          <Text style={{ color: "#fff", margin: 4 }}>
            Snack: 10% of your TDEE
          </Text>
          <Text style={{ color: "#fff", margin: 4 }}>
            Lunch: 25% of your TDEE
          </Text>
          <Text style={{ color: "#fff", margin: 4 }}>
            Snack: 10% of your TDEE
          </Text>
          <Text style={{ color: "#fff", margin: 4 }}>
            Dinner: 35% of your TDEE
          </Text>
          <Text style={{ color: "#fff", margin: 4 }}>
              Choose a Meal and the recommended amount of calories for it will automatically be calculated.
          </Text>
          <Button title="OK" onPress={this.props.ok} />
        </View>
      </Modal>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  }
});

export default MealHelp;
