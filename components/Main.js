import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import Speedometer from "react-native-speedometer-chart";
import * as Progress from "react-native-progress";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TdeeHelp from "./TdeeHelp";
import AddFood from "./AddFood";
import {
  NormalSugar,
  NormalCaff,
  AttentionSugar,
  AttentionCaff,
  WarningSugar,
  WarningCaff
} from "./SugarCaffein";

class Main extends Component {
  state = {
    _id: "",
    username: "",
    password: "",
    tdee: 0,
    goalCal: 0,
    diet: "",
    proteinDL: 0,
    carbsDL: 0,
    fatDL: 0,
    sugarDL: 0,
    caffDL: 0,
    dailyPlan: {
      wakeUp: "",
      breakfast: "",
      lunch: "",
      dinner: "",
      sleep: ""
    },
    sport: [{ day: "", from: "", to: "" }],
    udi: {
      date: "",
      calCount: 0,
      proteinCount: 0,
      fatCount: 0,
      carbsCount: 0,
      waterCount: 0,
      caffCount: 0,
      sugarCount: 0
    },
    visible: false,
    addFoodVisible: false
  };

  askPermission = async () => {
    await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
  };
  reminder = async () => {
    await this.askPermission();
    let time = Date().substring(16, 21);
    if (Object.values(this.state.dailyPlan).indexOf(time) == 0) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Wake Up Time",
        body: "rise and shine! time to start a new and healthy day :)",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 1) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Breakfast Time",
        body: "it's time for a healthy breakfast!",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 2) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Lunch Time",
        body: "it's time for a healthy lunch!",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 3) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Dinner Time",
        body: "it's time for a healthy dinner!",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 4) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Sleep Time",
        body: "it's time to get some rest, see you in the morning!",
        ios: { sound: true }
      });
    } else if (this.state.sport.some(x => x[1] == time)) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Workout Time",
        body: "it's your workout time! have fun and make the best out of it",
        ios: { sound: true }
      });
    } else if (this.state.sport.some(x => x[2] == time)) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Workout Time's Up",
        body: "you've finished your scheduled workout, Great Job!",
        ios: { sound: true }
      });
    }
  };

  resetUdi = () => {
    let date = Date().substring(0, 15);
    fetch(`https://api.onigiri.now.sh/reset`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        date: date
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

    this.setState({
      udi: {
        date: date,
        calCount: 0,
        proteinCount: 0,
        fatCount: 0,
        carbsCount: 0,
        waterCount: 0,
        caffCount: 0,
        sugarCount: 0
      }
    });
  };

  UNSAFE_componentWillMount() {
    fetch(`https://api.onigiri.now.sh/home`, {
      method: "POST",
      body: JSON.stringify({
        username: this.props.navigation.getParam("token")
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        this.setState(data.found);
      });
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.udi.date !== Date().substring(0, 15)) {
        this.resetUdi();
      }

      this.reminder();
    }, 10000);
  }

  handleOk = () => {
    this.setState({ visible: false });
  };

  handleLogout = () => {
    AsyncStorage.removeItem("userData");
    this.props.navigation.replace("Login");
  };

  handleCancel = () => {
    this.setState({ addFoodVisible: false });
  };

  handleAddFood = obj => {
    this.setState(prev => {
      let udi = { ...prev.udi };
      udi.calCount = prev.udi.calCount + obj.calCount;
      udi.proteinCount = prev.udi.proteinCount + obj.proteinCount;
      udi.carbsCount = prev.udi.carbsCount + obj.carbsCount;
      udi.fatCount = prev.udi.fatCount + obj.fatCount;
      udi.sugarCount = prev.udi.sugarCount + obj.sugarCount;
      udi.caffCount = prev.udi.caffCount + obj.caffCount;
      fetch(`https://api.onigiri.now.sh/add`, {
        method: "POST",
        body: JSON.stringify({
          username: this.state.username,
          udi: udi
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });
      return { udi };
    });

    this.setState({ addFoodVisible: false });
  };

  render() {
    let arr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let arr2 = arr
      .slice(arr.indexOf(Date().substring(0, 3)))
      .concat(arr.slice(0, arr.indexOf(Date().substring(0, 3))));

    return (
      <ScrollView>
        <View style={style.container}>
          <AddFood
            visible={this.state.addFoodVisible}
            cancel={this.handleCancel}
            add={this.handleAddFood}
            TDEE={this.state.tdee}
          />
          <View style={style.rowContainer}>
            <Text style={{ color: "#fff" }}>
              Hello {this.props.navigation.getParam("token")}!
            </Text>
            <Button
              style={{ width: 50 }}
              title="Log out"
              onPress={this.handleLogout}
            />
          </View>
          <TdeeHelp visible={this.state.visible} ok={this.handleOk} />
          <View style={style.calCounter}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#fff" }}>
                Your TDEE: {this.state.tdee}
              </Text>
              <TouchableOpacity
                style={{ paddingLeft: 10 }}
                onPress={() => this.setState({ visible: true })}
              >
                <FontAwesome5
                  name={"question-circle"}
                  color="#2772ea"
                  size={18}
                />
              </TouchableOpacity>
            </View>

            <Text style={{ color: "#fff", marginTop: 10, marginBottom: 20 }}>
              Your Goal-Calories: {this.state.goalCal}
            </Text>
            <View style={style.rowContainer}>
              <View style={{ position: "relative", marginRight: 40 }}>
                <Image
                  style={{ width: 20, height: 60 }}
                  source={require("../assets/water.png")}
                />
                <Image
                  style={{ width: 20, height: 60 }}
                  source={require("../assets/water.png")}
                />
                <View
                  style={{
                    transform: [{ rotate: "-90deg" }],
                    position: "absolute",
                    left: -49,
                    top: 47,
                    zIndex: -1
                  }}
                >
                  <Progress.Bar
                    height={20}
                    progress={this.state.udi.waterCount}
                    width={118}
                    borderColor="black"
                    unfilledColor="#5b5b5b"
                  />
                </View>
              </View>

              <Speedometer
                value={this.state.udi.calCount}
                totalValue={this.state.goalCal}
                size={200}
                showText
                textStyle={style.speedometerText}
                showLabels
                labelStyle={{ color: "#fff" }}
                text={"" + this.state.udi.calCount}
                internalColor="#0d7cff"
                outerColor="#5b5b5b"
                innerColor="black"
                innerCircleStyle={{ height: 86, width: 175 }}
              />
              <View style={{ width: 50 }}></View>
            </View>
          </View>
          <View style={style.rowContainer}>
            {this.state.sugarDL == this.state.udi.sugarCount ? (
              <AttentionSugar
                sugarDL={this.state.sugarDL}
                sugarCount={this.state.udi.sugarCount}
              />
            ) : this.state.sugarDL < this.state.udi.sugarCount ? (
              <WarningSugar
                sugarDL={this.state.sugarDL}
                sugarCount={this.state.udi.sugarCount}
              />
            ) : (
              <NormalSugar
                sugarDL={this.state.sugarDL}
                sugarCount={this.state.udi.sugarCount}
              />
            )}
            {this.state.caffDL == this.state.udi.caffCount ? (
              <AttentionCaff
                caffDL={this.state.caffDL}
                caffCount={this.state.udi.caffCount}
              />
            ) : this.state.caffDL < this.state.udi.caffCount ? (
              <WarningCaff
                caffDL={this.state.caffDL}
                caffCount={this.state.udi.caffCount}
              />
            ) : (
              <NormalCaff
                caffDL={this.state.caffDL}
                caffCount={this.state.udi.caffCount}
              />
            )}
          </View>
          <View style={{ flexDirection: "row", marginBottom: 6 }}>
            <View style={{ paddingRight: 20 }}>
              <Button
                title="+ Add Food"
                onPress={() => this.setState({ addFoodVisible: true })}
              />
            </View>

            <View style={{ paddingLeft: 20 }}>
              <Button
                title="+1 Cup of Water"
                onPress={() =>
                  this.setState(prev => {
                    let udi = { ...prev.udi };
                    udi.waterCount = prev.udi.waterCount + 0.11;
                    return { udi };
                  })
                }
              />
            </View>
          </View>
          <View style={{ alignItems: "flex-end", width: "100%" }}>
            <Text style={{ color: "#fff" }}> {this.state.carbsDL}g </Text>
          </View>

          <View style={style.nutrientContainer}>
            <Text style={{ color: "white", marginRight: 5, width: 55 }}>
              Carbs
            </Text>
            <Text style={style.nutrientCountBox}>
              {Math.ceil(this.state.udi.carbsCount)}
            </Text>
            <Text style={style.gram}>g</Text>
            <View>
              <Progress.Bar
                progress={
                  this.state.udi.carbsCount == 0
                    ? this.state.udi.carbsCount
                    : this.state.udi.carbsCount / this.state.carbsDL
                }
                width={185}
                height={10}
                borderColor="black"
                unfilledColor="#5b5b5b"
              />
            </View>
          </View>
          <View
            style={{ alignItems: "flex-end", width: "100%", marginTop: 10 }}
          >
            <Text style={{ color: "#fff" }}> {this.state.proteinDL}g </Text>
          </View>
          <View style={style.nutrientContainer}>
            <Text style={{ color: "white", marginRight: 5, width: 55 }}>
              Protein
            </Text>
            <Text style={style.nutrientCountBox}>
              {Math.ceil(this.state.udi.proteinCount)}
            </Text>
            <Text style={style.gram}>g</Text>
            <View>
              <Progress.Bar
                progress={
                  this.state.udi.proteinCount == 0
                    ? this.state.udi.proteinCount
                    : this.state.udi.proteinCount / this.state.proteinDL
                }
                width={185}
                height={10}
                borderColor="black"
                unfilledColor="#5b5b5b"
              />
            </View>
          </View>
          <View
            style={{ alignItems: "flex-end", width: "100%", marginTop: 10 }}
          >
            <Text style={{ color: "#fff" }}> {this.state.fatDL}g </Text>
          </View>
          <View style={style.nutrientContainer}>
            <Text style={{ color: "white", marginRight: 5, width: 55 }}>
              Fat
            </Text>
            <Text style={style.nutrientCountBox}>
              {Math.ceil(this.state.udi.fatCount)}
            </Text>
            <Text style={style.gram}>g</Text>
            <View>
              <Progress.Bar
                progress={
                  this.state.udi.fatCount == 0
                    ? this.state.udi.fatCount
                    : this.state.udi.fatCount / this.state.fatDL
                }
                width={185}
                height={10}
                borderColor="black"
                unfilledColor="#5b5b5b"
              />
            </View>
          </View>

          <Text style={{ color: "#222" }}>
            ________________________________________________
          </Text>
          <View style={{ position: "relative" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  padding: 10,
                  fontSize: 25
                }}
              >
                Your Plan
              </Text>
              <TouchableOpacity
                style={{ paddingLeft: 10, paddingTop: 4 }}
                onPress={() =>
                  this.props.navigation.navigate("SetPlan", {
                    username: this.state.username,
                    fromHome: true
                  })
                }
              >
                <FontAwesome5 name={"pen-square"} size={22} color="green" />
              </TouchableOpacity>
            </View>

            <Text style={style.today}>Today</Text>
            {arr2.map(x => {
              let workoutDay = this.state.sport.find(y => y.day == x);
              if (workoutDay) {
                return (
                  <View key={x} style={style.dayBox}>
                    <Text
                      style={{
                        color: "#fff",
                        alignSelf: "center",
                        padding: 10
                      }}
                    >
                      {x}
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#333",
                        padding: 10,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Wake Up{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.wakeUp}
                        </Text>
                      </View>
                      {workoutDay.from.substring(0, 2) +
                        workoutDay.from.substring(3) <
                      this.state.dailyPlan.breakfast.substring(0, 2) +
                        this.state.dailyPlan.breakfast.substring(3) ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            paddingBottom: 10
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              width: 85,
                              paddingLeft: 12
                            }}
                          >
                            Workout
                          </Text>
                          <Text style={{ color: "#fff" }}>--from-</Text>
                          <Text style={{ color: "#fff" }}>
                            {workoutDay.from}
                          </Text>
                          <Text style={{ color: "#fff" }}>-to-</Text>
                          <Text style={{ color: "#fff", paddingRight: 12 }}>
                            {workoutDay.to}
                          </Text>
                        </View>
                      ) : (
                        <View></View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Breakfast{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.breakfast}
                        </Text>
                      </View>
                      {workoutDay.from.substring(0, 2) +
                        workoutDay.from.substring(3) >
                        this.state.dailyPlan.breakfast.substring(0, 2) +
                          this.state.dailyPlan.breakfast.substring(3) &&
                      workoutDay.from.substring(0, 2) +
                        workoutDay.from.substring(3) <
                        this.state.dailyPlan.lunch.substring(0, 2) +
                          this.state.dailyPlan.lunch.substring(3) ? (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            paddingBottom: 10
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              width: 85,
                              paddingLeft: 12
                            }}
                          >
                            Workout
                          </Text>
                          <Text style={{ color: "#fff" }}>--from--</Text>
                          <Text style={{ color: "#fff" }}>
                            {workoutDay.from}
                          </Text>
                          <Text style={{ color: "#fff" }}>--to--</Text>
                          <Text style={{ color: "#fff", paddingRight: 12 }}>
                            {workoutDay.to}
                          </Text>
                        </View>
                      ) : (
                        <View></View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Lunch</Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.lunch}
                        </Text>
                      </View>
                      {workoutDay.from.substring(0, 2) +
                        workoutDay.from.substring(3) >
                        this.state.dailyPlan.lunch.substring(0, 2) +
                          this.state.dailyPlan.lunch.substring(3) &&
                      workoutDay.from.substring(0, 2) +
                        workoutDay.from.substring(3) <
                        this.state.dailyPlan.dinner.substring(0, 2) +
                          this.state.dailyPlan.dinner.substring(3) ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            paddingBottom: 10
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              width: 85,
                              paddingLeft: 12
                            }}
                          >
                            Workout
                          </Text>
                          <Text style={{ color: "#fff" }}>--from-</Text>
                          <Text style={{ color: "#fff" }}>
                            {workoutDay.from}
                          </Text>
                          <Text style={{ color: "#fff" }}>-to-</Text>
                          <Text style={{ color: "#fff", paddingRight: 12 }}>
                            {workoutDay.to}
                          </Text>
                        </View>
                      ) : (
                        <View></View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Dinner</Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.dinner}
                        </Text>
                      </View>
                      {workoutDay.from.substring(0, 2) +
                        workoutDay.from.substring(3) >
                        this.state.dailyPlan.dinner.substring(0, 2) +
                          this.state.dailyPlan.dinner.substring(3) &&
                      workoutDay.from.substring(0, 2) +
                        workoutDay.from.substring(3) <
                        this.state.dailyPlan.sleep.substring(0, 2) +
                          this.state.dailyPlan.sleep.substring(3) ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            paddingBottom: 10
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              width: 85,
                              paddingLeft: 12
                            }}
                          >
                            Workout
                          </Text>
                          <Text style={{ color: "#fff" }}>--from-</Text>
                          <Text style={{ color: "#fff" }}>
                            {workoutDay.from}
                          </Text>
                          <Text style={{ color: "#fff" }}>-to-</Text>
                          <Text style={{ color: "#fff", paddingRight: 12 }}>
                            {workoutDay.to}
                          </Text>
                        </View>
                      ) : (
                        <View></View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          marginBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Sleep</Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.sleep}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={x} style={style.dayBox}>
                    <Text
                      style={{
                        color: "#fff",
                        alignSelf: "center",
                        padding: 10
                      }}
                    >
                      {x}
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#333",
                        padding: 10,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Wake Up{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.wakeUp}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Breakfast{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.breakfast}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Lunch </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.lunch}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Dinner{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.dinner}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          marginBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Sleep </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.sleep}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }
            })}
          </View>
          <Button
            title="dev-tool force reset"
            onPress={this.resetUdi}
            color="#333"
          />
          <Image
            style={{ width: "100%", height: 60 }}
            source={require("../assets/NutritionixAPI_hires_flat.png")}
          />
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  dayBox: {
    color: "#fff",
    width: 300,
    backgroundColor: "#000",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3
  },

  calCounter: {
    padding: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  nutrientCountBox: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 6,
    padding: 3,
    width: 45,
    color: "#fff",
    textAlign: "center"
  },
  nutrientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15
  },
  gram: {
    color: "white",
    marginRight: 5,
    paddingLeft: 8,
    paddingRight: 8
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  speedometerText: {
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    width: 100,
    textAlign: "center"
  },
  today: {
    position: "absolute",
    left: 0,
    top: 70,
    zIndex: 2,
    backgroundColor: "red",
    color: "#fff",
    padding: 1
  }
});

export default Main;
