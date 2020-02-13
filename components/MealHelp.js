import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Modal } from "react-native";

class MealHelp extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="slide"
        transparent={true}
      >
        <View style={style.container}>
          <Text style={style.text}>Recommended for you to have:</Text>
          <Text style={style.text}>Breakfast: 20% of your TDEE</Text>
          <Text style={style.text}>Snack: 10% of your TDEE</Text>
          <Text style={style.text}>Lunch: 25% of your TDEE</Text>
          <Text style={style.text}>Snack: 10% of your TDEE</Text>
          <Text style={style.text}>Dinner: 35% of your TDEE</Text>
          <Text style={style.text}>
            Choose a Meal and the recommended amount of calories for it will
            automatically be calculated.
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
  },
  text: { color: "#fff", margin: 4 }
});

export default MealHelp;
