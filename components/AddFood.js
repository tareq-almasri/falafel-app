import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Modal
} from "react-native";


class AddFood extends Component {
    state={

    }
    
    handleCalculate=()=>{
        fetch('', {})
    }

    render() {
        return (
          <Modal visible={this.props.visible} animationType="slide">
            <Text>add a fuckin meal yo</Text>
            <TextInput />
            <Button title="Calculate Food" onPress={this.handleCalculate} />
            <Button title="Add" />
            <Button title="cancel" onPress={this.props.cancel} />
          </Modal>
        );
    }
}

export default AddFood
