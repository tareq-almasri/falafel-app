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
    finalWakeUp: { time: "00:00" },
    breakfast: { selectedHours: 0, selectedMinutes: 0 },
    finalBreakfast: { time: "00:00" },
    lunch: { selectedHours: 0, selectedMinutes: 0 },
    finalLunch: { time: "00:00" },
    dinner: { selectedHours: 0, selectedMinutes: 0 },
    finalDinner: { time: "00:00" },
    sleep: { selectedHours: 0, selectedMinutes: 0 },
    finalSleep: { time: "00:00" },
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

  handleFinish = () => {
    let planArr = [
      this.props.navigation.getParams("username"),
      this.state.finalWakeUp.time,
      this.state.finalBreakfast.time,
      this.state.finalLunch.time,
      this.state.finalDinner.time,
      this.state.finalSleep.time
    ];
    let workoutArr = this.state.workoutDays;
    fetch(
      `http://falafel-server-om147p0x6.now.sh/api/setplan/?planArr=${planArr}&workoutArr=${workoutArr}`
    ).then(response => response.json());

    this.props.navigation.navigate("Login", {
      username: this.props.navigation.getParam("username"),
      password: this.props.navigation.getParam("password")
    });
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000"
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
          <Text style={style.textStyle}>
            * you will receive a reminder notification for:{" "}
          </Text>

          <View style={style.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={style.textStyle}>wake up time:</Text>
              <Text style={style.textStyle}>{this.state.finalWakeUp.time}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#5b5b5b",
                borderRadius: 10,
                marginTop: 7
              }}
            >
              <TimePicker
                selectedHours={this.state.wakeUp.selectedHours}
                selectedMinutes={this.state.wakeUp.selectedMinutes}
                onChange={(hours, minutes) =>
                  this.setState({
                    wakeUp: {
                      selectedHours: hours,
                      selectedMinutes: minutes
                    },
                    finalWakeUp: {
                      time:
                        (hours < 10 ? "0" + hours : hours) +
                        ":" +
                        (minutes < 10 ? "0" + minutes : minutes)
                    }
                  })
                }
              />
            </View>
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
                {this.state.finalBreakfast.time}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#5b5b5b",
                borderRadius: 10,
                marginTop: 7
              }}
            >
              <TimePicker
                itemStyle={{ color: "#fff" }}
                selectedHours={this.state.breakfast.selectedHours}
                selectedMinutes={this.state.breakfast.selectedMinutes}
                onChange={(hours, minutes) =>
                  this.setState({
                    breakfast: {
                      selectedHours: hours,
                      selectedMinutes: minutes
                    },
                    finalBreakfast: {
                      time:
                        (hours < 10 ? "0" + hours : hours) +
                        ":" +
                        (minutes < 10 ? "0" + minutes : minutes)
                    }
                  })
                }
              />
            </View>
          </View>
          <View style={style.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={style.textStyle}>lunch time:</Text>
              <Text style={style.textStyle}>{this.state.finalLunch.time}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#5b5b5b",
                borderRadius: 10,
                marginTop: 7
              }}
            >
              <TimePicker
                itemStyle={{ color: "#fff" }}
                selectedHours={this.state.lunch.selectedHours}
                selectedMinutes={this.state.lunch.selectedMinutes}
                onChange={(hours, minutes) =>
                  this.setState({
                    lunch: {
                      selectedHours: hours,
                      selectedMinutes: minutes
                    },
                    finalLunch: {
                      time:
                        (hours < 10 ? "0" + hours : hours) +
                        ":" +
                        (minutes < 10 ? "0" + minutes : minutes)
                    }
                  })
                }
              />
            </View>
          </View>
          <View style={style.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={style.textStyle}>dinner time:</Text>
              <Text style={style.textStyle}>{this.state.finalDinner.time}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#5b5b5b",
                borderRadius: 10,
                marginTop: 7
              }}
            >
              <TimePicker
                itemStyle={{ color: "#fff" }}
                selectedHours={this.state.dinner.selectedHours}
                selectedMinutes={this.state.dinner.selectedMinutes}
                onChange={(hours, minutes) =>
                  this.setState({
                    dinner: {
                      selectedHours: hours,
                      selectedMinutes: minutes
                    },
                    finalDinner: {
                      time:
                        (hours < 10 ? "0" + hours : hours) +
                        ":" +
                        (minutes < 10 ? "0" + minutes : minutes)
                    }
                  })
                }
              />
            </View>
          </View>
          <View style={style.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={style.textStyle}>sleep time:</Text>
              <Text style={style.textStyle}>{this.state.finalSleep.time}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#5b5b5b",
                borderRadius: 10,
                marginTop: 7
              }}
            >
              <TimePicker
                selectedHours={this.state.sleep.selectedHours}
                selectedMinutes={this.state.sleep.selectedMinutes}
                onChange={(hours, minutes) =>
                  this.setState({
                    sleep: {
                      selectedHours: hours,
                      selectedMinutes: minutes
                    },
                    finalSleep: {
                      time:
                        (hours < 10 ? "0" + hours : hours) +
                        ":" +
                        (minutes < 10 ? "0" + minutes : minutes)
                    }
                  })
                }
              />
            </View>
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
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#191919",
                    paddingTop: 3,
                    paddingBottom: 3
                  }}
                  key={x.day}
                >
                  <Text style={{ width: 30 }}>{x.day}</Text>
                  <View>
                    <Text style={style.textStyle}>from</Text>
                    <Text style={style.textStyle}>{x.finalFrom.time}</Text>
                  </View>
                  <View>
                    <Text style={style.textStyle}>to</Text>
                    <Text style={style.textStyle}>{x.finalTo.time}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({ visible: true })}
                  >
                    <FontAwesome5 name={"pen-square"} size={20} color="green" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.handleDeleteDay.bind(this, x.day)}
                  >
                    <FontAwesome5
                      name={"times-circle"}
                      size={20}
                      color="red"
                      solid
                    />
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
          <Button title="finish" onPress={this.handleFinish} />
        </View>
      </ScrollView>
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
    //elevation: 1
  },
  textStyle: {
    color: "#5b5b5b",
    alignSelf: "center"
  }
});

export default SetPlan;
