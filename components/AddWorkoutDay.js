import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Picker,
  Modal
} from "react-native";

import TimePicker from "react-native-simple-time-picker";

class AddWorkoutDay extends Component {
  state = {
    day: "choose a day",
    from: { selectedHours: 0, selectedMinutes: 0 },
    to: { selectedHours: 0, selectedMinutes: 0 },
    finalFrom: "00:00",
    finalTo: "00:00"
  };

  render() {
    return (
      <Modal visible={this.props.visible} animationType="slide">
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#222"
          }}
        >
          <View style={style.container}>
            <Picker
              itemStyle={{ color: "#fff" }}
              selectedValue={this.state.day}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ day: itemValue })
              }
            >
              <Picker.Item label="choose a day" value="none" />
              <Picker.Item label="Mon" value="Mon" />
              <Picker.Item label="Tue" value="Tue" />
              <Picker.Item label="Wed" value="Wed" />
              <Picker.Item label="Thu" value="Thu" />
              <Picker.Item label="Fri" value="Fri" />
              <Picker.Item label="Sat" value="Sat" />
              <Picker.Item label="Sun" value="Sun" />
            </Picker>
          </View>
          <View style={style.container}>
            <Text style={style.textStyle}>from</Text>
            <Text style={style.textStyle}>{this.state.finalFrom}</Text>
            <View
              style={{
                backgroundColor: "#5b5b5b",
                borderRadius: 10,
                marginTop: 7
              }}
            >
              <TimePicker
                selectedHours={this.state.from.selectedHours}
                selectedMinutes={this.state.from.selectedMinutes}
                onChange={(hours, minutes) =>
                  this.setState({
                    from: {
                      selectedHours: hours,
                      selectedMinutes: minutes
                    },
                    finalFrom:
                      (hours < 10 ? "0" + hours : hours) +
                      ":" +
                      (minutes < 10 ? "0" + minutes : minutes)
                  })
                }
              />
            </View>
          </View>
          <View style={style.container}>
            <Text style={style.textStyle}>to</Text>
            <Text style={style.textStyle}>{this.state.finalTo}</Text>
            <View
              style={{
                backgroundColor: "#5b5b5b",
                borderRadius: 10,
                marginTop: 7
              }}
            >
              <TimePicker
                selectedHours={this.state.to.selectedHours}
                selectedMinutes={this.state.to.selectedMinutes}
                onChange={(hours, minutes) =>
                  this.setState({
                    to: {
                      selectedHours: hours,
                      selectedMinutes: minutes
                    },
                    finalTo:
                      (hours < 10 ? "0" + hours : hours) +
                      ":" +
                      (minutes < 10 ? "0" + minutes : minutes)
                  })
                }
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ margin: 30 }}>
              <Button
                disabled={this.state.day == "choose a day" ? true : false}
                title="Add"
                onPress={this.props.addDay.bind(this, this.state)}
              />
            </View>
            <View style={{ margin: 30 }}>
              <Button title="Cancel" onPress={this.props.cancel} />
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const style = StyleSheet.create({
  container: {
    color: "#fff",
    width: 300,
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3
  },
  textStyle: {
    color: "#5b5b5b",
    alignSelf: "center"
  }
});

export default AddWorkoutDay;
