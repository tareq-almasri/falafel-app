import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Picker,
  TouchableOpacity
} from "react-native";
import { ACCESS_SERVER_URL } from "react-native-dotenv";
import CheckBox from "react-native-check-box";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ChooseDietHelp from "./ChooseDietHelp";

class Info extends Component {
  state = {
    weight: "",
    height: "",
    age: "",
    checkMale: false,
    checkFemale: false,
    checkEcto: false,
    checkMeso: false,
    checkEndo: false,
    numberOfWorkout: "0",
    durationOfWorkout: "0",
    gain: false,
    lose: false,
    maintain: false,
    lowCarbs: false,
    moderateCarbs: false,
    highCarbs: false,
    sex: "",
    NEAT: 0,
    goal: 0,
    index: 0,
    helpIndex: 0,
    visible: false,
    diet: ""
  };

  handleNext = () => {
    console.log(parseFloat(this.state.numberOfWorkout));
    let result =
      9.99 * parseFloat(this.state.weight) +
      6.25 * parseFloat(this.state.height) -
      4.92 * parseFloat(this.state.age);

    console.log(result);

    let BMR = Math.floor(this.state.sex == "male" ? result + 5 : result - 161);
    console.log(BMR);
    let percentOfBMR = Math.floor((7 * BMR) / 100);

    let EPOC = parseFloat(this.state.numberOfWorkout) * percentOfBMR;
    console.log(EPOC);
    let TEA = Math.floor(
      (parseFloat(this.state.numberOfWorkout) *
        parseFloat(this.state.durationOfWorkout) *
        9 +
        EPOC) /
        7
    );
    console.log(TEA);
    let total = BMR + TEA + this.state.NEAT;
    console.log(total);
    let TEF = Math.floor(total / 10);

    let TDEE = total + TEF;

    let goal = TDEE + this.state.goal;

    let protein = Math.floor(
      (TDEE * ratios[this.state.index].protein) / 100 / 4
    );
    let carbs = Math.floor((TDEE * ratios[this.state.index].carbs) / 100 / 4);
    let fat = Math.floor((TDEE * ratios[this.state.index].fat) / 100 / 9);

    let infoStrStrings = [
      this.props.navigation.getParam("username"),
      this.state.diet
    ].join();
    let sugar;
    this.state.sex == "male" ? (sugar = 37.5) : (sugar = 25);
    let infoStrNumbers = [TDEE, goal, protein, carbs, fat, sugar].join();

    if (TDEE && this.state.diet) {
      fetch(
        `http://${ACCESS_SERVER_URL}/api/info/?infoStrStrings=${infoStrStrings}&infoStrNumbers=${infoStrNumbers}`
      )
        .then(response => response.json())
        .then(data => console.log(data));

      this.props.navigation.navigate("SetPlan", {
        username: this.props.navigation.getParam("username"),
        password: this.props.navigation.getParam("password")
      });
    }
  };

  onHelpPressed = x => {
    this.setState({ visible: true, helpIndex: x });
  };

  handleOk = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <Text style={{ color: "white", marginTop: 14, marginBottom: 10 }}>
            Body Type and Measurements
          </Text>
          <Text
            style={{
              color: "#5b5b5b",
              alignSelf: "flex-start",
              marginLeft: 40
            }}
          >
            weight:
          </Text>
          <TextInput
            placeholderTextColor="#5b5b5b"
            placeholder="weight (kg)"
            onChangeText={text => this.setState({ weight: text })}
            value={this.state.weight}
            style={style.input}
          />
          <Text
            style={{
              color: "#5b5b5b",
              alignSelf: "flex-start",
              marginLeft: 40
            }}
          >
            height:
          </Text>

          <TextInput
            placeholderTextColor="#5b5b5b"
            placeholder="height (cm)"
            onChangeText={text => this.setState({ height: text })}
            value={this.state.height}
            style={style.input}
          />
          <Text
            style={{
              color: "#5b5b5b",
              alignSelf: "flex-start",
              marginLeft: 40
            }}
          >
            age:
          </Text>

          <TextInput
            placeholderTextColor="#5b5b5b"
            placeholder="age (year)"
            onChangeText={text => this.setState({ age: text })}
            value={this.state.age}
            style={style.input}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={style.check}>
              <CheckBox
                onClick={() =>
                  this.setState({
                    checkMale: !this.state.checkMale,
                    checkFemale: false,
                    sex: "male"
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
                    checkMale: false,
                    sex: "female"
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
                  checkEndo: false,
                  NEAT: 900
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
                  checkEndo: false,
                  NEAT: 500
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
                  checkEcto: false,
                  NEAT: 400
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
              itemStyle={{ color: "#fff" }}
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
              onChangeText={text => this.setState({ durationOfWorkout: text })}
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
                  maintain: false,
                  goal: 500
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
                  maintain: false,
                  goal: -500
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
          <ChooseDietHelp
            visible={this.state.visible}
            ok={this.handleOk}
            index={this.state.helpIndex}
          />
          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  lowCarbs: !this.state.lowCarbs,
                  moderateCarbs: false,
                  highCarbs: false,
                  index: 2,
                  diet: "low-carbs"
                })
              }
              isChecked={this.state.lowCarbs}
              rightText={"low-carbs"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%"
            }}
          >
            <Text style={{ color: "#5b5b5b", margin: 3 }}>
              {this.state.lose ? "* recommended for you" : ""}
            </Text>
            <TouchableOpacity
              style={{ paddingTop: 4 }}
              onPress={this.onHelpPressed.bind(this, 2)}
            >
              <FontAwesome5 name={"question-circle"} color="white" size={15} />
            </TouchableOpacity>
          </View>

          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  moderateCarbs: !this.state.moderateCarbs,
                  lowCarbs: false,
                  highCarbs: false,
                  index: 1,
                  diet: "moderate-carbs"
                })
              }
              isChecked={this.state.moderateCarbs}
              rightText={"moderate-carbs"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%"
            }}
          >
            <Text style={{ color: "#5b5b5b", margin: 3 }}>
              {this.state.maintain ? "* recommended for you" : ""}
            </Text>
            <TouchableOpacity
              style={{ paddingTop: 4 }}
              onPress={this.onHelpPressed.bind(this, 1)}
            >
              <FontAwesome5 name={"question-circle"} color="white" size={15} />
            </TouchableOpacity>
          </View>
          <View style={style.check2}>
            <CheckBox
              onClick={() =>
                this.setState({
                  highCarbs: !this.state.highCarbs,
                  lowCarbs: false,
                  moderateCarbs: false,
                  index: 0,
                  diet: "high-carbs"
                })
              }
              isChecked={this.state.highCarbs}
              rightText={"high-carbs"}
              rightTextStyle={{ color: "#fff" }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%"
            }}
          >
            <Text style={{ color: "#5b5b5b", margin: 3 }}>
              {this.state.gain ? "* recommended for you" : ""}
            </Text>
            <TouchableOpacity
              style={{ paddingTop: 4 }}
              onPress={this.onHelpPressed.bind(this, 0)}
            >
              <FontAwesome5 name={"question-circle"} color="white" size={15} />
            </TouchableOpacity>
          </View>
          <Button title="Next" onPress={this.handleNext} />
        </View>
      </ScrollView>
    );
  }
}

const ratios = [
  {
    name: "high-carbs for bodybuilding",
    carbs: 50, // 40-60
    protein: 30, // 25-35
    fat: 20 // 15-25
  },
  {
    name: "moderate-carbs for maintenance",
    carbs: 40, // 30-50
    protein: 30, // 25-35
    fat: 30 // 25-35
  },
  {
    name: "low-carbs for reduction",
    carbs: 20, // 10-20
    protein: 50, // 40-50
    fat: 30 // 30-40
  }
];

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
    textAlign: "center"
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#000"
  },
  check: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 7,
    margin: 10,
    width: "37%"
  },
  check2: {
    width: "80%",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 7,
    marginTop: 10
  }
});

export default Info;
