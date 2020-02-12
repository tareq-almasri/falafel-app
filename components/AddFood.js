import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity
} from "react-native";
import MealHelp from "./MealHelp";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CheckBox from "react-native-check-box";

class AddFood extends Component {
  state = {
    udi: {
      calCount: 0,
      proteinCount: 0,
      fatCount: 0,
      carbsCount: 0,
      caffCount: 0,
      sugarCount: 0
    },
    content: "",
    checkBreakfast: true,
    checkLunch: false,
    checkDinner: false,
    checkSnack: false,
    meal: "breakfast",
    visible: false
  };

  handleCalculate = () => {
    if(this.state.content.length!==0){
    fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": "e087d3e2",
        "x-app-key": "fb68da048702897ad8f051a108c055b5"
      },

      body: JSON.stringify({
        query: this.state.content,
        timezone: "US/Eastern"
      })
    })
      .then(res => res.json())
      .then(data =>
        this.setState({
          udi: {
            calCount: data.foods[0].nf_calories,
            proteinCount: data.foods[0].nf_protein,
            fatCount: data.foods[0].nf_total_fat,
            carbsCount: data.foods[0].nf_total_carbohydrate,
            caffCount: data.foods[0].full_nutrients[13].value,
            sugarCount: data.foods[0].nf_sugars
          }
        })
      );
    }
  };

  calculateRecommend = () => {
    if (this.state.meal == "breakfast") {
      return Math.ceil((this.props.TDEE * 20) / 100);
    } else if (this.state.meal == "snack") {
      return Math.ceil((this.props.TDEE * 10) / 100);
    } else if (this.state.meal == "lunch") {
      return Math.ceil((this.props.TDEE * 25) / 100);
    } else if (this.state.meal == "dinner") {
      return Math.ceil((this.props.TDEE * 35) / 100);
    }
  };

  handleOk = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <Modal visible={this.props.visible} animationType="slide">
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000"
          }}
        >
          <MealHelp visible={this.state.visible} ok={this.handleOk} />
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              marginTop: 20,
              justifyContent: "center",
              width: "100%"
            }}
          >
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => this.setState({ visible: true })}
            >
              <FontAwesome5
                name={"question-circle"}
                color="#2772ea"
                size={18}
              />
            </TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 18 }}>Choose a Meal:</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={style.check}>
              <CheckBox
                onClick={() =>
                  this.setState({
                    checkBreakfast: !this.state.checkBreakfast,
                    checkLunch: false,
                    checkDinner: false,
                    checkSnack: false,
                    meal: "breakfast"
                  })
                }
                isChecked={this.state.checkBreakfast}
                rightText={"Breakfast"}
                rightTextStyle={{ color: "#fff" }}
              />
            </View>
            <View style={style.check}>
              <CheckBox
                onClick={() =>
                  this.setState({
                    checkLunch: !this.state.checkLunch,
                    checkBreakfast: false,
                    checkDinner: false,
                    checkSnack: false,
                    meal: "lunch"
                  })
                }
                isChecked={this.state.checkLunch}
                rightText={"Lunch"}
                rightTextStyle={{ color: "#fff" }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={style.check}>
              <CheckBox
                onClick={() =>
                  this.setState({
                    checkDinner: !this.state.checkDinner,
                    checkBreakfast: false,
                    checkLunch: false,
                    checkSnack: false,
                    meal: "dinner"
                  })
                }
                isChecked={this.state.checkDinner}
                rightText={"Dinner"}
                rightTextStyle={{ color: "#fff" }}
              />
            </View>
            <View style={style.check}>
              <CheckBox
                onClick={() =>
                  this.setState({
                    checkSnack: !this.state.checkSnack,
                    checkBreakfast: false,
                    checkLunch: false,
                    checkDinner: false,
                    meal: "snack"
                  })
                }
                isChecked={this.state.checkSnack}
                rightText={"Snack"}
                rightTextStyle={{ color: "#fff" }}
              />
            </View>
          </View>
          <Text style={{ color: "#fff", width: "80%", margin: 10 }}>
            Recommended Amount of Calories for This Meal is:{" "}
            {this.calculateRecommend()}{" "}
          </Text>
          <View style={{ flexDirection: "row", width: '100%', justifyContent: 'center' }}>
            <TextInput
              multiline={true}
              textAlignVertical="top"
              numberOfLines={10}
              placeholderTextColor="#5b5b5b"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="e.g. 120 g mashed potatoes, 2 tbsp gravy, 1 cup of rice and 2 eggs (quantity is required and can be using any type of measurements, food can be anything including brand food)"
              value={this.state.content}
              onChangeText={content => this.setState({ content })}
              style={style.input}
            />
            <View style={{ marginTop: 15, marginLeft: 10, width: '20%' }}>
              <Text style={{ color: "#fff" }}>Carbs:</Text>
              <Text style={{ color: "#fff" }}>
                {" "}
                {this.state.udi.carbsCount} g{" "}
              </Text>
              <Text style={{ color: "#222", marginBottom: 5 }}>______</Text>
              <Text style={{ color: "#fff" }}>Protein:</Text>
              <Text style={{ color: "#fff" }}>
                {" "}
                {this.state.udi.proteinCount} g{" "}
              </Text>
              <Text style={{ color: "#222", marginBottom: 5 }}>______</Text>
              <Text style={{ color: "#fff" }}>Fat:</Text>
              <Text style={{ color: "#fff" }}>
                {" "}
                {this.state.udi.fatCount} g{" "}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', margin: 15}}>
            <Text style={{ color: "#fff", padding: 5, fontSize: 20 }}>
              Total:{" "}
            </Text>
            <Text style={{ borderWidth: 1, borderColor: "#fff", padding: 10, color: '#fff', borderRadius: 10, width: 100, textAlign: 'center' }}>
              {this.state.udi.calCount}
            </Text>
            <Text style={{ color: "#fff", padding: 5, fontSize: 20 }}>
              kcal
            </Text>
          </View>

          <Button title="Calculate Food" onPress={this.handleCalculate} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: 5
            }}
          >
            <View>
              <Button
                title="Add"
                color="green"
                onPress={this.props.add.bind(this, this.state.udi)}
              />
            </View>
            <View>
              <Button
                title="cancel"
                color="#c6352c"
                onPress={this.props.cancel}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const style = StyleSheet.create({
  input: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: "60%",
    fontSize: 18,
    height: 230
  },
  check: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 7,
    margin: 10,
    width: "37%"
  }
});

export default AddFood;
