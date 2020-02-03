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
        <View style={style.container}>
          <Text style={{ color: "#fff", margin: 4 }}>
            your daily goal-cal will be divided like this:
          </Text>
          <Text style={{ color: "#fff", margin: 4 }}>
            {this.state.carbs[this.props.index]}% carbs
          </Text>
          <Text style={{ color: "#fff", margin: 4 }}>
            {this.state.protein[this.props.index]}% protein
          </Text>
          <Text style={{ color: "#fff", margin: 4 }}>
            {this.state.fat[this.props.index]}% fat
          </Text>
          <Button title="OK" onPress={this.props.ok} />
        </View>
      </Modal>
    );}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: '#fff',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#000"
  }
});

export default ChooseDietHelp