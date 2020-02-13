import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Modal } from "react-native";

class TdeeHelp extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="slide"
        transparent={true}
      >
        <View style={style.container}>
          <Text style={{ color: "#fff", margin: 4 }}>
            TDEE (Total Daily Energy Expenditure) is the amount of calories you
            need per day to maintain you current weight.
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

export default TdeeHelp;
