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
  Picker
} from "react-native";
import CheckBox from "react-native-check-box";


class Info extends Component {
  state = {
    weight: '',
    height: '',
    age: '',
    checkMale: false,
    checkFemale: false,
    checkEcto: false,
    checkMeso: false,
    checkEndo: false,
    numberOfWorkout: '',
    durationOfWorkout: '',
    gain: false,
    lose: false,
    maintain: false,
    lowCarbs: false,
    moderateCarbs: false,
    highCarbs: false
  };

  getInfo=(object, value)=>{
     return Object.keys(object).find(key => object[key] === value);
  }

  handleNext = () => {
    fetch("/info", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        info: this.getInfo(this.state, true),
      })
    }).then(response => response.json());

    this.props.navigation.navigate("Info");
  };

  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <Text style={{ color: "white", marginTop: 14 }}>
            Body Type and Measurements
          </Text>
          <TextInput
            placeholderTextColor="#5b5b5b"
            placeholder="weight (kg)"
            onChange={e => this.setState({ weight: e.target.valueOf })}
            value={this.state.weight}
            style={style.input}
          />
          <TextInput
            placeholderTextColor="#5b5b5b"
            placeholder="height (cm)"
            onChange={e => this.setState({ height: e.target.valueOf })}
            value={this.state.height}
            style={style.input}
          />
          <TextInput
            placeholderTextColor="#5b5b5b"
            placeholder="age (year)"
            onChange={e => this.setState({ age: e.target.valueOf })}
            value={this.state.age}
            style={style.input}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={style.check}>
              <CheckBox
                onClick={() =>
                  this.setState({
                    checkMale: !this.state.checkMale,
                    checkFemale: false
                  })
                }
                isChecked={this.state.checkMale}
                rightText={"male"}
                rightTextStyle={{ color: "#fff" }}
              />
            </View>
            <View style={style.check}>
              <CheckBox
                onClick={() =>
                  this.setState({
                    checkFemale: !this.state.checkFemale,
                    checkMale: false
                  })
                }
                isChecked={this.state.checkFemale}
                rightText={"female"}
                rightTextStyle={{ color: "#fff" }}
              />
            </View>
          </View>

          <Text style={{ color: "#5b5b5b" }}>Body Type:</Text>
          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  checkEcto: !this.state.checkEcto,
                  checkMeso: false,
                  checkEndo: false
                })
              }
              isChecked={this.state.checkEcto}
              rightText={"Ectomorph"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <Text style={{ color: "#5b5b5b", margin: 10 }}>
            * struggles to gain weight
          </Text>
          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  checkMeso: !this.state.checkMeso,
                  checkEcto: false,
                  checkEndo: false
                })
              }
              isChecked={this.state.checkMeso}
              rightText={"Mesomorph"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <Text style={{ color: "#5b5b5b", margin: 10 }}>
            * easily gains and loses weight
          </Text>
          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  checkEndo: !this.state.checkEndo,
                  checkMeso: false,
                  checkEcto: false
                })
              }
              isChecked={this.state.checkEndo}
              rightText={"Endomorph"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <Text style={{ color: "#5b5b5b", margin: 10 }}>
            * easily gains weight, struggles to lose weight
          </Text>

          <Text style={{ color: "#333" }}>
            ______________________________________________________
          </Text>
          <Text style={{ color: "white", marginTop: 14 }}>Workout & Sport</Text>
          <View>
            <Text style={{ color: "#5b5b5b", marginTop: 20 }}>
              days of Workout per week:{" "}
            </Text>
            <Picker
              selectedValue={this.state.numberOfWorkout}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ numberOfWorkout: itemValue })
              }
            >
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
            </Picker>
          </View>
          <View
            style={{
              width: "100%",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#5b5b5b" }}>
              duration of workout: (minutes)
            </Text>
            <TextInput
              placeholderTextColor="#5b5b5b"
              placeholder="0"
              onChange={(e)=>this.setState({durationOfWorkout: e.target.valueOf})}
              value={this.state.durationOfWorkout}
              style={style.duration}
            />
          </View>
          <Text style={{ color: "#333" }}>
            ______________________________________________________
          </Text>
          <Text style={{ color: "white", marginTop: 14, marginBottom: 13 }}>
            set a goal:
          </Text>
          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  gain: !this.state.gain,
                  lose: false,
                  maintain: false
                })
              }
              isChecked={this.state.gain}
              rightText={"gain muscles/ bulk"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  lose: !this.state.lose,
                  gain: false,
                  maintain: false
                })
              }
              isChecked={this.state.lose}
              rightText={"lose weight/ cut"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  maintain: !this.state.maintain,
                  lose: false,
                  gain: false
                })
              }
              isChecked={this.state.maintain}
              rightText={"maintain your current weight"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <Text style={{ color: "#333" }}>
            ______________________________________________________
          </Text>
          <Text style={{ color: "white", marginTop: 14, marginBottom: 13 }}>
            choose a diet:
          </Text>
          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  lowCarbs: !this.state.lowCarbs,
                  moderateCarbs: false,
                  highCarbs: false
                })
              }
              isChecked={this.state.lowCarbs}
              rightText={"low-carbs"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <Text style={{ color: "#5b5b5b", margin: 3 }}>
            {this.state.lose ? "* recommended for you" : ""}
          </Text>

          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  moderateCarbs: !this.state.moderateCarbs,
                  lowCarbs: false,
                  highCarbs: false
                })
              }
              isChecked={this.state.moderateCarbs}
              rightText={"moderate-carbs"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <Text style={{ color: "#5b5b5b", margin: 3 }}>
            {this.state.maintain ? "* recommended for you" : ""}
          </Text>

          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  highCarbs: !this.state.highCarbs,
                  lowCarbs: false,
                  moderateCarbs: false
                })
              }
              isChecked={this.state.highCarbs}
              rightText={"high-carbs"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <Text style={{ color: "#5b5b5b", margin: 3 }}>
            {this.state.gain ? "* recommended for you" : ""}
          </Text>
          <Button
            title="Next"
            onPress={() => this.props.navigation.navigate("SetPlan")}
          />
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  input: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: "80%"
  },
  duration: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: 50,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#222"
  },
  check: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 7,
    margin: 10,
    width: "37%"
  },
  check2: {
    width: '80%',
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 7,
    marginTop: 10
  }
});

export default Info;
