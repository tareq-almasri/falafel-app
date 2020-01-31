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
  TouchableOpacity
} from "react-native";

import TimePicker from "react-native-simple-time-picker";
import AddWorkoutDay from "./AddWorkoutDay";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class SetPlan extends Component {
  state = {
    visible: false,
    wakeUp: { selectedHours: 0, selectedMinutes: 0 },
    breakfast: { selectedHours: 0, selectedMinutes: 0 },
    lunch: { selectedHours: 0, selectedMinutes: 0 },
    dinner: { selectedHours: 0, selectedMinutes: 0 },
    sleep: { selectedHours: 0, selectedMinutes: 0 },
    workoutDays: []
  };

  handleAddDay = day => {
    day.id = Math.random();
    if (this.state.workoutDays.length > 0) {
      this.setState(prev => {
        prev.workoutDays = [
          ...prev.workoutDays.filter(x => x.day !== day.day),
          day
        ];
      });
    } else {
      this.setState({ workoutDays: [day] });
    }
    console.log(day.id);
    console.log(day);
    console.log(this.state.workoutDays);
    this.setState({ visible: false });
  };
  handleDeleteDay = day => {
    this.setState({
      workoutDays: [...this.state.workoutDays.filter(x => x.day !== day)]
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#222"
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              margin: 25,
              fontSize: 20,
              alignSelf: "center"
            }}
          >
            set a plan for you:
          </Text>
          <Text style={style.textStyle}>* you will receive a reminder notification for: </Text>

          <View style={style.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={style.textStyle}>wake up time:</Text>
              <Text style={style.textStyle}>
                {this.state.wakeUp.selectedHours < 10
                  ? "0" + this.state.wakeUp.selectedHours
                  : this.state.wakeUp.selectedHours}
                :
                {this.state.wakeUp.selectedMinutes < 10
                  ? "0" + this.state.wakeUp.selectedMinutes
                  : this.state.wakeUp.selectedMinutes}
              </Text>
            </View>
            <TimePicker
              selectedHours={this.state.wakeUp.selectedHours}
              selectedMinutes={this.state.wakeUp.selectedMinutes}
              onChange={(hours, minutes) =>
                this.setState({
                  wakeUp: {
                    selectedHours: hours,
                    selectedMinutes: minutes
                  }
                })
              }
            />
          </View>

          <View style={style.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={style.textStyle}>breakfast time:</Text>
              <Text style={style.textStyle}>
                {this.state.breakfast.selectedHours < 10
                  ? "0" + this.state.breakfast.selectedHours
                  : this.state.breakfast.selectedHours}
                :
                {this.state.breakfast.selectedMinutes < 10
                  ? "0" + this.state.breakfast.selectedMinutes
                  : this.state.breakfast.selectedMinutes}
              </Text>
            </View>
            <TimePicker
              selectedHours={this.state.breakfast.selectedHours}
              selectedMinutes={this.state.breakfast.selectedMinutes}
              onChange={(hours, minutes) =>
                this.setState({
                  breakfast: {
                    selectedHours: hours,
                    selectedMinutes: minutes
                  }
                })
              }
            />
          </View>

          <View style={style.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={style.textStyle}>lunch time:</Text>
              <Text style={style.textStyle}>
                {this.state.lunch.selectedHours < 10
                  ? "0" + this.state.lunch.selectedHours
                  : this.state.lunch.selectedHours}
                :
                {this.state.lunch.selectedMinutes < 10
                  ? "0" + this.state.lunch.selectedMinutes
                  : this.state.lunch.selectedMinutes}
              </Text>
            </View>
            <TimePicker
              selectedHours={this.state.lunch.selectedHours}
              selectedMinutes={this.state.lunch.selectedMinutes}
              onChange={(hours, minutes) =>
                this.setState({
                  lunch: {
                    selectedHours: hours,
                    selectedMinutes: minutes
                  }
                })
              }
            />
          </View>

          <View style={style.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={style.textStyle}>dinner time:</Text>
              <Text style={style.textStyle}>
                {this.state.dinner.selectedHours < 10
                  ? "0" + this.state.dinner.selectedHours
                  : this.state.dinner.selectedHours}
                :
                {this.state.dinner.selectedMinutes < 10
                  ? "0" + this.state.dinner.selectedMinutes
                  : this.state.dinner.selectedMinutes}
              </Text>
            </View>
            <TimePicker
              selectedHours={this.state.dinner.selectedHours}
              selectedMinutes={this.state.dinner.selectedMinutes}
              onChange={(hours, minutes) =>
                this.setState({
                  dinner: {
                    selectedHours: hours,
                    selectedMinutes: minutes
                  }
                })
              }
            />
          </View>

          <View style={style.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={style.textStyle}>sleep time:</Text>
              <Text style={style.textStyle}>
                {this.state.sleep.selectedHours < 10
                  ? "0" + this.state.sleep.selectedHours
                  : this.state.sleep.selectedHours}
                :
                {this.state.sleep.selectedMinutes < 10
                  ? "0" + this.state.sleep.selectedMinutes
                  : this.state.sleep.selectedMinutes}
              </Text>
            </View>
            <TimePicker
              selectedHours={this.state.sleep.selectedHours}
              selectedMinutes={this.state.sleep.selectedMinutes}
              onChange={(hours, minutes) =>
                this.setState({
                  sleep: {
                    selectedHours: hours,
                    selectedMinutes: minutes
                  }
                })
              }
            />
          </View>
        </View>
        <AddWorkoutDay
          cancel={this.handleCancel}
          visible={this.state.visible}
          addDay={this.handleAddDay}
        />

        <View style={style.container}>
          <Text style={style.textStyle}>workout days:</Text>
          {this.state.workoutDays.length > 0 ? (
            this.state.workoutDays.map(x => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#191919',
                    paddingTop: 3,
                    paddingBottom: 3
                  }}
                  key={x.day}
                >
                  <Text style={{width: 30}}>{x.day}</Text>
                  <View>
                    <Text style={style.textStyle}>from</Text>
                    <Text style={style.textStyle}>
                      {x.from.selectedHours < 10
                        ? "0" + x.from.selectedHours
                        : x.from.selectedHours}
                      :
                      {x.from.selectedMinutes < 10
                        ? "0" + x.from.selectedMinutes
                        : x.from.selectedMinutes}
                    </Text>
                  </View>
                  <View>
                    <Text style={style.textStyle}>to</Text>
                    <Text style={style.textStyle}>
                      {x.to.selectedHours < 10
                        ? "0" + x.to.selectedHours
                        : x.to.selectedHours}
                      :
                      {x.to.selectedMinutes < 10
                        ? "0" + x.to.selectedMinutes
                        : x.to.selectedMinutes}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({ visible: true })}
                  >
                    <FontAwesome5 name={"pen-square"} size={20} color="green" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.handleDeleteDay.bind(this, x.day)}
                  >
                    <FontAwesome5 name={"times-circle"} size={20} color="red" solid/>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View></View>
          )}
          <Button
            title="+ add a workout day"
            onPress={() => this.setState({ visible: true })}
          />
        </View>
        <View style={{ margin: 50 }}>
          <Button title="finish" />
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#111",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 1
  },
  textStyle: {
    color: "#5b5b5b",
    alignSelf: "center"
  }
});

export default SetPlan;
