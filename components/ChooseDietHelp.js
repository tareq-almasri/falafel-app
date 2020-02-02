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


class ChooseDietHelp extends Component {
  state={
    carbs: [50, 40, 20],
    protein: [30, 30, 50],
    fat: [20, 30, 30]
  }

  render() {
    return (
      <Modal visible={this.props.visible} animationType="slide">
        <Text>your daily goal-cal will be divided like this:</Text>
        <Text>
          {this.state.carbs[this.props.index]}% carbs,{" "}
          {this.state.protein[this.props.index]}% protein,{" "}
          {this.state.fat[this.props.index]}% fat
        </Text>
        <Button title="OK" onPress={this.props.ok} />
      </Modal>
    );}
}

export default ChooseDietHelp